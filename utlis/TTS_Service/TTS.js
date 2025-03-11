import axios from "axios";
export async function TTS(question){
    try {
        if (!question) {
            return res.status(400).json({ error: "Question input is required" });
        }
        const data = {
            voiceId: "en-US-amara",
            style: "Conversational",
            text: question,
            rate: -15,
            pitch: 0,
            sampleRate: 48000,
            format: "MP3",
            channelType: "MONO",
            encodeAsBase64: false,
            variation: 1,
            audioDuration: 0,
            modelVersion: "GEN2",
            multiNativeLocale: "en-US",
          };
          const response = await axios.post("https://api.murf.ai/v1/speech/generate", data, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "api-key": process.env.MURF_API_KEY,
            },
          });
          return response.data.audioFile;
    } catch (error) {
        console.log(error)
        return null;
    }
    
}