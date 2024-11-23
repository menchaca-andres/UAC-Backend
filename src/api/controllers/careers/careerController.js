const CareerModel = require('../../models/careers/careerModel.js');

const CareerController = {
    getAllCareers: async (req, res) => {
        try {
            const career = await CareerModel.getAll();
            res.json(career);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCareerById: async (req, res) => {
        try {
            const career = await CareerModel.getById(req.params.id);
            if (!career) return res.status(404).json({ error: 'Career not found' });
            res.json(career);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createCareer: async (req, res) => {
        try {
            const { name_career, description_career, duration_career, study_area, graduation_modality} = req.body;
            const image_career = req.file ? `uploads/careers${req.file.filename}` : null;

            if (!name_career || !image_career || !description_career || !duration_career || !study_area || !graduation_modality) {
                return res.status(400).json({ error: 'All fields are required: name_career, image_career, description_career, duration_career, study_area, graduation_modality' });
            }

            const newCareer = await CareerModel.create({ name_career, image_career, description_career, duration_career, study_area, graduation_modality })

            return res.status(200).json({ ok: true, msg: "Career added", career: newCareer })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateCareer: async (req, res) => {
        try {
            const { name_career, description_career, duration_career, study_area, graduation_modality } = req.body;
            const image_career = req.file ? `uploads/careers${req.file.filename}` : req.body.image_news;

            if (!name_career || !image_career || !description_career || !duration_career || !study_area || !graduation_modality) {
                return res.status(400).json({ error: 'All fields are required: name_career, image_career, description_career, duration_career, study_area, graduation_modality' });
            }

            const updatedCareer = await CareerModel.update(req.params.id, { name_career, image_career, description_career, duration_career, study_area, graduation_modality });
            if (!updatedCareer) return res.status(404).json({ error: 'Career not found' });

            res.json({ok: true, msg: "Career updated", career: updatedCareer});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteCareer: async (req, res) => {
        try {
            const deletedCareer = await CareerModel.delete(req.params.id);
            if (!deletedCareer) return res.status(404).json({ error: 'Career not found' });
            res.json(deletedCareer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = CareerController;
