import * as React from "react";
import Deck from "card-deck";
import { Typography } from "@material-ui/core";
import RoleCard from "./RoleCard";

enum Team {
  RESISTANCE = "Resistance",
  SPY = "Spy"
}

interface PlayerInfo {
  name: string;
  team: Team;
}

interface Props {
  numPlayers: number;
}

interface State {
  players: PlayerInfo[];
  currentPlayerIndex: number;
}

export default class Dealer extends React.PureComponent<Props, State> {
  private static NUM_SPIES_BY_PLAYER_COUNT: Record<number, number> = {
    5: 2,
    6: 2,
    7: 3,
    8: 3,
    9: 3,
    10: 4
  };

  state: State = {
    players: [],
    currentPlayerIndex: 0
  };

  componentDidMount() {
    const players = this.dealPlayers();
    this.setState({ players, currentPlayerIndex: 0 });
  }

  private dealPlayers = () => {
    const numSpies = Dealer.NUM_SPIES_BY_PLAYER_COUNT[this.props.numPlayers];
    let roles = new Array(this.props.numPlayers);
    roles.fill(Team.SPY, 0, numSpies);
    roles.fill(Team.RESISTANCE, numSpies);

    let deck = new Deck(roles);
    deck.shuffle();

    const players = deck
      .draw(this.props.numPlayers)
      .map((team: Team, i: number) => {
        return {
          name: `Player ${i + 1}`,
          team
        };
      });
    return players;
  };

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
      return <Typography>All done! Refresh the page to try again.</Typography>;
    }
  }

  private updateCurrentPlayer = () =>
    this.setState({ currentPlayerIndex: this.state.currentPlayerIndex + 1 });
}
