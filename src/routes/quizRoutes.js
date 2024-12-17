const express = require('express');
const { createQuiz, submitQuiz } = require('../controllers/quizController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, createQuiz);
router.post('/submit', authenticate, submitQuiz);

module.exports = router;
