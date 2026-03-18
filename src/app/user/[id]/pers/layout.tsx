/** @format */

import React from "react";
import ButtonAdd from "@/components/ui/buttons/add";

export default function Profile({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className=" w-full h-full">
      <ButtonAdd isPending={false} />
      {children}
      {modal}
    </div>
  );
}
