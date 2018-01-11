/*
  Based off the 340b Price List Columnn in GPO 340b Price List 2.xsl
*/
module.exports.data = [
  {name: 'orencia', sizePrices: ['250/345.34']}, // abatacept NOTE: DONE
  {name: 'kadcycla', sizePrices: ['100/2175.22', '160/3483.89']}, // ado-trastuzumab NOTE: DONE
  {name: 'recombinate', sizePrices: ['250/201.64', '500/403.78', '1000/797.36', '2000/1503.28']}, // antihemophilic factor NOTE DONE
  {name: 'vidaza', sizePrices: ['100/203.95', '100/109.45', '100/203.95']}, // azacitidine NOTE DONE
  {name: 'benlysta', sizePrices: ['120/363.11', '400/1206.76']}, // belimumab NOTE DONE
  {name: 'avastin', sizePrices: ['100/536.49', '400/2145.58']}, //bevazicumab NOTE DONE
  {name: 'velcade', sizePrices: ['3.5/845.51']}, // bortezomib NOTE DONE
  {name: 'blenoxane', sizePrices: ['30/39.06']}, // bleomycin NOTE DONE
  {name: 'kyprolis', sizePrices: ['30/729.50', '60/1314.29']}, // carfilzomib NOTE DONE
  {name: 'erbitux', sizePrices: ['100/424.57', '855.14']}, // cetuximab NOTE DONE

  {name: 'cytoxan', sizePrices: ['500/178.46', '1000/344.63', '2000/616.06']}, // cyclophosphamide NOTE: DONE; coverted to mg for gram vials
  {name: 'cytrabine', sizePrices: ['100/4.34', '2000/10.21']}, // only generic NOTE: DONE "20,000" is actually 2000


  {name: 'dtic-dome', sizePrices: ['200/5.16']}, // dacarbazine NOTE DONE
  {name: 'taxotere', sizePrices: ['20/18.13', '80/51.75', '160/151.99']}, // doclatexel NOTE DONE
  {name: 'adriamycin', sizePrices: ['10/2.49', '20/4.34', '50/288.69']}, // doxorubicin NOTE DONE
  {name: 'doxil', sizePrices: ['20/766.15', '50/1679.60']},// doxorubicin liposomal NOTE DONE
  {name: 'soliris', sizePrices: ['300/4359.70']}, // eculizumab NOTE DONE
  {name: 'halaven', sizePrices: ['1/707.17']}, // eribulin NOTE DONE
  {name: 'ferrlecit', sizePrices: ['62.5/7.00']}, // ferric sodium gluconate complex  NOTE DONE
  {name: 'feraheme', sizePrices: ['510/334.48']}, // ferumoxytol NOTE DONE
  {name: 'fluororacil', sizePrices: ['500/1.29', '2500/6.45']}, // no brand NOTE DONE
  {name: 'gemzar', sizePrices: ['200/23.30', '1000/116.19', '2000/51.00']}, // gemcitabine NOTE DONE
  {name: 'remicade', sizePrices: ['100/450.14']}, // inflixumab NOTE DONE
  {name: 'camptosar', sizePrices: ['40/7.49', '100/15.99', '300/55.50']}, // irinotecan NOTE DONE
  {name: 'leucovorin', sizePrices: ['50/4.90', '100/6.61', '200/12.06', '350/12.41', '500/36.34']}, // no brand NOTE DONE

  {name: 'methotrexate (pf)', sizePrices: []}, // not brand NOTE DONE, but may need to refactor in case not found
  // ALSO NOTE: (pf) means preservative-free --- only target the ones that have preservative free next to it

  {name: 'mutamycin', sizePrices: ['5/39.24', '10/122.40', '20/113.95', '40/237.07']}, // Mitomycin NOTE DONE
  {name: 'opdivo', sizePrices: ['40/761.70', '100/1903.80']}, // nivolumab NOTE DONE
  {name: 'oxaliplatin', sizePrices: ['50/9.26', '100/32.17']}, // no brand listed NOTE DONE
  {name: 'abraxane', sizePrices: ['100/722.92']}, // Paclitaxel- protein bound NOTE DONE
  {name: 'almita', sizePrices: ['100/380.16', '500/1765.44']}, // pemetrexed NOTE DONE
  {name: 'vectibix', sizePrices: ['100/719.48', '400/2875.81']}, // panitumumab NOTE DONE
  {name: 'oncaspar', sizePrices: ['3750/0.05']}, // pegaspargase NOTE DONE
  {name: 'fotolyn', sizePrices: ['20/2447.22', '40/4894.44']}, // pralatrexate NOTE DONE
  {name: 'cryamza', sizePrices: ['100/795.03', '500/3975.17']}, // ramucirum NOTE DONE
  {name: 'rituxan', sizePrices: ['100/284.33', '500/1418.09']}, // rituximab NOTE DONE
  {name: 'actemra', sizePrices: ['80/221.64', '200/550.30', '400/1101.87']}, //tocilizumab NOTE DONE
  {name: 'hycamtin', sizePrices: ['4/31.98']}, // topotecan NOTE DONE
  {name: 'herceptin', sizePrices: ['150/618.89']}, // trastuzumab NOTE DONE
  {name: 'vincasar', sizePrices: ['1/3.86', '2/7.71']}, //vincristine NOTE DONE
  {name: 'navelbine', sizePrices: ['10/7.14', '50/35.68']}, // vinorelbine NOTE DONE
  {name: 'aranesp', sizePrices: ['25/71.36', '40/114.22', '60/171.32', '100/285.54', '200/57.07', '300/864.48']}, // TODO left as micrograms; darbepoetin alfa
  {name: 'taxotere', sizePrices: ['10/13.75']}, // TODO DOCEtaxel; 20mg has 'range' so not added yet
  {name: 'zometa', sizePrices: ['4/704.98', '5/39.11']} // zolendric acid NOTE DONE
]