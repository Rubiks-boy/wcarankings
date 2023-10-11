import classNames from "classnames";

import "./Jump.css";

export const VISIBLE_AFTER_NUM_ENTRIES = 40;

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

const DownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
    </svg>
  );
};

export const JumpUp = ({
  rankIndex,
  scrollUpSome,
}: {
  rankIndex: number;
  scrollUpSome: () => void;
}) => {
  return (
    <div
      className={classNames("Jump", "Jump--up", {
        visible: rankIndex > VISIBLE_AFTER_NUM_ENTRIES,
      })}
    >
      <button className="Jump-button" onClick={scrollUpSome}>
        <UpIcon />
        <span>{rankIndex > 5000 ? "Jump up 5000" : "Jump to top"}</span>
        <UpIcon />
      </button>
    </div>
  );
};

export const JumpDown = ({
  rankIndex,
  scrollDownSome,
}: {
  rankIndex: number;
  scrollDownSome: () => void;
}) => {
  return (
    <div
      className={classNames("Jump", "Jump--down", {
        visible: rankIndex > VISIBLE_AFTER_NUM_ENTRIES,
      })}
    >
      <button className="Jump-button" onClick={scrollDownSome}>
        <DownIcon />
        <span>Jump down 5000</span>
        <DownIcon />
      </button>
    </div>
  );
};
