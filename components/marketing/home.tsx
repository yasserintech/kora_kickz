import Link from "next/link"
import HomeFaq from "./home-faq"
import Image from "next/image"
import { ArrowUpRight, CircleDot, Shield, Sparkles, Footprints, Users, Wallet, HeartHandshake, Instagram } from "lucide-react"
import styles from "./marketing.module.css"
export const sports = [
  { title: "Soccer", icon: CircleDot, text: "Build coordination, teamwork, and confidence through playful games and soccer fundamentals, adapted to each group’s age and experience.", href: "/soccer" },
  { title: "Basketball", icon: CircleDot, text: "Develop ball-handling skills, balance, and communication through engaging drills and games that encourage students to work together.", href: "/sports-programs#basketball" },
  { title: "Non-Contact Martial Arts", icon: Shield, text: "Explore MMA, boxing, and wrestling fundamentals through non-contact movement. Practice body awareness, self-control, and self-defense foundations—an engaging option for older students.", href: "/sports-programs#martial-arts" },
]
const benefits = [
  { title: "Pay for 8 Weeks. Play for 9 or 10.", text: "Our weekend programs typically include one or two bonus classes, giving your child more time to learn and have fun at a price designed to stay affordable for families. Check your session for the included classes.", icon: Sparkles },
  { title: "School-Funded. More Kids Included.", text: "We work directly with schools to fund sports programs so every child in the participating group can join at no additional cost to their family.", icon: Users },
  { title: "More Than One Sport", text: "Our school programs offer soccer, basketball, and non-contact martial arts. Children can explore different sports, discover new interests, and find what they love.", icon: CircleDot },
  { title: "Built Around Your School’s Budget", text: "We create affordable options around your school’s students, schedule, and budget. We bring the equipment and lead the activities.", icon: Wallet },
  { title: "Small Steps. Stronger Skills.", text: "Running, balancing, jumping, and ball games help children practice motor skills, coordination, and body control through active play.", icon: Footprints },
  { title: "Active Kids. Healthy Habits.", text: "Our classes get children moving, playing, and having fun—helping them build healthy habits and a love of being active from an early age.", icon: HeartHandshake },
]
export const instagramUrl = "https://www.instagram.com/reel/DaetQOHudvH/"
export function SportCards(){return <div className={styles.threeGrid}>{sports.map(({title,icon:Icon,text,href},i)=><Link href={href} key={title} className={styles.sportCard}><div className={styles.cardTop}><span className={styles.icon}><Icon size={29} aria-hidden="true"/></span><span className={styles.number}>0{i+1}</span></div><h3>{title}</h3><p>{text}</p><span className={styles.cardLink}>Explore program <ArrowUpRight size={18}/></span></Link>)}</div>}
export default function Home() {
return <main className={styles.site}>
  <section className={styles.hero}><div className={styles.heroCopy}><p className={styles.eyebrow}>BIG POSSIBILITIES START WITH PLAY</p><h1>Building<br/>Champions<br/><span>For Life.</span></h1><p className={styles.lead}>Weekend soccer classes in Queens for children ages 2–5. Through playful games and encouraging coaching, little ones build confidence, learn new skills, and make friends.</p><p className={styles.location}>Join us in Astoria and let the fun begin.</p><div className={styles.actions}><Link className={styles.primary} href="/find-my-class">Find My Class <ArrowUpRight size={19}/></Link><Link className={styles.secondary} href="/for-schools">For Schools <ArrowUpRight size={19}/></Link></div></div><div className={styles.heroPhoto}><Image src="/photos/wheels.jpeg" alt="Children holding play steering wheels as they move around cones at KoraKickz" fill priority sizes="(max-width: 700px) 100vw, 55vw" className={styles.heroImage}/><div className={styles.photoLabel}><span>REAL CLASSES. REAL CONNECTIONS.</span><strong>Little adventures.<br/>Big smiles.</strong></div></div></section>
  <section className={styles.section} id="programs"><div className={styles.sectionHead}><div><p className={styles.eyebrow}>FIND THEIR NEXT FAVORITE THING</p><h2>Sports We Offer</h2></div><Link className={styles.textLink} href="/sports-programs">Explore our sports <ArrowUpRight size={18}/></Link></div><SportCards/><p className={styles.availability}>All sports available for school programs. Current weekend classes: soccer for ages 2–5.</p></section>
  <section className={styles.benefitSection}><div className={styles.section}><p className={styles.eyebrow}>MORE OPPORTUNITY. LESS FINANCIAL PRESSURE.</p><h2>Why Choose <span className={styles.red}>KoraKickz?</span></h2><p className={styles.intro}>We make sports more accessible through affordable weekend classes and school-funded programs—giving more children the chance to play, learn, and belong.</p><div className={styles.threeGrid}>{benefits.map(({title,text,icon:Icon})=><article className={styles.benefitCard} key={title}><Icon size={28} aria-hidden="true"/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  <section className={`${styles.section} ${styles.actionSection}`}><div><p className={styles.eyebrow}>THE KORAKICKZ EXPERIENCE</p><h2>See Us in Action</h2><p className={styles.intro}>The games. The laughter. The little moments of progress. Watch the fun, games, and learning on our Instagram.</p><a className={styles.primary} href={instagramUrl} target="_blank" rel="noopener noreferrer"><Instagram size={19}/> Watch on Instagram</a><p style={{marginTop:24}}><Link className={styles.textLink} href="/gallery">Explore Our Photo Gallery <ArrowUpRight size={18}/></Link></p></div><iframe className={styles.video} src="https://www.instagram.com/reel/DaetQOHudvH/embed/" title="KoraKickz classes in action on Instagram" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen/></section>
  <HomeFaq />
</main>
}



