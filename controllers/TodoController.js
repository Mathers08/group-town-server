import TodoModel from '../models/Todo.js';

export const getAll = async (req, res) => {
  try {
    const todos = await TodoModel.find().populate('user').exec();
    res.json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить список дел!'
    });
  }
};
/*export const getOne = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        message: 'Не удалось найти задачу!'
      });
    }
    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось вернуть задачу!'
    });
  }
};*/
export const create = async (req, res) => {
  try {
    const doc = new TodoModel({
      title: req.body.title,
      content: req.body.content,
      isCompleted: req.body.isCompleted,
      user: req.userId,
    });

    const todo = await doc.save();
    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось добавить задачу!'
    });
  }
};
export const update = async (req, res) => {
  try {
    const todoId = req.params.id;

    await TodoModel.updateOne(
      {
        _id: todoId
      },
      {
        title: req.body.title,
        content: req.body.content,
        isCompleted: req.body.isCompleted,
        user: req.userId,
      }
    );
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить задачу!'
    });
  }
};
export const remove = async (req, res) => {
  try {
    const todoId = req.params.id;

    TodoModel.findOneAndDelete(
      {
        _id: todoId
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить задачу!'
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Задача не найдена!'
          });
        }
        res.json({ success: true });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить задачу!'
    });
  }
};
