import { ILesson } from ".";
import { AddressingMode, Operation } from "../runner/types";

const lesson: ILesson = {
  title: "LDA with direct addressing",
  description: `In this lesson we will look at the next addressing mode supported by LDA, direct addressing mode.
  
The syntax is: 
**LDA &lt;memory address&gt;**

  > The assembler has a concept called labels. Think of these as placeholders for memory addresses, the main difference being that the assembler will calculate them for us and we don't have to care.
    In this example there exists one label called **memory_addr**. If a label is used in the code the assembler will replace this for the actual address.`,
  fixedCode: `; The below row is a label
memory_addr:
    .db $AA ; This will put the actual value $AA into the compiled code
  `,
  defaultCode: `; Use the absolute addressing mode of LDA to set A to the value $AA
`,
  maxCycles: 10,
  jumpToUserCode: true,
  checks: [
    {
      title: "A == $AA",
      hint: "Use the LDA command in absolute mode, using the label memory_addr",
      validate: ({ theDebugger, operation, addressingMode, state }) =>
        state.a === 0xaa &&
        operation === Operation.lda &&
        addressingMode === AddressingMode.absolute,
    },
  ],
};

export default lesson;
