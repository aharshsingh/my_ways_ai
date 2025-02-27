import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { testSchema } from "@/utlis/validator";
const Prisma = new PrismaClient();

export async function POST(req){
    try {
        const body = await req.json()
        const {error} = testSchema.validate(body);
        if(error){
            return NextResponse.json({error}, {status:400})
        }
        // const {testName, 
        //     testDescription, 
        //     difficulty, 
        //     numOfQuestions,
        //     duration, 
        //     accuracy, 
        //     completeness, 
        //     explanation, 
        //     practicalRelevance, 
        //     conciseness, 
        //     score} = testInfo
        const result = await Prisma.test.create({
            data: body
        })
        return NextResponse.json(result, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500}) 
    }
}