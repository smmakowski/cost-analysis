//NOTE: DO NOT DELETE THE BELOW COMMENT AS THIS IS THE MAIN program

// // get arguments from command line
// const args = Array.prototype.slice.call(process.argv, 2);
// // if not enough aruguments print and exit
// if (args.length < 3) {
//   console.error();('ERROR: Improper number of arguments.');
//   console.log('Please make sure you have the required arguments: Drug Name, units, \
//   target dose without units, at least one vial size without units with price (delinated with \'/\')');
//   console.log('Example: node calculateWaste.js myDrug mg 1000 200/4.35');
//   process.exit();
// }
// // set variables for function
// const drugName = args[0];
//
// const targetDose = args[1] * 1;
//
// // create array of objects from vials arguments
// const vialSizes = args.slice(2).map((item) => {
//   // if improper format notify and EXIT PROGRAM
//   if (item.indexOf('/') === -1 || (item.indexOf('/') !== item.lastIndexOf('/'))) {
//     console.error(`ERROR: argument '${item}' is not formatted properly.`);
//     console.log('Please make sure that you use the following format <numerical vial size>/<vial price>');
//     console.log('Example: 1240/923.40');
//     process.exit();
//   }
//   const vial = createVialObject(item, targetDose);
//
//   return vial; // return Object
// });

// call calculation function
// compareWaste(vialSizes);

let vial1 = createVialObject("180/2175.22", 1000);
let vial2 = createVialObject("260/3483.19", 1000);
let vial3 = createVialObject("160/1990.89", 1000);
let vial4 = createVialObject("210/1222.91", 1000);
let vial5 = createVialObject("140/2002.81", 1000);

let vialArr1 = [vial1, vial2, vial3, vial4, vial5];
generateCombinations(vialArr1, 1000);

/* helper function declarations */
function createVialObject(sizePriceString, targetDose) {
  const values = sizePriceString.split("/");
  let vial = {};
  vial.size = values[0] * 1;
  vial.price = values[1] * 1;
  vial.waste = targetDose % vial.size;
  // if no waste vials used are equal else round up for need
  if (vial.waste === 0) {
    vial.vialsUsed = targetDose / vial.size;
  } else {
    vial.vialsUsed = Math.ceil(targetDose / vial.size);
  }

  vial.totalCost = vial.vialsUsed * vial.price;
  vial.wasteCost = (vial.waste / vial.size) * vial.price;
  // split on '/'
  return vial;
}

// function to create combinations of vials (NEEDS WORK)
function generateCombinations(vialCombinations, targetDose) {
  // sort vials highest to lowest
  let combinations = [];

  const sortedVials = vialCombinations.sort((vial1, vial2) => {
    return vial1.size - vial2.size;
  }).reverse();
  console.log(sortedVials)
  // iterate through vials
  // for each of the vials
  sortedVials.forEach((startVial, idx, arr) => {
    console.log('CURRENT STARTVIAL: ', startVial.size);
    if (idx === arr.length - 1) {
      console.log('YOU HAVE HIT THE LAST STARTVIAL, ENDING COMBINATIONS...');
      return;
    }

    if (startVial.waste === 0) { // if the vial does not produce waste on it's own then skip it
      console.log('START VIAL DOES NOT PRODUCE WASTE, GOING TO NEXT START VIAL...');
      return;
    }

    // otherwise
    let vialCounts = {}; //create counts object
    vialCounts[startVial.size] = Math.floor(targetDose / startVial.size); // try to fill up as much as we can
    let amountFilled = startVial.size * vialCounts[startVial.size]; // start filled amount with total filled by startVial
    console.log('STARTING AMOUNT LEFT:', amountFilled);
    // NOTE: WHAT ABOUT IF THE START VIAL DIVIDES EVENLY, SHOULD I STILL LOOK AT MORE OPTIONS just go on to the next one?
      // NOTE: Currently will just skip to next one

    for (let i = idx + 1; i < arr.length; i++) { // iterate through rest of sizes;
      let currVial = arr[i]; // curr vial ref

      let currCount = 0; // declar startCount for current vial

      while (amountFilled < targetDose) { // keep trying to fill the vial with next size down until
        amountFilled += currVial.size; // add the the vial and increase the count
        currCount += 1;
      }

      if (amountFilled === targetDose) { // if amount filled is equal to target Dose
        // create a combination object and push to combinations and continue
        console.log('FILLED WITHOUT WASTE WITH COMBINATION');
        vialCounts[currVial.size] = currCount; // add count to object
        console.log('finalCounts: ', vialCounts);
        return; // go on to next startVial size
      } else if (amountFilled > targetDose && i === arr.length - 1) { // more amount filled is more than target, and adding final size end
          console.log('FILLED WITH WASTE AND REACHED SMALLEST VIAL SIZE TOTAL: ' + amountFilled);
          vialCounts[currVial.size] = currCount; // add count to object
          console.log('FINAL COUNTS FOR COMBO:', vialCounts);
          // create a vialcombo object and and add to the array
          combinations.push(vialCounts);
          return;// skip to next startVial
          // move on and try to fill thingswill next smallest vial
      } else { // else if there are still vials left to check
        console.log('FILLED WITH WASTE BUT CAN SWAP FOR SMALLER VIAL SIZES');
        console.log('AMOUNT FILLED BEFORE BACKTRACK FOR SIZE ' + currVial.size , amountFilled);
        console.log('NUMBER OF VIALS USED FOR SIZE ' + currVial.size + ' TO EXCEED AMOUNT FILLED: ', currCount);

        amountFilled -= currVial.size; // subtract one bottle of the most recently used vials
        currCount -= 1; // take away one of the bottles from the count
        vialCounts[currVial.size] = currCount; // set current count
        console.log('MOVING ON TO NEXT VIAl...');
        console.log('CURRENT COUNTS:', vialCounts);
      }
    }

  });
  console.log('~~~~~FINAL VIAL COUNTS~~~~~');
  combinations.forEach((combo) => {
    console.log(combo);
  });
  return combinations;
}

