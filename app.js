const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const path = require('path');
const User = require('./controllers/User-Controller');
require('dotenv').config();
//importojm routes
const PORT = process.env.PORT;

const fs = require('fs');

const Product = require('./models/Product');
const Reklama = require('./models/Reklamo');
//import and connect to database
const lidhuMeDb = require('./db');
lidhuMeDb();

const userRoutes = require('./routes/users.js');
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const reklamaRoutes = require('./routes/reklamo');
const { kerkohetIdentifikimi, isAdmin } = require('./middleware/auth');
// const { dashboard } = require('./controllers/User-Controller');

// middlewares

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//passport middleware

require('./middleware/passport')(passport);

//session & secret

app.use(
  session({
    secret: process.env.OUR_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

//template engine
//default folder for pug = views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routes

//user routes http://localhost:5000/users/register

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/reklamo', reklamaRoutes);

app.get('/', async (req, res) => {
  const isFeatured = await Product.find({ isFeatured: true });

  console.log(isFeatured);
  res.render('homepage', { isFeatured });
});

//html file

app.get('/html', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('getProds', (req, res) => {
  let payload = req.body.payload.trim();
  console.log(payload);
});

//html file fund

app.get('/mk', (req, res) => {
  // res.send('<h1>translate to MK</h1>');
  // res.render('mk');
});

app.get('/dashboard', (req, res) => {
  res.render('admin');
});

app.get('/adminat', (req, res) => {
  res.render('admin');
});

app.get('/careers', (req, res) => {
  res.render('careers');
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
