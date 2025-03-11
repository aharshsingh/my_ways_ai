import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
    questionText: { type: String, required: true } 
}, { timestamps: true }); 

export default mongoose.model("Question", QuestionSchema, "questions");
