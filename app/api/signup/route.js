import { PrismaClient } from ".prisma/client";
import { NextResponse } from "next/server";
import { userSignUp } from "@/utlis/validator";
const Prisma = new PrismaClient();

export async function POST(req){
    try {
        const {body} = req.json()
        const {error} = userSignUp.validate(body)
        if(error){
            return NextResponse.json({error}, {status:400})
        }
        const result = await Prisma.user.create({
            data: body
        })
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500}) 
    }
}