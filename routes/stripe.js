const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = router;
