import classNames from "classnames";

import "./JumpToTop.css";

export const VISIBLE_AFTER_NUM_ENTRIES = 75;

const UpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
    </svg>
  );
};

export const JumpToTop = ({
  rankIndex,
  scrollToTop,
}: {
  rankIndex: number;
  scrollToTop: () => void;
}) => {
  return (
    <div
      className={classNames("JumpToTop", {
        visible: rankIndex > VISIBLE_AFTER_NUM_ENTRIES,
      })}
    >
      <button className="JumpToTop-button" onClick={scrollToTop}>
        <UpIcon />
        <span>Jump to top</span>
        <UpIcon />
      </button>
    </div>
  );
};
