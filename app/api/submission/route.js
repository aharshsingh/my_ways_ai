import { NextResponse } from "next/server";
import { submissionSchema } from "@/utlis/validator";
import Submission from "@/lib/models/submission";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req){
    try {        
        await connectToDatabase();
        const {testId, userId, startedAt} = await req.json();
        const {error} = submissionSchema.validate({testId, userId, startedAt});
        if(error){
            return NextResponse.json({"error": "bad request"}, {status: 400});
        }
        const submission = new Submission({
            testId,
            userId,
            startedAt: new Date(startedAt)
        });
        const response = await submission.save();
        return NextResponse.json(response, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({"error": "Internal server error"}, {status: 500})
    }
}