"use client"
import { useState, useRef, type FormEvent } from "react"
import styles from "./marketing.module.css"
export default function SchoolDemoForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const requestId = useRef("")
  const requestPayload = useRef("")
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    const payload = JSON.stringify(values)
    if (requestPayload.current !== payload) { requestId.current = crypto.randomUUID(); requestPayload.current = payload }
    setStatus("sending")
    setError("")
    try {
      const response = await fetch("/api/school-demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, requestId: requestId.current }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "We couldn’t send your request. Please try again or email us.")
      setStatus("success")
      form.reset()
    } catch (cause) {
      setStatus("error")
      setError(cause instanceof Error ? cause.message : "We couldn’t send your request. Please email korakickz@gmail.com.")

    }
  }
  if (status === "success") return <div role="status" className={styles.quote}><h3>Thank you for your interest!</h3><p>Your demo request has been submitted. Our team will contact you to learn more about your school and arrange a time.</p></div>
  return <form className={styles.form} onSubmit={submit}>
    <label className={styles.field}>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
    <label className={styles.field}>School name<input name="school" autoComplete="organization" required minLength={2} maxLength={160} /></label>
    <label className={styles.field}>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
    <label className={styles.field}>Phone number<input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} /></label>
    <label className={`${styles.field} ${styles.full}`}>Student age group<select name="ageGroup" required defaultValue=""><option value="" disabled>Select an age group</option><option>Daycare / Preschool</option><option>Elementary School</option><option>Middle School</option><option>High School</option><option>Multiple Age Groups</option></select></label>
    <label className={`${styles.field} ${styles.full}`}>Anything else we should know? (Optional)<textarea name="message" rows={4} maxLength={2000} placeholder="Sports you’re interested in, approximate group size, or scheduling needs" /></label>
    <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <p className={styles.full} style={{fontSize:14,color:"#556078"}}>We’ll use these details to respond to your enquiry and arrange your demo. Please don’t include children’s personal information.</p>
    {status === "error" && <div className={`${styles.notice} ${styles.full}`} role="alert">{error} <a href="mailto:korakickz@gmail.com" style={{textDecoration:"underline"}}>Email KoraKickz</a></div>}
    <div className={styles.full}><button type="submit" className={styles.primary} disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request My Free Demo"}</button></div>
  </form>
}

