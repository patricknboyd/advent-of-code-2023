import { formatResponse, getPuzzleInput } from '../utils';

const dayNumber = 3;

export async function solveDayThree(): Promise<string> {
  const input = await getPuzzleInput(dayNumber, '1');
  let partOne = 0;
  let partTwo = 0;

  const lines = input.split('\n');
  const width = lines[0].length;

  let isInNumber = false;
  let isPartNumber = false;
  let currentNumber = '';

  interface PartNumber {
    value: number,
    lineNumber: number,
    start: number,
    end: number,
  }

  interface Symbol {
    value: string,
    lineNumber: number,
    position: number,
    adjacentNumbers: number[],
  }

  const numbers: PartNumber[] = [];
  const symbols: Symbol[] = [];

  for (const { lineNumber, line } of lines.map((line, lineNumber) => { return { line, lineNumber } })) {
    for (const { position, c } of line.split('').map((c, position) => { return { c, position } })) {


      let value = parseInt(c);

      if (isNaN(value)) {
        if (c !== '.') {
          // this is a symbol
          symbols.push({
            value: c,
            lineNumber,
            position,
            adjacentNumbers: [],
          })
        }

        // End the number if we are in it
        if (isInNumber) {
          numbers.push({
            value: parseInt(currentNumber),
            lineNumber,
            start: position - currentNumber.length,
            end: position - 1
          })
        }

        isInNumber = false;
        isPartNumber = false;
        currentNumber = '';
      }
      else {
        // This is a number
        currentNumber += c;
        isInNumber = true;
      }
    }

    // After each line add check if we are in a number
    if (isInNumber) {
      numbers.push({
        value: parseInt(currentNumber),
        lineNumber,
        start: width - currentNumber.length,
        end: width - 1
      })
    }

    isInNumber = false;
    isPartNumber = false;
    currentNumber = '';
  }



  // Part One
  for (const n of numbers) {

    const adjacent = symbols.filter(s => (s.lineNumber >= n.lineNumber - 1 && s.lineNumber <= n.lineNumber + 1) && (s.position >= n.start - 1 && s.position <= n.end + 1));

    if (adjacent.length > 0) {
      partOne += n.value;
    }

    for (const s of adjacent) {
      s.adjacentNumbers.push(n.value);
    }
  }

  for (const gear of symbols.filter(s => s.value === '*' && s.adjacentNumbers.length === 2)) {
    partTwo += (gear.adjacentNumbers[0] * gear.adjacentNumbers[1]);
  }

  // console.log('Numbers:');
  // for (const n of numbers) {
  //   console.log(n);
  // }

  // console.log();
  // console.log('Symbols:');
  // for (const s of symbols) {
  //   console.log(s);
  // }

  return formatResponse(dayNumber, partOne, partTwo);

}