import * as React from "react";
import Dealer from "./Dealer";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <Dealer numPlayers={5} />
    </div>
  );
};

export default App;
