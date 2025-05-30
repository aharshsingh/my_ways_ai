import { NextResponse } from 'next/server';
import { Client } from '@upstash/qstash';
const qstash = new Client({
  token: process.env.QSTASH_TOKEN,
});

export async function POST(req, { params }) {
  try {
    const { submissionId } = await params;

    await qstash.publishJSON({
      url: process.env.JOB_HANDLER_URL,
      body: { submissionId },
    });

    return NextResponse.json({ message: 'Job enqueued successfully.' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to enqueue job.' }, { status: 500 });
  }
}