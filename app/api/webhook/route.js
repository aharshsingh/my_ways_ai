import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req){
    console.log("Webhook received:", req.body);
    const { job, transcript } = req.body;
    const { metadata } = job;
    const answerId = metadata ? JSON.parse(metadata).answerId : null;
    if (!answerId) {
        return NextResponse.json({ error: "answerId missing in metadata" }, { status: 400 });
    }
    const updatedAnswer = await prisma.answer.update({
        where: { id: answerId },
        data: { answer: transcript },
    });
    return NextResponse.json({ message: "Webhook received successfully", updatedAnswer }, {status: 200});
}