import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Submission from "@/lib/models/submission";
import User from "@/lib/models/User";
import Result from "@/lib/models/Result";

export async function GET(req, {params}){
    try {
        await connectToDatabase();
        const { testId } = params;
        let data = [];
        const results = await Result.find({testId});
        const submissions = await Submission.find({testId});
        const users = await User.find({testId : {$in: attemptedTest}}).select("_id, userName");
        users.forEach((user)=>{
            let userResult = {};
            const index = results.findIndex(item => item._id === user._id);
            userResult = {...userResult, score: results[index].score};
            index = submissions.findIndex(user._id);
            userResult = {...userResult, startedAt: submissions[index].startedAt, completedAt: submissions[index].completedAt};
            data.push(userResult);
        })
        console.log(results);
        return NextResponse.json(data, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Internal Server error"}, {status:500});
    }
}