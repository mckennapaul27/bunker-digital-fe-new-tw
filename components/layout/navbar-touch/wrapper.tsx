"use client";

import { useEffect, useState } from "react";
import NavbarTouchStatic from "./static";
import dynamic from "next/dynamic";

const NavbarTouchDynamic = dynamic(() => import("./dynamic"), {
  loading: () => <NavbarTouchStatic />,
});

export default function NavbarTouchWrapper() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <>{isMounted ? <NavbarTouchDynamic /> : <NavbarTouchStatic />}</>;
}
