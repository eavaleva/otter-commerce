require('dotenv').config();
const validateEnv = require('./utils/validateEnv');
const express = require('express');

// Validate environment variables before starting the app
validateEnv();

const app = express();
app.get('/', (_req, _res) => _res.status(200).send({ message: 'Hello World bla bla bla' }));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    console.log("Server running - make a change to test nodemon");
});

