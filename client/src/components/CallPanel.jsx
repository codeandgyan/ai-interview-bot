import { useRef } from "react";
import { useEffect } from "react";

function CallPanel({ onConversationUpdated }) {
  const uiLoaded = useRef(false);
  const speechRecognition = useRef();
  const transcripts = useRef([""]);
  //  const newTranscripts = useRef([
  //   { userType: "Bot", message: "Hey Ritesh, how are you?" },
  // ]);

  useEffect(() => {
    if (uiLoaded.current === false) {
      // const utterance = new SpeechSynthesisUtterance();
      // const voices = speechSynthesis.getVoices();
      // const values = Object.values(voices);
      // values.forEach(({ voiceURI, lang }) => {
      //   console.log("Person:", voiceURI, lang);
      // });

      // utterance.voice = voices[15];
      // utterance.lang = "en-IN";

      // // Set pitch (0 to 2) — 1 is default
      // utterance.pitch = 1;

      // // Set rate (0.1 to 10) — 1 is normal
      // utterance.rate = 1;

      // speechSynthesis.speak(utterance);
      //---------------------------------------------

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      console.log(SpeechRecognition);
      if (!SpeechRecognition) {
        console.error(
          "Speech Recognition API is not supported in this browser."
        );
        return;
      }
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      // recognition.lang = 'hi-IN';

      recognition.onstart = () => {
        console.log("🎤 Listening started");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("You: ", transcript);

        transcripts.current = [...transcripts.current, `You: ${transcript}`];
        onConversationUpdated(transcripts.current);
      };

      speechRecognition.current = recognition;

      uiLoaded.current = true;
    }
  }, []);

  const startInterview = () => {
    speechRecognition.current?.start();
  };

  return (
    <div>
      <button
        className={`border-2 rounded-2xl bg-blue-500 
          text-white px-4 py-2 font-medium text-xl 
          hover:bg-blue-500/65 active:scale-90 cursor-pointer`}
        onClick={() => startInterview()}
      >
        Start Interview
      </button>
    </div>
  );
}

export default CallPanel;
