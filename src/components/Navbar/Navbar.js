"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { AuthContext } from "@/context/auth";
import { logout } from "@/services/auth";
import { destroyToken, getToken } from "@/helpers/auth";

import "./Navbar.css";
import Link from "next/link";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;

  async function handleLogout() {
    try {
      const token = getToken();
      if (token) {
        const response = await logout({ token });
        const { message } = await response.json();
        alert(message);
      }
      destroyToken();
      setIsLoggedIn(false);
      router.push("/auth/login")
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  return (
    <nav className="navbar">
      <Link href="/">
        <div className="navbar-logo">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-icon lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        <p>ChatBot</p>
        </div>
      </Link>
      
      <ul className="navbar-links">
        <li className={isActive("/") ? "active" : ""}>
          <Link href="/">Home</Link>
        </li>
        <li className={isActive("/about") ? "active" : ""}>
          <Link href="/about">About</Link>
        </li>
        <li className={isActive("/dashboard") ? "active" : ""}>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className={isActive("/explore") ? "active" : ""}>
          <Link href="/explore">Explore</Link>
        </li>
        <li className={isActive("/auth/login") ? "active" : ""}>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          ) : (
            <Link href="/auth/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
