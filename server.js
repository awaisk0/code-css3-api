import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';

import handleSignin from './controllers/signin.js';
import handleRegister from './controllers/register.js';
import handleProfileGet from './controllers/profile.js';
import handleLesson from './controllers/lesson.js';
import handleQuiz from './controllers/quiz.js';

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();

// Configuring CORS
const whitelist = ['http://code-css3.herokuapp.com', 'https://code-css3.herokuapp.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

app.use(cors(corsOptions));
app.use(express.json());

// Endpoints
app.post('/signin', (req, res) => handleSignin(req, res, db, bcrypt) );
app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt) );
app.get('/profile/:id', (req, res) => handleProfileGet(req, res, db) );
app.put('/lesson', (req, res) => handleLesson(req, res, db) );
app.put('/quiz', (req, res) => handleQuiz(req, res, db) );

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});