import { useFirstIndexInView } from "../hooks/useFirstIndexInView";

import "./JumpToTop.css";
import classNames from "classnames";

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

export const JumpToTop = () => {
  const firstIndex = useFirstIndexInView();
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div
      className={classNames("JumpToTop", {
        visible: firstIndex > VISIBLE_AFTER_NUM_ENTRIES,
      })}
    >
      <button className="JumpToTop-button" onClick={handleClick}>
        <UpIcon />
        <span>Jump to top</span>
        <UpIcon />
      </button>
    </div>
  );
};
