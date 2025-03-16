import { connectToDatabase } from "@/lib/mongodb";
import { checkForSubmission } from "./checkForSubmission";
import Test from "@/lib/models/Test";
import User from "@/lib/models/User";

export async function calculateResult(){
    await connectToDatabase();
    const submissions = await checkForSubmission();
    submissions.forEach(async (submission) =>{
        let result;
        const test = await Test.findOne({_id: submission.testId});
        const userName = await User.findOne({_id: submission.userId});
        const answerIdArray = submission.answerId;
        const qna = await getQNA(answerIdArray);
        
    })
}