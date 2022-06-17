import Instruction from "6502.ts/lib/machine/cpu/Instruction";
import { ILesson } from ".";
import { Operation, AddressingMode } from "../runner/types";

const lesson: ILesson = {
  title: "The index registers",
  description: `You might have noticed the reference to Y in the last lesson. The Y-register is one of two index
  registers within the 6502, the other one is called X.

  These registers are not as multi purpose as the A register is. They do hoever serve as specific purpose in the form av index offsets for instructions using offset based addressing, they are also often used for loop counters. 

  To load a value in to them the instruction **LDY** and **LDX** is used, they support most of the same address modes as **LDA**.
`,
  fixedCode: ``,
  defaultCode: `; Use the LDY and LDY instruction to set X to $AB and Y to $AC 
`,
  maxCycles: 50,
  jumpToUserCode: false,
  checks: [
    {
      title: "X == $AB",
      hint: "Use the ldx command",
      validate: ({ theDebugger, operation, addressingMode, state }) =>
        state.x === 0xab,
    },
    {
      title: "Y == $AC",
      hint: "Use the ldy command",
      validate: ({ theDebugger, operation, addressingMode, state }) =>
        state.y === 0xac,
    },
  ],
};

export default lesson;
