const calcWaste = require("../calculateWaste.js");
const chai = require('chai');
const expect = chai.expect;

describe('calulateWaste.js', function() {
  describe('createVialObject', function() {
    const noWasterPriceString = "250/500.00";
    const targetDose = 1000;
    const resultVial = calcWaste.createVialObject(noWasterPriceString, targetDose);
    it('should return an object', function() {
      expect(resultVial).to.be.an('object');
    });
    xit('should return an object with the proper keys', function() {
      expect(resultVial).to.have.all.keys('size', 'price', 'waste', 'totalCost', 'wasteCost', 'vialsUsed');
    });
    it('should have proper values', function() {
      expect(resultVial.size).to.be.a('number');
      expect(resultVial.size).to.equal(250);
      expect(resultVial.price).to.be.a('number');
      expect(resultVial.price).to.equal(500.00);
    });
  });
});

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
