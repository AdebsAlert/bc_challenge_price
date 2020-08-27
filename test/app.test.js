'use strict'

require('dotenv').config();

const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest')
const app = require('../main')

describe('GraphQL', () => {
  // Tests for type buy
  it('Returns price for type buy', done => {
    supertest(app)
      .post('/graphql')
      .send({
        query:
          '{calculatePrice(type: "buy", margin: 0.5, exchangeRate: "USD") { price currency type } }'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.data.calculatePrice).to.have.property('type');
        expect(res.body.data.calculatePrice).to.have.property('price');
        expect(res.body.data.calculatePrice).to.have.property('currency');
        done();
      });
  });

  // Tests for type sell
  it('Returns price for type sell', done => {
    supertest(app)
      .post('/graphql')
      .send({
        query:
          '{calculatePrice(type: "sell", margin: 0.5, exchangeRate: "NGN") { price currency type } }'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.data.calculatePrice).to.have.property('type');
        expect(res.body.data.calculatePrice).to.have.property('price');
        expect(res.body.data.calculatePrice).to.have.property('currency');
        done();
      });
  });
});
