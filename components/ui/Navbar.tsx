"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { APP_CONFIG, ROUTES } from "@/lib/config";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerActive, setDrawerActive] = useState(false); // Para animación
  const drawerTimeout = useRef<NodeJS.Timeout | null>(null);

  // Maneja el montaje/desmontaje para animación de salida y entrada
  useEffect(() => {
    if (mobileOpen) {
      setDrawerVisible(true);
      // Forzar animación en el siguiente tick
      setTimeout(() => setDrawerActive(true), 10);
    } else if (drawerVisible) {
      setDrawerActive(false);
      drawerTimeout.current = setTimeout(() => setDrawerVisible(false), 300);
    }
    return () => {
      if (drawerTimeout.current) clearTimeout(drawerTimeout.current);
    };
  }, [mobileOpen]);

  const InfoSection: React.FC = () => {
    return (
      <div className="flex items-center gap-2">

        {isLoggedIn ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="bg-green-200 rounded-full p-2 ml-2 hover:bg-green-300 transition"
                onClick={handleLogout}
              >
                <LogOut className="w-6 h-6 text-green-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>
              Cerrar sesión ({authState.email})
            </TooltipContent>
          </Tooltip>
        ) : (
          <Dialog open={loginDialogOpen} onOpenChange={handleLoginDialogChange}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="bg-gray-200 rounded-full p-2 ml-2 hover:bg-gray-300 transition"
                aria-label="Iniciar sesión"
              >
                <User className="w-6 h-6 text-gray-700" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {needsVerification ? "Verificar Código" : "Iniciar Sesión"}
                </DialogTitle>
                <DialogDescription>
                  {needsVerification
                    ? `Ingresa el código enviado a ${pendingEmail}`
                    : "Accede con tu cuenta para continuar"
                  }
                </DialogDescription>
              </DialogHeader>
              {authState?.error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
                  {authState.error}
                </div>
              )}
              <form onSubmit={handleLoginSubmit} className="grid gap-4">
                {!needsVerification ? (
                  <>
                    <div className="grid gap-2">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="password">Contraseña</label>
                      <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div className="grid gap-2">
                    <label htmlFor="code">Código de Verificación</label>
                    <input
                      id="code"
                      type="text"
                      placeholder="123456"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      maxLength={6}
                      required
                      autoFocus
                    />
                    <div className="text-xs text-muted-foreground">
                      Revisa tu bandeja de entrada. El código expira en 5 minutos.
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button type="button" variant="secondary" onClick={() => handleLoginDialogChange(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {needsVerification ? "Verificar" : "Continuar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  };

  const LinksSection: React.FC<{vertical?: boolean; onItemClick?: () => void}> = ({ vertical = false, onItemClick }) => {
    const baseClass = vertical ? 'flex flex-col gap-3' : 'gap-2 hidden sm:flex';
    return (
      <div className={baseClass}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-200 transition border border-gray-300"
              asChild
            >
              <Link href={ROUTES.HOME} onClick={() => onItemClick?.()}>Inicio</Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={6}>Ir a Inicio</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-200 transition border border-gray-300"
              asChild
            >
              <Link href={ROUTES.GALERIA} onClick={() => onItemClick?.()}>Galería</Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={6}>Explorar todos los chakras</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-200 transition border border-gray-300"
                      aria-label="Colecciones"
                    >
                      Colecciones
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent sideOffset={6}>Ver colecciones</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align={vertical ? 'start' : 'end'} sideOffset={6} className="w-44">
                <DropdownMenuItem asChild>
                  <Link href="/maderas" onClick={() => onItemClick?.()}>Maderas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/santras" onClick={() => onItemClick?.()}>Santras</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent sideOffset={6}>Ver todas las colecciones</TooltipContent>
        </Tooltip>
      </div>
    );
  };

  return (
    <>
      {/* Navbar visible solo en escritorio */}
      <nav className="hidden sm:flex fixed top-0 left-0 w-full items-center justify-between px-4 py-2 bg-white/40 shadow-md rounded-b-xl backdrop-blur-sm z-50">
        {/* Info y usuario */}
        <InfoSection />
        {/* Enlaces */}
        <LinksSection />
      </nav>

      {/* Icono hamburguesa solo en móvil, fijo arriba a la derecha */}
      <button
        className="sm:hidden fixed top-3 right-4 z-50 flex items-center justify-center p-2 rounded bg-white/80 shadow-md hover:bg-gray-200 transition"
        aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setMobileOpen(prev => !prev)}
        type="button"
      >
        <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Drawer móvil: navbar completa con animación y blur */}
      {drawerVisible && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay animado */}
          <div
            className={`transition-opacity duration-300 ease-in-out fixed inset-0 bg-black/40 backdrop-blur-sm ${drawerActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer animado */}
          <div
            className={`fixed right-0 top-0 h-full w-72 shadow-lg p-6 flex flex-col bg-white/70 backdrop-blur-lg transition-all duration-300 ease-in-out
              ${drawerActive ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-lg">{APP_CONFIG.siteName}</div>
              <button aria-label="Cerrar menú" onClick={() => setMobileOpen(false)} type="button" className="p-2 rounded hover:bg-gray-100">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4"><InfoSection /></div>
            <nav className="flex flex-col gap-3 mt-4"><LinksSection vertical onItemClick={() => setMobileOpen(false)} /></nav>
            <div className="flex-1" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
