import * as React from "react";
import { Paper, Typography } from "@material-ui/core";
import PlaceholderTypography from "./PlaceholderTypography";
import "./RoleCard.css";

interface Props {
  playerName: string;
  team: string;
  isRevealed: boolean;
}

export default function RoleCard(props: Props) {
  return (
    <Paper className="RoleCard">
      <Typography variant="h5">Hello, {props.playerName}.</Typography>
      <PlaceholderTypography predicate={!props.isRevealed} className="mt1">
        When you're ready, hold down to reveal your role.
      </PlaceholderTypography>

      <PlaceholderTypography predicate={props.isRevealed} className="mt6 mb6">
        You are a member of the <strong>{props.team}</strong> team!
      </PlaceholderTypography>
    </Paper>
  );
}
