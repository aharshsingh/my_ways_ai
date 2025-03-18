import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { mongoose } from "mongoose";
export async function GET(req){
    try {        
        await connectToDatabase();
        const userId = req.headers.get("userId");
        const userInfo = await User.findOne({ _id: new mongoose.Types.ObjectId(userId) });
        return NextResponse.json({userInfo}, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}