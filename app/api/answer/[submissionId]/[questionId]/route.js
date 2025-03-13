import { NextResponse } from "next/server";
import axios from 'axios';
import { connectToDatabase } from "@/lib/mongodb";
import Answer from "@/lib/models/Answer";

export async function POST(req, {params}){
    try {        
        await connectToDatabase();
        let {submissionId, questionId} = await params;

        const res = new Answer({ submissionId, questionId, answer: "this is temp answer" });
        await res.save();

        const formData = await req.formData();
        const audioFile = formData.get("audio");
        if (!audioFile) {
            return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
        }
        const APIKEY = process.env.REVAI_API_KEY;
        const WEBHOOK_URL = process.env.WEBHOOK_URL;

        const revFormData = new FormData();
        revFormData.append("media", audioFile);
        revFormData.append("callback_url", WEBHOOK_URL);
        revFormData.append("metadata", JSON.stringify({ answerId: res.answerId }));
        console.log("Webhook URL:", WEBHOOK_URL);
        const response = await axios.post("https://api.rev.ai/speechtotext/v1/jobs", revFormData,
            {
            headers: {
                Authorization: `Bearer ${APIKEY}`,
            }
        });
        const jobId = response.data.id;
        return NextResponse.json({jobId, res}, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({"error": "Internal server error"}, {status: 500})
    }
}