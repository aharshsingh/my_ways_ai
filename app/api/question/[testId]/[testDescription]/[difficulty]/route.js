import { NextResponse } from "next/server";
import { questionGenerator } from "@/utlis/AI_Service/questionGenerator";
import { addQuestion } from "@/utlis/addQuestion";
import { TTS } from "@/utlis/TTS_Service/TTS";

export async function GET(req,{params}){
   try {
      const { testId, testDescription, difficulty } = await params;
      const question = await questionGenerator(testDescription, difficulty);
      await addQuestion(testId, question);
      const audioURL = await TTS(question);
      console.log(audioURL)
      return NextResponse.json({ audioURL }, { status: 200 });
   } catch (error) {
      console.log(error)
      return NextResponse.json({error: "Internal server error"}, {status: 500}) 
   }
}