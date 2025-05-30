import { NextResponse } from "next/server";
import axios from "axios";
import { connectToDatabase } from "@/lib/mongodb";
import Answer from "@/lib/models/Answer";
import Submission from "@/lib/models/submission";

export async function POST(req, { params }) {
  try {
    await connectToDatabase();
    const { submissionId, questionId } = await params;
    let transcript = null;
    const formData = await req.formData();
    const audioFile = formData.get("audio");

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    const APIKEY = process.env.REVAI_API_KEY;

    const revFormData = new FormData();
    revFormData.append("media", audioFile);

    const response = await axios.post(
      "https://api.rev.ai/speechtotext/v1/jobs",
      revFormData,
      {
        headers: {
          Authorization: `Bearer ${APIKEY}`,
        },
      }
    );

    const jobId = response.data.id;

    const parameters = {
      maxAttempts: 20,
      attempt: 0,
      interval: 5000,
    };

    while (parameters.attempt < parameters.maxAttempts) {
      try {
        const transcriptResponse = await axios.get(
          `https://api.rev.ai/speechtotext/v1/jobs/${jobId}/transcript?format=text`,
          {
            headers: {
              Authorization: `Bearer ${APIKEY}`,
               Accept: 'text/plain',
            },
          }
        );
        transcript = transcriptResponse.data;
        break;
      } catch (error) {
        if (error.response?.status === 409) {
          parameters.attempt++;
          await new Promise((resolve) =>
            setTimeout(resolve, parameters.interval)
          );
        } else {
          console.error("Unexpected polling error:", error);
          return NextResponse.json(
            { error: "Internal error getting answer transcript" },
            { status: 500 }
          );
        }
      }
    }

    if (!transcript) {
      return NextResponse.json(
        { error: "Transcript not available after polling" },
        { status: 408 }
      );
    }

    const res = new Answer({
      submissionId,
      questionId,
      answer: transcript,
    });
    try {
          await Submission.findOneAndUpdate(
              {_id: submissionId},
              {$addToSet: {answerId: { $each: [res._id] }}},
          );
        } catch (error) {
            return NextResponse.json({error: "Submission not saved"}, { error: 500 });
        }  
    await res.save();
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error("POST handler error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
