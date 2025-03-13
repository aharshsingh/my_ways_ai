import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Answer from "@/lib/models/Answer";

export async function POST(req){
try {
    console.log("Incoming Webhook Request");
    await connectToDatabase();
    const body = await req.json();
    console.log("Webhook received:", body);
    const { job, transcript } = body;

    const metadata = JSON.parse(job.metadata);
    const answerId = metadata.answerId;
    if (!answerId) {
        return NextResponse.json({ error: "answerId missing in metadata" }, { status: 400 });
    }
    const updatedAnswer = await Answer.findOneAndUpdate(
        { _id: answerId }, 
        { $set: { answer: transcript } }, 
        { new: true } 
    );
    return NextResponse.json({ message: "Webhook received successfully", updatedAnswer }, {status: 200});
} catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Internal server error" }, {status: 500});
}
}
