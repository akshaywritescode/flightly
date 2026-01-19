import { Plane } from "lucide-react"

export default function Logo(){
    return <div className="flex gap-1">
        <Plane
        fill="currentColor"
        size={28}
        strokeWidth={0}
      />
        <span className="text-foreground font-black text-xl">Flightly</span>
    </div>
}