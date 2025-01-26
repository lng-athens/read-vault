const express = require('express');
const cors = require('cors');
const useragent = require('express-useragent');
const app = express();
const { connectDB } = require('./configs/database');
const errorHandler = require('./middlewares/ErrorHandler');
const config = require('./configs/config');

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://localhost:5173'
    ],
    methods: 'GET,POST,DELETE,PUT,PATCH',
    allowedHeaders: 'Content-Type,Accept,Authorization,x-requested-with',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.set('trust proxy', true);

app.use('/users', require('./routes/userRoutes'));
app.use('/books', require('./routes/bookRoutes'));

app.use(errorHandler);

const startServer = async () => {
    await connectDB();

    app.listen(config.port, () => console.log(`Server running in ${config.env} mode at port ${config.port}`));
};

startServer();