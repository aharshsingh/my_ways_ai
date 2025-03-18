import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Test from "@/lib/models/Test";

export async function DELETE(req, {params}){
    try {
        await connectToDatabase();
        const {testId} = params;
        const test = await Test.findOneAndUpdate({_id: testId}, {$set: {isDeleted: true}}, {new: true});
        if(!test){
            return NextResponse.json({error: "No test found"}, {status: 404});
        }
        return NextResponse.json({message: "Test deleted successfully", test}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Internal Server error"}, {status:500});
    }
}