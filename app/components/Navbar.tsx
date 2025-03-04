import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import React, { Suspense } from "react";
import { GiPotato } from "react-icons/gi";
import { IoLogIn } from "react-icons/io5";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <div className="bg-base-300">
      <div className="navbar shadow-sm container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/productos">
                  <GiPotato className="size-6" />
                  Productos
                </Link>
              </li>
              {/* <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li> */}
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            EcoMerc
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/productos">
                <GiPotato className="size-6" />
                Productos
              </Link>
            </li>
            {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <Suspense>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "40px",
                      height: "40px",
                    },
                  },
                }}
                showName
              />
            </Suspense>
          ) : (
            <Link href="/login" className="btn btn-primary">
              <IoLogIn className="size-6" />
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
