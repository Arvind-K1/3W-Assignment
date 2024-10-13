import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser'

import { config } from 'dotenv';
config();

// import errorMiddleware from './middlewares/error.middleware.js';
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: [process.env.FRONTEND],
    credentials: true
}));

app.use(cookieParser());

// import Routes
app.use('/api/users',userRoutes);

app.use('*',(req, res) => {
    res.status(404).send('OPPS !! 404 page not found');
});

// app.use(errorMiddleware);

export { app }