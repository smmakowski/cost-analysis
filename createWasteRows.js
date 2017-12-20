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
    results = processData(data);
    console.log('RESULTS');
    console.log(results);
    fs.writeFile(fileName + '-waste-columns.csv', results, (err) =>{
      if (err) {
        throw err;
      }
      console.log('FILE CREATED!');
    });
  });
}

function processData(data) {
  let line = 0;
  let results = ''; // start resulst string
  rows = data.split('\n'); // split into row

  rows.forEach((row, i) => { // for each row
    line++;
    console.log('~~~LINE' + line +'~~~');
    if (i === 0) {
      console.log('HEADER ROW');
      return
    }
    row = row.slice(0, row.length - 4); // row is now without extra cols
    // console.log('row is =' + row)
    // check medicine
    let lastComma = (row.lastIndexOf(',') + 1);
    let targetDose = row.slice(lastComma); // get only dose

    if (targetDose.match(/(\d+\/\d+\/\d+)/) || targetDose === '') {
      console.log('NO TARGET DOSE IS PROVIDED');
      results += ',,\n';
      return;
    } else {
      targetDose = parseInt(targetDose, 10);
    }
      //console.log('TARGETDOSE = ' + targetDose +', ' + 'and is =' + typeof targetDose);
    // search for drug name in row from drug priceObjs arrays
    // if found
    let drugIdx = findDrug(drugPrices.data, row); // look for drug in price list
    // console.log('THE IDX FOR DRUG IN PRICES WAS' + drugIdx);

    if (drugIdx !== -1) { // if found
      console.log('THE DRUG NAME WAS = ' + drugPrices.data[drugIdx]['name']);
      let drugFound = drugPrices.data[drugIdx]; // get curr drug with prices
      let vialSizes = drugFound.sizePrices.map((item) => { // create array of vial sizes
        return calcWaste.createVialObject(item, targetDose);
      });

      let minWasteCost = calcWaste.compareWaste(vialSizes, targetDose); // get array of comapise

      if (minWasteCost.length === 1) { // if there is only one option!!!!
        let minWasteVial = minWasteCost[0]; // set
        // //console.log('~~~MINWASTE VIAL~~~');
        // for (key in minWasteVial) {
        //   console.log(key + ': ' + minWasteVial[key]);
        // }

        let pricePerMg;
        if (minWasteVial.waste === 0) {
          pricePerMg = 0;
          console.log('THERE IS NO WASTE GENERATED');

        } else if (minWasteVial['sizes']) {
          pricePerMg = 'MultipleSizes! Find Last Size'
          let smallestSize = Math.min(...minWasteVial['sizes']);
          let priceOfSmallestSize = findPriceInStrArrWithSize(drugFound.sizePrices, minWasteVial.size);
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

        let resultString = minWasteVial.waste + ',' + pricePerMg +',' + minWasteVial.wasteCost + '\n';
        results += resultString;
      } else {
        console.log('LEN of Min was array is=' + minWasteCost.length);
        minWasteCost.forEach((vial) => {
          console.log(vial);
        })
      }
      // compareWaste(vialSizes, targetDose); // this is what we want to do with the data in the end
    } else {  // else add empty row to results
      console.log('DRUG NOT FOUND');
      results += ',,\n';
      return; //move on
    }
  });

  return results;
  //
}

function findPriceInStrArrWithSize(arr, price) {
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
