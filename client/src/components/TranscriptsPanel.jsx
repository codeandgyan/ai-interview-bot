import React from "react";

function TranscriptsPanel({ transcripts }) {
  return (
    <ul className="flex flex-col gap-3 px-5">
      {transcripts?.map((transcript) => {
        return <li key={transcript}>{transcript}</li>;
      })}
    </ul>
  );
}

export default TranscriptsPanel;
