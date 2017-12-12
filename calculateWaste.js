// get arguments
const args = Array.prototype.slice.call(process.argv, 2);
// if not enough aruguments print and exit
if (args.length < 3) {
  console.log('Improper number of arguments. ENDING PROGRAM...')
  process.exit();
}
// set variables for function
const drugName = args[0];
const targetDose = parseInt(args[1]);
const vialSizes = args.slice(2).map(function(item) { // maybe do the object creation here
  console.log(item);
  // split on '/'
  return parseInt(item, 10);
});
// call calculation
compareWaste(drugName, targetDose, vialSizes);

function compareWaste(drugName, targetDose, vialSizes) {
  let minSize= vialSizes[0];
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
