import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Submission from "@/lib/models/submission";

export async function GET(req,{params}){
    await connectToDatabase;
    let userResult;
    const {testId} = params;
    if(!testId){
        return NextResponse.json({error: 'testId not found'}, {status: 404});
    }
    const results = await Submission.find({testId});
    
}