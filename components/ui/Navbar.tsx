"use client";

import React from "react";
import Link from "next/link";
import { Info, User, LogOut } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { APP_CONFIG, ROUTES } from "@/lib/config";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface NavbarProps {
  isLoggedIn: boolean;
  authState: any;
  handleLogout: () => void;
  loginDialogOpen: boolean;
  handleLoginDialogChange: (open: boolean) => void;
  needsVerification: boolean;
  pendingEmail: string;
  handleLoginSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  code: string;
  setCode: (v: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  authState,
  handleLogout,
  loginDialogOpen,
  handleLoginDialogChange,
  needsVerification,
  pendingEmail,
  handleLoginSubmit,
  email,
  setEmail,
  password,
  setPassword,
  code,
  setCode,
}) => (
  <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 py-2 bg-white/40 shadow-md rounded-b-xl backdrop-blur-sm z-50">
    {/* Sección izquierda - Info y usuario */}
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition cursor-help">
            <Info className="w-6 h-6 text-gray-700" />
          </span>
        </TooltipTrigger>
        <TooltipContent sideOffset={6} className="max-w-xs">
          <div className="space-y-2">
            <div className="font-semibold">{APP_CONFIG.siteName}</div>
            <div className="text-xs">{APP_CONFIG.description}</div>
            <div className="text-xs text-muted-foreground">
              Versión {APP_CONFIG.version}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
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
            {authState.error && (
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
    {/* Sección derecha - Navegación */}
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            size="sm"
            className="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-200 transition border border-gray-300"
            asChild
          >
            <Link href={ROUTES.HOME}>Inicio</Link>
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
            <Link href={ROUTES.GALERIA}>Galería</Link>
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
            <DropdownMenuContent align="end" sideOffset={6} className="w-44">
              <DropdownMenuItem asChild>
                <Link href="/maderas">Maderas</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/santras">Santras</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent sideOffset={6}>Ver todas las colecciones</TooltipContent>
      </Tooltip>
    </div>
  </nav>
);

export default Navbar;
