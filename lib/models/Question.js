import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
    questionText: { type: String, required: true } 
}, { timestamps: true }); 

const Question = mongoose.models.Question || mongoose.model("Question", QuestionSchema, "questions");
export default Question;