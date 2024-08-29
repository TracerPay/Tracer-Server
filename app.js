// import modules
import express from 'express';
import { db } from './lib/database.lib.js';
import reportR from './routes/reports.route.js';
import authR from './routes/auth.route.js';
import { isAdmin } from './middleware/admin.middleware.js';
import cors from 'cors';

// setupe express
const app = express();
const port = 3000;

// setup middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

// serve static files
app.use(express.static('public'));

//set up routes
app.use('/api/v1/reports', isAdmin, reportR);
app.use('/api/v1/auth', authR);

// setup db
const config = {
  url: process.env['MONGO_URL'],
  database: 'Tracer',
  minPoolSize: 3,
  maxPoolSize: 10,
};

db.init(config);

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})