import Answer from "@/lib/models/Answer";
import Question from "@/lib/models/Question";

export async function getQNA(answerIdArray) {
    try {
        let qna = [];

        for (const answerId of answerIdArray) {
            const ans = await Answer.findOne({ _id: answerId });
            if (!ans) continue; // Skip if answer not found
            const question = await Question.findOne({ _id: ans.questionId }).select("questionText");
            qna.push({ question: question?.questionText, answer: ans.answer });
        }
        return qna;
    } catch (error) {
        console.error("Error in getQNA:", error);
        return [];
    }
}
