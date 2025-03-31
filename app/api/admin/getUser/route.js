import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req){
    try {
        await connectToDatabase();
        const users = await User.find().select("userName email attemptedTest");
        return NextResponse.json(users, {status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}