const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;

const Stripe = require("stripe");
const stripe = Stripe("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");

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

app.post('/api', (req, res) => {
    console.log("Amount : ", parseInt(req.body.amount))
    stripe.paymentIntents.create(
        {
            amount: 50,
            currency: "EUR",
            payment_method_types: ["card"],
            description : "dev test",
        },
        function (err, paymentIntent) {
            if (err) {
                res.status(500).json(err.message);
                console.log("Err : ", err.message)
            } else {
                res.status(201).json(paymentIntent);
            }
        }
    );
})

app.listen(PORT, ()=> {
    console.log(`[Server]: I am running at https://localhost:${PORT}`);
});