import React from "react";
export default function Status({ currentPlayer = 1 }) {
  return <div>Spelare {currentPlayer}:s tur</div>;
}
