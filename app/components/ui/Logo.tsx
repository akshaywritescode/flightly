import { PlaneTakeoff } from "lucide-react"

export default function Logo(){
    return <div className="flex gap-1">
        <PlaneTakeoff
        fill="currentColor"
        size={30}
        strokeWidth={0}
      />
        <span className="text-foreground font-medium text-lg hidden [@media(min-width:480px)]:flex">Flightly</span>
    </div>
}