import { disableVerbose } from './utils';
import { solveDayOne } from './Days/DayOne';
import { solveDayTwo } from './Days/DayTwo';
import { solveDayThree } from './Days/DayThree';
import { solveDayFour } from './Days/DayFour';

async function solvePuzzles() {
  try {

    const days = [
      solveDayOne,
      solveDayTwo,
      solveDayThree,
      solveDayFour,
    ];

    const startRange = 4;
    const endRange = 25;

    for (let day = startRange; day <= endRange && day <= days.length; day++) {
      disableVerbose();
      console.log(await days[day - 1]());
    }

  }
  catch (e) {
    console.error(e);
    // if (e instanceof Error) {
    //   console.error(e.message);
    // }
    // else if (typeof (e) === 'string') {
    //   console.error(e);
    // }
    // else {
    //   console.error('Unknown error!');
    // }
  }
}

solvePuzzles();