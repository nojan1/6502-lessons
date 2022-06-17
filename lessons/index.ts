import lesson1 from "./lesson1";
import lesson2 from "./lda-direct";
import lesson3 from "./lda-absindirect";
import lesson4 from "./index-registers";

const lessons = [lesson1, lesson2, lesson3, lesson4];

import { CheckContext } from "../runner/lessonDebugger";

export interface ILesson {
  title: string;
  description: string;
  fixedCode: string;
  defaultCode: string;
  maxCycles: number;
  checks: ICheck[];
  failChecks?: ICheck[];
  jumpToUserCode?: boolean;
}

export interface ICheck {
  title: string;
  hint?: string;
  validate: (context: CheckContext) => boolean;
  hidden?: boolean;
}

export default lessons;
