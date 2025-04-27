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
        console.log(results)
        const submissions = await Submission.find({testId});4
        console.log(submissions)
        const users = await User.find({"attemptedTest.testId": testId}).select("_id");
        console.log(users)
        users.forEach((user)=>{
            let userResult = {};
            let index = results.findIndex(result => result.userId.toString() === user._id.toString());
            userResult = {...userResult, ...results[index]._doc};
            console.log(userResult)
            index = submissions.findIndex(submission => submission.userId.toString() === user._id.toString());
            userResult = {...userResult, startedAt:submissions[index].startedAt , completedAt:submissions[index].completedAt, email: user.email, userId: user._id, userName: user.userName};
            console.log("this is " + toString(userResult))
            data.push(userResult);
        })
        return NextResponse.json(data, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server error"}, {status:500});
    }
}