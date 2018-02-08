// const fs = require('fs');
// //NOTE: DO NOT DELETE THE BELOW COMMENT AS THIS IS THE MAIN program
//
// // get arguments from command line
// const args = Array.prototype.slice.call(process.argv, 2);
// // if not enough aruguments print and exit
// if (args.length < 3) {
//   console.log('ERROR: Improper number of arguments.');
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
// compareWaste(vialSizes, targetDose);

// let vial1 = createVialObject("180/2175.22", 1000);
// let vial2 = createVialObject("260/3483.19", 1000);
// let vial3 = createVialObject("160/1990.89", 1000);
// let vial4 = createVialObject("210/1222.91", 1000);
// let vial5 = createVialObject("140/2002.81", 1000);
//
// let vialArr1 = [vial1, vial2, vial3, vial4, vial5];
// let combosArr = generateCombinations(vialArr1, 1000);
//
// createVialCombinationObject(vialArr1, combosArr[0], 1000);
/* helper function declarations */

function createVialObject(sizePriceString, targetDose) {
  const values = sizePriceString.split("/");
  let vial = {};
  vial.size = values[0] * 1.0;
  vial.price = values[1] * 1.0;

  // fill bottle
  let totalUsed = 0;
  let vialsUsed = 0;

  while (totalUsed < targetDose) {
    totalUsed += vial.size;
    vialsUsed += 1;
  }
  vial.waste = totalUsed - targetDose;
  // if no waste vials used are equal else round up for need

  vial.vialsUsed = vialsUsed;

  vial.totalCost = vial.vialsUsed * vial.price;
  vial.wasteCost = (vial.waste / vial.size) * vial.price;
  // split on '/'
  //console.log('CREATED VIAL: ', vial);
  return vial;
}


//TODO: make vialObject class; make vial objectCombo class
// TODO: make them one and same class, and use arrays for both .size and .vialsUsed properties?
  // see deadline and assess tech debt

// function to create combinations of vials (NEEDS WORK)
// trys to meet targetDoes prioritzing least amount of waste and least amount of vials used
// TODO: get approval for this code, integrate into compare
// TODO: create logic to generate a vial combo

function generateCombinations(vialCombinations, targetDose) {
  // declare combo array for return;
  let combinations = [];
  // sort vials highest to lowest
  const sortedVials = vialCombinations.sort((vial1, vial2) => {
    return vial1.size - vial2.size;
  }).reverse();

  // for each of the vials, start with that vial size and try to fill
  sortedVials.forEach((startVial, idx, arr) => {
    //console.log('CURRENT STARTVIAL: ', startVial.size);
    if (idx === arr.length - 1) {
      //console.log('YOU HAVE HIT THE LAST STARTVIAL, ENDING COMBINATIONS...');
      return;
    }

    if (startVial.waste === 0) { // if the vial does not produce waste on it's own then skip it
      //console.log('START VIAL DOES NOT PRODUCE WASTE, GOING TO NEXT START VIAL...');
      return;
    }

    // otherwise
    let vialCounts = {}; //create counts object
    vialCounts[startVial.size] = Math.floor(targetDose / startVial.size); // try to fill up as much as we can
    let amountFilled = startVial.size * vialCounts[startVial.size]; // start filled amount with total filled by startVial
    //console.log('STARTING AMOUNT LEFT:', amountFilled);
    // NOTE: WHAT ABOUT IF THE START VIAL DIVIDES EVENLY, SHOULD I STILL LOOK AT MORE OPTIONS just go on to the next one?
      // NOTE: Currently will just skip to next one

    for (let i = idx + 1; i < arr.length; i++) { // iterate through rest of sizes;
      let currVial = arr[i]; // curr vial ref

      let currCount = 0; // declar startCount for current vial

      while (amountFilled < targetDose) { // keep trying to fill the vial with next size down until you hit/exceed target
        amountFilled += currVial.size; // add the the vial and increase the count
        currCount += 1;
      }

      if (amountFilled === targetDose) { // if amount filled is equal to target Dose
        // create a combination object and push to combinations and continue
        // console.log('FILLED WITHOUT WASTE WITH COMBINATION');
        vialCounts[currVial.size] = currCount; // add count to object
        // console.log('FINAL COUNTS FOR COMBO:', vialCounts);
        combinations.push(vialCounts);
        return; // go on to next startVial size
      } else if (amountFilled > targetDose && i === arr.length - 1) { // more amount filled is more than target, and adding final size end
          // console.log('FILLED WITH WASTE AND REACHED SMALLEST VIAL SIZE TOTAL: ' + amountFilled);
          vialCounts[currVial.size] = currCount; // add count to object
          // console.log('FINAL COUNTS FOR COMBO:', vialCounts);
          // create a vialcombo object and and add to the array
          combinations.push(vialCounts);
          return;// skip to next startVial
          // move on and try to fill thingswill next smallest vial
      } else { // else if there are still vials left to check
        // console.log('FILLED WITH WASTE BUT CAN SWAP FOR SMALLER VIAL SIZES');
        // console.log('AMOUNT FILLED BEFORE BACKTRACK FOR SIZE ' + currVial.size , amountFilled);
        // console.log('NUMBER OF VIALS USED FOR SIZE ' + currVial.size + ' TO EXCEED AMOUNT FILLED: ', currCount);

        amountFilled -= currVial.size; // subtract one bottle of the most recently used vials
        currCount -= 1; // take away one of the bottles from the count
        vialCounts[currVial.size] = currCount; // set current count
        // console.log('MOVING ON TO NEXT VIAl...');
        // console.log('CURRENT COUNTS:', vialCounts);
      }
    }
  });
  // make sure to delete all vials not used in combo
  combinations.forEach((combo) => {
    for (key in combo) {
      if (combo[key] === 0) {
        delete combo[key]
      }
    }
  });

  // console.log('~~~~~FINAL VIAL COUNTS~~~~~');
  // combinations.forEach((combo) => {
  //   console.log(combo);
  // });
  return combinations; // returns array of combinations to be parsed
}


