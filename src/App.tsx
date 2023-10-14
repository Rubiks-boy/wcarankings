import { useState } from "react";
import { List } from "./components/List";
import { Chooser } from "./components/Chooser";
import { JumpUp, JumpDown } from "./components/Jump";
import { useScrollManager } from "./hooks/useScrollManager";

import "./App.css";

function App() {
  const [eventId, setEventId] = useState("333");
  const [isSingle, setIsSingle] = useState(true);
  const { rankIndex, scrollIndex, scrollToIndex, forceLoading, height } =
    useScrollManager();

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
        <JumpUp
          rankIndex={rankIndex}
          scrollUpSome={() => scrollToIndex(rankIndex - 5000)}
        />
        <List
          eventId={eventId}
          isSingle={isSingle}
          rankIndex={rankIndex}
          scrollIndex={scrollIndex}
          forceLoading={forceLoading}
          height={height}
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
