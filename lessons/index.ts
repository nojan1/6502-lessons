import lesson1 from "./lesson1";

const lessons = [lesson1];

import { LessonDebugger } from "../runner/lessonDebugger";

export interface ILesson {
  title: string;
  description: string;
  fixedCode: string;
  defaultCode: string;
  maxCycles: number;
  checks: ICheck[];
  failChecks?: ICheck[];
}

export interface ICheck {
  title: string;
  hint?: string;
  validate: (theDebugger: LessonDebugger) => boolean;
  hidden?: boolean;
}

export default lessons;
