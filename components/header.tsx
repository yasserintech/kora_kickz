"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Logo from "./logo"
import styles from "./marketing/marketing.module.css"

const links = [["Home", "/"], ["Our Mission", "/mission"], ["Soccer", "/soccer"], ["Sports Programs", "/sports-programs"], ["Gallery", "/gallery"], ["For Schools", "/for-schools"], ["Account", "/account"]]
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return <header className={styles.header}>
    <div className={styles.headerInner}>
      <Link href="/" aria-label="KoraKickz home"><Logo /></Link>
      <nav className={styles.nav} aria-label="Main navigation">
        {links.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}
        <Link className={styles.navCta} href="/find-my-class">Find My Class</Link>
      </nav>
      <button className={styles.menuButton} onClick={() => setIsMenuOpen(open => !open)} aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">{isMenuOpen ? <X /> : <Menu />}</button>
    </div>
    {isMenuOpen && <nav id="mobile-navigation" className={styles.mobileNav} aria-label="Mobile navigation">
      {[...links, ["Find My Class", "/find-my-class"]].map(([name, href]) => <Link key={href} href={href} onClick={() => setIsMenuOpen(false)}>{name}</Link>)}
    </nav>}
  </header>
}
