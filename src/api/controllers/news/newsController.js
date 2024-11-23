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
            const { holder_news, date_news, summary_news } = req.body;
            const image_news = req.file ? `uploads/news${req.file.filename}` : null;

            if (!holder_news || !image_news || !date_news || !summary_news) {
                return res.status(400).json({ error: 'All fields are required: holder_news, image_news, date_news, summary_news' });
            }

            const newNews = await NewsModel.create({holder_news, image_news, date_news, summary_news})

            return res.status(200).json({ ok: true, msg: "News added", newss: newNews })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateNews: async (req, res) => {
        try {
            const { holder_news, date_news, summary_news } = req.body;
            const image_news = req.file ? `uploads/news${req.file.filename}` : req.body.image_news;

            if (!holder_news || !image_news || !date_news || !summary_news) {
                return res.status(400).json({ error: 'All fields are required: holder_news, image_news, date_news, summary_news' });
            }

            const updatedNews = await NewsModel.update(req.params.id, { holder_news, image_news, date_news, summary_news });
            if (!updatedNews) return res.status(404).json({ error: 'News not found' });

            res.json({ok: true, msg: "News updated", newss: updatedNews});
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
