import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
    testName: { type: String, unique: true, required: true },
    testDescription: { type: String, required: true },
    difficulty: { type: String, required: true },
    numOfQuestion: { type: Number, required: true },
    duration: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    completeness: { type: Number, required: true },
    explanation: { type: Number, required: true },
    practicalRelevance: { type: Number, required: true },
    conciseness: { type: Number, required: true },
    score: { type: Number, required: true },
    keyWord: [{type: String}],
    isPublished: { type: Boolean, required: true, default: false },
    totalAttempts: { type: Number, default: 0 }
}, { timestamps: true });

const Test = mongoose.models.Test || mongoose.model("Test", TestSchema, "tests");
export default Test;