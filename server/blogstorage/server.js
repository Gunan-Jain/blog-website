
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Ensure mongoose is imported
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://gj809:gj809@employee.9cihn.mongodb.net/")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Connection error:', err));

// Schema and Model
const paragraphSchema = new mongoose.Schema({
  content: { type: String, required: true },
});

const Paragraph = mongoose.model('Paragraph', paragraphSchema);

app.post('/blogs', async (req, res) => {
  const { content } = req.body;
  const newParagraph = new Paragraph({ content });
  try {
    const savedParagraph = await newParagraph.save();
    res.status(201).json(savedParagraph);
  } catch (err) {
    res.status(500).json({ message: 'Error storing paragraph' });
  }
});


// API Route to fetch all paragraphs
app.get('/blogs', async (req, res) => {
  try {
    const paragraphs = await Paragraph.find();
    res.status(200).json(paragraphs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching paragraphs' });
  }
});

<<<<<<< HEAD
app.listen(4000, () => {
  console.log("Server is running on port 3001");
=======
app.listen(3008 , () => {
  console.log("Server is running on port 3008");
>>>>>>> 6f906cff4896b40908c2ce91a45f297262f44ff9
});
