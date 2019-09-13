import * as React from "react";
import RoleCard from "./RoleCard";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <RoleCard playerName="Player 3" team="Resistance" isRevealed={true} />
    </div>
  );
};

export default App;
