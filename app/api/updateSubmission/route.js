import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req){
    try {
        const {submissionId, completedAt} = await req.json();
        if(!submissionId || !completedAt){
            return NextResponse({"error": "bad request"}, {status: 400});
        }
        const response = await prisma.submission.update({
            where: { submissionId },
            data: { completedAt }
        });
        return NextResponse(response, {status: 200});
    } catch (error) {
        return NextResponse({"error": "Internal server error"}, {status: 500})
    }
}