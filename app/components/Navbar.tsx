"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { Suspense } from "react";
import { IoLogIn } from "react-icons/io5";
import {
  FaLeaf,
  FaShoppingBasket,
  FaUser,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

export default function Navbar() {
  const user = useUser();

  return (
    <div className="bg-base-100">
      <div className="navbar shadow-sm sticky top-0 z-50 container mx-auto">
        {/* Navbar Start: Dropdown para móvil */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/productos" className="flex items-center gap-2">
                  <FaShoppingBasket /> Productos
                </Link>
              </li>
              <li>
                <Link href="/vendedor" className="flex items-center gap-2">
                  <FaUser /> Vender
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="flex items-center gap-2">
                  <FaInfoCircle /> Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="flex items-center gap-2">
                  <FaEnvelope /> Contacto
                </Link>
              </li>
            </ul>
          </div>
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors ml-2"
          >
            <FaLeaf className="h-8 w-8" />
            <span className="text-xl font-bold hidden sm:inline">
              ECOMERCADO
            </span>
          </Link>
        </div>

        {/* Navbar Center: Enlaces desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link
                href="/productos"
                className="flex items-center gap-2 text-gray-600 hover:text-teal-600"
              >
                <FaShoppingBasket /> <span>Productos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/vendedor"
                className="flex items-center gap-2 text-gray-600 hover:text-teal-600"
              >
                <FaUser /> <span>Vender</span>
              </Link>
            </li>
            <li>
              <Link
                href="/nosotros"
                className="flex items-center gap-2 text-gray-600 hover:text-teal-600"
              >
                <FaInfoCircle /> <span>Nosotros</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="flex items-center gap-2 text-gray-600 hover:text-teal-600"
              >
                <FaEnvelope /> <span>Contacto</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Navbar End: Login o Avatar */}
        <div className="navbar-end">
          {user.isSignedIn ? (
            <Suspense>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "40px",
                      height: "40px",
                    },
                    userButtonBox: {
                      "&:hover": {
                        backgroundColor: "rgb(20 184 166 / 0.1)",
                      },
                    },
                  },
                }}
                showName
              />
            </Suspense>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <IoLogIn className="h-5 w-5" />
              <span>Iniciar Sesión</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
