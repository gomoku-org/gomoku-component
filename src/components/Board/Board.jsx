import React from "react";
import styles from "./Board.module.css";

const Board = () => {
  const size = 5; // fixed 5x5
  const cells = Array.from({ length: size * size });

  return (
    <div className={styles.board}>
      {cells.map((_, idx) => (
        <div key={idx} className={styles.cell}></div>
      ))}
    </div>
  );
};

export default Board;
