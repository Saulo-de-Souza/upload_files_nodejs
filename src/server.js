require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');

app.use(require('./routers.js'));
app.set('views', path.resolve(__dirname, '..', 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log('Ouvindo a porta: ' + process.env.PORT);
});

