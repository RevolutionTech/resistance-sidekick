import * as React from "react";
import { Paper, Typography, LinearProgress } from "@material-ui/core";
import "./RoleCard.css";

enum RevealState {
  WAITING = "waiting",
  HOLDING = "holding",
  REVEALED = "revealed",
  PASSING = "passing"
}

interface Props {
  playerName: string;
  team: string;
  onComplete: () => void;
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

  componentDidMount() {
    this.setState({
      revealState: RevealState.WAITING,
      revealTimer: window.setInterval(this.updateRevealProgress, 500),
      revealProgress: 0
    });
  }

  componentWillUnmount() {
    if (this.state.revealTimer != null) {
      window.clearInterval(this.state.revealTimer);
    }
  }

  private updateRevealProgress = () => {
    if (this.state.revealState === RevealState.HOLDING) {
      if (this.state.revealProgress < 100) {
        this.setState({ revealProgress: this.state.revealProgress + 50 });
      } else {
        this.setState({ revealState: RevealState.REVEALED });
      }
    } else if (this.state.revealState === RevealState.PASSING) {
      if (this.state.revealProgress > 0) {
        this.setState({ revealProgress: this.state.revealProgress - 50 });
      } else {
        this.props.onComplete();
        this.setState({ revealState: RevealState.WAITING });
      }
    }
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
        <Typography className="pt1">{this.getMainCopy()}</Typography>
        <Typography className="pt6 pb6">{this.getRevealCopy()}</Typography>
        <LinearProgress
          variant="determinate"
          value={this.state.revealProgress}
          className="mt2"
        />
      </Paper>
    );
  }

  private revealStart = () => {
    if (this.state.revealState == RevealState.WAITING) {
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

  private getMainCopy = () => {
    switch (this.state.revealState) {
      case RevealState.WAITING:
      case RevealState.HOLDING:
        return <>When you're ready, hold down to reveal your role.</>;
      case RevealState.PASSING:
        return <>Okay. Now pass the device to the player on your left.</>;
      default:
        return <>&nbsp;</>;
    }
  };

  private getRevealCopy = () => {
    switch (this.state.revealState) {
      case RevealState.REVEALED:
        return (
          <>
            You are a member of the <strong>{this.props.team}</strong> team!
          </>
        );
      default:
        return <>&nbsp;</>;
    }
  };
}
