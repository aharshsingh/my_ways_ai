import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function PATCH(req, {params}){
    try {
        await connectToDatabase();
        const {userId} = await params;
        const user = await User.findOneAndUpdate(
            {_id: userId},
            {$set: {isSuspended: false}},
            {new: true});
        if(!user){
            return NextResponse.json({error: "No user found"}, {status: 404});
        }
        return NextResponse.json({message: "User suspended successfully", user}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}