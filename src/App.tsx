import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { List } from "./components/List";

function App() {
  const [eventId, setEventId] = useState("333");
  return (
    <div>
      <Header eventId={eventId} setEventId={setEventId} />
      <List eventId={eventId} />
    </div>
  );
}

export default App;
