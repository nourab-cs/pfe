const mongoose = require('mongoose');

// Define the schema for the question
const questionSchema = new mongoose.Schema({
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
    }
    
});

// Define the schema for the quiz
const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set to current date and time when a new quiz is created
    },
    questions: [questionSchema] // Array of embedded documents
});

// Create a model based on the schema
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
