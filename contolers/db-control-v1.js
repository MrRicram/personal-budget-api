const { request } = require("express");
const envelopesRouter = require("../server/envelopes");

const envelopesArray = [
    {
        id: 1,
        category: 'health',
        budget: 300
    },
    {
        id: 2,
        category: 'gifts',
        budget: 200
    }
];
let envelopeId = 3;

const getAllEnvelopes = () => {
    return envelopesArray;
}

const isValidEnvelope = envelope => {
    if (!envelope.category || typeof envelope.category !== 'string') {
        throw new Error('Envelope category must be a string');
    }

    if (!isNaN(parseFloat(envelope.budget)) && isFinite(envelope.budget)) {
        envelope.budget = Number(envelope.budget);
    }
    else {
        throw new Error('Budget must be a number');
    }

    return true;
}

const addEnvelope = envelope => {
    if (isValidEnvelope(envelope)) {
        const newEnvelope = {
            id: envelopeId,
            category: envelope.category,
            budget: envelope.budget
        }

        envelopesArray.push(newEnvelope);
        envelopeId++;
        return newEnvelope;
    }
}

const getEvenlopeById = id => {
    const envelope = envelopesArray.find(env => env.id === Number(id));

    return envelope;
}

const updateBudget = (envelope, query) => {
    if (!isNaN(parseFloat(query.budget)) && isFinite(query.budget)) {
        query.budget = Number(query.budget);
    }
    else {
        throw new Error('New budget must be a number');
    }

    const index = envelopesArray.findIndex(el => el.id === Number(envelope.id));
    if (index !== -1) {
        envelope.budget = query.budget;
        return envelope;
    }
    else {
        return null;
    }   
}

const deleteEnvelopeById = envelope => {
    const index = envelopesArray.findIndex(el => el.id === Number(envelope.id));
    if (index !== -1) { 
        envelopesArray.splice(index, 1);
        return envelopesArray;
    }
    else {
        return null;
    }   
}

const transfer = req => {
    let { from, to, amount } = req;
    const indexFrom = envelopesArray.findIndex(el => el.id === Number(from));
    const indexTo = envelopesArray.findIndex(el => el.id === Number(to));
    amount = Number(amount);

    if (indexFrom === -1 || indexTo === -1) {
        return null;
    }
    else {
        if (amount > envelopesArray[indexFrom].budget) {
            return req;
        }
        else {
            console.log(envelopesArray);
            envelopesArray[indexFrom].budget -= amount;
            envelopesArray[indexTo].budget += amount;
            console.log(envelopesArray);
            return envelopesArray;
        }
    }
}
    

module.exports = {
    getAllEnvelopes,
    isValidEnvelope,
    addEnvelope,
    getEvenlopeById,
    updateBudget,
    deleteEnvelopeById,
    transfer
}