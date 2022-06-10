import Debugger from "6502.ts/lib/machine/Debugger";
import { ILesson } from "../lessons";
import { MyBoard } from "./board";
import { RunResult, RunStage } from "./";
import InstrumentedBus from "./instrumentedBus";

export class LessonDebugger extends Debugger {
  constructor(private _lesson: ILesson, private _code: number[]) {
    super();
  }

  public async run(): Promise<RunResult> {
    const board = new MyBoard();
    this.attach(board);

    const accessLog = (board.getBus() as InstrumentedBus).getLog();

    this.loadBlock(this._code, 0x0800);
    this.loadBlock([0x00, 0x80], 0xfffc);

    board.boot();

    let totalCycles = 0;
    let completedChecks = this._lesson.checks.map(() => false);

    while (true) {
      const { cycles } = this.step(1);
      totalCycles += cycles;

      // Check for completion
      this._lesson.checks.forEach((check, i) => {
        if (completedChecks[i]) return;

        if (check.validate(this, accessLog)) completedChecks[i] = true;
      });

      if (!completedChecks.some((x) => !x)) {
        return {
          stage: RunStage.Run,
          success: true,
        };
      }

      const triggeredFailChecks =
        this._lesson.failChecks?.filter((c) => c.validate(this, accessLog)) ??
        [];
      if (triggeredFailChecks.length) {
        return {
          stage: RunStage.Run,
          success: false,
          completedChecks,
          message: `Oops, the code doesn't behave as intended.`,
          hintText: triggeredFailChecks[0].hint,
        };
      }

      if (totalCycles > this._lesson.maxCycles) {
        const nextStepIndex = completedChecks.findIndex(
          (c, i) => !c && !this._lesson.checks[i].hidden
        );

        return {
          stage: RunStage.Run,
          success: false,
          completedChecks,
          message: `Code run for ${totalCycles} cycles without finishing, check your code and try again`,
          hintText:
            this._lesson.checks[nextStepIndex]?.hint ??
            `A maximum of ${this._lesson.maxCycles} cycles is allowed`,
        };
      }
    }
  }
}
