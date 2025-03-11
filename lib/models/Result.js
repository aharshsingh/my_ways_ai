import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },  
    accuracy: { type: Number, required: true },
    completeness: { type: Number, required: true },
    explanation: { type: Number, required: true },
    practicalRelevance: { type: Number, required: true },
    conciseness: { type: Number, required: true },
    score: { type: Number, required: true }
}, { timestamps: true }); 

export default mongoose.model("Result", ResultSchema, "results");
