/*
  Based of file named: drugPrices.pdf
*/
module.exports.data = [
  {name: 'orencia', sizePrices: ['250/345.34']}, // abatacept
  {name: 'kadcycla', sizePrices: ['100/217522', '160/3483.89']}, // ado-trastuzumab
  {name: 'recombinate', sizePrices: ['400/250.29', '800/409.05', '1240/923.40',
  '1800/1336.50', '2400/1684.80']}, // antihemophilic factor
  {name: 'vidaza', sizePrices: ['100/102.50', '100/109.45', '100/203.95']}, // azacitidine TODO in red
  {name: 'benlysta', sizePrices: ['120/363.11']}, // belimumab
  {name: 'avastin', sizePrices: ['100/536.49', '400/2145.58']}, //bevazicumab
  {name: 'velcade', sizePrices: ['3.5/845.51']}, // bortezomib
  {name: 'bleomycin', sizePrices: ['30/20.71', '30/43.05', '30/5342']}, // no brand?
  {name: 'kyprolis', sizePrices: ['30/729.50', '60/1314.29']}, // carfilzomib
  {name: 'erbitux', sizePrices: ['100/424.57', '855.14']}, // cetuximab
  {name: 'cytoxan', sizePrices: ['500/149.00', '500/206.92', '1000/299.01', '1000/390.35', '2000/494.53', '2000/737.59']}, // TODO cyclophosphamid;coverted to mg for gram vials
  // {name: 'cytrabine', sizePrices: ['']}, /// TODO ??????? not sure what the pricing is
  {name: 'dacarbazine', sizePrices: ['200/5.16', '100/67.10']},
  {name: 'aranesp', sizePrices: ['25/71.36', '40/114.22', '60/171.32', '100/285.54', '200/57.07', '300/864.48']}, // TODO left as micrograms; darbepoetin alfa
  {name: 'taxotere', sizePrices: ['10/13.75']}, // TODO DOCEtaxel; 20mg has 'range' so not added yet
  {name: 'adriamycin', sizePrices: ['10/1.18', '10/1.68', '10/1.92', '10/5.18', '10/6.25', '20/3.61', '20/12.37', '50/5.93', '50/8.40', '50/9.03', '50/12.52', '50/1407.56']},
  // did not add ones in red for adriamycin
  // {name: 'Doxil', sizePrices: []}, // did not add these since  they were all in red
  {name: 'soliris', sizePrices: ['300/4359.70']},
  {name: 'halaven', sizePrices: ['1/707.17']},
  {name: 'ferrlecit', sizePrices: ['62.5/700.00']},
  {name: 'feraheme', sizePrices: ['510/334.48']},
  {name: 'fluorouracil', sizePrices: ['500/1.29']},
  // {name: 'gemzar', sizePrices: ['']}, // TODO all prices are in red did not add
  {name: 'remicade', sizePrices: ['100/450.14']},
  {name: 'camptosar', sizePrices: ['40/7.49', '100/15.99', '300/55.50']},
  {name: 'leucovorin', sizePrices: ['50/4.90', '100/6.61', '200/12.06', '350/12.41', '500/36.34']},
  {name: 'mutamycin', sizePrices: ['5/39.24', '10/122.40', '20/113.95', '40/237.07']}, // TODO says 'GENERIC' in the column
  {name: 'opdivo', sizePrices: ['40/761.70', '100/1903.80']},
  {name: 'abraxane', sizePrices: ['100/722.92']}, // Paclitaxel- protein bound
  // {name: 'oxaliplatin', sizePrices: ['']}, // TODO all prices are in RED so did not enteer
  {name: 'almita', sizePrices: ['100/380.16', '500/1765.44']}, // pemetrexed
  {name: 'vectibix', sizePrices: ['100/719.48', '400/2875.81']}, // panitumumab
  {name: 'oncaspar', sizePrices: ['3750/0.05']}, // pegaspargase
  {name: 'fotolyn', sizePrices: ['20/2447.22', '40/4894.44']}, // pralatrexate
  {name: 'cryamza', sizePrices: ['100/795.03', '500/3975.17']}, // ramucirum
  {name: 'rituxan', sizePrices: ['100/284.33', '500/1418.09']}, // rituximab
  {name: 'actemra', sizePrices: ['80/221.64', '200/550.30', '400/1101.87']}, //tocilizumab
  {name: 'hycamtin', sizePrices: ['4/31.98']}, // topotecan
  {name: 'herceptin', sizePrices: ['150/618.89']}, // trastuzumab
  {name: 'vincasar', sizePrices: ['1/3.86', '2/7.71']}, //vincristine
  {name: 'navelbine', sizePrices: ['10/7.14', '50/35.68']}, // vinorelbine

  // NOTE: also contains generic. WHEN GENERIC IS ALSO USED, MAKE SURE GENERIC IS  <<< LAST >>> !
  {name: 'zometa', sizePrices: ['4/704.98']}, // this is also in red so i dont know TODO  all IN RED
  {name: 'reclast', sizePrices: ['5/821.47']}, // zolendric acid // TODO all in RED
  // {name: 'zolendric acid', sizePrices: ['']}, // TODO generic all in red did not add
  // {name: '', sizePrices: ['']},
  // {name: '', sizePrices: ['']},
  // {name: '', sizePrices: ['']},
  // {name: '', sizePrices: ['']},
  // {name: '', sizePrices: ['']},
  // {name: '', sizePrices: ['']},
]
