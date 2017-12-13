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

const vialSizes = args.slice(2).map(function(item) { // maybe do the object creation here
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

  console.log(vial);
  return vial;
});
// call calculation
//compareWaste(drugName, targetDose, vialSizes);

function compareWaste(drugName, targetDose, vialSizes) {
  let minSize = vialSizes[0];
  let minWaste = targetDose % vialSizes[0];
  // print information for first item in the sizes
  console.log(`The ''${minSize} size ${drugName.toUpperCase()}' wastes ${minWaste} when attempting a ${targetDose} dose.`);

  // iterate through array to find overall lowest waste amount
  for (let i = 1; i < vialSizes.length; i++) {
    //calculate
    let currSize = vialSizes[i];
    let currWaste = targetDose % vialSizes[i];
    console.log(`The ''${currSize} size ${drugName.toUpperCase()}' wastes ${currWaste} when attempting a ${targetDose} dose.`);

    if (currWaste < minWaste) {
      minWaste = currWaste;
      minSize = currSize;
    }
  }


  console.log(`The size that wastes the least is the ${minSize}, which wastes ${minWaste}, when taking a dose of ${targetDose}.`);
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
