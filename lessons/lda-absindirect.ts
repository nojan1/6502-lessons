import Instruction from "6502.ts/lib/machine/cpu/Instruction";
import { ILesson } from ".";
import { Operation, AddressingMode } from "../runner/types";

const lesson: ILesson = {
  title: "LDA with indirect addressing",
  description: `So far we have covered *immediate* and *absolute* addressing. This is when it gets pointy, we will now look at indirect addressing. We will continue to use the LDA instruction.
  
The syntax for indirect mode is:   
**LDA (&lt;memory address&gt;), y**

> Ignore the reference to Y for now, we will get to that later
`,
  fixedCode: `pointer=$01
    ldy #<final_target
    sty pointer
    ldy #>final_target
    sty pointer + 1
    ldy #0

final_target:
    .db $AA 
  `,
  defaultCode: `; Use the absolute addressing mode of LDA to set A to the value $AA
lessons/lda-direct.ts
`,
  maxCycles: 50,
  jumpToUserCode: false,
  checks: [
    {
      title: "A == $AA",
      hint: "Use the LDA command in indirect absolute mode, using the label pointer",
      validate: ({ theDebugger, operation, addressingMode, state }) =>
        state.a === 0xaa &&
        operation === Operation.lda &&
        addressingMode === AddressingMode.indirect,
    },
  ],
};

export default lesson;
