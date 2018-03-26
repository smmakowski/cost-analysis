/*
  // 6 types of sample
  // Days 0 - 4
  // Randomize labels A - F
*/

// printHeader();

function printDays() {
  for (let i = 0; i < 6; i++) {
    printDay(i)
  }
}

function printDay(/*int*/ day) {
  let options = ['A', 'B', 'C', 'D', 'E', 'F'];
  let dayStr = "";
  dayStr += day + " | ";
  while (options.length) {
    let idx = Math.floor(Math.random() * options.length);
    let selected = options.splice(idx, 1);

    dayStr += selected + " | ";
  }
  console.log(dayStr);
}
