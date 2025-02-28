import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
export async function questionGenerator(testDescription) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are an AI that generates test questions." },
                { role: "user", content: `Create a question for a test based on this description: ${testDescription}` }
            ],
            max_tokens: 150
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error generating first question:", error);
        return null;
    }
}
