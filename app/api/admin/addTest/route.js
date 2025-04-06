import { NextResponse } from "next/server";
import { testSchema } from "@/utlis/validator";
import Test from "@/lib/models/Test";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req){
    try {
        await connectToDatabase();
        const body = await req.json();
        console.log(body);
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

        const result = await new Test(body).save();
        return NextResponse.json(result, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500}) 
    }
}