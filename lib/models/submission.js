import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  
    answerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }], 
    startedAt: { type: Date }, 
    completedAt: { type: Date },
    checked: {type: Boolean, default: false}
}, { timestamps: true });

const Submission = mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema, "submissions");
export default Submission;