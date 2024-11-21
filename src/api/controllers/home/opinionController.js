const OpinionModel = require('../../models/home/opinionModel.js');

const OpinionController = {
    getAllOpinions: async (req, res) => {
        try {
            const opinions = await OpinionModel.getAll();
            res.json(opinions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOpinionById: async (req, res) => {
        try {
            const opinion = await OpinionModel.getById(req.params.id);
            if (!opinion) return res.status(404).json({ error: 'Book not found' });
            res.json(opinion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createOpinion: async (req, res) => {
        try {
            const { image_person, name_person, description_opinion } = req.body;
    
            if (!image_person || !name_person || !description_opinion) {
                return res.status(400).json({ error: 'All fields are required: image_person, name_person, description_opinion' });
            }
    
            const newOpinion = await OpinionModel.create({ image_person, name_person, description_opinion });
    
            return res.status(200).json({ ok: true, msg: "Opinion added", opinion: newOpinion });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },    

    updateOpinion: async (req, res) => {
        try {
            const { image_person, name_person, description_opinion } = req.body;
    
            if (!image_person || !name_person || !description_opinion) {
                return res.status(400).json({ error: 'All fields are required for update: image_person, name_person, description_opinion' });
            }
    
            const updatedOpinion = await OpinionModel.update(req.params.id, { image_person, name_person, description_opinion });
            if (!updatedOpinion) return res.status(404).json({ error: 'Opinion not found' });
    
            res.json({ ok: true, msg: "Opinion updated", opinion: updatedOpinion });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },    

    deleteOpinion: async (req, res) => {
        try {
            const deleteOpinion = await OpinionModel.delete(req.params.id);
            if (!deleteOpinion) return res.status(404).json({ error: 'Book not found' });
            res.json(deleteOpinion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = OpinionController;
