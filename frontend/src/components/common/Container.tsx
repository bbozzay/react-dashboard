"use client";

import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;
export default function Container(props: Props) {
  const { children } = props;
  return <div className="w-full max-w-7xl mx-auto">{children}</div>;
}
