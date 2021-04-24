const express = require('express');
const app = express();

module.exports = app;

const apiRouter = require('./server/api');
app.use('/', apiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});

