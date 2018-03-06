/*
  < Description >
  Data is comprised of and array of Drug Objects, where each Drug has the following properties:
    - 'name' (String; the name of drug; wrap in ''s or ""s)
    - 'sizePrices' (Array of Strings where each String represents a 'vial size'
      and the price of that vial in USD, delineated by '/'s; wrap each String in ''s or ""s and
      separate each string with commas)

  < Usage >
  This information is used by 'createWasteRows.js' to see if drug information is availale for a particular
  for a particular row. If it is, it is then used by functions in 'calcculateWaste.js' to calculate waste
  levels for a particular row.

  When using this file for your own project, remove the '.sample' portion of the file name, and
  prepend the name of the pricing using camelCase.Examples:

  - Price name: 'Normal Price', File Name: 'normalPricePriceList.js'
  - Price name: 'Special Discount, File Name: 'specialDiscountPriceList.js


  If you have multiple files, copy and rename this template for each file you need.

*/

module.exports.data = [
  // {name: 'Drug1', sizePrices: [sizeGoesHere/priceInDollarsGoesHere']}, //
  // {name: '', sizePrices: ['']},
  // {name: '', sizePrices: ['']},
  // {name: '', sizePrices: ['']},
  // {name: '', sizePrices: ['']},
  // {name: '', sizePrices: ['']},
]
