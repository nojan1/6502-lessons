import { AssembledCode } from "../pages/api/assemble";

export const assembleCode = (code: string): Promise<AssembledCode> =>
  fetch("/api/assemble", {
    method: "POST",
    body: JSON.stringify({
      code,
    }),
    headers: {
      ContentType: "application/json",
    },
  }).then((x) => x.json());
