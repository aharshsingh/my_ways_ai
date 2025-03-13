import { NextResponse } from "next/server";
import Submission from "@/lib/models/submission";
import { connectToDatabase } from "@/lib/mongodb";

export async function PATCH(req){
    try {        
        await connectToDatabase();
        const {submissionId, completedAt} = await req.json();
        if(!submissionId || !completedAt){
            return NextResponse({"error": "bad request"}, {status: 400});
        }
        const response = await Submission.findOneAndUpdate(    
            { submissionId },  
            { completedAt },  
            { new: true });
        return NextResponse(response, {status: 200});
    } catch (error) {
        return NextResponse({"error": "Internal server error"}, {status: 500})
    }
}