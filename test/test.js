const { assert } = require('chai');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');

describe('root', () => {
  describe('GET', () => {
    describe('/enveloples', () => {
      it('returns an array', async () => {
        const response = await request(app)
            .get('/envelopes');
  
          assert.isArray(response.body, 'That\'s an array');
      })
    })
    describe('/envelopes/:envelopeId', () => {
      it('throws an error for an invalid id', async () => {
        return await request(app)
          .get('/envelopes/450')
          .expect(404);
      })
      it('returns a single envelope', async () => {
        return await request(app)
          .get('/envelopes/1')
          .expect(200)
          .then(response => {
            const envelope = response.body;
            assert.equal(envelope.id, 1);
          });
      })
    })
  })
  describe('POST', () => {
    describe('/envelopes', () => {
      it('throws an error when there is no category', async () => {
        const response = await request(app)
          .post('/envelopes');

        assert.equal(response.status, 500);
      })
      it('returns the category and budget envelope', async () => {
        const category = 'subscriptions';
        const budget = 250;
  
        const response = await request(app)
          .post('/envelopes')
          .query({ category, budget });
  
        assert.equal(response.status, 201);
        assert.equal(response.body.category, 'subscriptions');
        assert.equal(response.body.budget, 250);
      })
      describe('/transfer/:from/:to/:amount', () => {
        it('throws an error if from id does not exist', async () => {
          return await request(app) 
            .post('/envelopes/transfer/20/1/100')
            .expect(404);
        })
        it('throws an error if to id does not exist', async () => {
          return await request(app)
            .post('/envelopes/transfer/1/20/100')
            .expect(404);
        })
        it('throws an error if amount is less than 0', async () => {
          return await request(app)
            .post('/envelopes/transfer/1/3/-100')      
            .expect(500);
        })
        it('throws an error if amount is superior to budget', async () => {
          return await request(app)
            .post('/envelopes/transfer/3/1/500')
            .expect(400);
        })
        it('returns an array with budgets updated', async () => {
          const expectedArray = [{id: 1, category: 'health', budget: 200}, {id: 2, category: 'gifts', budget: 200}, {id: 3, category: 'subscriptions', budget: 350}];
  
          return await request(app)
            .post('/envelopes/transfer/1/3/100')      
            .expect(201)
            .then(response => {
              const actualArray = response.body;
              expect(actualArray).to.eql(expectedArray);
            });
        })
      })
    })
  })
  describe('PUT', () => {
    describe('/envelopes/:envelopId', () => {
      describe('/envelopes/:envelopeId', () => {
        it('throws an error if id does not exist', async () => {
          return await request(app)
            .put('/envelopes/10?budget=400')
            .expect(404);
        })
        it('throws an error if new budget is not a number', async () => {
          return await request(app)
            .put('/envelopes/1?budget=car')
            .expect(500);
        })
        it('returns a new envelope with updated budget', async () => {
          return await request(app)
            .put('/envelopes/1?budget=500')
            .expect(201)
            .then(response => {
              const envelope = response.body;
              assert.equal(envelope.budget, 500);
            });
        })
      })
    })
  })
  describe('DELETE', () => {
    it('throws an error for unknown id', async () => {
      return await request(app)
        .delete('/envelopes/10')
        .expect(404);
    })
    it('returns the updated array after deletion', async () => {
      const expectedArray = [{id: 1, category: 'health', budget: 500}, {id: 3, category: 'subscriptions', budget: 350}];

      return await request(app)
        .delete('/envelopes/2')
        .expect(201)
        .then(response => {
          const actualArray = response.body;
          expect(actualArray).to.eql(expectedArray);
        })
    })
  })
})