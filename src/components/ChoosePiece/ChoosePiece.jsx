import React from "react";
import PropTypes from "prop-types";
import styles from "./ChoosePiece.module.css";
import { container, btn, btnActive } from "./ChoosePiece.styles";

export default function ChoosePiece({
  value,                    
  onChange,
  disabled = false,
  lockOnFirstChoice = false,
  disableWhite = false,     
  disableBlack = false,     
  redLabel = "röd",
  yellowLabel = "gul",
}) {
  const handleClick = (color) => {
    if (disabled) return;
    if (lockOnFirstChoice && value) return;   
    if (color === "red" && disableWhite) return;
    if (color === "yellow" && disableBlack) return;
    onChange?.(color);
  };

  const disabledWhiteFinal =
    disabled || disableWhite || (lockOnFirstChoice && !!value);
  const disabledBlackFinal =
    disabled || disableBlack || (lockOnFirstChoice && !!value);

  return (
    <div className={styles.container} style={container}>
      <button
        type="button"
        className={`${styles.btn} ${value === "red" ? styles.active : ""}`}
        style={{ ...btn, ...(value === "red" ? btnActive : {}) }}
        aria-pressed={value === "red"}
        onClick={() => handleClick("red")}
        disabled={disabledWhiteFinal}
      >
        🔴 {redLabel}
      </button>

      <button
        type="button"
        className={`${styles.btn} ${value === "black" ? styles.active : ""}`}
        style={{ ...btn, ...(value === "black" ? btnActive : {}) }}
        aria-pressed={value === "black"}
        onClick={() => handleClick("black")}
        disabled={disabledBlackFinal}
      >
        🟡 {yellowLabel}
      </button>
    </div>
  );
}

ChoosePiece.propTypes = {
  value: PropTypes.oneOf(["red", "yellow", null]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  lockOnFirstChoice: PropTypes.bool,  
  disableWhite: PropTypes.bool,       
  disableBlack: PropTypes.bool,       
  whiteLabel: PropTypes.string,
  blackLabel: PropTypes.string,
};
