const express = require('express');
const path = require('path');
const passport = require('passport');
const dotenv = require('dotenv');
const compression = require('compression');
const helmet = require('helmet');
const mongo = require('./mongo');
const index = require('./routers/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

dotenv.config('./.env');
const port = process.env.PORT;

mongo();

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(port, () => console.log('Ejecutandose en el puerto ' + port))