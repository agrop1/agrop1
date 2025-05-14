"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [renderPage] = useAutoAnimate({
    duration: 150,
    easing: "ease-in",
  });

  return (
    <div
      ref={renderPage}
      className="overflow-hidden h-dvh overflow-y-auto"
      style={{ scrollbarGutter: "stable" }}
    >
      {children}
    </div>
  );
}
