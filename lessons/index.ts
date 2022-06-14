import lesson1 from "./lesson1";
import lesson2 from "./lda-direct";

const lessons = [lesson1, lesson2];

import { CheckContext } from "../runner/lessonDebugger";

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
  validate: (context: CheckContext) => boolean;
  hidden?: boolean;
}

export default lessons;
