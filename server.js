const express = require('express');
const app = express();

const logger = require('./logger/logger');
// const authRouter = require('./routes/auth-router');
const connectMongo = require('./db-connect');
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.json())

app.use('/', (req, res, next) => {
    logger.logInfo(req.url, Date.now());
    next();
});

app.use('/', (req, res, next) => {
    console.log('hi');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    next();
});

// app.use('/auth', authRouter);



app.use((err, req, res, next) => {
    if (err) {
        logger.logInfo(err); 
        res.status(err.sts).json({sts: -1, error: err});
    
    }

    next();
});

app.use((req, res, next) => { 
    res.status(404).json({sts: -1, error: 'Invalid URL or request method'});
});

connectMongo().then (() => {
    logger.logInfo(`Database Connected`); 
    app.listen(process.env.PORT || 3000, () => {
        logger.logInfo(`Server is listening in port ${process.env.PORT}`);
    });
}).catch((error) => {
    logger.logInfo('Database connection failed', error);
})
