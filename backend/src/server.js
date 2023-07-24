const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/api', (req, res)=>{
    res.send({
        id: "test"
    });
});

app.listen(PORT, ()=> {
    console.log(`[Server]: I am running at https://localhost:${PORT}`);
});