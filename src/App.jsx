import React, { useState } from 'react';
import Header from './components/Header/Header';
import ResetButton from './components/ResetButton/ResetButton';
import StartButton from './components/StartButton/StartButton';
import Regler from './components/Regler/Regler';
import ChoosePiece from './components/ChoosePiece/ChoosePiece'; 

function App() {
  

  const appContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', 
    backgroundColor: '#dfe6e9', 
  };

  const appStyle = {
    width: '80%',
    maxWidth: '700px',
    padding: '2.5rem',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(145deg, #74b9ff, #0984e3)', 
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    textAlign: 'center',
    color: '#070707ff',
  };

  const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '2rem',
  };
  const buttonStyle = {
  padding: '0.7rem 1.5rem',
  border: 'none',
  borderRadius: '10px',
  backgroundColor: '#fff',
  color: '#0984e3',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  transition: '0.2s ease',
};

  return (
    <div style={appContainer}>
      <div style={appStyle}>
        <Header  />

       
          {/* <ResetButton label="Reset" /> */}
         <div style={buttonContainer}>
  <StartButton
    label="Start"
    style={buttonStyle}
    onMouseEnter={e => Object.assign(e.target.style, buttonHoverStyle)}
    onMouseLeave={e =>
      Object.assign(e.target.style, { backgroundColor: '#fff', color: '#0984e3' })
    }
  />
  <Regler
    buttonLabel="Regler"
    style={buttonStyle}
    onMouseEnter={e => Object.assign(e.target.style, buttonHoverStyle)}
    onMouseLeave={e =>
      Object.assign(e.target.style, { backgroundColor: '#fff', color: '#0984e3' })
    }
  />
</div>

        
         <div style={buttonContainer}>
         <ChoosePiece />
         </div>
      </div>
    </div>
  );
}

export default App;
