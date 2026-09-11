import Link from "next/link"
import Logo from "./logo"
import { Instagram, Facebook } from "lucide-react"
import styles from "./marketing/marketing.module.css"

export default function Footer() {
  return <footer className={styles.footer}>
    <div className={styles.footerGrid}>
      <div><Logo /><p className="mt-4">Building champions for life.<br />Weekend soccer in Queens for ages 2–5.<br />Sports programs for schools across New York.</p></div>
      <div><h3>Explore KoraKickz</h3><ul>
        <li><Link href="/soccer">Soccer</Link></li><li><Link href="/sports-programs">Sports Programs</Link></li><li><Link href="/for-schools">For Schools</Link></li><li><Link href="/mission">Our Mission</Link></li><li><Link href="/gallery">Photo Gallery</Link></li><li><Link href="/policy">Parent Policy</Link></li><li><Link href="/account">Account</Link></li>
      </ul></div>
      <div><h3>Get in Touch</h3><ul><li><a href="tel:2012333333">(201) 233-3333</a></li><li><a href="mailto:korakickz@gmail.com">korakickz@gmail.com</a></li><li><a href="https://www.instagram.com/korakickz/" target="_blank" rel="noopener noreferrer">See us on Instagram ↗</a></li></ul></div>
    </div>
    <div className={styles.footerBottom}><span>© {new Date().getFullYear()} KoraKickz. All rights reserved.</span><nav className={styles.socialLinks} aria-label="Follow KoraKickz"><a href="https://www.instagram.com/korakickz/" target="_blank" rel="noopener noreferrer" aria-label="KoraKickz on Instagram (opens in a new tab)"><Instagram size={23} aria-hidden="true" /></a><a href="https://www.facebook.com/korakickz/" target="_blank" rel="noopener noreferrer" aria-label="KoraKickz on Facebook (opens in a new tab)"><Facebook size={23} aria-hidden="true" /></a></nav></div>
  </footer>
}

