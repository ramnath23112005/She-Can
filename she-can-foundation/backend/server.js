const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', contactRoutes);
app.use('/api', newsletterRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'She Can Foundation API is running' });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
