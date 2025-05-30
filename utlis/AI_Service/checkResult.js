import { Mistral } from '@mistralai/mistralai';
const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({apiKey});
export async function checkResult(question, answer, test) {
    try {
        console.log('Checking result for question:', test);
        const chatResponse = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [
                { role: "system", content: `You are an AI that evaluates test answers based on five criteria: accuracy, completeness, explanation, practical relevance, and conciseness. 
                                            For the given question and answer, assess the response and return a JSON object with scores for each criterion.
                                            Each criterion is scored out of the maximum marks provided in the test object.
                                            Return the response only in JSON format with the following structure:
                                            {
                                                "accuracy": <score>,
                                                "completeness": <score>,
                                                "explanation": <score>,
                                                "practicalRelevance": <score>,
                                                "conciseness": <score>,
                                            }`},
                { role: "user", content: `this is question ${question} and this is answer ${answer} and this is test json ${JSON.stringify(test)}. Give only the json nothing else not even a single word like this {
                                            "accuracy": 3,
                                            "completeness": 3,
                                            "explanation": 1.5,
                                            "practicalRelevance": 0.8,
                                            "conciseness": 1,
                                            } please give marks out of ${test.accuracy}, ${test.completeness}, ${test.explanation}, ${test.practicalRelevance}, ${test.conciseness} marks you will give should not exceed the maximum marks i provided`}
            ]
        });
        console.log('Chat:', chatResponse.choices[0].message.content);   
        return chatResponse.choices[0].message.content
    } catch (error) {
        console.error(error);
        return null;
    }
}