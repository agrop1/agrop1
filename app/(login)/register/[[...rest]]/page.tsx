import { SignUp } from "@clerk/nextjs";
import React, { Suspense } from "react";

export default function Register() {
  return (
    <Suspense
      fallback={<span className="loading loading-ring loading-xl"></span>}
    >
      <SignUp />
    </Suspense>
  );
}
