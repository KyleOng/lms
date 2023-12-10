"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const NavbarRoutes = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex gap-x-2 ml-auto">
      <UserButton />
    </div>
  );
};

export default NavbarRoutes;
