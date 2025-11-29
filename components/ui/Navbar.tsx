"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Settings, Home } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { AdminAuth } from "@/components/AdminAuth";

interface NavbarProps {
  // Navbar simplificada - AdminAuth maneja su propio estado
}

const Navbar: React.FC<NavbarProps> = ({}) => {
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
    <nav className="fixed top-0 left-0 z-[9999] p-4" style={{ backgroundColor: 'transparent', position: 'fixed' }}>
      <div className="flex items-center gap-3" style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
        {/* Icono de Home */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 bg-transparent hover:bg-transparent border-none shadow-none"
                style={{ backgroundColor: 'transparent !important', border: 'none !important' }}
                aria-label="Inicio"
              >
                <Home className={`w-5 h-5 text-white transition-all duration-300 ${getActiveStyles(isActive('/'))}`}
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
                  className={`w-9 h-9 transition-all duration-300 ${getActiveStyles(isActive('/maderas'))}`}
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
                  className={`w-9 h-9 transition-all duration-300 ${getActiveStyles(isActive('/santras'))}`}
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

        {/* Separador visual */}
        <div className="w-px h-6 bg-white bg-opacity-20 mx-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>

        {/* Acceso de Administrador */}
        <AdminAuth 
          adminUsername={process.env.NEXT_PUBLIC_ADMIN_USER || "El_rinchi"} 
          adminPassword={process.env.NEXT_PUBLIC_ADMIN_PASS || "***REMOVED***"} 
        />

        {/* Icono de Configuración */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full p-2 bg-transparent hover:bg-transparent border-none shadow-none"
                  aria-label="Configuración"
                >
                  <Settings className="w-5 h-5 text-white drop-shadow-lg hover:drop-shadow-xl transition-all duration-200" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Configuración</DialogTitle>
                  <DialogDescription>
                    Opciones y preferencias de la aplicación
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="text-sm text-gray-600">
                    Aquí irán las opciones de configuración
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            Configuración
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Navbar;
