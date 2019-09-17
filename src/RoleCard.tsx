import * as React from "react";
import { Paper, Typography, LinearProgress } from "@material-ui/core";
import PlaceholderTypography from "./PlaceholderTypography";
import "./RoleCard.css";

enum RevealState {
  WAITING = "waiting",
  REVEALED = "revealed"
}

interface Props {
  playerName: string;
  team: string;
}

interface State {
  revealState: RevealState;
  revealTimer: number | null;
  revealProgress: number;
}

export default class RoleCard extends React.PureComponent<Props, State> {
  state: State = {
    revealState: RevealState.WAITING,
    revealTimer: null,
    revealProgress: 0
  };

  private revealStart = () => {
    const revealTimer =
      this.state.revealTimer == null
        ? window.setInterval(this.incrementRevealProgress, 500)
        : this.state.revealTimer;
    this.setState({
      revealState: RevealState.WAITING,
      revealTimer: revealTimer,
      revealProgress: 0
    });
  };

  private incrementRevealProgress = () => {
    if (this.state.revealProgress < 100) {
      this.setState({ revealProgress: this.state.revealProgress + 50 });
    } else if (this.state.revealTimer != null) {
      window.clearInterval(this.state.revealTimer);
      this.setState({
        revealState: RevealState.REVEALED,
        revealTimer: null
      });
    }
  };

  private revealEnd = () => {
    if (this.state.revealTimer != null) {
      window.clearInterval(this.state.revealTimer);
    }
    this.setState({
      revealState: RevealState.WAITING,
      revealTimer: null,
      revealProgress: 0
    });
  };

  render() {
    return (
      <Paper
        onMouseDown={this.revealStart}
        onTouchStart={this.revealStart}
        onMouseUp={this.revealEnd}
        onTouchCancel={this.revealEnd}
        onTouchEnd={this.revealEnd}
        className="RoleCard"
      >
        <Typography variant="h5">Hello, {this.props.playerName}.</Typography>
        <PlaceholderTypography
          predicate={this.state.revealState === RevealState.WAITING}
          className="pt1"
        >
          When you're ready, hold down to reveal your role.
        </PlaceholderTypography>

        <PlaceholderTypography
          predicate={this.state.revealState === RevealState.REVEALED}
          className="pt6 pb6"
        >
          You are a member of the <strong>{this.props.team}</strong> team!
        </PlaceholderTypography>

        <LinearProgress
          variant="determinate"
          value={this.state.revealProgress}
          className="mt2"
        />
      </Paper>
    );
  }
}
