import Submission from "@/lib/models/submission";
import { connectToDatabase } from "@/lib/mongodb";

export async function checkForSubmission(){
    try {
        await connectToDatabase();
        const submissions = await Submission.find({checked: false});
        console.log(submissions);
        if(submissions.length === 0){
            console.log({error: "No submissions yet!"});
            return [];
        }
        return submissions;   
    } catch (error) {
        console.log(error);
    }
}