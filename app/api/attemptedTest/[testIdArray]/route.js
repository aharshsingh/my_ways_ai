import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, {params}){
    try {
        const { testIdArray }= params;
        let result = [];
        for(let i = 0; i < testIdArray.size(); i++){
            const response = await prisma.test.findUnique({
                where: {
                    testId: testIdArray[i]
                },
                select: {
                    testId: true,
                    testName: true,
                    createdAt: true,
                    numOfQuestions: true,
                    duration:true,
                    score: true,    
                }
            });
            result.push(response);
        }
        return NextResponse(result, {status: 200})
    } catch (error) {
        return NextResponse({"error": "Internal Server error"}, {status: 500})
    }
}