const NewsModel = require('../../models/news/newsModel.js');

const NewsController = {
    getAllNews: async (req, res) => {
        try {
            const news = await NewsModel.getAll();
            res.json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getNewsById: async (req, res) => {
        try {
            const news = await NewsModel.getById(req.params.id);
            if (!news) return res.status(404).json({ error: 'News not found' });
            res.json(news);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createNews: async (req, res) => {
        try {
            const { id_news, holder_news, image_news, date_news, summary_news } = req.body;

            const newNews = await NewsModel.create({id_news, holder_news, image_news, date_news, summary_news})

            return res.status(200).json({ ok: true, msg: "News adding" })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateNews: async (req, res) => {
        try {
            const updatedNews = await NewsModel.update(req.params.id, req.body);
            if (!updatedNews) return res.status(404).json({ error: 'News not found' });
            res.json(updatedNews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteNews: async (req, res) => {
        try {
            const deletedNews = await NewsModel.delete(req.params.id);
            if (!deletedNews) return res.status(404).json({ error: 'Book not found' });
            res.json(deletedNews);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = NewsController;
