import { AssembledCode } from "../pages/api/assemble";

export const assembleCode = (code: string): Promise<AssembledCode> =>
  fetch("/api/assemble", {
    method: "POST",
    body: JSON.stringify({
      code,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((x) => x.json());
