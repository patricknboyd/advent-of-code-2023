import { readFile, writeFile } from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';

export async function getPuzzleInput(day: number, puzzle: number | string | undefined) {

  const path = puzzle ? `input/${day}-${puzzle}.txt` : `input/${day}.txt`;
  return await readFile(path, { encoding: 'utf8' });
}

export async function writeToFile(day: number, suffix: string, content: string): Promise<void> {
  const path = `output/${day}-${suffix}.txt`;
  return writeFile(path, content);
}

export function formatResponse(day: number, partOne: string | number, partTwo: string | number): string {
  return `=== Day ${day} ===
  Part 1: ${partOne}
  Part 2: ${partTwo}
  
  `;
}

let verbose = false;

export function isVerbose(): boolean {
  return verbose;
}

export function enableVerbose() {
  verbose = true;
}

export function disableVerbose() {
  verbose = false;
}

export function verboseLog(message?: any, ...optionalParams: any) {
  if (verbose) {
    console.log(message, ...optionalParams);
  }
}

export function verboseClear() {
  if(verbose) {
    console.clear();
  }
}

export function initializeArray<T>(dimOne: number, dimTwo: number, initialValue: T): T[][] {
  const arr: T[][] = [];
  for (let i = 0; i < dimOne; i++) {
    const newRow: T[] = [];
    for (let j = 0; j < dimTwo; j++) {
      newRow.push(initialValue);
    }

    arr.push(newRow);
  }

  return arr;
}

export async function verboseSleep(ms: number): Promise<void> {
  if(verbose) {
    await setTimeout(ms);
  }
}