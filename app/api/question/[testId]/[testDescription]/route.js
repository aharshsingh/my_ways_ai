import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { questionGenerator } from "@/utlis/AI_Service/questionGenerator";
import { addQuestion } from "@/utlis/addQuestion";

const prisma = new PrismaClient();

export async function GET(req,{params}){
   try {
      const { testId, testDescription } = await params;
    const question = await questionGenerator(testDescription);
    const result = await addQuestion(testId, question);
    return NextResponse.json(question, {status: 200})
   } catch (error) {
    console.log(error)
    return NextResponse.json({error: "Internal server error"}, {status: 500}) 
   }
}