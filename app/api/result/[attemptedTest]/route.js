import { NextResponse } from "next/server";
import Submission from "@/lib/models/submission";
import Result from "@/lib/models/Result";
import Test from "@/lib/models/Test";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req, {params}){
    try {        
        await connectToDatabase();
        const { testId } = params;
        let result;
        const submisssionInfo = await Submission.findOne({testId});
        if(!submisssionInfo){
            return NextResponse({"error": "Submission not found"}, {status: 404});
        }
        const resultInfo = await Result.find({testId}).select(" resultId accuracy completeness explanation practicalRelevance conciseness score");
        const testInfo = await Test.findOne({testId}).select("testName accuracy completeness explanation practicalRelevance conciseness score");
        result = {testId, 
                startedAt: submisssionInfo.startedAt, 
                completedAt: submisssionInfo.completedAt,
                resultInfo,
                testName: testInfo.testName,
                maxAccuracy: testInfo.accuracy,
                maxCompleteness: testInfo.completeness,
                maxExplanation: testInfo.explanation,
                maxPracticalRelevance: testInfo.practicalRelevance,
                maxConciseness: testInfo.conciseness,
                maxScore: testInfo.score
            }
        return NextResponse(result, {status: 200});    
    } catch (error) {
        return NextResponse({"error": "Internal Server error"}, {status: 500})
    }
}