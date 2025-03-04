import IsRedirect from "@/app/components/IsRedirect";
import Link from "next/link";
import React from "react";
import { RiArrowLeftFill } from "react-icons/ri";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh w-full flex flex-col md:flex-row items-center justify-center">
      <div className="p-6 md:min-w-[448px] flex flex-col gap-2 items-center">
        <Link href="/" className="btn rounded-full">
          <RiArrowLeftFill className="icon" />
        </Link>
        <IsRedirect />
        {children}
      </div>
      <div className="w-full h-full hidden lg:block login-bg"></div>
    </div>
  );
}
