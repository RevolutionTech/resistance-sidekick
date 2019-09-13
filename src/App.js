import "./App.css";
import React from "react";
import RoleCard from "./RoleCard";

function App() {
  return (
    <div className="App">
      <RoleCard playerName="Player 3" team="Resistance" isRevealed={true} />
    </div>
  );
}

export default App;
