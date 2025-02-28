import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();

export async function addQuestion(testId, questionText){
    try {
        return await Prisma.question.create({
            data: {testId, questionText}
        })
    } catch (error) {
        console.log(error);
        return error;
    }
}