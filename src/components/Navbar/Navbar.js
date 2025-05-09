"use client"
import { Bot, Menu } from "lucide-react"

import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

import { AuthContext } from "@/context/auth"
import { logout } from "@/services/auth"
import { destroyToken, getToken } from "@/helpers/auth"

import "./Navbar.css"
import Link from "next/link"

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const pathname = usePathname()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const isActive = (path) => pathname === path

  async function handleLogout() {
    try {
      const token = getToken()
      if (token) {
        const response = await logout({ token })
        const { message } = await response.json()
        alert(message)
      }
      destroyToken()
      setIsLoggedIn(false)
      router.push("/auth/login")
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  return (
    <nav className="navbar">
      <Link href="/">
        <div className="navbar-logo">
          <Bot />
          <p>PeerBot</p>
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

      {/* Mobile menu button */}
      <button className="mobile-menu-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <Menu />
      </button>

      {/* Mobile dropdown menu */}
      {isDropdownOpen && (
        <div className="mobile-dropdown">
          <ul className="mobile-dropdown-links">
            <li className={isActive("/") ? "active" : ""}>
              <Link href="/" onClick={() => setIsDropdownOpen(false)}>
                Home
              </Link>
            </li>
            <li className={isActive("/about") ? "active" : ""}>
              <Link href="/about" onClick={() => setIsDropdownOpen(false)}>
                About
              </Link>
            </li>
            <li className={isActive("/dashboard") ? "active" : ""}>
              <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li className={isActive("/explore") ? "active" : ""}>
              <Link href="/explore" onClick={() => setIsDropdownOpen(false)}>
                Explore
              </Link>
            </li>
            <li className={isActive("/auth/login") ? "active" : ""}>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout()
                    setIsDropdownOpen(false)
                  }}
                  className="logout-button"
                >
                  Logout
                </button>
              ) : (
                <Link href="/auth/login" onClick={() => setIsDropdownOpen(false)}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
