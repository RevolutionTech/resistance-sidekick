import * as React from "react";
import { TextField, Button, Fab } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import RefreshIcon from "@material-ui/icons/Refresh";
import Dealer from "./Dealer";
import "./Game.css";

enum GameState {
  OPTIONS = "options",
  DEAL = "deal"
}

interface State {
  gameState: GameState;
  selectedNumPlayers: number;
}

export default class Game extends React.PureComponent<{}, State> {
  private static NUM_PLAYERS_MIN = 5;
  private static NUM_PLAYERS_MAX = 10;

  state: State = {
    gameState: GameState.OPTIONS,
    selectedNumPlayers: Game.NUM_PLAYERS_MIN
  };

  componentDidMount() {
    this.reset();
  }

  private reset = () => this.setState({ gameState: GameState.OPTIONS });

  render() {
    return (
      <>
        {this.renderGame()}
        {this.renderResetButton()}
      </>
    );
  }

  private renderGame() {
    switch (this.state.gameState) {
      case GameState.OPTIONS:
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              this.setState({ gameState: GameState.DEAL });
            }}
            className="SetupContainer"
          >
            <TextField
              label="Number of players"
              type="number"
              inputProps={{
                min: Game.NUM_PLAYERS_MIN,
                max: Game.NUM_PLAYERS_MAX
              }}
              defaultValue={this.state.selectedNumPlayers}
              onChange={e =>
                this.setState({ selectedNumPlayers: parseInt(e.target.value) })
              }
              style={{ width: "100%", marginBottom: "2em" }}
            />
            <Fab variant="extended" type="submit" style={{ width: "100%" }}>
              <SendIcon className="mr025" /> Start game
            </Fab>
          </form>
        );
      case GameState.DEAL:
        return (
          <>
            <Dealer numPlayers={this.state.selectedNumPlayers} />
          </>
        );
    }
  }

  private renderResetButton() {
    switch (this.state.gameState) {
      case GameState.OPTIONS:
        return null;
      default:
        return (
          <Button onClick={this.reset} style={{ marginBottom: "2em" }}>
            <RefreshIcon className="mr025" />
            Start over?
          </Button>
        );
    }
  }
}
