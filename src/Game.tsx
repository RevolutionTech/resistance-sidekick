import React, { useState, useCallback } from "react";
import { TextField, Button, Fab } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import RefreshIcon from "@material-ui/icons/Refresh";
import Deck from "card-deck";
import { Team, PlayerInfo, Revealer } from "./Revealer";
import "./Game.css";

const NUM_SPIES_BY_PLAYER_COUNT: Record<number, number> = {
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  9: 3,
  10: 4,
};

const dealPlayers = (numPlayers: number): PlayerInfo[] => {
  const numSpies = NUM_SPIES_BY_PLAYER_COUNT[numPlayers];
  const roles = new Array(numPlayers);
  roles.fill(Team.SPY, 0, numSpies);
  roles.fill(Team.RESISTANCE, numSpies);

  const deck = new Deck(roles);
  deck.shuffle();

  const players = deck.draw(numPlayers).map((team: Team, i: number) => {
    return {
      name: `Player ${i + 1}`,
      team,
    };
  });
  return players;
};

export const Game: React.FC = () => {
  const NUM_PLAYERS_MIN = 5;
  const NUM_PLAYERS_MAX = 10;

  const [selectedNumPlayers, setSelectedNumPlayers] = useState<number>(
    NUM_PLAYERS_MIN
  );
  const [players, setPlayers] = useState<PlayerInfo[] | undefined>();

  const renderGame = useCallback(
    () =>
      players == null ? (
        <form
          onSubmit={(e): void => {
            e.preventDefault();
            setPlayers(dealPlayers(selectedNumPlayers));
          }}
          className="SetupContainer"
        >
          <TextField
            label="Number of players"
            type="number"
            inputProps={{
              min: NUM_PLAYERS_MIN,
              max: NUM_PLAYERS_MAX,
            }}
            defaultValue={selectedNumPlayers}
            onChange={(e): void =>
              setSelectedNumPlayers(parseInt(e.target.value))
            }
            style={{ width: "100%", marginBottom: "2em" }}
          />
          <Fab variant="extended" type="submit" style={{ width: "100%" }}>
            <SendIcon className="mr025" /> Start game
          </Fab>
        </form>
      ) : (
        <>
          <Revealer players={players} />
        </>
      ),
    [selectedNumPlayers, players]
  );

  const renderResetButton = useCallback(
    () =>
      players && (
        <Button
          onClick={(): void => setPlayers(undefined)}
          style={{ marginBottom: "2em" }}
        >
          <RefreshIcon className="mr025" />
          Start over?
        </Button>
      ),
    [players]
  );

  return (
    <>
      {renderGame()}
      {renderResetButton()}
    </>
  );
};
