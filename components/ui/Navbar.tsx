"use client";

import React, {JSX} from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// Navbar simplificada - AdminAuth maneja su propio estado
const Navbar = (): JSX.Element => {
  const pathname = usePathname();

  // Función para determinar si una ruta está activa
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Función para obtener las clases de resaltado
  const getActiveStyles = (isActive: boolean) => {
    return isActive
      ? 'brightness-200 scale-110 saturate-300'
      : 'hover:scale-105 hover:brightness-110';
  };

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-[9999] p-4 w-auto" style={{ backgroundColor: 'transparent', position: 'fixed' }}>
      <div className="flex items-center gap-2 sm:gap-3" style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* Icono de Home */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-1.5 sm:p-2 bg-transparent hover:bg-transparent border-none shadow-none"
                style={{ backgroundColor: 'transparent !important', border: 'none !important' }}
                aria-label="Inicio"
              >
                <Home className={`w-4 h-4 sm:w-5 sm:h-5 text-white transition-all duration-300 ${getActiveStyles(isActive('/'))}`}
                      style={{ color: 'white !important' }} />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            Inicio {isActive('/') && '(Activo)'}
          </TooltipContent>
        </Tooltip>

        {/* Icono de Maderas */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/maderas">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-0 bg-transparent hover:bg-transparent border-none shadow-none transition-all duration-300"
                style={{ backgroundColor: 'transparent !important', border: 'none !important' }}
                aria-label="Maderas"
              >
                <Image
                  src="/img/iconos/pngmaderas.png"
                  alt="Maderas"
                  width={36}
                  height={36}
                  className={`w-7 h-7 sm:w-9 sm:h-9 transition-all duration-300 ${getActiveStyles(isActive('/maderas'))}`}
                  style={{
                    ...(isActive('/maderas') ? {
                      filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6)) brightness(1.3)'
                    } : {}),
                    display: 'block !important'
                  }}
                />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            Maderas {isActive('/maderas') && '(Activo)'}
          </TooltipContent>
        </Tooltip>

        {/* Icono de Santras */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/santras">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-0 bg-transparent hover:bg-transparent border-none shadow-none transition-all duration-300"
                style={{ backgroundColor: 'transparent !important', border: 'none !important' }}
                aria-label="Santras"
              >
                <Image
                  src="/img/iconos/pngchakras.png"
                  alt="Santras"
                  width={36}
                  height={36}
                  className={`w-7 h-7 sm:w-9 sm:h-9 transition-all duration-300 ${getActiveStyles(isActive('/santras'))}`}
                  style={{
                    ...(isActive('/santras') ? {
                      filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6)) brightness(1.3)'
                    } : {}),
                    display: 'block !important'
                  }}
                />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            Santras {isActive('/santras') && '(Activo)'}
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Navbar;
