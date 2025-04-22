
// backend_server.js
// Simple Express backend for the quiz app

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'quizzes.json');

// Initialize the quizzes file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Get all quizzes
app.get('/api/quizzes', (req, res) => {
    const quizzes = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(quizzes);
});

// Add a new quiz
app.post('/api/quizzes', (req, res) => {
    const newQuiz = req.body;
    const quizzes = JSON.parse(fs.readFileSync(DATA_FILE));
    quizzes.push(newQuiz);
    fs.writeFileSync(DATA_FILE, JSON.stringify(quizzes, null, 2));
    res.status(201).json({ message: 'Quiz saved successfully!' });
});

// Get a specific quiz by index
app.get('/api/quizzes/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const quizzes = JSON.parse(fs.readFileSync(DATA_FILE));
    if (index >= 0 && index < quizzes.length) {
        res.json(quizzes[index]);
    } else {
        res.status(404).json({ message: 'Quiz not found.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
