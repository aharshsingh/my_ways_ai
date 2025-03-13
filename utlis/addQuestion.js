import { connectToDatabase } from "@/lib/mongodb";
import Question from "@/lib/models/Question";

export async function addQuestion(testId, questionText){
    try {
        await connectToDatabase();
        const question = new Question({ testId, questionText });
        await question.save();
        return question;
    } catch (error) {
        console.log(error);
        return error;
    }
}