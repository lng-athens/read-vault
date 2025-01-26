const express = require('express');
const cors = require('cors');
const useragent = require('express-useragent');
const app = express();
const { connectDB } = require('./configs/database');
const errorHandler = require('./middlewares/ErrorHandler');
const config = require('./configs/config');