function createVialCombinationObject(sizesArr, combo, targetDose) {
    let comboObj = {};
    comboObj.sizes = [];
    comboObj.vialCounts = [];
    let totalUsed = 0;
    let totalCount = 0;
    let totalCost = 0;
    // add vials used and
    for (key in combo) {
      let size = key * 1;
      let amount = combo[key];
      comboObj.sizes.push(size);
      comboObj.vialCounts.push(amount);
      totalCount += amount;
      totalUsed += (size * amount); // add amount totalCost
      totalCost += amount * findVialPriceWithSize(sizesArr, size);
    }
    //TODO: what is waste?

    comboObj.totalUsed = totalUsed;
    comboObj.vialsUsed = totalCount;
    comboObj.waste = totalUsed - targetDose;
    comboObj.totalCost = totalCost;
    //console.log('SMALLEST VIAL = ', Math.min(...comboObj.sizes));

    const smallestSize = Math.min(...comboObj.sizes);
    const pricePerVial = findVialPriceWithSize(sizesArr, smallestSize);
    comboObj.wasteCost = (comboObj.waste / smallestSize) * pricePerVial; // propos

    //console.log(comboObj);
    return comboObj;
}
// function to find price of vial sized, targetSize in array of vial objects
function findVialPriceWithSize(arr, targetSize) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].size === targetSize) {
      // console.log(arr[i])
      return arr[i].price;
    }
  }

  return 0;
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

function findVialsWithMinWasteCost(vialCombinations) {
  let minCostVial = vialCombinations[0];
  for (let i = 1; i < vialCombinations.length; i++) {
    if (vialCombinations[i].wasteCost < minCostVial.wasteCost) {
      minCostVial = vialCombinations[i];
    }
  }

  return vialCombinations.filter((vial) => {
    return vial.wasteCost === minCostVial.wasteCost;
  });
}

function findVialsWithMinSize(vialCombinations) {
  let smallestVial  = minCostVials[0];

  for (let i = 1; i < minCostVials.length; i++) {
    if (minCostVials[i].size < smallestVial.size) {
      smallestVial = minCostVials[i];
    }
  }

  return minCostVials.filter((vial) => {
    return vial.size === smallestVial.size;
  });
}

function findCombosWithLeastVialsUsed(vialCombos) {
  let leastUsed = vialCombos[0];
  for (let i = 1; i < vialCombos.length; i++) {
    if (vialCombos[i].vialsUsed < leastUsed.vialsUsed) {
      leastUsed = vialCombos[i];
    }
  }
//  console.log('LEAST USED =' + leastUsed);
  return vialCombos.filter((vial) => {
    return vial.vialsUsed === leastUsed.vialsUsed;
  });
}

