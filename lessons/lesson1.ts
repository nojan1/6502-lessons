import { ILesson } from ".";
import { AddressingMode, Operation } from "../runner/types";

const lesson1: ILesson = {
  title: "Assigning a value to register A",
  description: `The acumulator is the core register. We will now learn how to assign it a value.

The instruction (or mnemonic) for this is \`LDA\` or **L**oa**d** **A**

\`LDA\` comes in several different flavors (coresponding to different opcodes) depending on what **address mode** is used. 
For this first lesson we fill focus on the immediate address mode. In this mode the value is inlined right in the code and uses
uses the *#* character as a prefix. 

The format is \`LDA #<value>\`.    
Which could be read as \`A = <value>\` in more modern programming languages.

> When entering numeric values the prefix **$** is used to indicate a hexadecimal value (*$01AB*) and **%** is used to indicate a binary value (*%00001100*)`,
  fixedCode: ``,
  defaultCode: `; Extend this code to give the A register a value of $AA, remember to indent your code
`,
  maxCycles: 20,
  checks: [
    {
      title: "A == $AA",
      hint: "Use the LDA command in immediate mode (#)",
      validate: ({ state, operation, addressingMode }) =>
        state.a === 0xaa &&
        operation === Operation.lda &&
        addressingMode === AddressingMode.immediate,
    },
  ],
};

export default lesson1;
