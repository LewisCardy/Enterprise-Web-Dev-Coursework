require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.log("connected to database"));

const quotesRouter = require('./routes/quotes')
app.use('/quotes', quotesRouter)

app.listen(5000, () => {
    console.log("Server started on port 5000")
})