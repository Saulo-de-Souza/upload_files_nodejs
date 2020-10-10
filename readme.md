# Upload Files in NodeJs

> Simples exemplo de como fazer upload de arquivo do front-end para o backend usando node js.

> Dependências:

- Express
- Multer
- Ejs
- Morgan
- Nodemon
- Dotenv

`$ npm install express multer ejs morgan dotenv --save `

`$ npm install nodemon --save-dev `

### Servidor:

```js
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
```

### Rota:

```js
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
```

### Multer config:

```js
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = hash.toString('hex') + '-' + file.originalname;
        cb(null, fileName);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif', 'image/jpg', 'video/avi'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido'));
    }
  },
};
```

### Variável de ambiente:

```js
PORT=3000
```

### Executar:

`$ npx nodemon src/server.js`