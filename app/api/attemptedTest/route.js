import { NextResponse } from "next/server";
import Test from '@/lib/models/Test';
import { connectToDatabase } from "@/lib/mongodb";
export async function POST(req, {params}){
    try {        
        await connectToDatabase();
        const body = await req.json();
        const { testIdArray } = body;
        let result = [];
        for(let i = 0; i < testIdArray.length; i++){
            const response = await Test.findOne({_id: testIdArray[i]}).select("_id testName createdAt numOfQuestion duration score");
            result.push(response);
        }
        return NextResponse.json(result, {status: 200})
    } catch (error) {
        return NextResponse({"error": "Internal Server error"}, {status: 500})
    }
}