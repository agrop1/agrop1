"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export default function IsRedirect() {
  const params = useSearchParams();

  const verifyIfRedirect = () => {
    if (params.get("redirect_url")) {
      return true;
    }
    return false;
  };

  const getRedirectUrl = () => {
    return params.get("redirect_url")?.split("/").pop();
  };

  return (
    verifyIfRedirect() && (
      <div className="">
        <p>Antes de ir a {getRedirectUrl()} debes iniciar sesión</p>
      </div>
    )
  );
}
