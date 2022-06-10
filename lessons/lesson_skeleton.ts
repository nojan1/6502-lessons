import { ILesson } from ".";

const lesson: ILesson = {
  title: "",
  description: ``,
  fixedCode: ``,
  defaultCode: `

`,
  maxCycles: 10,
  checks: [
    {
      title: "",
      hint: "",
      validate: (theDebugger, accessLog) => false,
    },
  ],
};

export default lesson;
