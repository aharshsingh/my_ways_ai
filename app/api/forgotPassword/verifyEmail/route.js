import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import redis from "@/lib/redisClient";
import {sendNotification} from '@/utlis/sendNotification';
export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email not recieved!" }, { status: 404 });
  }
  const exists = await User.findOne({ email });
  if (!exists) {
    return NextResponse.json(
      { error: "Email not resgistered" },
      { status: 400 }
    );
  }

  try {
    const OTP = Math.floor(Math.random() * 10000).toString().padStart(4, '0');;
    await redis.set(`otp:${email}`, OTP, { EX: 300 });
    const payload = {
      OTP,
      subject: "Password Reset Request",
      body: `<h2>Password Reset Request</h2>
            <p>We received a request to reset your password. Use the OTP below to proceed:</p>
            <h3>${OTP}</h3>
            <p>This OTP is valid for 5 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best Regards,<br>Intervu.ai Team</p>`,
    };
    await sendNotification(email, payload);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
  return NextResponse.json({ status: 200 });
}
