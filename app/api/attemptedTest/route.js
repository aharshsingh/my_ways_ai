import { NextResponse } from "next/server";
import Test from '@/lib/models/Test';
import { connectToDatabase } from "@/lib/mongodb";
import Result from "@/lib/models/Result";
export async function POST(req, {params}){
    try {        
        await connectToDatabase();
        const body = await req.json();
        const { testIdArray, userId } = body;
        let result = [];
        for(const testId of testIdArray){
            const testDetails = await Test.findOne({_id: testId}).select("-isDeleted -isPublished -keyWord -testDescription -difficulty");
            const res = await Result.find({ userId, testId }).sort({ createdAt: -1 }).limit(1);
            result.push(...result, { testDetails, testResult: res[0] || null });
        }
        return NextResponse.json(result, {status: 200})
    } catch (error) {
        return NextResponse.json({"error": "Internal Server error"}, {status: 500})
    }
}
 