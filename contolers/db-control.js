const envelopesArray = [];
let envolpeId = 1;

const isValidEnvelop = req => {
    if (!req.category || typeof req.category !== 'string') {
        throw new Error('Envelope category must be a string');
    }

    if (!isNaN(pareseFloat(req.budget)) && isFinite(req.budget)) {
        req.budget = Number(req.budget);
    }
    else {
        throw new Error('Budget must be a number');
    }

    return true;
}

const addEnvelope = envelope => {
    if (isValidEnvelop(envelope)) {
        const newEnvelope = {
            id: envelopeId,
            category: envelope.category,
            budget: envelope.budget
        }

        envelopesArray.push(newEnvelope);
        envolpeId++;
        return envelopesArray[envelopesArray.length - 1];
    }
}