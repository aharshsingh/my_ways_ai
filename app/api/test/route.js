import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const Prisma = new PrismaClient();

export async function GET(req){
    try {
        const tests = await Prisma.test.findMany()
        return NextResponse.json({tests}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}