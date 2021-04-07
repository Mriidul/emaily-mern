const keys = require('../config/keys');
const passport = require('passport');
const requireLogin = require('../milddleware/requireLogin');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {

    app.post("/api/stripe", requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({

            amount: 500,
            currency: "inr",
            description: "$5 for 5 credit",
            source: req.body.id,
        })
        console.log(charge);
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    })

};