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
  
          console.log(assert.body);
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
        await request(app)
          .post('/envelopes?category=health&budget=300');

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
      it('returns the name and budget request', async () => {
        const category = 'health';
        const budget = 300;
  
        const response = await request(app)
          .post('/envelopes')
          .query({ category, budget });
  
        assert.equal(response.status, 201);
        assert.equal(response.body.category, 'health');
        assert.equal(response.body.budget, 300);
      })
    })
  })
  describe('PUT', () => {
    describe('/envelopes/:envelopId', () => {
      describe('/envelopes/:envelopeId', () => {
        it('throws an error if new budget is not a number', async () => {
          await request(app)
            .post('/envelopes?category=health&budget=300');
  
          return request(app)
            .put('/envelopes/1?budget=car')
            .expect(500);
        })
        it('returns a new envelope with updated budget', async () => {
          await request(app)
            .post('/envelopes?category=health&budget=300');
  
          return request(app)
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
})