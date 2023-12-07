import { PuzzleResult, enableVerbose, formatResponse, getPuzzleInput, isVerbose, verboseLog } from '../utils';

const dayNumber = 6;

export async function solveDaySix(): Promise<PuzzleResult> {
  const input = await getPuzzleInput(dayNumber, '1');
  const lines = input.split('\n');
  let partOne = 0;
  let partTwo = 0;
  //enableVerbose();

  const times = lines[0].split(' ').map(t => parseInt(t)).filter(t => !isNaN(t));
  const distances = lines[1].split(' ').map(t => parseInt(t)).filter(t => !isNaN(t));

  console.log(times, distances);

  const getRange = (time: number, distance: number): { min: number, max: number } => {
    const determ = Math.sqrt((time * time) - (4 * distance));

    let min = Math.ceil((time - determ) / 2);
    while (getDistanceTravelled(time, min) <= distance) {
      min++;
    }

    let max = Math.floor((time + determ) / 2);
    while (getDistanceTravelled(time, max) <= distance) {
      max--;
    }

    return {
      min,
      max,
    };
  }

  const getDistanceTravelled = (time: number, pressed: number) => {
    return pressed * (time - pressed);
  }

  // Part one

  partOne = 1;

  for (let i = 0; i < times.length; i++) {
    const range = getRange(times[i], distances[i]);
    partOne *= (range.max - range.min + 1);
    verboseLog(range);
  }

  // part two
  const time = parseInt(times.map(t => String(t)).join(''));
  const distance = parseInt(distances.map(d => String(d)).join(''));

  verboseLog(`Part two - time: ${time} distance: ${distance}`);

  const { min, max } = getRange(time, distance);
  partTwo = max - min + 1;



  return { partOne, partTwo };

}