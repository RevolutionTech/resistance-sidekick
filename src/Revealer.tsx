import React, { useState, useEffect, useCallback } from "react";
import { Typography, LinearProgress } from "@material-ui/core";
import { RevealState, RoleCard } from "./RoleCard";
import "./Revealer.css";

export enum Team {
  RESISTANCE = "Resistance",
  SPY = "Spy",
}

export interface PlayerInfo {
  name: string;
  team: Team;
}

interface Props {
  players: PlayerInfo[];
}

export const Revealer: React.FC<Props> = (props: Props) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [revealState, setRevealState] = useState<RevealState>(
    RevealState.WAITING
  );
  const [revealProgress, setRevealProgress] = useState<number>(0);

  const revealStart = useCallback(() => {
    if (revealState === RevealState.WAITING) {
      setRevealState(RevealState.HOLDING);
    }
  }, [revealState]);

  const revealEnd = useCallback(() => {
    if (revealState === RevealState.HOLDING) {
      setRevealState(RevealState.WAITING);
      setRevealProgress(0);
    } else if (revealState === RevealState.REVEALED) {
      setRevealState(RevealState.PASSING);
    }
  }, [revealState]);

  const renderBody = useCallback(() => {
    const currentPlayer = props.players[currentPlayerIndex];
    if (currentPlayer) {
      return (
        <RoleCard
          playerName={currentPlayer.name}
          team={currentPlayer.team}
          revealState={revealState}
          onRevealStart={revealStart}
          onRevealEnd={revealEnd}
        />
      );
    } else {
      return <Typography>All set!</Typography>;
    }
  }, [revealState, currentPlayerIndex]);

  const updateRevealProgress = useCallback(() => {
    if (revealState === RevealState.HOLDING) {
      if (revealProgress < 100) {
        setRevealProgress(revealProgress + 2);
      } else {
        setRevealState(RevealState.REVEALED);
      }
    } else if (revealState === RevealState.PASSING) {
      if (revealProgress > 0) {
        setRevealProgress(revealProgress - 1);
      } else {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
        setRevealState(RevealState.WAITING);
      }
    }
  }, [revealState, revealProgress]);

  useEffect(() => {
    const revealTimer = window.setInterval(updateRevealProgress, 20);
    return (): void => window.clearInterval(revealTimer);
  }, [updateRevealProgress]);

  return (
    <>
      <LinearProgress
        variant="determinate"
        value={revealProgress}
        className="RevealProgress"
      />
      {renderBody()}
    </>
  );
};
