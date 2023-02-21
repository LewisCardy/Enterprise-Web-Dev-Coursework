const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js')
const cors = require('cors')


const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler)

app.listen(5000, () => {
    console.log("Server started on port 5000")
})