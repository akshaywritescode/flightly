import { Card } from "@/components/ui/card";
import Logo from "../ui/Logo";

export default function Header() {
  return (
    <header className="w-full h-[3.5rem] fixed">
      <Card className="rounded-none w-full h-full flex items-center justify-between px-4">
        <Logo />
        <div className="flex gap-3 sm:gap-6">
          
        </div>
      </Card>
    </header>
  );
}
