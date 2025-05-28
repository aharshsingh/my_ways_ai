import { NextResponse } from "next/server";
import { resultQueue } from '@/lib/redisQueue'

export async function POST(req) {
    try {
        const submissionId = await params;
        await resultQueue.add('process-test-result', { submissionId });
        return NextResponse.json({ message: 'Test submitted. Processing result.' }, { status: 500 });
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, { status: 500 });
    }
}
