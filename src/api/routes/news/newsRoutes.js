const express = require('express');
const multer = require('multer');
const path = require('path');
const NewsController = require('../../controllers/news/newsController.js');

const router = express.Router();

// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/news'); // Directorio donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

// Middleware para manejar la subida
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten imágenes (jpeg, jpg, png)'));
    }
});

// Route definitions
router.get('/', NewsController.getAllNews);
router.get('/:id', NewsController.getNewsById);
router.post('/', upload.single('image_news'), NewsController.createNews);
router.put('/:id', upload.single('image_news'), NewsController.updateNews);
router.delete('/:id', NewsController.deleteNews);

module.exports = router;
