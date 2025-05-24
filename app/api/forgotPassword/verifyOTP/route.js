import { NextResponse } from "next/server";
import redis from "@/lib/redisClient";

export async function POST(req) {
    const { email, OTP } = await req.json();
    
    if (!OTP) {
        return NextResponse.json({ error: "OTP not recieved!" }, { status: 404 });
    }

    try {
        const storedOTP = await redis.get(`otp:${email}`);
        if (storedOTP === OTP) {
            return NextResponse.json({ verified: true }, { status: 200 });
        } else {
            return NextResponse.json({ verified: false, error: 'Invalid OTP' }, { status: 401 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