function findCombosWithLeastTypesOfVialsUsed(vialCombos) {
  let leastUsedCombo = vialCombos[0];
  let leastUsedAmount;
//  console.log(leastUsedCombo)
  if (leastUsedCombo['sizes']) {
    leastUsedAmount = leastUsedCombo['sizes'].length;
  } else {
    leastUsedAmount = 1;
  }

  for (let i = 1; i < vialCombos.length; i++) {
    let currUsedAmount;
    if (vialCombos[i]['sizes']) { // if multiple sizes
      currUsedAmount = vialCombos[i]['sizes'].length; // set to number of sizes
    } else {
      currUsedAmount = 1; // else oly one size was used
    }

    if (currUsedAmount <  leastUsedAmount) {
      leastUsedAmount = currUsedAmount;
    } // compare
  }
  return vialCombos.filter((vial) =>{
    if (vial['sizes']) {
      return vial['sizes'].length === leastUsedAmount;
    } else {
      return 1 === leastUsedAmount;
    }
  });
}

//TODO: add function to fin vials with least vials used();

// function for figurinng out which of the vials that waste the lease volume waste the least money
// TODO: integrate factored out functions for better readbility

function compareWaste(vialSizes, targetDose) {
  let combos = generateCombinations(vialSizes, targetDose);
  let comboObjs = combos.map((combo) => {
    return createVialCombinationObject(vialSizes, combo, targetDose);
  });
  comboObjs = comboObjs.concat(vialSizes);
  //console.log('ALL THE COMBOS = ', comboObjs);

  let bestVials = findVialsWithMinWasteCost(comboObjs);
  //console.log('BEST VIALS AFTER MINWASTE COST =' + JSON.stringify(bestVials));
  bestVials = findVialsWithMinWaste(bestVials);
  //console.log('BEST VIALS AFTER MIN TOTAL WASRE =' + JSON.stringify(bestVials));
  bestVials = findCombosWithLeastVialsUsed(bestVials);
  //console.log('BEST VIALS AFTER  LEAST NUM OF VIALS USED =' + JSON.stringify(bestVials));
  bestVials = findCombosWithLeastTypesOfVialsUsed(bestVials);


  //if still left with multiple results means that reporting twice elimiate the one with sizes arr
  // if (bestVials.length > 1) {
  //   bestVials = bestVials.filter((vial) => {
  //     return !vial.hasOwnProperty('sizes');
  //   });
  // }

  return [bestVials[0]]; // if there is still one left after this, then just return the 1st one

  //
  // let minWasteVial = comboObjs[0]; // start min at first vial
  // // print information for first item in the sizes
  // //console.log(`The ''${minWasteVial.size} size ${drugName.toUpperCase()}' wastes ${minWasteVial.waste} when attempting a ${targetDose} dose.`);
  //
  // // iterate through array to find overall lowest waste amount
  // for (let i = 1; i < comboObjs.length; i++) {
  //   if (comboObjs[i].waste < minWasteVial.waste) {
  //     minWasteVial = comboObjs[i];
  //   }
  // }
  // // filterByVial Sizes
  // const minWasteVials = comboObjs.filter((vial) => {
  //   return vial.waste === vial.waste;
  // });
  //
  // if (minWasteVials.length === 1) {
  //   console.log('BEST VIAL:', minWasteVials[0]);
  // } else {
  //   console.log('CHECKING LEAST WASTECOST');
  //   let minCostVial = minWasteVials[0];
  //   for (let j = 1; j < minWasteVials.length; j++) {
  //     if (minWasteVials[j].wasteCost < minCostVial.wasteCost) {
  //       minCostVial = minWasteVials[j];
  //     }
  //   }
  //
  //   const minCostVials = minWasteVials.filter((vial) => {
  //     return vial.wasteCost === minCostVial.wasteCost;
  //   });
  //
  //   if (minCostVials.length === 1) {
  //     console.log('BEST VIAL:', minCostVials[0]);
  //   } else {
  //     console.log('CHECKING SMALLEST VIALS')
  //     // find smallest comboObjs
  //     let smallestVial  = minCostVials[0];
  //
  //     for (let k = 1; k < minCostVials.length; k++) {
  //       if (minCostVials[k].size < smallestVial.size) {
  //         smallestVial = minCostVials[k];
  //       }
  //     }
  //
  //     const smallestVials = minCostVials.filter((vial) => {
  //       return vial.size === smallestVial.size;
  //     });
  //
  //     console.log('BEST VIAL(S):');
  //     smallestVials.forEach((vial) => {
  //       console.log(vial);
  //     });
  //   }
  // }
}

module.exports = {
  createVialObject,
  compareWaste,
  generateCombinations,
  createVialCombinationObject,
  findVialsWithMinWasteCost,
  findVialsWithMinWaste,
  findCombosWithLeastVialsUsed,
  findCombosWithLeastTypesOfVialsUsed
}
