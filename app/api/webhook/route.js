import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Answer from "@/lib/models/Answer";

export async function POST(req){
    await connectToDatabase();
    console.log("Webhook received:", req.body);
    const { job, transcript } = req.body;
    const { metadata } = job;
    const answerId = metadata ? JSON.parse(metadata).answerId : null;
    if (!answerId) {
        return NextResponse.json({ error: "answerId missing in metadata" }, { status: 400 });
    }
    const updatedAnswer = await Answer.findOneAndUpdate(
        { _id: answerId }, 
        { $set: { answer: transcript } }, 
        { new: true } 
    );
    return NextResponse.json({ message: "Webhook received successfully", updatedAnswer }, {status: 200});
}