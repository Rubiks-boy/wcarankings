import { useState } from "react";
import { List } from "./components/List";
import { Chooser } from "./components/Chooser";
import { JumpToTop } from "./components/JumpToTop";
import { useIndicesInView } from "./hooks/useIndicesInView";

import "./App.css";

function App() {
  const [eventId, setEventId] = useState("333");
  const [isSingle, setIsSingle] = useState(true);
  const { rankIndex, scrollIndex, scrollToTop } = useIndicesInView();

  const toggleSingle = () => setIsSingle(!isSingle);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">WCA Rankings</h1>
        <Chooser
          eventId={eventId}
          setEventId={setEventId}
          isSingle={isSingle}
          toggleSingle={toggleSingle}
        />
      </header>
      <main>
        <JumpToTop rankIndex={rankIndex} scrollToTop={scrollToTop} />
        <List
          eventId={eventId}
          isSingle={isSingle}
          rankIndex={rankIndex}
          scrollIndex={scrollIndex}
        />
      </main>
    </div>
  );
}

export default App;
