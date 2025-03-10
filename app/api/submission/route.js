import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { submissionSchema } from "@/utlis/validator";
const prisma = new PrismaClient();

export async function POST(req){
    try {
        const {testId, userId, startedAt} = await req.json();
        const {error} = submissionSchema.validate({testId, userId, startedAt});
        if(error){
            return NextResponse.json({"error": "bad request"}, {status: 400});
        }
        const response = await prisma.submission.create({
            data: {
                testId,
                userId,
                startedAt: new Date(startedAt)
            }
        });
        return NextResponse.json(response, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({"error": "Internal server error"}, {status: 500})
    }
}