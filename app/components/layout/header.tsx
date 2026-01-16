import { Card } from "@/components/ui/card";
import Logo from "../ui/Logo";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import { CurrencySwitcher } from "../ui/CurrencySwitcher";

export default function Header() {
  return (
    <header className="w-full h-[3.5rem]">
      <Card className="rounded-none w-full h-full flex items-center justify-between px-4">
        <Logo />
        <div className="flex gap-6">
          <CurrencySwitcher />
          <ThemeSwitcher defaultValue="light" />
        </div>
      </Card>
    </header>
  );
}
