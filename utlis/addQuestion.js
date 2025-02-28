import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addQuestion(testId, questionText){
    try {
        return await prisma.question.create({
            data: {testId, questionText}
        })
    } catch (error) {
        console.log(error);
        return error;
    }
}