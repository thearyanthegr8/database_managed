import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar__logo">
        <Image
          src="/image/logo.svg"
          alt="Breeze logo"
          width={60}
          height={10}
        />
      </Link>
      <ul className="navbar__list">
        <li className="navbar__list--navItem">
          <Link href="/" className="navbar__list--navItem-link">
            Shop
          </Link>
        </li>
        <li className="nav-itemnavbar__list--navItem">
          <Link href="/" className="navbar__list--navItem-link">
            Cart
          </Link>
        </li>
        <li className="navbar__list--navItem">
          <Link href="/" className="navbar__list--navItem-link">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
}
