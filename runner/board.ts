import BusInterface from "6502.ts/lib/machine/bus/BusInterface";
import VanillaBoard from "6502.ts/lib/machine/vanilla/Board";
import Memory from "6502.ts/lib/machine/vanilla/Memory";
import InstrumentedBus from "./instrumentedBus";

export class MyBoard extends VanillaBoard {
  protected override _createBus() {
    return new InstrumentedBus() as unknown as Memory;
  }
}
