import * as React from "react";
import { Paper, Typography, Button } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
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
      <Paper className="RoleCard">
        <Typography variant="h5">
          {this.props.revealState === RevealState.PASSING ? "Thanks" : "Hello"},{" "}
          {this.props.playerName}.
        </Typography>
        <Typography className="MainCopy pt1 pb2">
          {this.getMainCopy()}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onMouseDown={this.props.onRevealStart}
          onTouchStart={this.props.onRevealStart}
          onMouseUp={this.props.onRevealEnd}
          onMouseLeave={this.props.onRevealEnd}
          onTouchCancel={this.props.onRevealEnd}
          onTouchEnd={this.props.onRevealEnd}
        >
          Hold to Reveal <VisibilityIcon className="ml05 RevealButtonIcon" />
        </Button>
      </Paper>
    );
  }

  private getMainCopy = () => {
    switch (this.props.revealState) {
      case RevealState.WAITING:
        return (
          <>
            When you're ready, hold down the button below to reveal your role.
          </>
        );
      case RevealState.HOLDING:
        return <>Keep holding down to see your role.</>;
      case RevealState.REVEALED:
        return (
          <>
            You are a member of the <strong>{this.props.team}</strong> team!
          </>
        );
      case RevealState.PASSING:
        return <>Now pass the device to the player on your left.</>;
      default:
        return <>&nbsp;</>;
    }
  };
}
