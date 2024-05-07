const mongoose = require('mongoose');

// Define the schema for the question
const quizQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    },
  
});

// Create a Mongoose model based on the schema
const Quiz = mongoose.model('Quiz', quizQuestionSchema);

module.exports = Quiz;