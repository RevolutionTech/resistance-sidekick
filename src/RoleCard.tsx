import * as React from "react";
import { Paper, Typography } from "@material-ui/core";
import "./RoleCard.css";

export enum RevealState {
  WAITING = "waiting",
  HOLDING = "holding",
  REVEALED = "revealed",
  PASSING = "passing"
}

interface Props {
  playerName: string;
  team: string;
  revealState: RevealState;
  onRevealStart: () => void;
  onRevealEnd: () => void;
}

export class RoleCard extends React.PureComponent<Props> {
  render() {
    return (
      <Paper
        onMouseDown={this.props.onRevealStart}
        onTouchStart={this.props.onRevealStart}
        onMouseUp={this.props.onRevealEnd}
        onTouchCancel={this.props.onRevealEnd}
        onTouchEnd={this.props.onRevealEnd}
        className="RoleCard"
      >
        <Typography variant="h5">Hello, {this.props.playerName}.</Typography>
        <Typography className="pt1">{this.getMainCopy()}</Typography>
        <Typography className="pt6 pb6">{this.getRevealCopy()}</Typography>
      </Paper>
    );
  }

  private getMainCopy = () => {
    switch (this.props.revealState) {
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
    switch (this.props.revealState) {
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
