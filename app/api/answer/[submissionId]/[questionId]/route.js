import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import axios from 'axios';
const prisma = new PrismaClient();

export async function POST(req, {params}){
    try {
        let {submissionId, questionId} = await params;
        submissionId = parseInt(submissionId, 10);
        questionId = parseInt(questionId, 10);

        const res = await prisma.answer.create({
            data: {
                submissionId,
                questionId,
                answer: "this is temp answer"
            }
        });

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

        const response = await axios.post("https://api.rev.ai/speechtotext/v1/jobs", revFormData,
            {
            headers: {
                Authorization: `Bearer ${APIKEY}`,
                ...revFormData.getHeaders(),
            }
        });
        const jobId = response.data.id;
        return NextResponse.json({jobId, res}, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({"error": "Internal server error"}, {status: 500})
    }
}