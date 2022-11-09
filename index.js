import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, NewsController, TodoController } from './controllers/index.js';
import { loginValidation, registerValidation } from './validations.js';

mongoose
  .connect('mongodb+srv://admin:mathers8888@cluster0.z9zmdwc.mongodb.net/group-town?retryWrites=true&w=majority')
  .then(() => console.log('DB ok!'))
  .catch((err) => console.log('DB error!', err));

const app = express();

app.use(express.json());
app.use(cors());

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server ok');
});

app.get('/auth/me', checkAuth, UserController.getMe);
app.get('/auth/getAll', checkAuth, UserController.getAll);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.get('/news', NewsController.getAll);
app.get('/news/:id', NewsController.getOne);
app.post('/news', checkAuth, handleValidationErrors, NewsController.create);
app.patch('/news/:id', checkAuth, handleValidationErrors, NewsController.update);
app.delete('/news/:id', checkAuth, NewsController.remove);

app.get('/todos', TodoController.getAll);
app.post('/todos', checkAuth, handleValidationErrors, TodoController.create);
app.patch('/todos/:id', checkAuth, handleValidationErrors, TodoController.update);
app.delete('/todos/:id', checkAuth, TodoController.remove);

