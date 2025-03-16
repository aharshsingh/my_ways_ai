import { calculateResult } from "@/utlis/calculateResult";
import { NextResponse } from "next/server";
export async function GET(req) {
    const score = await calculateResult();
    return NextResponse.json({ score });
}
