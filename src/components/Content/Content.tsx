import React from "react";
import "./Content.css";
import {ReactNode} from "react";

export default function Content({ children }: {children: ReactNode}) {
  return <div className={"content"}>{children}</div>;
};

