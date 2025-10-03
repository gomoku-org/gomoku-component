import React, { useState } from 'react';

const Regler = ({ buttonLabel = 'Regler' }) => {
  const [open, setOpen] = useState(false);

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: '#f7f5f5ff',
    padding: '1.5rem',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'left',
  };

  const closeBtnStyle = {
    marginTop: '1rem',
    padding: '0.3rem 0.7rem',
    cursor: 'pointer',
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>{buttonLabel}</button>

      {open && (
        <div style={overlayStyle} onClick={() => setOpen(false)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '16px' }}>Regler — Fem i rad</h2>
            <ul style={{ fontSize: '14px', marginTop: '0.5rem' }}>
              <li>Spelet spelas på ett rutnät 5×5.</li>
              <li>Två spelare turas om att lägga sin symbol (X eller O).</li>
              <li>Målet är att få 5 i rad – vågrätt, lodrätt eller diagonalt.</li>
              <li>Du får inte lägga på en ruta som redan är tagen.</li>
              <li>Den som först får 5 i rad vinner.</li>
            </ul>
            <button style={closeBtnStyle} onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Regler;
