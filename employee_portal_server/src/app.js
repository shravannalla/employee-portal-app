const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const { INTERNAL_SERVER_ERROR } = require('./utils/constants');
const cookieParser = require('cookie-parser');

const app = express();

// To parse JSON Bodies
app.use(express.json());
// Cookie Parser for auth
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // frontend url
    credentials: true,
}));


// To disable dotenv logs
dotenv.config({ quiet: true });

const PORT = process.env.SERVER_PORT;

app.use('/auth', authRoutes);
app.use('/employee', employeeRoutes);

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        message: 'Route Not found!'
    });
});

// Handle 500 case
app.use((err, req, res, next) => {
    if (err) {
        console.log(err?.stack);
        res.status(err?.status || 500).json({
            message: err.message || INTERNAL_SERVER_ERROR
        });
    }
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }).catch((err) => {
        console.error(err);
    });
