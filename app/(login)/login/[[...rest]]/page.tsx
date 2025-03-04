import { SignIn } from "@clerk/nextjs";
import React, { Suspense } from "react";

export default function Login() {
  return (
    <Suspense
      fallback={<span className="loading loading-ring loading-xl"></span>}
    >
      <SignIn />
    </Suspense>
  );
}