function findVialsWithMinWaste(vialCombinations) {
  let minWasteVial = vialCombinations[0]; // start min at first vial
  // print information for first item in the sizes
  //console.log(`The ''${minWasteVial.size} size ${drugName.toUpperCase()}' wastes ${minWasteVial.waste} when attempting a ${targetDose} dose.`);

  // iterate through array to find overall lowest waste amount
  for (let i = 1; i < vialCombinations.length; i++) {
    if (vialCombinations[i].waste < minWasteVial.waste) {
      minWasteVial = vialCombinations[i];
    }
  }
  // return vials that have minimum waste
  return vialCombinations.filter((vial) => {
    return vial.waste === vial.waste;
  });
}

function findVialsWithMinCost(vialCombinations) {
  let minCostVial = vialCombinations[0];
  for (let i = 1; i < vialCombinations.length; i++) {
    if (vialCombinations[i].totalCost < minCostVial.totalCost) {
      minCostVial = vialCombinations[i];
    }
  }

  return vialCombinations.filter((vial) => {
    return vial.totalCost === minCostVial.totalCost;
  });
}

function findVialsWithMinSize(vialCombinations) {
  let smallestVial  = minCostVials[0];

  for (let i = 1; k < minCostVials.length; i++) {
    if (minCostVials[i].size < smallestVial.size) {
      smallestVial = minCostVials[i];
    }
  }

  return minCostVials.filter((vial) => {
    return vial.size === smallestVial.size;
  });
}

// function for figurinng out which of the vials that waste the lease volume waste the least money
function compareWaste(vialSizes) {
  let minWasteVial = vialSizes[0]; // start min at first vial
  // print information for first item in the sizes
  //console.log(`The ''${minWasteVial.size} size ${drugName.toUpperCase()}' wastes ${minWasteVial.waste} when attempting a ${targetDose} dose.`);

  // iterate through array to find overall lowest waste amount
  for (let i = 1; i < vialSizes.length; i++) {
    if (vialSizes[i].waste < minWasteVial.waste) {
      minWasteVial = vialSizes[i];
    }
  }
  // filterByVial Sizes
  const minWasteVials = vialSizes.filter((vial) => {
    return vial.waste === vial.waste;
  });

  if (minWasteVials.length === 1) {
    console.log('BEST VIAL:', minWasteVials[0]);
  } else {
    let minCostVial = minWasteVials[0];
    for (let j = 1; j < minWasteVials.length; j++) {
      if (minWasteVials[j].totalCost < minCostVial.totalCost) {
        minCostVial = minWasteVials[j];
      }
    }

    const minCostVials = minWasteVials.filter((vial) => {
      return vial.totalCost === minCostVial.totalCost;
    });

    if (minCostVials.length === 1) {
      console.log('BEST VIAL:', minCostVials[0]);
    } else {
      // find smallest vialSizes
      let smallestVial  = minCostVials[0];

      for (let k = 1; k < minCostVials.length; k++) {
        if (minCostVials[k].size < smallestVial.size) {
          smallestVial = minCostVials[k];
        }
      }

      const smallestVials = minCostVials.filter((vial) => {
        return vial.size === smallestVial.size;
      });

      console.log('BEST VIAL(S):');
      smallestVials.forEach((vial) => {
        console.log(vial);
      });
    }
  }
}

module.exports = {
  createVialObject,
}
// notes for optimal size algorithm (for Refactor)
// AWAIT JADES advice for

// when declaring vial sizes Array
  // mapp to array of objects, where in call back (item)
    // split item  on '/' to create arr
    // return object with keys
      // amount: arr[0], parsed to parseInt
      // remainder: targetsize % amount
      // total spent:
      // toal wasted

// in function
  // iterate throught obj Array to find lowest amount of waste
  // filter by similar waste levels
  // if filtered array has more than one item
    // iterate to figure out which one has least amount of money waste
    // filter again for similar monetary waste levels
      // if the seond filtered array has more than element
        // iterate through all, and print all infomraiton for all options
      // else
        // print infomation
  // else
    // print information


/* ALTERNATIVE IDEAS FOR ACCOMPLISHING THIS
- instead of passing info each time for a single run, create a .csv with drug names, and vials,
- create logic to parse csv, and use node's fs to run the analysis on the cv file, and freate logic

*/

// other notes
// - for money it may be neccesary to create a money class for to avoid minor errors in clauclation
// - alternatively, there's probably an npm package


// combinations of vials
