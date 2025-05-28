import { NextResponse } from "next/server";
import { questionGenerator } from "@/utlis/AI_Service/questionGenerator";
import { addQuestion } from "@/utlis/addQuestion";
import { TTS } from "@/utlis/TTS_Service/TTS";
import { connectToDatabase } from "@/lib/mongodb";
import Answer from "@/lib/models/Answer";

export async function POST(req,{params}){
   try {        
      await connectToDatabase();
      let answerText = null;
      const { testId } = await params;
      const body = await req.json();
      const { testDescription, difficulty, answerId } = body;
      if(answerId){
         const response = await Answer.findById(answerId);
         answerText = response.answer;
      }
      const question = await questionGenerator(testDescription, difficulty, answerText);
      const questionSavedObject = await addQuestion(testId, question);
      const audioURL = await TTS(question);
      return NextResponse.json({ audioURL, question: questionSavedObject.questionText, questionId: questionSavedObject._id }, { status: 200 });
   } catch (error) {
      console.log(error)
      return NextResponse.json({error: "Internal server error"}, {status: 500}) 
   }
}
