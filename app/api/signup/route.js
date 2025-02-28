import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { userSignUp } from "@/utlis/validator";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export async function POST(req){
    try {
        const {name, email, password} = await req.json()
        const {error} = userSignUp.validate({name, email, password})
        if(error){
            return NextResponse.json({error}, {status:400})
        }
        const exists = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(exists){
            return NextResponse.json({"error": "user already exists"}, {status:409})
        }
        const hasedPassword = await bcrypt.hash(password, 10)
        const userInfo = {name, email, password: hasedPassword}
        const result = await prisma.user.create({
            data: userInfo
        })
        return NextResponse.json({result}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal server error"}, {status: 500}) 
    }
}