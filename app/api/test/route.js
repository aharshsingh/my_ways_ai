import { NextResponse } from "next/server";
import Test from "@/lib/models/Test";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req, {params}){
    try {        
        await connectToDatabase();
        const tests = await Test.find({isDeleted: false});
        return NextResponse.json(tests, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}
