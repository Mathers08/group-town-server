import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import { getMe, login, register } from './controllers/UserController.js';

mongoose
  .connect('mongodb+srv://admin:mathers8888@cluster0.z9zmdwc.mongodb.net/group-town?retryWrites=true&w=majority')
  .then(() => console.log('DB ok!'))
  .catch((err) => console.log('DB error!', err));

const app = express();

app.use(express.json());

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server ok');
});

app.get('/auth/me', checkAuth, getMe);
app.post('/auth/login', login);
app.post('/auth/register', registerValidation, register);

