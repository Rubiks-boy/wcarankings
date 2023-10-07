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
};

const DownArrowSvg = () => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 10L12 15L17 10"
      stroke="#000000"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Chooser = ({
  eventId,
  setEventId,
  isSingle,
  toggleSingle,
}: Props) => {
  return (
    <div className="chooser">
      <div className="selectInput">
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
        <DownArrowSvg />
      </div>

      <div className="selectInput">
        <select
          name="Ranking type"
          onChange={toggleSingle}
          value={isSingle ? "single" : "average"}
        >
          <option value="single">Single</option>
          <option value="average">Average</option>
        </select>
        <DownArrowSvg />
      </div>
    </div>
  );
};
