import { useState } from "react";
import { List } from "./components/List2";
import { Chooser } from "./components/Chooser";
import "./App.css";

function App() {
  const [eventId, setEventId] = useState("333");
  const [isSingle, setIsSingle] = useState(true);

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
        <List eventId={eventId} isSingle={isSingle} />
      </main>
    </div>
  );
}

export default App;
