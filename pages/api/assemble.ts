// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import { writeFile, readFile, unlink } from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export type AssembledCode = {
  data?: number[];
  success: boolean;
  errorMessage: string;
};

const assembleCode = async (code: string): Promise<AssembledCode> => {
  const inputFile = `/tmp/${randomUUID()}`;
  const outputFile = `/tmp/${randomUUID()}`;
  const command = `vasm6502_oldstyle -dotdir -Fbin -o ${outputFile} ${inputFile}`;

  try {
    await writeFile(inputFile, code);
    const { stderr } = await execAsync(command);
    const data = await readFile(outputFile);

    return {
      data: Array.from(data),
      success: true,
      errorMessage: stderr,
    };
  } catch (err) {
    return {
      data: undefined,
      success: false,
      errorMessage: `Error compiling! ${err}`,
    };
  } finally {
    // Best effort
    unlink(inputFile).catch(() => {});
    unlink(outputFile).catch(() => {});
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AssembledCode | string>
) {
  const { code } = req.body;

  if (code) {
    res.send(await assembleCode(code));
    res.status(200);
  } else {
    res.send("Missing code");
    res.status(400);
  }
}
