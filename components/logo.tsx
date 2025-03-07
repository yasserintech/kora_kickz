import type { FC } from "react"
import Image from "next/image"

const Logo: FC = () => {
  return (
    <div className="flex items-center gap-4">
      <Image src="/koraaaa.webp" alt="korakickz logo" width={70} height={70} className="rounded-full"/>
      {/* <div className="bg-red-600 h-10 w-10 rounded-full flex items-center justify-center mr-2">
        <span className="text-white font-bold text-xl">K</span>
      </div> */}
      <span className="text-white font-bold text-xl">KORAKICKZ</span>
    </div>
  )
}

export default Logo

