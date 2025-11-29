"use client";

import React, { useState, useEffect } from "react";
import { User, LogOut, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface AdminAuthProps {
  adminUsername?: string;
  adminPassword?: string;
}

/**
 * Componente de autenticación para administrador
 * 
 * Credenciales configuradas:
 * - Usuario: El_rinchi
 * - Contraseña: XTC#d$lS*HlkGxWw2i4&
 * 
 * Las credenciales se obtienen de variables de entorno con fallback hardcoded
 */
export function AdminAuth({ 
  adminUsername = "El_rinchi", 
  adminPassword = "XTC#d$lS*HlkGxWw2i4&" 
}: AdminAuthProps) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si ya está autenticado al cargar
    const savedAuth = localStorage.getItem('simple-admin-auth');
    if (savedAuth === 'authenticated') {
      setIsAdminMode(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === adminUsername && password === adminPassword) {
      setIsAdminMode(true);
      localStorage.setItem('simple-admin-auth', 'authenticated');
      setError("");
      setDialogOpen(false);
      setUsername("");
      setPassword("");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setIsAdminMode(false);
    localStorage.removeItem('simple-admin-auth');
    setUsername("");
    setPassword("");
    setError("");
    
    // Recargar la página para aplicar cambios
    window.location.reload();
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setError("");
      setUsername("");
      setPassword("");
    }
  };

  if (isLoading) {
    return null; // No renderizar nada mientras carga
  }

  return (
    <>
      {/* Barra de administrador si está autenticado */}
      {isAdminMode && (
        <div className="fixed top-0 left-0 right-0 z-[10000] bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
          <span className="text-sm font-medium">🔧 Modo Administrador Activo</span>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-blue-700"
          >
            Salir del Modo Admin
          </Button>
        </div>
      )}

      {/* Ícono en la navbar */}
      <Tooltip>
        <TooltipTrigger asChild>
          {isAdminMode ? (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full p-2 bg-transparent hover:bg-transparent border-none shadow-none"
              onClick={handleLogout}
              aria-label="Salir del modo admin"
            >
              <LogOut className="w-5 h-5 text-blue-400 drop-shadow-lg hover:drop-shadow-xl transition-all duration-200" />
            </Button>
          ) : (
            <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full p-2 bg-transparent hover:bg-transparent border-none shadow-none"
                  aria-label="Acceso de administrador"
                >
                  <User className="w-5 h-5 text-white drop-shadow-lg hover:drop-shadow-xl transition-all duration-200" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Acceso de Administrador</DialogTitle>
                  <DialogDescription>
                    Ingresa tus credenciales para acceder al modo de edición
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Usuario</Label>
                    <Input
                      id="admin-username"
                      type="text"
                      placeholder="Nombre de usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                      {error}
                    </div>
                  )}
                  
                  <DialogFooter>
                    <Button type="submit" className="w-full">
                      Acceder al Modo Admin
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>
          {isAdminMode ? "Salir del modo admin" : "Acceso de administrador"}
        </TooltipContent>
      </Tooltip>
    </>
  );
}
