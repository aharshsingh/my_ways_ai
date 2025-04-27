import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    attemptedTest: [{
        testId: {type: mongoose.Schema.Types.ObjectId, ref: "Test" },
        noOfAttempt: {type: Number, default: 1},
        bestScore: {type: Number}
    }],
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Submission" }],
    results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
    isSuspended: { type: Boolean, default: false}
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema, "users");
export default User;