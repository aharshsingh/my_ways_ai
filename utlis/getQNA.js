import Answer from "@/lib/models/Answer";
import Question from "@/lib/models/Question";

export async function getQNA(answerIdArray){
    try {
        let qna = [];
        answerIdArray.forEach(async (answerId) => {
            const Answer = await Answer.findOne({_id: answerId}).select("questionId, answer");
            const question = await Question.findOne({_id: Answer.questionId}).select("questionText");
            qna.push({ question, answer: Answer.answer });
        });
        return qna;
    } catch (error) {
        console.log(error);
    }
}