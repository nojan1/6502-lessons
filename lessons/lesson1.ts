import { ILesson } from ".";

const lesson1: ILesson = {
  title: "Assigning a value to register A",
  description: `The acumulator is one the most used register.
     
We will now learn how to assign it a value.

The instruction for this is \`LDA\` or *Load A*`,
  fixedCode: ``,
  defaultCode: `
; Extend this code to give the A register a value of $AA, remember to indent your code
`,
  maxCycles: 10,
  checks: [
    {
      title: "A == $AA",
      hint: "Use the LDA command",
      validate: (theDebugger) =>
        theDebugger.getBoard().getCpu().state.a === 0xaa,
    },
  ],
};

export default lesson1;
