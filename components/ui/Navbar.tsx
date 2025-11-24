"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, LogOut, Settings, Home } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  isLoggedIn?: boolean;
  authState?: { email?: string; error?: string; [key: string]: unknown };
  handleLogout?: () => void;
  loginDialogOpen?: boolean;
  handleLoginDialogChange?: (open: boolean) => void;
  needsVerification?: boolean;
  pendingEmail?: string;
  handleLoginSubmit?: (e: React.FormEvent) => void;
  email?: string;
  setEmail?: (v: string) => void;
  password?: string;
  setPassword?: (v: string) => void;
  code?: string;
  setCode?: (v: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn = false,
  authState = {},
  handleLogout = () => {},
  loginDialogOpen = false,
  handleLoginDialogChange = () => {},
  needsVerification = false,
  pendingEmail = '',
  handleLoginSubmit = () => {},
  email = '',
  setEmail = () => {},
  password = '',
  setPassword = () => {},
  code = '',
  setCode = () => {},
}) => {
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
      ? 'drop-shadow-2xl brightness-150 scale-105 filter saturate-150 shadow-white shadow-lg'
      : 'drop-shadow-lg hover:drop-shadow-xl hover:scale-105 hover:brightness-110';
  };

  return (
    <nav className="fixed top-0 left-0 z-50 p-4">
      <div className="flex items-center gap-3">
        {/* Icono de Home */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 bg-transparent hover:bg-transparent border-none shadow-none"
                aria-label="Inicio"
              >
                <Home className={`w-5 h-5 text-white transition-all duration-300 ${getActiveStyles(isActive('/'))}`} />
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
                aria-label="Maderas"
              >
                <Image
                  src="/img/iconos/pngmaderas.png"
                  alt="Maderas"
                  width={36}
                  height={36}
                  className={`w-9 h-9 transition-all duration-300 ${getActiveStyles(isActive('/maderas'))}`}
                  style={isActive('/maderas') ? {
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6)) brightness(1.3)'
                  } : {}}
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
                aria-label="Santras"
              >
                <Image
                  src="/img/iconos/pngchakras.png"
                  alt="Santras"
                  width={36}
                  height={36}
                  className={`w-9 h-9 transition-all duration-300 ${getActiveStyles(isActive('/santras'))}`}
                  style={isActive('/santras') ? {
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6)) brightness(1.3)'
                  } : {}}
                />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            Santras {isActive('/santras') && '(Activo)'}
          </TooltipContent>
        </Tooltip>

        {/* Separador visual */}
        <div className="w-px h-6 bg-white bg-opacity-20 mx-1"></div>

        {/* Icono de Login */}
        <Tooltip>
          <TooltipTrigger asChild>
            {isLoggedIn ? (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 bg-transparent hover:bg-transparent border-none shadow-none"
                onClick={handleLogout}
                aria-label="Cerrar sesión"
              >
                <LogOut className="w-5 h-5 text-white drop-shadow-lg hover:drop-shadow-xl transition-all duration-200" />
              </Button>
            ) : (
              <Dialog open={loginDialogOpen} onOpenChange={handleLoginDialogChange}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-2 bg-transparent hover:bg-transparent border-none shadow-none"
                    aria-label="Iniciar sesión"
                  >
                    <User className="w-5 h-5 text-white drop-shadow-lg hover:drop-shadow-xl transition-all duration-200" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Iniciar sesión</DialogTitle>
                    <DialogDescription>
                      Ingresa tus credenciales para continuar
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    {!needsVerification ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Contraseña</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="code">Código de verificación</Label>
                        <Input
                          id="code"
                          type="text"
                          placeholder="000000"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                        />
                        <p className="text-sm text-gray-500">
                          Se envió un código de verificación a {pendingEmail}
                        </p>
                      </div>
                    )}
                    {authState.error && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                        {authState.error}
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleLoginSubmit}
                      disabled={authState.isLoading === true}
                      className="w-full"
                    >
                      {authState.isLoading ? "Procesando..." : needsVerification ? "Verificar" : "Iniciar sesión"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            {isLoggedIn ? `Cerrar sesión (${authState.email})` : "Iniciar sesión"}
          </TooltipContent>
        </Tooltip>

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
