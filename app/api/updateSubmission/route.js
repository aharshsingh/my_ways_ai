import { NextResponse } from "next/server";
import Submission from "@/lib/models/submission";
import Test from '@/lib/models/Test';
import User from '@/lib/models/User';
import { connectToDatabase } from "@/lib/mongodb";

export async function PATCH(req){
    try {        
        await connectToDatabase();

        const {submissionId, completedAt, testId, userId} = await req.json();
        if(!submissionId || !completedAt){
            return NextResponse.json({"error": "bad request"}, {status: 400});
        }

        const response = await Submission.findOneAndUpdate(    
            { submissionId },  
            { completedAt },  
            { new: true });

        const user = await User.findById(userId);
        if(!user){
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const attemptIndex = user.attemptedTest.findIndex(test => test.testId && test.testId.toString() === testId);
        if(attemptIndex !== -1){
            user.attemptedTest[attemptIndex].noOfAttempt++;
        } else{
            user.attemptedTest.push({
                testId,
                noOfAttempt: 1,
                bestScore: 0
            });
            await Test.updateOne({ _id: testId }, { $inc: { totalAttempts: 1 } });
        }
        await user.save();
        return NextResponse.json(response, {status: 200});
    } catch (error) {
        return NextResponse.json({"error": "Internal server error"}, {status: 500})
    }
}