import NewsModel from '../models/News.js';

export const getAll = async (req, res) => {
  try {
    const news = await NewsModel.find().populate('user').exec();
    res.json(news);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить новости!'
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const newsId = req.params.id;

    NewsModel.findOneAndUpdate(
      {
        _id: newsId
      },
      {
        $inc: { viewsCount: 1 }
      },
      {
        returnDocument: 'after'
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось вернуть новость!'
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Новость не найдена!'
          });
        }
        res.json(doc);
      }
    ).populate('user');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось вернуть новость!'
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new NewsModel({
      title: req.body.title,
      content: req.body.content,
      importance: req.body.importance,
      user: req.userId,
    });

    const news = await doc.save();
    res.json(news);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось добавить новость!'
    });
  }
};
export const update = async (req, res) => {
  try {
    const newsId = req.params.id;

    await NewsModel.updateOne(
      {
        _id: newsId
      },
      {
        title: req.body.title,
        content: req.body.content,
        importance: req.body.importance,
        user: req.userId,
      }
    );
    res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить новость!'
    });
  }
};
export const remove = async (req, res) => {
  try {
    const newsId = req.params.id;

    NewsModel.findOneAndDelete(
      {
        _id: newsId
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить новость!'
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: 'Новость не найдена!'
          });
        }
        res.json({ success: true });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить новость!'
    });
  }
};
