import { NextResponse } from "next/server";
import Submission from "@/lib/models/submission";
import Result from "@/lib/models/Result";
import Test from "@/lib/models/Test";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req, context){
    try {        
        await connectToDatabase();
        const { attemptedTest } =  await context.params;
        let result;
        const submissionInfo = await Submission.findOne({testId: attemptedTest});
        if(!submissionInfo){
            return NextResponse.json({"error": "Submission not found"}, {status: 404});
        }
        const resultInfo = await Result.findOne({testId: attemptedTest}).select("accuracy completeness explanation practicalRelevance conciseness score");
        const testInfo = await Test.findOne({_id: attemptedTest}).select("testName accuracy completeness explanation practicalRelevance conciseness score");
        result = {testId: attemptedTest, 
                startedAt: submissionInfo.startedAt, 
                completedAt: submissionInfo.completedAt,
                testName: testInfo.testName,
                maxAccuracy: testInfo.accuracy,
                maxCompleteness: testInfo.completeness,
                maxExplanation: testInfo.explanation,
                maxPracticalRelevance: testInfo.practicalRelevance,
                maxConciseness: testInfo.conciseness,
                maxScore: testInfo.score,
                accuracy: resultInfo.accuracy,
                completeness: resultInfo.completeness,
                explanation: resultInfo.explanation,
                practicalRelevance: resultInfo.practicalRelevance,
                conciseness: resultInfo.conciseness
            }
        return NextResponse.json(result, {status: 200});    
    } catch (error) {
        console.log(error);
        return NextResponse.json({"error": "Internal Server error"}, {status: 500})
    }
}