const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    grade: String,
    subject: String,
    questions: Array,
    submissions: [
        {
            answers: Array,
            score: Number,
            date: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('Quiz', quizSchema);
