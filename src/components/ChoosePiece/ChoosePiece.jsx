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
  whiteLabel = "Vit",
  blackLabel = "Svart",
}) {
  const handleClick = (color) => {
    if (disabled) return;
    if (lockOnFirstChoice && value) return;   
    if (color === "white" && disableWhite) return;
    if (color === "black" && disableBlack) return;
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
        className={`${styles.btn} ${value === "white" ? styles.active : ""}`}
        style={{ ...btn, ...(value === "white" ? btnActive : {}) }}
        aria-pressed={value === "white"}
        onClick={() => handleClick("white")}
        disabled={disabledWhiteFinal}
      >
        ⚪ {whiteLabel}
      </button>

      <button
        type="button"
        className={`${styles.btn} ${value === "black" ? styles.active : ""}`}
        style={{ ...btn, ...(value === "black" ? btnActive : {}) }}
        aria-pressed={value === "black"}
        onClick={() => handleClick("black")}
        disabled={disabledBlackFinal}
      >
        ⚫ {blackLabel}
      </button>
    </div>
  );
}

ChoosePiece.propTypes = {
  value: PropTypes.oneOf(["white", "black", null]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  lockOnFirstChoice: PropTypes.bool,  
  disableWhite: PropTypes.bool,       
  disableBlack: PropTypes.bool,       
  whiteLabel: PropTypes.string,
  blackLabel: PropTypes.string,
};
