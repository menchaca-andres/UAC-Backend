const express = require('express');
require('dotenv').config();
const bookRoutes = require('./api/routes/library/bookRoutes.js');
const pdfRoute = require('./api/routes/pdf/pdfRoutes');
const opinionRoutes = require('./api/routes/home/opinionRoutes.js');
const newsRoutes = require('./api/routes/news/newsRoutes.js');
const userRoutes = require('./api/routes/user/userRoutes.js');

const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/material_bibliografico', bookRoutes);
app.use('/pdfs', pdfRoute);
app.use('/opinions_home', opinionRoutes);
app.use('/news', newsRoutes);
app.use('/users', userRoutes);

app.use((error, req, res, next) => {
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: error.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});