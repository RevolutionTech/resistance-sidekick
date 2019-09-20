import * as React from "react";
import RoleCard from "./RoleCard";

enum Team {
  RESISTANCE = "Resistance",
  SPY = "Spy"
}

interface PlayerInfo {
  name: string;
  team: Team;
}

interface State {
  players: PlayerInfo[];
  currentPlayerIndex: number;
}

export default class Dealer extends React.PureComponent<{}, State> {
  state: State = {
    players: [],
    currentPlayerIndex: 0
  };

  componentDidMount() {
    const players = [
      { name: "Player 1", team: Team.RESISTANCE },
      { name: "Player 2", team: Team.SPY },
      { name: "Player 3", team: Team.RESISTANCE }
    ];
    this.setState({ players, currentPlayerIndex: 0 });
  }

  render() {
    const currentPlayer = this.state.players[this.state.currentPlayerIndex];
    if (currentPlayer) {
      return (
        <RoleCard
          playerName={currentPlayer.name}
          team={currentPlayer.team}
          onComplete={this.updateCurrentPlayer}
        />
      );
    } else {
      return null;
    }
  }

  private updateCurrentPlayer = () =>
    this.setState({ currentPlayerIndex: this.state.currentPlayerIndex + 1 });
}
