import { useState } from "react";
import CallPanel from "./components/CallPanel";
import TranscriptsPanel from "./components/TranscriptsPanel";

function App() {
  const [transcripts, setTranscripts] = useState();
  return (
    <div className="flex min-h-screen px-5">
      <div className="flex-1">
        <CallPanel
          onConversationUpdated={(_transcripts) => setTranscripts(_transcripts)}
        />
      </div>
      <div className="md:max-w-96 lg:max-w-sm">
        <TranscriptsPanel
          transcripts={transcripts}
        />
      </div>
    </div>
  );
}

export default App;
