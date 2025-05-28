import { Mistral } from '@mistralai/mistralai';
const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({apiKey});
export async function questionGenerator(testDescription, difficulty, answerText) {
    if(answerText === null){
        try {
            const chatResponse = await client.chat.complete({
                model: 'mistral-large-latest',
                messages: [
                    { role: "system", content: "You are an AI that generates test questions." },
                    { role: "user", content: `Create a question for a test based on this description: ${testDescription} test is oral interview and don't provide answer i need question only! And i donot need any other statment only question and dont repeat questions. difficulty of the question will be ${difficulty}` }
                ],
            });
            return chatResponse.choices[0].message.content
        } catch (error) {
            console.error("Error generating question:", error);
            return null;
        }
    } else {
        try {
            const chatResponse = await client.chat.complete({
                model: 'mistral-large-latest',
                messages: [
                    { role: "system", content: "You are an AI that generates test questions." },
                    { role: "user", content: `Cross question only one question i need on the basis of this answer ${answerText} for a test based on this description: ${testDescription} test is oral interview and don't provide answer i need question only! And i donot need any other statment only question and dont repeat questions. difficulty of the question will be ${difficulty}` }
                ],
            });
            return chatResponse.choices[0].message.content
        } catch (error) {
            console.error("Error generating question:", error);
            return null;
        }
    } 
}