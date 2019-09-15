import * as React from "react";
import { Paper, Typography } from "@material-ui/core";
import PlaceholderTypography from "./PlaceholderTypography";
import "./RoleCard.css";

interface Props {
  playerName: string;
  team: string;
  isRevealed: boolean;
}

export default class RoleCard extends React.PureComponent<Props> {
  render() {
    return (
      <Paper className="RoleCard">
        <Typography variant="h5">Hello, {this.props.playerName}.</Typography>
        <PlaceholderTypography
          predicate={!this.props.isRevealed}
          className="mt1"
        >
          When you're ready, hold down to reveal your role.
        </PlaceholderTypography>

        <PlaceholderTypography
          predicate={this.props.isRevealed}
          className="mt6 mb6"
        >
          You are a member of the <strong>{this.props.team}</strong> team!
        </PlaceholderTypography>
      </Paper>
    );
  }
}
