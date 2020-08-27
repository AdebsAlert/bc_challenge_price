'use strict'

const unirest = require('unirest');

// Get Price Function
const getPrice = async args => {
  var type = args.type.toLowerCase(),
    margin = args.margin,
    exchangeRate = args.exchangeRate.toLowerCase(),
    newPrice;

  if (type !== 'sell' && type !== 'buy') {
    throw 'invalid type sent (type can only be buy or sell)'
  } else {
    return new Promise((resolve, reject) => {
      unirest
        .get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
        .headers({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
        .end(async resp => {
          if (resp && resp.error) {
            return reject('please enter a valid type (buy/sell)');
          } else {
            payload = JSON.parse(resp.body)['bpi']['USD'];
            if (type === 'sell') {
              newPrice = payload.rate_float - margin * payload.rate_float;
            } else if (type === 'buy') {
              newPrice = payload.rate_float + margin * payload.rate_float;
            }
            return resolve({
              price: newPrice,
              currency: 'NGN',
              type
            });
          }
        });
    });
  }
};

module.exports = {
  getPrice
};
