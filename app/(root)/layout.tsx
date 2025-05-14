import AnimationProvider from "@/app/components/providers/AnimationProvider";
import Navbar from "@components/Navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div
        className="h-[calc(100dvh-64px)] overflow-hidden overflow-y-auto"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="container mx-auto p-2 py-4">
          <AnimationProvider>{children}</AnimationProvider>
        </div>
      </div>
    </>
  );
}
