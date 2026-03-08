"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Home, Mail, User } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "#hero",
    label: "Inicio",
    icon: <Home className="w-5 h-5 text-white" />,
  },
  {
    href: "#exposiciones",
    label: "Exposiciones",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "#santras",
    label: "Santras",
    icon: (
      <Image
        src="/img/iconos/pngchakras.png"
        alt="Santras"
        width={20}
        height={20}
        className="block"
      />
    ),
  },
  {
    href: "#arte-ritual",
    label: "Arte Ritual",
    icon: (
      <Image
        src="/img/iconos/pngmaderas.png"
        alt="Arte Ritual"
        width={20}
        height={20}
        className="block"
      />
    ),
  },
  {
    href: "#otras-obras",
    label: "Otras Obras",
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    href: "#creador",
    label: "El Creador",
    icon: <User className="w-5 h-5 text-white" />,
  },
  {
    href: "#contacto",
    label: "Contacto",
    icon: <Mail className="w-5 h-5 text-white" />,
  },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));

const Navbar = (): React.JSX.Element => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Track which sections are currently intersecting
    const visible = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });

        if (visible.size === 0) return;

        // Pick the section with the highest intersection ratio
        let best = "";
        let bestRatio = -1;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActiveSection(best);
      },
      {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] px-3 py-2 rounded-full"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
      }}
      aria-label="Navegación principal"
    >
      <div className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className="flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: 36,
                    height: 36,
                    border: isActive
                      ? "2px solid rgba(255, 255, 255, 0.8)"
                      : "2px solid transparent",
                    boxShadow: isActive
                      ? "0 0 12px rgba(255, 255, 255, 0.5)"
                      : "none",
                    filter: isActive
                      ? "brightness(2) saturate(3)"
                      : "brightness(1)",
                  }}
                >
                  {item.icon}
                </a>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>
                {item.label}
                {isActive && " (Activo)"}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
