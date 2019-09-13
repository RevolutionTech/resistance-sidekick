import "./RoleCard.css";
import React from "react";
import { Paper, Typography } from "@material-ui/core";

const renderOnPredicate = (msg, predicate) => {
  return predicate ? msg : <>&nbsp;</>;
};

export default function RoleCard(props) {
  return (
    <Paper className="RoleCard">
      <Typography variant="h5">Hello, {props.playerName}.</Typography>
      <Typography style={{ marginTop: "1em" }}>
        {renderOnPredicate(
          <>When you're ready, hold down to reveal your role.</>,
          !props.isRevealed
        )}
      </Typography>

      <Typography style={{ marginTop: "6em", marginBottom: "6em" }}>
        {renderOnPredicate(
          <>
            You are a member of the <strong>{props.team}</strong> team!
          </>,
          props.isRevealed
        )}
      </Typography>
    </Paper>
  );
}
