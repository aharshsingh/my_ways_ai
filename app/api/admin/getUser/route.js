import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req){
    try {
        await connectToDatabase();
        let users = await User.find().select("userName email attemptedTest");
        const userInfo = users.map((user) => {
            const plainUser = user.toObject();
            return {
                ...plainUser,
                totalTest: plainUser.attemptedTest.length || 0
            };
        });
        return NextResponse.json(userInfo, {status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}