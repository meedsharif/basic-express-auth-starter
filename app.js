const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
require('dotenv').config();

const MONGODB_URI = process.env.MONGO_URI;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async(req, res) => {
  res.render('index');
});

app.use(authRoutes);


mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  app.listen(3000);
});




