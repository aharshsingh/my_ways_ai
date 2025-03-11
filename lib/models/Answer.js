import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    submissionId: { type: mongoose.Schema.Types.ObjectId, ref: "Submission" }, 
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" }, 
    answer: { type: String, required: true } 
}, { timestamps: true }); 

export default mongoose.model("Answer", AnswerSchema, "answers");
