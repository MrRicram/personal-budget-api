const express = require('express');
const envelopesRouter = express.Router();

module.exports = envelopesRouter;

const {
    getAllEnvelopes,
    isValidEnvelope,
    addEnvelope,
    getEvenlopeById,
    updateBudget,
    deleteEnvelopeById,
    transfer
} = require('../contolers/db-control-v1');

envelopesRouter.param('envelopeId', (req, res, next, id) => {
    const envelope = getEvenlopeById(id);

    if (!envelope) {
        res.status(404).send();
    }
    else {
        req.envelope = envelope;
        next();
    }
})

envelopesRouter.get('/', (req, res, next) => {
    return res.send(getAllEnvelopes());
})

envelopesRouter.get('/:envelopeId', (req, res, next) => {
    res.send(req.envelope)
})

envelopesRouter.post('/', (req, res, next) => {
    const envelope = req.query;
    const newEnvelope = addEnvelope(envelope);
    
    res.status(201).send(newEnvelope);
})

envelopesRouter.put('/:envelopeId', (req, res, next) => {
    const newEnvelope = updateBudget(req.envelope, req.query);

    res.status(201).send(newEnvelope);
})

envelopesRouter.delete('/:envelopeId', (req, res, next) => {
    const updatedEnvelopes = deleteEnvelopeById(req.envelope);

    if (updatedEnvelopes === null) {
        res.status(404).send();
    } 
    else {
        res.status(201).send(updatedEnvelopes);
    }
})

envelopesRouter.post('/transfer/:from/:to/:amount', (req, res, next) => {
    if (Number(req.params.amount) < 0) {
        res.status(500).send();
    }
    else {
        const updatedEnvelopes = transfer(req.params);
        if (updatedEnvelopes === null) {
            res.status(404).send();
        } 
        else if (updatedEnvelopes === req.params) {
            res.status(400).send();
        }
        else {
            res.status(201).send(updatedEnvelopes);
        }
    
    }
})