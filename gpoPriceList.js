/*
  Based off the GPO Price List Columnn in GPO 340b Price List 2.xsl
*/
module.exports.data = [
  /*
    this is the stuff from the pdf
  */
  {name: 'orencia', sizePrices: ['250/1046.25']}, // abatacept NOTE: DONE
  {name: 'kadcyla', sizePrices: ['100/2943.75', '160/4710.00']}, // ado-trastuzumab NOTE: DONE; Acutally 4710.00 for 160mg
  {name: 'recombinate', sizePrices: ['265/283.60', '309/330.68', '505/540.44', '957/1024.15', '1040/1112.98', '1120/1198.59', '1140/1220.00', '1540/1648.06', '1570/1680.17', '1650/1765.78', '2210/2365.08', '2220/2375.78']}, // antihemophilic factor NOTE DONE
  {name: 'vidaza', sizePrices: ['100/154.55']}, // azacitidine NOTE DONE
  {name: 'benlysta', sizePrices: ['120/504.25', '400/1680.77']}, // belimumab NOTE DONE
  {name: 'avastin', sizePrices: ['100/777.50', '400/3110.00']}, //bevazicumab NOTE DONE
  {name: 'velcade', sizePrices: ['3.5/1603.00']}, // bortezomib NOTE DONE

  {name: 'blenoxane', sizePrices: ['30/64.03']}, // bleomycin NOTE DONE
  {name: 'bleocin', sizePrices: ['30/64.03']}, // bleomycin NOTE DONE I was advised to use the same prices as blenoxane

  {name: 'kyprolis', sizePrices: ['30/1074.38', '60/2148.75']}, // carfilzomib NOTE DONE
  {name: 'erbitux', sizePrices: ['100/606.52', '200/1213.04']}, // cetuximab NOTE DONE
  {name: 'cytoxan', sizePrices: ['500/209.26', '1000/418.52', '2000/837.94']}, // cyclophosphamide NOTE: DONE; coverted to mg for gram vials
  {name: 'cytarabine', sizePrices: ['100/23.35', '2000/14.92']}, // only generic NOTE: DONE "20,000" is actually 2000
  {name: 'dtic', sizePrices: ['200/8.82']}, // dacarbazine NOTE DONE
  {name: 'taxotere', sizePrices: ['20/24.25', '80/97.00', '160/202.83']}, // doclatexel NOTE DONE
  {name: 'adriamycin', sizePrices: ['10/6.45', '20/12.91', '50/14.95']}, // doxorubicin NOTE DONE
  {name: 'doxil', sizePrices: ['20/646.05', '50/1612.63']},// doxorubicin liposomal NOTE DONE
  {name: 'soliris', sizePrices: ['300/6523.00']}, // eculizumab NOTE DONE
  {name: 'halaven', sizePrices: ['1/1088.00']}, // eribulin NOTE DONE
  {name: 'ferric sodium gluconate', sizePrices: ['62.5/31.80']}, // ferric sodium gluconate complex  NOTE DONE; changes name to generic since brand not detected
  {name: 'feraheme', sizePrices: ['510/734.40']}, // ferumoxytol NOTE DONE
  {name: 'fluororacil', sizePrices: ['500/1.99', '2500/7.79']}, // no brand NOTE DONE
  {name: 'gemzar', sizePrices: ['200/41.54', '1000/45.92', '2000/39.20']}, // gemcitabine NOTE DONE
  {name: 'remicade', sizePrices: ['100/1167.24']}, // inflixumab NOTE DONE
  {name: 'camptosar', sizePrices: ['40/6.86', '100/12.21', '300/74.25']}, // irinotecan NOTE DONE
  {name: 'leucovorin', sizePrices: ['50/5.32', '100/11.00', '200/16.03', '350/15.97', '500/56.84']}, // no brand NOTE DONE
  {name: 'methotrexate (pf)', sizePrices: ['50/2.28', '250/5.47', '1000/27.32']}, // not brand NOTE DONE, but may need to refactor in case not found
  // ALSO NOTE: (pf) means preservative-free --- only target the ones that have preservative free next to it
  {name: 'mutamycin', sizePrices: ['5/209.00', '20/544.00', '40/1087.75']}, // Mitomycin NOTE DONE; 10mg Does not actually exist for GPO
  {name: 'opdivo', sizePrices: ['40/1033.33', '100/2583.33']}, // nivolumab NOTE DONE
  {name: 'oxaliplatin', sizePrices: ['50/16.94', '100/32.74']}, // no brand listed NOTE DONE
  {name: 'abraxane', sizePrices: ['100/1257.23']}, // Paclitaxel- protein bound NOTE DONE
  {name: 'alimta', sizePrices: ['100/666.52', '500/3332.60']}, // pemetrexed NOTE DONE
  {name: 'vectibix', sizePrices: ['100/1153.97', '400/4731.29']}, // panitumumab NOTE DONE
  {name: 'oncaspar', sizePrices: ['3750/14544.54']}, // pegaspargase NOTE DONE
  {name: 'fotolyn', sizePrices: ['20/5047.97', '40/10095.94']}, // pralatrexate NOTE DONE
  {name: 'cyramza', sizePrices: ['100/1109.70', '500/5548.50']}, // ramucirumab NOTE DONE
  {name: 'rituxan', sizePrices: ['100/903.38', '500/4516.90']}, // rituximab NOTE DONE
  {name: 'actemra', sizePrices: ['80/416.80', '200/1057.63', '400/2084']}, //tocilizumab NOTE DONE
  {name: 'hycamtin', sizePrices: ['4/39.20']}, // topotecan NOTE DONE
  {name: 'herceptin', sizePrices: ['150/1513.03']}, // trastuzumab NOTE DONE
  {name: 'vincasar', sizePrices: ['1/5.38', '2/10.00']}, //vincristine NOTE DONE
  {name: 'navelbine', sizePrices: ['10/9.80', '50/37.24']}, // vinorelbine NOTE DONE
  {name: 'zometa', sizePrices: ['4/43.89', '5/111.60']} // zolendric acid NOTE DONE

  /*
    these are te prices from the email
  */
]
