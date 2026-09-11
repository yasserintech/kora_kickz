import Link from "next/link"
import styles from "./marketing.module.css"

const questions = [
  { question: "What ages are weekend classes for?", answer: <>Our weekend soccer classes welcome children ages 2–5, with Parent &amp; Me for age 2 and Junior Strikers for ages 3–5.</> },
  { question: "Where are weekend classes held?", answer: <>In Astoria, Queens. Tap <Link href="/find-my-class">Find My Class</Link> for the location, schedule, and registration details.</> },
  { question: "Does my child need soccer experience?", answer: <>No experience needed! We introduce skills through playful activities and encouraging coaching.</> },
  { question: "Do parents participate?", answer: <>Parent participation is required for our age-2 Parent &amp; Me class.</> },
  { question: "What sports do you offer for schools?", answer: <>Soccer, basketball, and non-contact MMA, boxing, and wrestling fundamentals. Schools can choose one sport or explore a rotation, with activities adapted to their students’ ages.</> },
  { question: "How can our school try KoraKickz?", answer: <>Visit <Link href="/for-schools#demo">For Schools</Link> to request a free demo. We’ll follow up to discuss your students, schedule, and budget.</> },
]

export default function HomeFaq() {
  return <section className={styles.benefitSection} aria-labelledby="faq-heading">
    <div className={styles.section}>
      <p className={styles.eyebrow}>A LITTLE MORE TO KNOW</p>
      <h2 id="faq-heading">Frequently Asked Questions</h2>
      <div className={styles.faqList}>{questions.map(({question, answer}) =>
        <details className={styles.faqItem} key={question}>
          <summary>{question}<span className={styles.faqPlus} aria-hidden="true">+</span></summary>
          <div className={styles.faqAnswer}>{answer}</div>
        </details>
      )}</div>
    </div>
  </section>
}
