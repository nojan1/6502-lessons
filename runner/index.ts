import { assembleCode } from "../api/assemble";
import { ILesson } from "../lessons";
import { LessonDebugger } from "./lessonDebugger";

export enum RunStage {
  Assemble,
  Run,
}

export interface RunResult {
  stage: RunStage;
  success: boolean;
  message?: string;
  hintText?: string;
}

export const run = async (
  lesson: ILesson,
  code: string
): Promise<RunResult> => {
  const assembledCode = await assembleCode(code);

  if (!assembledCode.success || !assembledCode.data) {
    return {
      success: false,
      stage: RunStage.Assemble,
      message: assembledCode.errorMessage,
    };
  }

  const lessonDebugger = new LessonDebugger(lesson, assembledCode.data!);
  const runResult = await lessonDebugger.run();

  runResult.stage = RunStage.Run;
  return runResult;
};
