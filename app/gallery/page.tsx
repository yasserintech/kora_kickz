import Image from "next/image"
import styles from "@/components/marketing/marketing.module.css"
import { instagramUrl } from "@/components/marketing/home"
export const metadata = { title: "Photo Gallery | KoraKickz", description: "Real smiles, new skills, and active fun from KoraKickz sports classes." }
const photos = [
  {src:"william",alt:"William smiling in green glasses at a KoraKickz class",caption:"Big smiles. Little champions.",position:"center 42%"},
  {src:"running",alt:"Children running across the grass during a KoraKickz activity",caption:"Room to run. Confidence to grow.",position:"center 62%"},
  {src:"airplane-wings",alt:"Children stretch their arms out while balancing a foot on a soccer ball",caption:"Finding balance. Building confidence.",position:"center 69%"},
  {src:"laughing",alt:"Children laughing together in their KoraKickz shirts",caption:"New friends. Shared laughter.",position:"center 65%"},
  {src:"field-ball-control",alt:"A young player practicing ball control on an outdoor soccer field",caption:"New skills, one touch at a time.",position:"center 62%"},
  {src:"field-training",alt:"Two young players practicing with soccer balls on an outdoor field",caption:"Space to practice. Skills to build.",position:"center 69%"},
]
export default function GalleryPage(){return <main className={styles.site}>
  <header className={styles.pageIntro}><div><p className={styles.eyebrow}>OUR PHOTO GALLERY</p><h1>This is KoraKickz.</h1><p>A look at the smiles, friendships, and everyday moments that make our classes special.</p></div></header>
  <section className={styles.section}><div className={styles.galleryGrid}>{photos.map((photo,i)=><figure key={photo.src}><a href={`/photos/${photo.src}.jpeg`} target="_blank" rel="noopener noreferrer" aria-label={`View full photo: ${photo.alt}`}><div className={styles.galleryPhoto}><Image src={`/photos/${photo.src}.jpeg`} alt={photo.alt} fill priority={i===0} sizes="(max-width: 700px) 100vw, 50vw" style={{objectFit:"cover",objectPosition:photo.position}} /></div></a><figcaption className={styles.galleryCaption}>{photo.caption}</figcaption></figure>)}</div></section>
  <section className={styles.section} style={{paddingTop:0}}><div className={styles.instagramCallout}><h2>Want to see our videos?</h2><p>Watch the games, activities, and fun on our Instagram.</p><a className={styles.primary} href={instagramUrl} target="_blank" rel="noopener noreferrer">Watch on Instagram ↗</a></div></section>
</main>}


