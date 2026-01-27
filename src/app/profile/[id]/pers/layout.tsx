/** @format */

import React from "react";
import ButtonAdd from "@/components/button/add";

export default function Profile({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="absolute w-full h-full">
      <ButtonAdd />
      {children}
      {modal}
    </div>
  );
}
