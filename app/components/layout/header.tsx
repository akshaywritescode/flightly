import { Card } from "@/components/ui/card";
import Logo from "../ui/Header/Logo";
import Image from "next/image";
import Avatar from "@/app/assets/avatar.jpg";
import { useState } from "react";

import {
  BellDot,
  Settings,
  PlaneTakeoff,
  Building,
  BusIcon,
  CarIcon,
  TrainIcon,
  Palmtree,
  Menu,
} from "lucide-react";

const servicesData = [
  {
    serviceName: "Flights",
    isSelected: true,
    icon: PlaneTakeoff,
  },
  {
    serviceName: "Hotels",
    isSelected: false,
    icon: Building,
  },
  {
    serviceName: "Trains",
    isSelected: false,
    icon: TrainIcon,
  },
  {
    serviceName: "Cabs",
    isSelected: false,
    icon: CarIcon,
  },
  {
    serviceName: "Buses",
    isSelected: false,
    icon: BusIcon,
  },
  {
    serviceName: "Holidays",
    isSelected: false,
    icon: Palmtree,
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full h-[4.5rem] md:h-[5rem] fixed left-0 z-10 shadow-sm">
      <Card className="rounded-none w-full h-full flex items-center justify-between px-4">
        {open && (
          <div className="absolute top-[5rem] left-0 w-full bg-white shadow-md md:hidden">
            <ul className="flex flex-col divide-y">
              {servicesData.map((service) => (
                <li
                  key={service.serviceName}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <service.icon className="w-4 h-4 text-black" />
                  <span className="text-sm">{service.serviceName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Logo />
        <div className="hidden md:block">
          <ul className="flex gap-6 bg-black/5 justify-evenly py-[0.6rem] px-4 rounded-lg">
            {servicesData.map((service) => (
              <li key={service.serviceName}>
                <div className="flex flex-col items-center gap-2 w-12 cursor-pointer">
                  <service.icon
                    className={`w-4 h-4 ${
                      service.isSelected ? "text-blue-700" : "text-black"
                    }`}
                    strokeWidth={2}
                  />
                  <span
                    className={`text-[0.6rem] font-medium ${
                      service.isSelected ? "text-blue-700" : "text-black"
                    }`}
                  >
                    {service.serviceName}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {/* Desktop icons */}
          <div className="hidden md:flex items-center gap-4">
            <BellDot className="text-black/70" size={20} />
            <Settings className="text-black/70" size={20} />
            <div className="w-8 h-8 overflow-hidden rounded-full">
              <Image
                src={Avatar}
                width={90}
                height={90}
                alt="avatar"
                unoptimized
                quality={100}
              />
            </div>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            <Menu size={22} />
          </button>
        </div>
      </Card>
    </header>
  );
}
