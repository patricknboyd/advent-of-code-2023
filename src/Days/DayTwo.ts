import { PuzzleResult, formatResponse, getPuzzleInput } from '../utils';

export async function solveDayTwo(): Promise<PuzzleResult> {
  const input = await getPuzzleInput(2, '1');
  let partOne = 0;
  let partTwo = 0;

  const lines = input.split('\n');
  interface Draw {
    red: number,
    blue: number,
    green: number,
  }
  interface Game {
    game: number,
    draws: Draw[]
  }

  const games: Game[] = [];

  const gameRegex = /^Game (\d+)/;
  const cubeRegex = /(\d+) (\w+)/g;
  for (const line of lines) {
    const match = line.match(gameRegex);
    if (!match) {
      throw new Error('bad input');
    }
    const game = parseInt(match[1]);
    const draws = line.split(':')[1].split(';');
    const g: Game = {
      game, draws: [] as Draw[]
    };

    for (const draw of draws) {

      const drawMatch = draw.matchAll(cubeRegex);

      const d: Draw = { red: 0, green: 0, blue: 0 };
      for (const m of drawMatch) {
        const value = parseInt(m[1]);
        switch (m[2]) {
          case 'blue':
            d.blue = value;
            break;
          case 'red':
            d.red = value;
            break;
          case 'green':
            d.green = value;
            break;
          default:
            throw new Error('bad enum');
        }
      }
      g.draws.push(d);
    }
    games.push(g);
  }

  // part one
  const maxRed = 12;
  const maxGreen = 13;
  const maxBlue = 14;

  partOne = games
    .filter(g => {
      return g.draws.filter(d => d.blue > maxBlue || d.red > maxRed || d.green > maxGreen).length === 0;
    })
    .map(g => g.game)
    .reduce((prev, current) => prev + current, 0);

  // part two
  for (const g of games) {

    const red = g.draws.reduce((prev, curr) => Math.max(prev, curr.red), 0);
    const blue = g.draws.reduce((prev, curr) => Math.max(prev, curr.blue), 0);
    const green = g.draws.reduce((prev, curr) => Math.max(prev, curr.green), 0);

    const power = red * blue * green;
    partTwo += power;

  }

  return { partOne, partTwo };
}