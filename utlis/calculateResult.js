import { connectToDatabase } from "@/lib/mongodb";
import { checkForSubmission } from "./checkForSubmission";
import Test from "@/lib/models/Test";
import { checkResult } from "./AI_Service/checkResult";
import Result from "@/lib/models/Result";
import { getQNA } from "./getQNA";

export async function calculateResult(){
    await connectToDatabase();
    const submissions = await checkForSubmission();
    for (const submission of submissions) {
        let result = {};
        let accuracy = 0;
        let completeness = 0;
        let explanation = 0;
        let practicalRelevance = 0;
        let conciseness = 0;
        let totalScore = [];
        const test = await Test.findOne({_id: submission.testId});
        const answerIdArray = submission.answerId;
        const qna = await getQNA(answerIdArray);
        for (const item of qna) {
            const response = await checkResult(item.question, item.answer, test);
            console.log("Response from checkResult:", response);
            const score = JSON.parse(response);
            totalScore.push(score);
        }
        totalScore.forEach((item) =>{
            accuracy += item.accuracy;
            completeness += item.completeness;
            explanation += item.explanation;
            practicalRelevance += item.practicalRelevance;
            conciseness += item.conciseness;
        });
        
        let score = accuracy+completeness+explanation+practicalRelevance+conciseness;
        result = {...result, userId: submission.userId, submissionId: submission._id, testId: submission.testId, accuracy, completeness, explanation, practicalRelevance, conciseness, score}
        const res = new Result(result);
        const response = await res.save();      
        return response;
    }
}