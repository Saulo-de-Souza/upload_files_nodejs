const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const path = require('path');
const multerConfig = require('./config/multer.js');
const multer = require('multer');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(morgan('dev'));
router.use(express.static(path.resolve(__dirname, '..', 'public')));

router.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  console.log(req.file);
  
  res.json({ message: 'ok' });
});

router.get('/home', (req, res) => {
  res.render('./home/home.html');
});

router.use('/', (req, res) => {
  res.render('./index.html');
});

module.exports = router;
