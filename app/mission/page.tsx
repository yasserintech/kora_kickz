import Image from "next/image"
import Link from "next/link"
import styles from "@/components/marketing/marketing.module.css"
export const metadata = { title: "Our Mission | KoraKickz", description: "Meet Coach Mo, the founder of KoraKickz, and discover why we bring affordable sports opportunities to children and schools." }
export default function MissionPage() {
  return <main className={styles.site}>
    <header className={styles.pageIntro}><div><p className={styles.eyebrow}>OUR MISSION</p><h1>Meet Coach Mo</h1><p>Owner. Head Coach. A lifelong believer in what sports can do for a child.</p></div></header>
    <section className={`${styles.section} ${styles.storyGrid}`}>
      <figure><div className={styles.storyPhoto}><Image src="/photos/childhood.jpeg" alt="Coach Mo as a child in his red soccer uniform on the field" fill priority sizes="(max-width: 700px) 100vw, 45vw" style={{objectFit:"cover",transform:"scale(1.23)",objectPosition:"center 58%"}} /></div><figcaption className={styles.galleryCaption}>Where the story began.</figcaption></figure>
      <div className={styles.storyText}><p className={styles.eyebrow}>WHY I STARTED KORAKICKZ</p><h2>Sports changed my life.</h2>
      <p>Growing up, I had a father who worked long hours and a stay-at-home mom. Because of that, I wasn’t exposed to sports unless we did our own research and found programs on our own. Most programs were expensive and weren’t always affordable.</p>
      <p>I discovered soccer at 12 and boxing at 16. Before that, I was the kid with too much energy and not enough direction. I made a lot of mistakes and made choices I’m not proud of.</p>
      <p>Then I found sports—and everything changed. Sports disciplined me. They gave me structure, confidence, and a sense of purpose. They taught me respect, perseverance, and the value of hard work—lessons that continue to guide me every day.</p></div>
    </section>
    <div className={styles.benefitSection}><section className={`${styles.section} ${styles.storyGrid}`}>
      <div className={styles.storyText}><h2>Giving every child<br />that opportunity.</h2>
      <p>That experience inspired KoraKickz. I created this program because I believe every child deserves the opportunity to discover a sport they love at an early age.</p>
      <p>Too often, children miss out simply because families don’t have the time, transportation, or financial flexibility to enroll them in programs outside of school.</p>
      <p>That’s why KoraKickz brings sports directly into schools. By removing those barriers, we give children the chance to explore new passions, stay active, build confidence, and develop lifelong skills in a place where they already feel comfortable.</p>
      </div><figure><div className={styles.storyPhoto}><Image src="/photos/coaching.jpeg" alt="Coach Mo leading a soccer activity with children at the goals" fill sizes="(max-width: 700px) 100vw, 50vw" style={{objectFit:"cover",objectPosition:"center 65%"}} /></div><figcaption className={styles.galleryCaption}>From discovering a passion to sharing it.</figcaption></figure>
    </section></div>
    <section className={styles.section}><blockquote className={styles.quote}>Because sometimes, one opportunity is all it takes to change a child’s future.</blockquote><div className={styles.actions} style={{marginTop:28}}><Link href="/for-schools" className={styles.primary}>Bring KoraKickz to Your School</Link><Link href="/find-my-class" className={styles.secondary}>Find My Class</Link></div></section>
  </main>
}
