const express = require('express');
const multer = require('multer');
const path = require('path');
const OpinionController = require('../../controllers/home/opinionController.js');

const router = express.Router();

// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/opinions'); // Directorio donde se guardarán las imágenes
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
router.get('/', OpinionController.getAllOpinions);
router.get('/:id', OpinionController.getOpinionById);
router.post('/', upload.single('image_person'), OpinionController.createOpinion);
router.put('/:id', upload.single('image_person'), OpinionController.updateOpinion);
router.delete('/:id', OpinionController.deleteOpinion);
 
module.exports = router;
 