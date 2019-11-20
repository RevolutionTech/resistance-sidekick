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

const getMainCopy = (
  revealState: RevealState,
  team: string
): React.ReactNode => {
  switch (revealState) {
    case RevealState.WAITING:
      return (
        <>
          When you&apos;re ready, hold down the button below to reveal your
          role.
        </>
      );
    case RevealState.HOLDING:
      return <>Keep holding down to see your role.</>;
    case RevealState.REVEALED:
      return (
        <>
          You are a member of the <strong>{team}</strong> team!
        </>
      );
    case RevealState.PASSING:
      return <>Now pass the device to the player on your left.</>;
    default:
      return <>&nbsp;</>;
  }
};

export const RoleCard: React.FC<Props> = (props: Props) => (
  <Paper className="RoleCard">
    <Typography variant="h5">
      {props.revealState === RevealState.PASSING ? "Thanks" : "Hello"},{" "}
      {props.playerName}.
    </Typography>
    <Typography className="MainCopy pt1 pb2">
      {getMainCopy(props.revealState, props.team)}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      size="large"
      disabled={props.revealState === RevealState.PASSING}
      onMouseDown={props.onRevealStart}
      onTouchStart={props.onRevealStart}
      onMouseUp={props.onRevealEnd}
      onMouseLeave={props.onRevealEnd}
      onTouchCancel={props.onRevealEnd}
      onTouchEnd={props.onRevealEnd}
    >
      Hold to Reveal <VisibilityIcon className="ml05 RevealButtonIcon" />
    </Button>
  </Paper>
);
