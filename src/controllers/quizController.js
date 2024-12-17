const Quiz = require('../models/Quiz');
const axios = require('axios');

const createQuiz = async (req, res) => {
    try {
        const { grade, subject } = req.body;

        // Generate quiz using Groq AI API
        const response = await axios.post('https://api.groq.com/quiz', {
            grade,
            subject,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },
        });

        const quiz = new Quiz({
            grade,
            subject,
            questions: response.data.questions,
        });

        await quiz.save();
        res.status(201).json(quiz);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to generate quiz' });
    }
};

const submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;
        const quiz = await Quiz.findById(quizId);

        const score = calculateScore(quiz.questions, answers);
        quiz.submissions.push({ answers, score });
        await quiz.save();

        res.status(200).json({ score });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit quiz' });
    }
};

const calculateScore = (questions, answers) => {
    let score = 0;
    questions.forEach((q, idx) => {
        if (q.correctAnswer === answers[idx]) score++;
    });
    return score;
};

module.exports = { createQuiz, submitQuiz };
