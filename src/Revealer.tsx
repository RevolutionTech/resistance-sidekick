import React, { useState, useEffect, useRef } from "react";
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

  const revealStart = (): void => {
    if (revealState === RevealState.WAITING) {
      setRevealState(RevealState.HOLDING);
    }
  };

  const revealEnd = (): void => {
    if (revealState === RevealState.HOLDING) {
      setRevealState(RevealState.WAITING);
      setRevealProgress(0);
    } else if (revealState === RevealState.REVEALED) {
      setRevealState(RevealState.PASSING);
    }
  };

  const renderBody = (): React.ReactNode => {
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
  };

  // This feels really ugly, but the refs seem to be necessary
  // for anything that's read in the timer function
  const currentPlayerIndexRef = useRef(currentPlayerIndex);
  currentPlayerIndexRef.current = currentPlayerIndex;
  const revealStateRef = useRef(revealState);
  revealStateRef.current = revealState;
  const revealProgressRef = useRef(revealProgress);
  revealProgressRef.current = revealProgress;

  const updateRevealProgress = (): void => {
    if (revealStateRef.current === RevealState.HOLDING) {
      if (revealProgressRef.current < 100) {
        setRevealProgress(revealProgressRef.current + 2);
      } else {
        setRevealState(RevealState.REVEALED);
      }
    } else if (revealStateRef.current === RevealState.PASSING) {
      if (revealProgressRef.current > 0) {
        setRevealProgress(revealProgressRef.current - 1);
      } else {
        setCurrentPlayerIndex(currentPlayerIndexRef.current + 1);
        setRevealState(RevealState.WAITING);
      }
    }
  };

  useEffect(() => {
    const revealTimer = window.setInterval(updateRevealProgress, 20);
    return (): void => window.clearInterval(revealTimer);
  }, []);

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
