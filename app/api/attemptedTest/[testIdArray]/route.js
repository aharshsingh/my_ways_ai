import { NextResponse } from "next/server";
import Test from '@/lib/models/Test';
import { connectToDatabase } from "@/lib/mongodb";
export async function GET(req, {params}){
    try {        
        await connectToDatabase();
        const { testIdArray }= params;
        let result = [];
        for(let i = 0; i < testIdArray.size(); i++){
            const response = await Test.findOne({_id: testIdArray[i]}).select("_id testName createdAt numOfQuestion duration score");
            result.push(response);
        }
        return NextResponse(result, {status: 200})
    } catch (error) {
        return NextResponse({"error": "Internal Server error"}, {status: 500})
    }
}