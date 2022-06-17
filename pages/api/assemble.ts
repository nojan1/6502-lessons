// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
import { writeFile, readFile, unlink } from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export type AssembledCode = {
  data?: number[];
  symbols?: Record<string, number>;
  success: boolean;
  errorMessage: string;
};

const targetLine = "Symbols by value:";

const getSymbols = (listing: string) => {
  // console.log(listing);
  const lines = listing.split("\n");
  const symbols: Record<string, number> = {};

  const targetLineIndex = lines.findIndex((x) => x?.startsWith(targetLine));

  if (targetLineIndex !== -1) {
    lines.slice(targetLineIndex + 1).forEach((line) => {
      const [address, name] = line.trim().split(" ");
      if (!address || !name) return;

      symbols[name] = parseInt(address, 16);
    });
  }

  return symbols;
};

const assembleCode = async (code: string): Promise<AssembledCode> => {
  const inputFile = `/tmp/${randomUUID()}`;
  const outputFile = `/tmp/${randomUUID()}`;
  const listingFile = `/tmp/${randomUUID()}`;
  const command = `vasm6502_oldstyle -dotdir -Fbin -o ${outputFile} -L ${listingFile} ${inputFile}`;

  try {
    await writeFile(inputFile, code);
    const { stderr } = await execAsync(command);
    const data = await readFile(outputFile);
    const listing = await readFile(listingFile, {
      encoding: "utf-8",
    });

    return {
      data: Array.from(data),
      symbols: getSymbols(listing),
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
    unlink(listingFile).catch(() => {});
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AssembledCode | string>
) {
  const { code } = req.body;

  if (code) {
    res.json(await assembleCode(code));
    res.status(200);
  } else {
    res.json({
      success: false,
      errorMessage: "No code provided",
    });
    res.status(400);
  }
}
