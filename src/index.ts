import { disableVerbose } from './utils';
import { solveDayOne } from './Days/DayOne';
import { solveDayTwo } from './Days/DayTwo';

async function solvePuzzles() {
  try {

    const days = [
      solveDayOne,
      solveDayTwo,
    ];

    const startRange = 1;
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