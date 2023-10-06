import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { List } from "./components/List";
import { Chooser } from "./components/Chooser";

function App() {
  const [eventId, setEventId] = useState("333");
  const [isSingle, setIsSingle] = useState(true);
  const [page, setPage] = useState(1);

  const toggleSingle = () => setIsSingle(!isSingle);

  return (
    <div className="app">
      <Header />
      <main>
        <Chooser
          eventId={eventId}
          setEventId={setEventId}
          isSingle={isSingle}
          toggleSingle={toggleSingle}
          page={page}
          prevPage={() => setPage(page - 1)}
          nextPage={() => setPage(page + 1)}
        />
        <List eventId={eventId} isSingle={isSingle} page={page} />
      </main>
    </div>
  );
}

export default App;
