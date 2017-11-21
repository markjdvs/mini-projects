const pKey = process.env.STRIPE_TEST_PUBLISHABLE_KEY;
const sKey = process.env.STRIPE_TEST_SECRET_KEY;

const express = require('express');
const stripe = require('stripe')(sKey);
const pug = require('pug');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('index', { pKey });
});

app.post('/charge', (req, res) => {
  const amount = 999;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: 'Sample Charge',
      currency: 'usd',
      customer: customer.id
    }))
  .then(charge => {
    res.render('charge.pug');
  });
});

app.listen(7890, () => {
  console.log(`stripe is running`);
});
