import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { userLogin } from "@/utlis/validator";
import bcrypt from 'bcrypt';
import { createToken } from "@/utlis/jwt";
const prisma = new PrismaClient();

export async function POST(req){
    try {
        const {email, password} = await req.json();
        const {error} = userLogin.validate({email, password});
        if(error){
            return NextResponse.json({error}, {status: 400});
        }
        const userInfo = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!userInfo){
            return NextResponse.json({"error": "User not exists"}, {status: 404});
        }
        const match = await bcrypt.compare(password, userInfo.password);
        if(!match){
            return NextResponse.json({ "error": "Invalid Password" }, { status: 401 });
        }
        const payload = {userId : userInfo.userId}
        const accessToken = await createToken(payload);
        return NextResponse.json({accessToken}, {status: 200}); 
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}