import "./Chooser.css";

const EVENTS_MAP = {
  "333": "3x3",
  "222": "2x2",
  "444": "4x4",
  "555": "5x5",
  "666": "6x6",
  "777": "7x7",
  "333bf": "3x3 Blindfolded",
  "333oh": "3x3 One-handed",
  clock: "Clock",
  minx: "Megaminx",
  pyram: "Pyraminx",
  skewb: "Skewb",
  sq1: "Square-1",
};

type Props = {
  eventId: string;
  setEventId: (eventId: string) => void;
  isSingle: boolean;
  toggleSingle: () => void;
  page: number;
  prevPage: () => void;
  nextPage: () => void;
};

export const Chooser = ({
  eventId,
  setEventId,
  isSingle,
  toggleSingle,
  page,
  nextPage,
  prevPage,
}: Props) => {
  return (
    <div className="chooser">
      <div>
        <select
          name="Event Id"
          onChange={(e) => setEventId(e.target.value)}
          value={eventId}
        >
          {Object.entries(EVENTS_MAP).map(([eventId, eventName]) => {
            return (
              <option key={eventId} value={eventId}>
                {eventName}
              </option>
            );
          })}
        </select>
        <select
          name="Ranking type"
          onChange={toggleSingle}
          value={isSingle ? "single" : "average"}
        >
          <option value="single">Single</option>
          <option value="average">Average</option>
        </select>
      </div>
      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};
