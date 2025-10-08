import React from "react";
import * as PT from "prop-types";
import styles from "./StartButton.module.css"; 

const PropTypes = PT.default || PT;
export default function StartButton({ onStart, StartButtonText = "Starta spelet" }) {
  return (
    <div>
      <button className={styles.startButton} onClick={onStart}>
        {StartButtonText}
      </button>
    </div>
  );
}

StartButton.propTypes = {
  onStart: PropTypes.func,
  StartButtonText: PropTypes.string,
};