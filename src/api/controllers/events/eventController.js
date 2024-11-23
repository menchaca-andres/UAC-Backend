const EventModel = require('../../models/events/eventModel.js');

const EventController = {
    getAllEvents: async (req, res) => {
        try {
            const event = await EventModel.getAll();
            res.json(event);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getEventById: async (req, res) => {
        try {
            const event = await EventModel.getById(req.params.id);
            if (!event) return res.status(404).json({ error: 'Event not found' });
            res.json(event);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createEvent: async (req, res) => {
        try {
            const { title_event, date_start, date_end, description_event } = req.body;

            if (!title_event || !date_start || !date_end || !description_event) {
                return res.status(400).json({ error: 'All fields are required: title_event, date_start, date_end, description_event' });
            }

            const newEvent = await EventModel.create({ title_event, date_start, date_end, description_event })

            return res.status(200).json({ ok: true, msg: "Event added", event: newEvent })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateEvent: async (req, res) => {
        try {
            const { title_event, date_start, date_end, description_event } = req.body;

            if (!title_event || !date_start || !date_end || !description_event) {
                return res.status(400).json({ error: 'All fields are required: title_event, date_start, date_end, description_event' });
            }

            const updatedEvent = await EventModel.update(req.params.id, { title_event, date_start, date_end, description_event });
            if (!updatedEvent) return res.status(404).json({ error: 'Event not found' });

            res.json({ok: true, msg: "Event updated", event: updatedEvent});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const deletedEvent = await EventModel.delete(req.params.id);
            if (!deletedEvent) return res.status(404).json({ error: 'Event not found' });
            res.json(deletedEvent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = EventController;