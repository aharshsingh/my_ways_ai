import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from 'bcrypt';

export async function POST(req){
    await connectToDatabase();
    const { email, newPassword } = await req.json();

    if (!email) {
        return NextResponse.json({ error: "Email not recieved!" }, { status: 404 });
    }
    if (!newPassword) {
        return NextResponse.json({ error: "New password is required" }, { status: 400 });
    }

    const exists = await User.findOne({ email });
    if (!exists) {
        return NextResponse.json(
        { error: "Email not resgistered" },
        { status: 400 }
        );
    }
    try {
        const hasedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate(
            {email},
            {$set: {password: hasedPassword}},
            {new: true}
        )
        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }   
}