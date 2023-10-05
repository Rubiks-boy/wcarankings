import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { List } from "./components/List";
import { Chooser } from "./components/Chooser";

function App() {
  const [eventId, setEventId] = useState("333");
  const [isSingle, setIsSingle] = useState(true);

  const toggleSingle = () => setIsSingle(!isSingle);

  return (
    <div className="app">
      <Header />
      <Chooser
        eventId={eventId}
        setEventId={setEventId}
        isSingle={isSingle}
        toggleSingle={toggleSingle}
      />
      <List eventId={eventId} isSingle={isSingle} />
    </div>
  );
}

export default App;
