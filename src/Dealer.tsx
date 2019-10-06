import * as React from "react";
import Deck from "card-deck";
import { Button, Typography, LinearProgress } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import { RevealState, RoleCard } from "./RoleCard";

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
  revealState: RevealState;
  revealTimer: number | null;
  revealProgress: number;
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
    currentPlayerIndex: 0,
    revealState: RevealState.WAITING,
    revealTimer: null,
    revealProgress: 0
  };

  componentDidMount() {
    this.reset();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  private reset = () => {
    this.clearTimer();
    const players = this.dealPlayers();
    this.setState({
      players,
      currentPlayerIndex: 0,
      revealState: RevealState.WAITING,
      revealTimer: window.setInterval(this.updateRevealProgress, 500),
      revealProgress: 0
    });
  };

  private clearTimer = () => {
    if (this.state.revealTimer != null) {
      window.clearInterval(this.state.revealTimer);
    }
  };

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

  private updateRevealProgress = () => {
    if (this.state.revealState === RevealState.HOLDING) {
      if (this.state.revealProgress < 100) {
        this.setState({ revealProgress: this.state.revealProgress + 50 });
      } else {
        this.setState({ revealState: RevealState.REVEALED });
      }
    } else if (this.state.revealState === RevealState.PASSING) {
      if (this.state.revealProgress > 0) {
        this.setState({ revealProgress: this.state.revealProgress - 25 });
      } else {
        this.updateCurrentPlayer();
        this.setState({ revealState: RevealState.WAITING });
      }
    }
  };

  private revealStart = () => {
    if (this.state.revealState === RevealState.WAITING) {
      this.setState({ revealState: RevealState.HOLDING });
    }
  };

  private revealEnd = () => {
    if (this.state.revealState === RevealState.HOLDING) {
      this.setState({ revealState: RevealState.WAITING, revealProgress: 0 });
    } else if (this.state.revealState === RevealState.REVEALED) {
      this.setState({ revealState: RevealState.PASSING });
    }
  };

  render() {
    return (
      <>
        <LinearProgress
          variant="determinate"
          value={this.state.revealProgress}
          className="mt2 mb1"
        />
        {this.renderBody()}
        <Button onClick={this.reset} style={{ marginBottom: "2em" }}>
          <RefreshIcon className="mr025" />
          Start over?
        </Button>
      </>
    );
  }

  renderBody() {
    const currentPlayer = this.state.players[this.state.currentPlayerIndex];
    if (currentPlayer) {
      return (
        <RoleCard
          playerName={currentPlayer.name}
          team={currentPlayer.team}
          revealState={this.state.revealState}
          onRevealStart={this.revealStart}
          onRevealEnd={this.revealEnd}
        />
      );
    } else {
      return <Typography>All set!</Typography>;
    }
  }

  private updateCurrentPlayer = () =>
    this.setState({ currentPlayerIndex: this.state.currentPlayerIndex + 1 });
}
