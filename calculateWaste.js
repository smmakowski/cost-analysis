// get arguments
const args = Array.prototype.slice.call(process.argv, 2);
// if not enough aruguments print and exit
if (args.length < 3) {
  console.log('Improper number of arguments. ENDING PROGRAM...')
  process.exit();
}
// set variables for function
const drugName = args[0];
const targetDose = args[1];
const vialSizes = args.slice(2);
// call calculation
compareWaste(drugName, targetDose, vialSizes);

function compareWaste(drugName, targetDose, vialSizes) {

}
