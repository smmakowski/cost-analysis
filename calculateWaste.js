 // get arguments from command line
const args = Array.prototype.slice.call(process.argv, 2);
// if not enough aruguments print and exit
if (args.length < 3) {
  console.log('ERROR: Improper number of arguments.');
  console.log('Please make sure you have the required arguments: Drug Name, units, \
  target dose without units, at least one vial size without units with price (delinated with \'/\')');
  console.log('Example: node calculateWaste.js myDrug mg 1000 200/4.35');
  process.exit();
}
// set variables for function
const drugName = args[0];

const targetDose = args[1] * 1;

// create array of objects from vials arguments
const vialSizes = args.slice(2).map((item) => {
  // if improper format notify and EXIT PROGRAM
  if (item.indexOf('/') === -1 || (item.indexOf('/') !== item.lastIndexOf('/'))) {
    console.log(`ERROR: argument '${item}' is not formatted properly.`);
    console.log('Please make sure that you use the following format <numerical vial size>/<vial price>');
    console.log('Example: 1240/923.40');
    process.exit();
  }

  const values = item.split("/");
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

//console.log(vial);
  return vial;
});

// call calculation function
compareWaste(vialSizes);

// method for figurinng out which of the vials that waste the lease volume waste the least money
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
  let minWasteVials = vialSizes.filter((vial) => {
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

    let minCostVials = minWasteVials.filter((vial) => {
      return vial.totalCost === minCostVial.totalCost;
    });

    if (minCostVials.length === 1) {
      console.log('BEST VIAL: ', minCostVials[0]);
    } else {
      console.log('BEST VIALS: ');
      for (let k = 0; k < minCostVials.length; k++) {
        console.log(minCostVials[k] + '\n');
      }
    }
  }

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
