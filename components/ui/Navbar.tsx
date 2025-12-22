"use client";

import React, {JSX, useState} from "react";
import Link from "next/link";
import { Settings, Home } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";


// Navbar simplificada - AdminAuth maneja su propio estado
const Navbar = (): JSX.Element => {
  const [settingsOpen, setSettingsOpen] = useState(false);
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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] px-3 py-2 rounded-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(10px)', position: 'fixed' }}>
      <div className="flex items-center gap-2" style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* Icono de Home */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-0 bg-transparent hover:bg-transparent border-none shadow-none flex items-center justify-center"
                style={{ 
                  backgroundColor: 'transparent !important', 
                  border: isActive('/') ? '2px solid rgba(255, 255, 255, 0.8)' : 'none !important', 
                  width: '36px', 
                  height: '36px',
                  boxShadow: isActive('/') ? '0 0 12px rgba(255, 255, 255, 0.5)' : 'none'
                }}
                aria-label="Inicio"
              >
                <Home className={`w-6 h-6 text-white transition-all duration-300 ${getActiveStyles(isActive('/'))}`}
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
                className="rounded-full p-0 bg-transparent hover:bg-transparent border-none shadow-none transition-all duration-300 flex items-center justify-center"
                style={{ 
                  backgroundColor: 'transparent !important', 
                  border: isActive('/maderas') ? '2px solid rgba(255, 255, 255, 0.8)' : 'none !important', 
                  width: '36px', 
                  height: '36px',
                  boxShadow: isActive('/maderas') ? '0 0 12px rgba(255, 255, 255, 0.5)' : 'none'
                }}
                aria-label="Maderas"
              >
                <Image
                  src="/img/iconos/pngmaderas.png"
                  alt="Maderas"
                  width={24}
                  height={24}
                  className={`transition-all duration-300 ${getActiveStyles(isActive('/maderas'))}`}
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
                className="rounded-full p-0 bg-transparent hover:bg-transparent border-none shadow-none transition-all duration-300 flex items-center justify-center"
                style={{ 
                  backgroundColor: 'transparent !important', 
                  border: isActive('/santras') ? '2px solid rgba(255, 255, 255, 0.8)' : 'none !important', 
                  width: '36px', 
                  height: '36px',
                  boxShadow: isActive('/santras') ? '0 0 12px rgba(255, 255, 255, 0.5)' : 'none'
                }}
                aria-label="Santras"
              >
                <Image
                  src="/img/iconos/pngchakras.png"
                  alt="Santras"
                  width={24}
                  height={24}
                  className={`transition-all duration-300 ${getActiveStyles(isActive('/santras'))}`}
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
