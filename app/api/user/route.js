import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const Prisma = new PrismaClient();

export async function GET(req){
    try {
        const userId = req.headers.get("userId");
        const userInfo = await Prisma.user.findUnique({
            where: {
                userId: parseInt(userId)
            }
        })
        return NextResponse.json({userInfo}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}