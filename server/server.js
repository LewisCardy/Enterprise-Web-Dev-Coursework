const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/api", (req, res) => {

})

app.listen(5000, () => {
    console.log("Server started on port 5000")
})