const fs = require('fs');
const drugPrices = require('./priceData.js');
const calcWaste = require('./calculateWaste.js');

createFileOfWasteRows(process.argv[2]);

function createFileOfWasteRows(fileName) {
  // read the file
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    // process data
    processData(data, fileName);
  });
}

function processData(data, fileName) {
  let results = ''; // start resulst string
  rows = data.split('\n'); // split into row
  rows.forEach((row, i) => { // for each row
    if (i !== 0) {
    row = row.slice(0, row.length - 4); // row is now without extra cols
    // console.log('row is =' + row)
    // results variables
    let waste;
    let costPerUnit;
    let costOfWaste;

    // check medicine
    let lastComma = (row.lastIndexOf(',') + 1);
    let targetDose = row.slice(lastComma); // get only dose

    if (targetDose.match(/(\d+\/\d+\/\d+)/) || targetDose === '') {
      console.log('IT"S A DATE!!! or NO DOSE');
      results += '\n';
      return;
    } else {
      targetDose = parseInt(targetDose, 10);
    }
      //console.log('TARGETDOSE = ' + targetDose +', ' + 'and is =' + typeof targetDose);
    // search for drug name in row from drug priceObjs arrays
    // if found
    let drugIdx = findDrug(drugPrices.data, row); // look for drug in price list
    console.log('THE IDX FOR DRUG IN PRICES WAS' + drugIdx);
    if (drugIdx !== -1) { // if found
      let drugFound = drugPrices.data[drugIdx]; // get curr drug with prices
      let vialSizes = drugFound.sizePrices.map((item) => { // create array of vial sizes
        return calcWaste.createVialObject(item, targetDose);
      });
        calcWaste.compareWaste(vialSizes, targetDose);
      // compareWaste(vialSizes, targetDose); // this is what we want to do with the data in the end
    } else {  // else add empty row to results
      results += '\n';
      return; //move on
    }

    }
  });
}

function findDrug(priceList, row) {
  const allLower = row.toLowerCase();
  for (let i = 0; i < priceList.length; i++) {
    if (allLower.indexOf(priceList[i].name) !== -1) {
      return i;
    }
  }
  return -1;
}
