"use client";
import { usePathname } from "next/navigation";

import React from "react";
function inddex1Page() {
  const pathname = usePathname();

  return <Preloader />;
}

export default inddex1Page;
