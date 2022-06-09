import lesson1 from "./lesson1";

const lessons = [lesson1];

import Runner from "6502.ts/lib/test/VcsRunner";

export interface ILesson {
  title: string;
  description: string;
  fixedCode: string;
  defaultCode: string;
  maxCycles: number;
  checks: ICheck[];
}

export interface ICheck {
  title: string;
  hint?: string;
  validate: (runner: Runner) => boolean;
}

export default lessons;
