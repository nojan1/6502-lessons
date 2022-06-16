import { assembleCode } from "../api/assemble";
import { ILesson } from "../lessons";
import { LessonDebugger } from "./lessonDebugger";

const preamble = `  .org $8000
  ldx $FF
  txs`;

const userCodeHeader = `user_code:`;

export enum RunStage {
  Assemble,
  Run,
}

export interface RunResult {
  stage: RunStage;
  success: boolean;
  message?: string;
  hintText?: string;
  completedChecks?: boolean[];
}

export const run = async (
  lesson: ILesson,
  code: string
): Promise<RunResult> => {
  const finalCode = `${preamble}
${lesson.fixedCode}
${userCodeHeader}
${code}`;

  const assembledCode = await assembleCode(finalCode);

  if (!assembledCode.success || !assembledCode.data) {
    return {
      success: false,
      stage: RunStage.Assemble,
      message: assembledCode.errorMessage,
    };
  }

  const lessonDebugger = new LessonDebugger(
    lesson,
    assembledCode.data!,
    assembledCode.symbols ?? {}
  );
  const runResult = await lessonDebugger.run();

  runResult.stage = RunStage.Run;
  return runResult;
};
