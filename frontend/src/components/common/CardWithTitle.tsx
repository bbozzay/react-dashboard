"use client";

import { PropsWithChildren } from "react";
import Card from "./Card";

type Props = PropsWithChildren<{
  title: string;
  children: React.ReactNode;
}>;
export default function CardWithTitle(props: Props) {
  const { title, children } = props;
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      </div>
      <div className="mt-5">{children}</div>
    </Card>
  );
}
