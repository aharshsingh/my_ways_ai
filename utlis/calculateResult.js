import { connectToDatabase } from "@/lib/mongodb";
import { checkResult } from "./AI_Service/checkResult";
import Result from "@/lib/models/Result";
import Test from '@/lib/models/Test'; 
import Answer from '@/lib/models/Answer';
import Submission from "@/lib/models/submission";
import Question from "@/lib/models/Question";

export async function calculateResult(submissionId){
    await connectToDatabase();
    try {
        let data = {
            result: {},
            accuracy: 0,
            completeness: 0,
            explanation: 0,
            practicalRelevance: 0,
            conciseness: 0,
            totalScore: [],
            score: 0
        }
        const submission = await Submission.findById(submissionId).populate("testId").populate("answerId");
        for (const answer of submission.answerId){
            let question = await Question.findById(answer.questionId);
            const response = await checkResult(question.questionText, answer.answer, submission.testId);
            const cleanedResponse = response
                .replace(/```(?:json)?/g, "")
                .replace(/^Chat:\s*/, "")
                .trim();
            const validJson = cleanedResponse.replace(/^.*?({.*}).*?$/, "$1");
            const score = JSON.parse(validJson);
            data.totalScore.push(score);
        }
         data.totalScore.forEach((item) =>{
            data.accuracy += item.accuracy;
            data.completeness += item.completeness;
            data.explanation += item.explanation;
            data.practicalRelevance += item.practicalRelevance;
            data.conciseness += item.conciseness;
        });
        data.score = data.accuracy + data.completeness + data.explanation + data.practicalRelevance + data.conciseness;
        data.result = {...data.result, userId: submission.userId, submissionId: submission._id, testId: submission.testId._id, accuracy: data.accuracy, completeness: data.completeness, explanation: data.explanation, practicalRelevance: data.practicalRelevance, conciseness: data.conciseness, score: data.score}
        const res = new Result(data.result);
        const response = await res.save();    
        try {
            await Submission.findOneAndUpdate(
                {_id: submissionId},
                {$set: {checked: true}},
            );
        } catch (error) {
            console.error("Error in submission:", error);
            throw error;
        }  
        return response;
    } catch (error) {
        console.error("Error in calculateResult:", error);
        throw error;
    }
}