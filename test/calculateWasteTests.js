const calcWaste = require("../calculateWaste.js");
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

describe('calulateWaste.js', function() {
  describe('createVialObject', function() {
    const noWasterPriceString = "250/500.00";
    const targetDose = 1000;
    const resultVial = calcWaste.createVialObject(noWasterPriceString, targetDose);
    it('should return an object', function() {
      expect(resultVial).to.be.an('object');
    });
    it('should return an object with the proper keys', function() {
      expect(resultVial).to.have.all.keys('size', 'price', 'waste', 'totalCost', 'wasteCost', 'vialsUsed');
    });
    it('should have proper values', function() {
      expect(resultVial.size).to.be.a('number');
      expect(resultVial.size).to.equal(250);
      expect(resultVial.price).to.be.a('number');
      expect(resultVial.price).to.equal(500.00);
    });
  });

  describe()

  xdescribe('compareWaste', function() {
    let noWasterPriceArr = ["250/500.00"];
    const targetDose = 250;
    noWasterPriceArr = noWasterPriceArr.map((vial) => {
      return calcWaste.createVialObject(vial, targetDose);
    });

    beforeEach(function() {
      // const createVialCombinationObject = sinon.spy();
      // calcWaste.compareWaste(noWasterPriceArr, targetDose);
    });
    it('should call required helper functions for object creation and sorting', function() {

    });
  });
});

/*
if (drugIdx !== -1) { // if found
  //console.log('THE DRUG NAME WAS = ' + drugPrices.data[drugIdx]['name']);
  let drugFound = drugPrices.data[drugIdx]; // get curr drug with prices
  let vialSizes = drugFound.sizePrices.map((item) => { // create array of vial sizes
    return calcWaste.createVialObject(item, targetDose);
  });

  let minWasteCost = calcWaste.compareWaste(vialSizes, targetDose); // get array of comapise

  if (minWasteCost.length === 1) { // if there is only one option!!!!
    let minWasteVial = minWasteCost[0]; // set
    //console.log('~~~MINWASTE VIAL~~~');
    for (key in minWasteVial) {
      console.log(key + ': ' + minWasteVial[key]);
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
});*/
  // const values = sizePriceString.split("/");
  // let vial = {};
  // vial.size = values[0] * 1;
  // vial.price = values[1] * 1;
  // if (typeof vial.size === '')
  // vial.waste = targetDose % vial.size;
  // // if no waste vials used are equal else round up for need
  // if (vial.waste === 0) {
  //   vial.vialsUsed = targetDose / vial.size;
  // } else {
  //   vial.vialsUsed = Math.ceil(targetDose / vial.size);
  // }
  //
  // vial.totalCost = vial.vialsUsed * vial.price;
  // vial.wasteCost = (vial.waste / vial.size) * vial.price;
  // // split on '/'
  // return vial;
