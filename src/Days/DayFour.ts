import { PuzzleResult, formatResponse, getPuzzleInput } from '../utils';

const dayNumber = 4;

export async function solveDayFour(): Promise<PuzzleResult> {
  const input = await getPuzzleInput(dayNumber, '1');
  let partOne = 0;
  let partTwo = 0;

  interface Card {
    id: number,
    winningNumbers: number[],
    numbers: number[],
    matches: number,
  }

  const lines = input.split('\n');

  const cards: Card[] = [];

  for (const line of lines) {

    //console.log(line);
    const match = line.match(/Card\s+(\d+):([^|]+)\|(.*)/);

    if (!match) {
      throw new Error('bad match');
    }

    const [_, id, winning, onCard] = match;

    const winningNumbers = winning.trim().split(' ').map(n => parseInt(n));
    const numbers = onCard.trim().split(' ').map(n => parseInt(n));
    const matches = numbers.filter(n => {
      return winningNumbers.findIndex(wn => wn === n) >= 0;
    }).length;

    const card: Card = {
      id: parseInt(id),
      winningNumbers,
      numbers,
      matches,
    };

    cards.push(card);

    //console.log(card);
  }

  // Part one
  for (const card of cards) {
    if (card.matches > 0) {
      partOne += Math.pow(2, card.matches - 1);
    }
  }

  // Part Two
  const deck: number[] = [];

  for (let i = 0; i < cards.length; i++) {
    deck.push(i);
  }

  for (let i = 0; i < deck.length; i++) {
    const cardNumber = deck[i];
    //console.log(deck);
    const card = cards[cardNumber];
    //console.log(`${i}) Looking at card ${cardNumber + 1} and adding ${cards[cardNumber].matches} more cards`);
    for (let x = 1; x <= card.matches; x++) {
      deck.push(cardNumber + x);
    }
  }

  partTwo = deck.length;

  return { partOne, partTwo };

}