import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Submission from "@/lib/models/submission";
import User from "@/lib/models/User";
import Result from "@/lib/models/Result";

export async function GET(req, {params}){
    try {
        await connectToDatabase();
        const { testId } = await params;
        let data = [];
        const results = await Result.find({testId});
        const submissions = await Submission.find({testId});4
        const users = await User.find({"attemptedTest.testId": testId}).select("_id userName email");
        users.forEach((user)=>{
            let userResult = {};
            let index = results.findIndex(result => result.userId.toString() === user._id.toString());
            userResult = {...userResult, ...results[index]._doc};
            index = submissions.findIndex(submission => submission.userId.toString() === user._id.toString());
            console.log(submissions[index].completedAt.toString())
            userResult = {...userResult, startedAt:submissions[index].startedAt , completedAt:submissions[index].completedAt, email: user.email, userId: user._id, userName: user.userName};
            data.push(userResult);
        })
        return NextResponse.json(data, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server error"}, {status:500});
    }
}