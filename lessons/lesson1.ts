import { ILesson } from ".";

const lesson1: ILesson = {
  title: "Giving A a value",
  description: `The acumulator is one the most used register.
     
     We will now learn how to assign it a value.`,
  fixedCode: `
; This code will always be here
    ldx $FF
    txs

    nop
  `,
  defaultCode: `
; Extend this code to give the A register a value of $AA
`,
  maxCycles: 10,
  checks: [],
};

export default lesson1;
