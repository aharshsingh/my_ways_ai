import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { userSignUp } from "@/utlis/validator";
import bcrypt from 'bcrypt';
import User from '@/lib/models/User';

export async function POST(req){
    try {
        await connectToDatabase();
        const {userName, email, password} = await req.json();
        const {error} = userSignUp.validate({userName, email, password});
        if(error){
            return NextResponse.json({error: error.details[0].message}, {status:400});
        }
        const exists = await User.findOne({ email });
        if(exists){
            return NextResponse.json({"error": "user already exists"}, {status:409});
        }
        const hasedPassword = await bcrypt.hash(password, 10);
        const userInfo = new User({ userName, email, password: hasedPassword });
        const result = await userInfo.save();
        return NextResponse.json({result}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}