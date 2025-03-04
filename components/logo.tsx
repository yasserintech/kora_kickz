import type { FC } from "react"

const Logo: FC = () => {
  return (
    <div className="flex items-center">
      <div className="bg-red-600 h-10 w-10 rounded-full flex items-center justify-center mr-2">
        <span className="text-white font-bold text-xl">K</span>
      </div>
      <span className="text-white font-bold text-xl">KORAKICKZ</span>
    </div>
  )
}

export default Logo

