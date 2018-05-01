/*
  <<<< INTRODUCTION >>>>

  The following functions calculate the amount of waste that is generated for a single
  row in the .CSV File. Calculating the optimal waste is the sole functon. 'createWasteRows.js'
  contains the logic for iterating through one or more .CSV files, and outputting the results
  .CSV.
/*
  <<<< THE createVialObject() FUNCTION >>>>

  createVialObject() takes a targetDoes (Number) and a sizePriceString(String) and outputs
  an object with waste information including: size used (.size), price of the bottle (.price),
  total units used (.totalUsed), total vials used (.vialsUsed), waste in units (.waste),
  total cost of administering dose (.totalCost), and money wasted to administed does (.wasteCose).

  The waste levels assume that only one vial size is used to achieve the target dose.

  For example, Drug 'A' multiple sized vials available and have a sizePrices arrays
  in it's PriceList.js file like so: ['100/20.00', '300/50.00', '1000/75.00'], and the target dose
  is 1200. In the program createVialObject() will be run for each of these price strings, outputting
  waste information assuming you used all 100-Vials, then all 300-vials, and then all 1000-vials.
  You would then get an object for each of these vial sizes. An example of the output object
  for the 1000 vial would be:

  {size: 1000, price: 75.00, waste: 800, vialsUsed: 2, totalCost: 150.00, wasteCost: 60.00}

  The argument 'targetDose' comes from the function processData() in createWasteRows.js when an
  indiviudal row is parsed for data extraction

  'sizePriceString' is passed in from (*PriceList.js) when a drug is found during .CSV analysis in
  in createWasteRows.js.
*/
 
function createVialObject(sizePriceString, targetDose) {
  const values = sizePriceString.split("/"); // splits a price string into a tuple [size, price]
  // NOTE a tuple is an array (basically an ordered list), where each position has a meaning

  let vial = {}; // creates an empty vial object
  vial.size = values[0] * 1.0; // .size property of vial is set as the size from above 'values' tuple
  vial.price = values[1] * 1.0; // .price property is set as the price from the about 'values' tuple

  // initialize total medication (in units) and number of vials used as 0
  let totalUsed = 0;
  let vialsUsed = 0;

  // loop that runs while target dose is being filled (while total used is less than the target dose)
  while (totalUsed < targetDose) {
    totalUsed += vial.size; // add all contents of vial to total used
    vialsUsed += 1; // add 1 vial to the total count of vials used
  }
  // NOTE the '+=' used above is an increment operator similar to saying 'totalUsed = totalUsed + vial.size'

  vial.waste = totalUsed - targetDose; // target dose subtracted from total used is assigned to .waste property

  vial.vialsUsed = vialsUsed; // number of vials used is assigned to .vialsUsed property

  vial.totalCost = vial.vialsUsed * vial.price; // .totalCost property is assigned
  vial.wasteCost = (vial.waste / vial.size) * vial.price; // .wasteCost property is assigned
  // To clarify calcualtion: (pecentage of a last vial wasted to meet or exceed does) * the price of one vial

  return vial; // return (output) the vial object
}

/*
  <<<< THE generateCombinations() FUNCTION >>>>

  generateCombos() is a function used to create multiple objects containing waste information. While the above
  function createVialObject() creates a single object that assumes only one vial size is used to achieve a
  target dose, this function creates objects that use multiple sizes.

  This function is called within the processData() function in createWasteRows.js after row data has been parsed.
  The function takes two arguments: vialCombinations (an array of vial objects created from running the createVialObject()
  function for each vial/price string for a given drug) and targetDose(the target dose for a given row in a .CSV file).

  The function begins by taking the vialCombinations array and sorting it in descending order using the built-in .sort()
  method for Arrays.
*/

