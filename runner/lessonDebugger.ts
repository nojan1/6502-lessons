import Debugger from "6502.ts/lib/machine/Debugger";
import { ILesson } from "../lessons";
import { MyBoard } from "./board";
import { RunResult, RunStage } from "./";

export class LessonDebugger extends Debugger {
  constructor(private _lesson: ILesson, private _code: number[]) {
    super();
  }

  public async run(): Promise<RunResult> {
    const board = new MyBoard();
    this.attach(board);

    this.loadBlock(this._code, 0x0800);
    this.loadBlock([0x00, 0x80], 0xfffc);

    board.boot();

    let totalCycles = 0;
    while (true) {
      const { cycles } = this.step(1);
      totalCycles += cycles;

      // Check for completion

      if (totalCycles > this._lesson.maxCycles) {
        return {
          stage: RunStage.Run,
          success: false,
          message: `Code run for ${totalCycles} without finishing, check your code and try again`,
          hintText: `A maximum of ${this._lesson.maxCycles} is allowed`,
        };
      }
    }
  }
}
