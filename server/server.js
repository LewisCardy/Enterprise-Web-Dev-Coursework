require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//const passport = require('passport');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const cookieSecret = process.env.COOKIE_SECRET;
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["POST", "GET", "USE"],
    credentials: true
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser())

app.use(session({
    key: "UserId",
    secret: cookieSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (60 * 60 * 24) * 1000
    },
}));

mongoose.connect("mongodb://localhost/quotesdb");
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('open', () => console.log("connected to database"));

const quotesRouter = require('./routes/quotes');
app.use('/quotes', quotesRouter)

app.listen(5000, () => {
    console.log("Server started on port 5000")
})