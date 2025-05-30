import { NextResponse } from 'next/server';
import { calculateResult } from '@/utlis/calculateResult';

export async function POST(req) {
  try {
    const { submissionId } = await req.json();

    console.log('Processing job for submissionId:', submissionId);
    const result = await calculateResult(submissionId);
    
    return NextResponse.json({ message: 'Result calculated.', result });
  } catch (err) {
    console.error('Job failed:', err);
    return NextResponse.json({ error: 'Job processing failed.' }, { status: 500 });
  }
}
