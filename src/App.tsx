import { useState } from "react";
import { List } from "./components/List";
import { Chooser } from "./components/Chooser";
import { JumpDown, JumpToTop } from "./components/Jump";
import { useIndicesInView } from "./hooks/useIndicesInView";

import "./App.css";

function App() {
  const [eventId, setEventId] = useState("333");
  const [isSingle, setIsSingle] = useState(true);
  const { rankIndex, scrollIndex, scrollToIndex } = useIndicesInView();

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
        <JumpToTop rankIndex={rankIndex} scrollToTop={() => scrollToIndex(0)} />
        <List
          eventId={eventId}
          isSingle={isSingle}
          rankIndex={rankIndex}
          scrollIndex={scrollIndex}
        />
        <JumpDown
          rankIndex={rankIndex}
          scrollDownSome={() => scrollToIndex(rankIndex + 5000)}
        />
      </main>
    </div>
  );
}

export default App;