function generateCombinations(vialCombinations, targetDose) {
  let combinations = []; // declare empty array to hold combinations for output

  // sort vialcombinations according to size in  descending order
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

/*
  createVialCombinationObject() 
*/
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


/*
  <<<< FILETERING WITH findVialsWithMin<something>() FUNCTIONS >>>>

  The following functions: findVialsWithMinWaste(), findVialsWithMinWasteCost(), findVialsWithMinSize(),
  findCombosWithLeastVialsUsed, and findCombosWithLeastTypesOfVialsUsed(), designed to filter all the
  combinations of vials used to achieve the target dose passed into compareWaste().

  These functions are used in a sequence in the compareWaste() to find the most optimal combination,
  considering the following priority:

  1. Minimum waste in units
  2. Minimum waste cost
  3. Least amount of total vials used to achieve target dose
  4. Least number of types of vials used to achieve target dose

  All these functions work in a similar manner. The array of combinations is passed in to the function,
  and the first combination in the array is set as the one with the minimum desired quality; for example,
  findVialsWithMinWaste() tries to find the combinations that produce the least waste in whatever units
  that it comes in, usually mg. It then iterates through the array, changing the the combination that has
  the minimum desired quality to the one being checked it is lower than the current one. After finding
  the combination with the desired minimum quality, the array is filtered to only contain combinations
  that match the optimal vial in terms of the quality being assessed.

  For example, when using the findVialsWithMinCost(), which looks for the combinations that waste
  the least amount of money, you may have an array of the following combinations
  (NOTE: the properties have been truncated to illustrate the point):

  [{size: 100, wasteCost: 100.00, ... }, {size: 300, wasteCost: 19.00}, {size: 500, wasteCost: 21.00, ... },
  {size: 450, wasteCost: 99.00}]

  It will start with the first item ({size: 100, wasteCost: 100.00, ...}) being the one with the lowest, and
  then go through the rest to compare. When it gets to the second item, the second item becomes the new combination
  with the least waste cost since the wasteCost is lower. Continuing on it will remain the lowest as nothing seems
  to beat it. It will then go through one more time removing all the ones that do not have a wasteCost of 19.00,
  outputting the array [{size: 300, wasteCost 19.00, ...}] at the end of the function.

*/

// Looks for combinations that generate the least amount of waste in units (usually mg)
// NOTE: this function, as well as findVialsWithMinCost() and findCombosWithLeastVialsUsed are very similar
// so line by line comments are only used in findVialsWithMinWaste()
function findVialsWithMinWaste(vialCombinations) {
  let minWasteVial = vialCombinations[0]; // start with first item in vialCombinations array as lowest waste

  // iterate through array to find overall lowest waste amount, starting with the second item
  for (let i = 1; i < vialCombinations.length; i++) {
    // if current combination in array produces less waste than current 'minimum waste' combination
    if (vialCombinations[i].waste < minWasteVial.waste) {
      minWasteVial = vialCombinations[i]; // set  current item as 'minimum waste combination'
    }
  }

  // filter vialCombinations array for vials matching waste levels of minWasteVial and return filtered array
  return vialCombinations.filter((vial) => {
    return vial.waste === minWasteVial.waste; // .filter() goes through array and only keeps item where condition is true
  });
}

// Looks for combinations that generate the least amount of money wasted (in USD$)
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

// Looks for combinations that use the least number of total vials
function findCombosWithLeastVialsUsed(vialCombos) {
  let leastUsed = vialCombos[0];
  for (let i = 1; i < vialCombos.length; i++) {
    if (vialCombos[i].vialsUsed < leastUsed.vialsUsed) {
      leastUsed = vialCombos[i];
    }
  }

  return vialCombos.filter((vial) => {
    return vial.vialsUsed === leastUsed.vialsUsed;
  });
}

// Looks for combinations that use the least number of types of vials
// NOTE: this function is slightly different from the other filtering functions so
// line by line comments will be used.
function findCombosWithLeastTypesOfVialsUsed(vialCombos) {
  let leastUsedCombo = vialCombos[0];
  let leastUsedAmount;

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

/*
  compareWaste() is the main function for determining the optimal waste for one row of .CSV data.
  It outputs a single object wrapped in an array, which is a
*/

function compareWaste(vialSizes, targetDose) {
  let combos = generateCombinations(vialSizes, targetDose);
  let comboObjs = combos.map((combo) => {
    return createVialCombinationObject(vialSizes, combo, targetDose);
  });
  comboObjs = comboObjs.concat(vialSizes);

  let bestVials = findVialsWithMinWasteCost(comboObjs);
  bestVials = findVialsWithMinWaste(bestVials);
  bestVials = findCombosWithLeastVialsUsed(bestVials);
  bestVials = findCombosWithLeastTypesOfVialsUsed(bestVials);

  return [bestVials[0]]; // if there is still one left after this, then just return the 1st one
}

// The code below exports the above functions so they can be used by other files in this program.
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
