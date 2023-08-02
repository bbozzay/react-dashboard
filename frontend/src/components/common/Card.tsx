"use client";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;
export default function Card(props: Props) {
  const { children } = props;
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
