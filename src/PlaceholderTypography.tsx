import * as React from "react";
import { Typography } from "@material-ui/core";
import "./PlaceholderTypography.css";

interface Props {
  predicate: boolean;
  className: string;
  children: React.ReactNode;
}

export default function PlaceholderTypography(props: Props) {
  return (
    <Typography className={`PlaceholderTypography ${props.className}`}>
      {props.predicate ? props.children : <>&nbsp;</>}
    </Typography>
  );
}
