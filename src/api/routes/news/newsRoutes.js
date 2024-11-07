const express = require('express');
const NewsController = require('../../controllers/news/newsController.js');

const router = express.Router();

// Route definitions
router.get('/', NewsController.getAllNews);
router.get('/:id', NewsController.getNewsById);
router.post('/', NewsController.createNews);
router.put('/:id', NewsController.updateNews);
router.delete('/:id', NewsController.deleteNews);

module.exports = router;
