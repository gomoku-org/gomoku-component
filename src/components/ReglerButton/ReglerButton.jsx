import React from "react";

export default function ReglerButton({ label = "Regler", onClick, style }) {
  return (
    <button type="button" onClick={onClick} style={style}>
      {label}
    </button>
  );
}
