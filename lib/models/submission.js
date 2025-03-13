import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
    startedAt: { type: Date }, 
    completedAt: { type: Date } 
}, { timestamps: true });

const Submission = mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema, "submissions");
export default Submission;