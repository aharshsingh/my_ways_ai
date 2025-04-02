import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Test from "@/lib/models/Test";

export async function GET(req){
    try {
        await connectToDatabase();
        const tests = await Test.find();
        if(!tests){
            return NextResponse.json({error: "No test found"}, {status: 404});
        }
        return NextResponse.json(tests, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Internal Server error"}, {status:500});
    }
}