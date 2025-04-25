import { NextResponse } from "next/server";
import { userLogin } from "@/utlis/validator";
import bcrypt from 'bcrypt';
import { createToken } from "@/utlis/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import User from '@/lib/models/User';

export async function POST(req){
    try {
        await connectToDatabase();
        const {email, password} = await req.json();
        const {error} = userLogin.validate({email, password});
        if(error){
            return NextResponse.json({"message": "check email or password"}, {status: 400});
        }
        const userInfo = await User.findOne({ email });
        if(!userInfo){
            return NextResponse.json({"error": "User not exists"}, {status: 404});
        }
        const match = await bcrypt.compare(password, userInfo.password);
        if(!match){
            return NextResponse.json({ "error": "Invalid Password" }, { status: 401 });
        }
        const payload = { userId: userInfo._id, role: userInfo.role };
        const accessToken = await createToken(payload);
        return NextResponse.json({accessToken, userId: userInfo._id, role: userInfo.role}, {status: 200}); 
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}