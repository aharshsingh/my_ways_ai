import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, {params}){
    try {
        const { testId } = params;
        let result;
        const submisssionInfo = await prisma.submission.findUnique({
            where: {
                testId
            }
        });
        if(!submisssionInfo){
            return NextResponse({"error": "Submission not found"}, {status: 404});
        }
        const resultInfo = await prisma.result.findMany({
            where: {
                testId
            },
            select: {
                resultId: true,
                accuracy: true,
                completeness: true,
                explanation: true,
                practicalRelevance: true,
                conciseness: true,
                score: true,
            }
        });
        const testInfo = await prisma.test.findUnique({
            where: {
                testId
            },
            select: {
                testName: true,
                accuracy: true,
                completeness: true,
                explanation: true,
                practicalRelevance: true,
                conciseness: true,
                score: true,
            }
        })
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