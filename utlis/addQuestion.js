import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function addQuestion(Id, questionText){
    try {
        const testId = parseInt(Id);
        return await prisma.question.create({
            data: {testId, questionText}
        })
    } catch (error) {
        console.log(error);
        return error;
    }
}