import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../context/GameContext";
import { useApi } from "../../api/useApi";
import ResetButton from "../ResetButton/ResetButton";
import Result from "../Result/Result";                // <— lägg till
import styles from "./Board.module.css";

export default function Board() {
  const { players, setPlayers } = useGame();
  const { getGameById, playMove } = useApi();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let alive = true;
    if (!players?.player1 || !players?.player2 || !players?.gameId) {
      navigate("/setup");
      return;
    }
    (async () => {
      const g = await getGameById(players.gameId);
      if (!alive) return;
      setGame(g || null);
    })();
    return () => { alive = false; };
  }, [players, navigate, getGameById]);

  const board = game?.board || {};
  const tiles = board?.tiles || [];
  const rows  = board?.rows ?? (tiles[0]?.length ?? 0);      // 0-index
  const cols  = board?.cols ?? (tiles.length ?? 0);          // 0-index

  // Nästa spelare beräknas från round (0 => P1, 1 => P2, 2 => P1, ...)
  const nextPlayer = game ? ((game.round % 2 === 0) ? 1 : 2) : 1;

  const cellSize = useMemo(() => {
    const maxW = Math.min(window.innerWidth, 900) - 80;
    const maxH = Math.min(window.innerHeight, 700) - 240;
    if (!rows || !cols) return 50;
    const byW = Math.floor(maxW / cols);
    const byH = Math.floor(maxH / rows);
    return Math.max(24, Math.min(70, Math.min(byW, byH)));
  }, [rows, cols]);

  const inBounds = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols;

  const getCell = (r, c) => {
    // 0-indexerad åtkomst
    return tiles?.[c]?.[r] ?? 0;          // OBS: tiles[col][row]
  };

  const handleCellClick = async (r, c) => {
    if (sending) return;
    if (!inBounds(r, c)) return;
    if (game?.isOver) return;
    if (getCell(r, c) !== 0) return;

    setSending(true);
    const playerId = nextPlayer === 1 ? players.player1.id : players.player2.id;

    try {
      // skicka 0-index till backend
      const after = await playMove(players.gameId, playerId, c, r);
      setGame(after ?? null);
    } catch (e) {
      console.error("Kunde inte spela draget:", e);
      alert(`Draget misslyckades.\n${e?.message || ""}`);
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setPlayers({ player1: null, player2: null, gameId: null });
    navigate("/");
  };

  return (
    <div className={styles.boardContainer}>
      <button onClick={() => navigate("/setup")} className={styles.backBtn}>
        ⬅ Tillbaka
      </button>

      {!game && <p>Laddar spel…</p>}

      {game && (!game?.player1 || !game?.player2) && (
        <p style={{ marginTop: 80 }}>
          Spelet väntar på att båda spelarna ska gå med…
        </p>
      )}

      {game?.player1 && game?.player2 && (
        <>
          <div className={styles.header}>
            <div className={styles.playerCard}>
              <span className={styles.playerPiece}>
                {players.player1.piece === "red" ? "🔴" : "🟡"}
              </span>
              <span>{players.player1.name}</span>
              {nextPlayer === 1 && !game.isOver && <span title="Tur"> ⏳</span>}
            </div>
            <span className={styles.vs}>vs</span>
            <div className={styles.playerCard}>
              <span className={styles.playerPiece}>
                {players.player2.piece === "red" ? "🔴" : "🟡"}
              </span>
              <span>{players.player2.name}</span>
              {nextPlayer === 2 && !game.isOver && <span title="Tur"> ⏳</span>}
            </div>
          </div>

          <div
            className={styles.board}
            style={{
              gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
            }}
          >
            {Array.from({ length: rows }).map((_, rr) =>
              Array.from({ length: cols }).map((_, cc) => {
                const cell = getCell(rr, cc);
                const filled = cell !== 0;
                return (
                  <div
                    key={`${rr}-${cc}`}
                    className={styles.cell}
                    onClick={!filled && !sending ? () => handleCellClick(rr, cc) : undefined}
                    aria-disabled={filled || sending}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      backgroundColor:
                        cell === 1 ? "red" : cell === 2 ? "yellow" : "#d9d9d9",
                      cursor: filled || sending ? "not-allowed" : "pointer",
                      pointerEvents: filled ? "none" : "auto",
                    }}
                  />
                );
              })
            )}
          </div>

          <div className={styles.resetWrapper}>
            <ResetButton label="Starta Om" onClick={handleReset} />
          </div>

          {/* Visa vinnare/tie */}
          {game?.isOver && (
            <Result
              winner={game?.winner}
              isGameOver={game?.isOver}
              onPlayAgain={() => navigate("/setup")}
            />
          )}
        </>
      )}
    </div>
  );
}
