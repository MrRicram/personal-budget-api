const envelopesRouter = require("../server/envelopes");

const envelopesArray = [];
let envelopeId = 1;

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
        envelope.budget = Number(query.budget);

        return envelope;
    }
    else {
        throw new Error('New budget must be a number');
    }
   
}
    

module.exports = {
    getAllEnvelopes,
    isValidEnvelope,
    addEnvelope,
    getEvenlopeById,
    updateBudget
}