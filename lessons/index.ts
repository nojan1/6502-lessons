import lesson1 from "./lesson1";

const lessons = [lesson1];

import { LessonDebugger } from "../runner/lessonDebugger";
import AccessLog from "../runner/accessLog";

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
  validate: (theDebugger: LessonDebugger, accessLog: AccessLog) => boolean;
  hidden?: boolean;
}

export default lessons;
