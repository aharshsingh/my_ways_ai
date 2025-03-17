import { NextResponse } from "next/server";
import User from "@/lib/models/User";

export async function PATCH(req){
    try {
        const { userId, testId } = await req.json();
        let user = await User.findOne({_id: userId});
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (user.attemptedTest.includes(testId)) {
            return NextResponse.json({message: "Test already attempted"}, {status: 200});
        }
        user.attemptedTest.push(testId);
        await user.save();
        return NextResponse.json({ message: "Test ID added successfully", user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}