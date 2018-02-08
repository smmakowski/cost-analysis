/*
  MAIN PROGRAM FOR GENERATING COMBINATIONS
*/
const fs = require('fs');
const calcWaste = require('./calculateWaste.js');
const pricingEntity = process.argv[2].toLowerCase();

let notFoundDrugs = []; // to determine drugs not found
let totalVialsForYear = 0;
let drugPrices;
let pricingSuffix;

if (pricingEntity ===  '340b') {
  drugPrices = require('./340bPriceList.js');
  pricingSuffix = '340b';
  //console.log('USING 340B PRICES...');
} else if (pricingEntity === 'gpo') {
  drugPrices = require('./gpoPriceList.js');
  pricingSuffix = 'gpo';
  //console.log('USING GPO PRICES...');
} else {
  drugPrices = require('./priceData.js');
  pricingSuffix = 'default';
  //console.log('USING DEFAULT/TEST PRICE LIST)...');
}

// createFileOfWasteRows(process.argv[2]);
// createFileOfWasteRows(process.argv[2]);
//
// // function createFilesForAllSheets(folderName) {
// //   fs.readdir(__dirname + '/' + folderName, (err, files) => {
// //     files.forEach((file) => {
// //       createFileOfWasteRows(__dirname + '/csv-base-files/' + file);
// //     });
// //   });
// // }

// fs.readFile('./workingDocuments/Jan-Jun2017-analysis.numbers', 'utf8', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });
const files = fs.readdirSync('./csv-base-files');
files.forEach((file, i) => {
  if (i !== 0) {
    const path = './csv-base-files/' + file;
    //console.log('~~~~~~~~THE CURRENT FILE IS '+ path +'~~~~~~~~~~~~~~~~~~~~~');
    createFileOfWasteRows(path, pricingSuffix);
  }
});


// console.log('Drugs not found are: ');
// notFoundDrugs.forEach((drug) => {
//   console.log(drug);
// });
console.log('ALL THE  VIALS USED = ', totalVialsForYear);

/*
  FUNCTION DECLARATIONS
*/

function createFileOfWasteRows(fileName, pricingSuffix) {
  // read the file
  let data = fs.readFileSync(fileName, 'utf8');
  let results = processData(data);
  fs.writeFileSync('./' +  pricingSuffix + '-csv-result-files/' + fileName.slice(17, fileName.length - 4) + '-' + pricingSuffix + '-waste-columns.csv', results,'utf8');

  /*// below is the async version
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    // process data
    let results = processData(data);
    console.log('RESULTS');
    // console.log(results);
    fs.writeFile(fileName.slice(0, fileName.length - 4) + '-waste-columns.csv', results, (err) =>{
      if (err) {
        throw err;
      }
      console.log('FILE CREATED!');
    });
  }); */
}

function processData(data) {
  let line = 0;
  let results = ''; // start resulst string

  rows = data.split('\n'); // split into row

  rows.forEach((row, i) => { // for each row
    line++;
    //console.log('~~~LINE' + line +'~~~');
    if (i === 0) {
      //console.log('HEADER ROW');
      return;
    }
    row = row.slice(0, row.length - 4); // row is now without extra cols
    // console.log('row is =' + row)
    // check medicine
    let lastComma = (row.lastIndexOf(',') + 1);
    let targetDose = row.slice(lastComma); // get only dose

    if (targetDose.match(/(\d+\/\d+\/\d+)/) || targetDose === '') {
      // console.log('~~~LINE' + line +'~~~');
      //console.log('NO TARGET DOSE IS PROVIDED For row: {' + row + '}');
      results += ',,\n';
      return;
    } else {
      targetDose = targetDose * 1.0; // change from parse int to actual dose
    }
      //console.log('TARGETDOSE = ' + targetDose +', ' + 'and is =' + typeof targetDose);
    // search for drug name in row from drug priceObjs arrays
    // if found
    let drugIdx = findDrug(drugPrices.data, row); // look for drug in price list
    // console.log('THE IDX FOR DRUG IN PRICES WAS' + drugIdx);

    if (drugIdx !== -1) { // if found
      //console.log('THE DRUG NAME WAS = ' + drugPrices.data[drugIdx]['name']);
      let drugFound = drugPrices.data[drugIdx]; // get curr drug with prices
      let vialSizes = drugFound.sizePrices.map((item) => { // create array of vial sizes
        return calcWaste.createVialObject(item, targetDose);
      });

      let minWasteCost = calcWaste.compareWaste(vialSizes, targetDose); // get array of comapise

      if (minWasteCost.length === 1) { // if there is only one option!!!!

        let minWasteVial = minWasteCost[0]; // set
        totalVialsForYear += minWasteVial.vialsUsed;
        for (key in minWasteVial) {
          //console.log(key + ': ' + minWasteVial[key]);
        }

        let pricePerMg;
        if (minWasteVial.waste === 0) {
          pricePerMg = 0;
          //console.log('THERE IS NO WASTE GENERATED');

        } else if (minWasteVial['sizes']) {
          //pricePerMg = 'MultipleSizes! Find Last Size'
          let smallestSize = Math.min(...minWasteVial['sizes']);
          let priceOfSmallestSize = findPriceInStrArrWithSize(drugFound.sizePrices, smallestSize);
          pricePerMg = priceOfSmallestSize / smallestSize;

        } else {
          let priceOfSmallestSize = findPriceInStrArrWithSize(drugFound.sizePrices, minWasteVial.size);
          // for (let i = prices.length; i >= 0; i--) {
          pricePerMg = priceOfSmallestSize / minWasteVial.size;


          //   if (prices[i].indexOf(minWasteVial.size) === 0) {
          //     let arr = prices[i].split('/');
          //     priceOfSize = arr[1] * 1;
          //   }
          // }
          //
          // pricePerMg = priceOfSize / minWasteVial.size; // calculate price

        }

        let resultString = (Math.round(minWasteVial.waste * 100) / 100) + ',' + (Math.round(pricePerMg * 10000) / 10000) +
        ',' + (Math.round(minWasteVial.wasteCost * 100) / 100) + '\n';

        results += resultString;
      } else {
        //console.log('~~~LINE' + line +'~~~');
        //console.log('LEN of Min was array is=' + minWasteCost.length);
        minWasteCost.forEach((vial) => {
          console.log(vial);
        })
      }
      // compareWaste(vialSizes, targetDose); // this is what we want to do with the data in the end
    } else {  // else add empty row to results
      //console.log('~~~LINE' + line +'~~~');
      //console.log('DRUG NOT FOUND in row: {' + row + '}');
      let notFoundName = getDrugNameForNotListed(row);
      if (notFoundDrugs.indexOf(notFoundName) === -1) {
        notFoundDrugs.push(notFoundName);
      }
      results += ',,\n';
      return; //move on
    }
  });

  return results;
  //
}

function findPriceInStrArrWithSize(arr, price) {
  //console.log('SEARCHING FOR ' + price + 'IN ARRAY' + arr);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(price) === 0) { // if the price is in the string at beginning
      let sizePriceSplit = arr[i].split('/'); // split
      return sizePriceSplit[1] * 1; // get the price from after /
    }
  }
  return 0; //else return 0, although it should always be there as confirmed by other logic
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

function getDrugNameForNotListed(line) {
  let firstCommaIdx = line.indexOf(',');
  let firstClosingParen = line.indexOf(')');

  return line.slice(firstCommaIdx + 1, firstClosingParen + 1);
}
