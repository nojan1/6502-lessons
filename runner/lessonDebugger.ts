import Debugger from "6502.ts/lib/machine/Debugger";
import { Operation, AddressingMode } from "./types";
import { ILesson } from "../lessons";
import { MyBoard } from "./board";
import { RunResult, RunStage } from "./";
import InstrumentedBus from "./instrumentedBus";
import AccessLog from "./accessLog";
import CpuInterface from "6502.ts/lib/machine/cpu/CpuInterface";
import BusInterface from "6502.ts/lib/machine/bus/BusInterface";
import Instruction from "6502.ts/lib/machine/cpu/Instruction";

export interface CheckContext {
  theDebugger: LessonDebugger;
  accessLog: AccessLog;
  operation: Operation;
  addressingMode: AddressingMode;
  state: CpuInterface.State;
  bus: BusInterface;
}

export class LessonDebugger extends Debugger {
  constructor(
    private _lesson: ILesson,
    private _code: number[],
    private _symbols: Record<string, number>
  ) {
    super();
  }

  public async run(): Promise<RunResult> {
    const board = new MyBoard();
    this.attach(board);

    const accessLog = (board.getBus() as InstrumentedBus).getLog();
    const userCodeStart = this._symbols["user_code"];

    this.loadBlock(this._code, 0x8000);

    if (this._lesson.jumpToUserCode && userCodeStart) {
      this.loadBlock(
        [userCodeStart & 0xff, (userCodeStart >> 8) & 0xff],
        0xfffc
      );
    } else {
      this.loadBlock([0x00, 0x80], 0xfffc);
    }

    board.getCpu().reset();
    board.boot();

    let totalCycles = 0;
    let completedChecks = this._lesson.checks.map(() => false);

    if (userCodeStart) {
      while (this.getBoard().getCpu().state.p < userCodeStart) this.step(1);
    }

    accessLog.clear();

    while (true) {
      const { cpuCycles } = this.step(1);
      totalCycles += cpuCycles;

      const lastInstructionPointer = this.getBoard()
        .getCpu()
        .getLastInstructionPointer();
      const lastOpcode = this.getBoard().getBus().peek(lastInstructionPointer);
      const instruction = Instruction.opcodes[lastOpcode];

      const CheckContext: CheckContext = {
        theDebugger: this,
        accessLog,
        operation: instruction.operation as unknown as Operation,
        addressingMode: instruction.addressingMode as unknown as AddressingMode,
        bus: this.getBoard().getBus(),
        state: this.getBoard().getCpu().state,
      };

      // Check for completion
      this._lesson.checks.forEach((check, i) => {
        if (completedChecks[i]) return;
        if (check.validate(CheckContext)) completedChecks[i] = true;
      });

      if (!completedChecks.some((x) => !x)) {
        return {
          stage: RunStage.Run,
          success: true,
        };
      }

      const triggeredFailChecks =
        this._lesson.failChecks?.filter((c) => c.validate(CheckContext)) ?? [];
      if (triggeredFailChecks.length) {
        console.log(
          this.disassembleAt(userCodeStart ?? 0x8000, this._code.length)
        );

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

        console.log(
          this.disassembleAt(userCodeStart ?? 0x8000, this._code.length)
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
