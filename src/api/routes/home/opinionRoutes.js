const express = require('express');
const OpinionController = require('../../controllers/home/opinionController.js');

const router = express.Router();

// Route definitions
router.get('/', OpinionController.getAllOpinions);
router.get('/:id', OpinionController.getOpinionById);
router.post('/', OpinionController.createOpinion);
router.put('/:id', OpinionController.updateOpinion);
router.delete('/:id', OpinionController.deleteOpinion);

module.exports = router;
