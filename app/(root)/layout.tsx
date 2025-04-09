import Navbar from "@components/Navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-2 py-4">{children}</div>
    </>
  );
}
