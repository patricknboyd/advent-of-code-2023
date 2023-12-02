import { formatResponse, getPuzzleInput } from '../utils';

export async function solveDayOne(): Promise<string> {
  const input = await getPuzzleInput(1, '1');
  let partOne = 0;
  let partTwo = 0;

  const lines = input.split('\n');

  // part one
  for (const line of lines) {
    const digits = line
      .split('')
      .map(d => parseInt(d))
      .filter(d => !isNaN(d));

    const value = (10 * digits[0]) + digits[digits.length - 1];
    partOne += value;
  }

  // part two
  const numberStrings = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
  ];
  const values = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ];

  for (const line of lines) {
    let firstIndex = Infinity;
    let lastIndex = -1;
    let firstValue = 0;
    let lastValue = 0;
    for (let i = 0; i < numberStrings.length; i++) {
      const first = line.indexOf(numberStrings[i]);
      const last = line.lastIndexOf(numberStrings[i]);

      if (first >= 0 && first < firstIndex) {
        firstIndex = first;
        firstValue = values[i];
      }
      if (last >= 0 && last > lastIndex) {
        lastIndex = last;
        lastValue = values[i];
      }
    }

    const value = (10 * firstValue) + lastValue;
    partTwo += value;
  }


  return formatResponse(1, partOne, partTwo);

}