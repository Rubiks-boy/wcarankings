import "./Header.css";

export const Header = ({
  eventId,
  setEventId,
}: {
  eventId: string;
  setEventId: (eventId: string) => void;
}) => {
  return (
    <header className="header">
      <h1 className="title">WCA Rankings</h1>
      <input
        type="text"
        placeholder=""
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
      />
    </header>
  );
};
