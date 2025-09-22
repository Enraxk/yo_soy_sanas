"use client";

import React, { useState } from 'react';
import { Info, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

// Importar nueva estructura optimizada
import { SantrasCarousel, ChakraCard } from '@/components/chakras';
import { CHAKRAS } from '@/lib/chakras';
import { useAuth } from '@/hooks/useAuth';
import { APP_CONFIG, ROUTES } from '@/lib/config';
import { DEV_UTILS } from '@/lib/config';

/**
 * Componente principal de la página Home optimizada.
 * Utiliza la nueva arquitectura modular con hooks personalizados,
 * componentes especializados y configuración centralizada.
 * @returns Página principal con carrusel, galería y autenticación
 * @example
 * // La página ahora utiliza:
 * // - SantrasCarousel: Carrusel optimizado con autoplay
 * // - ChakraCard: Tarjetas con información espiritual completa
 * // - useAuth: Hook para manejo de autenticación
 * // - CHAKRAS: Datos centralizados de chakras
 */

export default function Home() {
  // Estados de la aplicación
  const [currentChakraIndex, setCurrentChakraIndex] = useState(0);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  
  // Hook de autenticación personalizado
  const { 
    authState, 
    login, 
    verifyCode, 
    logout,
    needsVerification,
    isLoggedIn,
    pendingEmail 
  } = useAuth();
  
  // Estados para el diálogo de login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  
  DEV_UTILS.log('Home component rendered', { currentChakraIndex, isLoggedIn });

  /**
   * Maneja el cambio de slide en el carrusel
   * Actualiza el índice del chakra actual para sincronizar el fondo
   */
  const handleSlideChange = (index: number) => {
    setCurrentChakraIndex(index);
    DEV_UTILS.log('Chakra changed', { index, chakra: CHAKRAS[index]?.name });
  };

  /**
   * Maneja el clic en una tarjeta de chakra
   * Navega directamente al chakra seleccionado
   */
  const handleChakraCardClick = (chakraIndex: number) => {
    setCurrentChakraIndex(chakraIndex);
    // TODO: Implementar navegación del carrusel al índice seleccionado
    DEV_UTILS.log('Chakra card clicked', { index: chakraIndex });
  };

  /**
   * Maneja el login con email y contraseña
   * Utiliza el hook useAuth para la lógica de autenticación
   */
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!needsVerification) {
      // Paso 1: Login inicial
      const result = await login({ email, password });
      if (result.ok) {
        DEV_UTILS.log('Login successful, verification needed');
        // El hook maneja automáticamente el cambio a verificación
      }
    } else {
      // Paso 2: Verificación de código
      const result = await verifyCode({ email: pendingEmail, code });
      if (result.ok) {
        setLoginDialogOpen(false);
        clearLoginForm();
        DEV_UTILS.log('Authentication completed successfully');
      }
    }
  };

  /**
   * Maneja el logout del usuario
   */
  const handleLogout = () => {
    logout();
    DEV_UTILS.log('User logged out');
  };

  /**
   * Limpia el formulario de login
   */
  const clearLoginForm = () => {
    setEmail('');
    setPassword('');
    setCode('');
  };

  /**
   * Maneja el cierre del diálogo de login
   */
  const handleLoginDialogChange = (open: boolean) => {
    setLoginDialogOpen(open);
    if (!open) {
      clearLoginForm();
    }
  };

  // Chakra actual para el fondo dinámico
  const currentChakra = CHAKRAS[currentChakraIndex] || CHAKRAS[0];

  return (
    <main 
      className="min-h-screen transition-colors duration-700 relative"
      style={{ background: currentChakra.gradient }}
    >
      {/* Indicador de debug (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-50 bg-black/50 text-white p-2 rounded text-xs">
          Chakra: {currentChakra.name} ({currentChakraIndex + 1}/7)
        </div>
      )}

      {/* Navbar optimizada con nuevas funcionalidades */}
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

          {/* Icono de usuario con estado dinámico */}
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
                    {needsVerification ? 'Verificar Código' : 'Iniciar Sesión'}
                  </DialogTitle>
                  <DialogDescription>
                    {needsVerification 
                      ? `Ingresa el código enviado a ${pendingEmail}`
                      : 'Accede con tu cuenta para continuar'
                    }
                  </DialogDescription>
                </DialogHeader>

                {/* Mostrar errores del hook useAuth */}
                {authState.error && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
                    {authState.error}
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="grid gap-4">
                  {!needsVerification ? (
                    // Paso 1: Login inicial
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={authState.isLoading}
                          required
                          autoFocus
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={authState.isLoading}
                          required
                        />
                      </div>
                    </>
                  ) : (
                    // Paso 2: Verificación de código
                    <div className="grid gap-2">
                      <Label htmlFor="code">Código de Verificación</Label>
                      <Input
                        id="code"
                        type="text"
                        placeholder="123456"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={authState.isLoading}
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
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={() => setLoginDialogOpen(false)}
                      disabled={authState.isLoading}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={authState.isLoading}
                    >
                      {authState.isLoading 
                        ? (needsVerification ? 'Verificando...' : 'Enviando...') 
                        : (needsVerification ? 'Verificar' : 'Continuar')
                      }
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
                <Link href={ROUTES.HOME}>
                  Inicio
                </Link>
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
                <Link href={ROUTES.GALERIA}>
                  Galería
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>Explorar todos los chakras</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-200 transition border border-gray-300"
                asChild
              >
                <Link href={ROUTES.COLLECTIONS}>
                  Colecciones
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>Ver todas las colecciones</TooltipContent>
          </Tooltip>
        </div>
      </nav>

      {/* Espaciador de navbar */}
      <div className="h-16" />

      {/* Carrusel optimizado con nuevo componente */}
      <SantrasCarousel 
        chakras={CHAKRAS}
        events={{ 
          onSlideChange: handleSlideChange
        }}
        className="mt-8"
      />

      {/* Descripción mejorada con información real */}
      <section className="w-full max-w-3xl mx-auto mt-10">
        <div className="bg-white/80 rounded-2xl shadow-lg p-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: currentChakra.color }}
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {currentChakra.name} - {currentChakra.sanskrit}
            </h2>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            {currentChakra.description}
          </p>
          
          <div className="flex justify-center gap-2 flex-wrap mt-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {currentChakra.element}
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {currentChakra.mantra}
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {currentChakra.location}
            </Badge>
          </div>
          
          <div className="text-sm text-gray-600 mt-4">
            Chakra {currentChakraIndex + 1} de {CHAKRAS.length} • Elemento {currentChakra.element}
          </div>
        </div>
      </section>

      {/* Galería optimizada con componentes ChakraCard */}
      <section className="w-full max-w-6xl mx-auto mt-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white/90 mb-2">
            Explora los 7 Chakras
          </h2>
          <p className="text-white/70">
            Haz clic en cualquier chakra para explorar su energía y significado espiritual
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ overflow: 'visible' }}>
          {CHAKRAS.map((chakra, idx) => (
            <ChakraCard
              key={chakra.id}
              chakra={chakra}
              isActive={idx === currentChakraIndex}
              onClick={() => handleChakraCardClick(idx)}
              showDetails={true}
              className="hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
        
        {/* Indicador del chakra activo */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {CHAKRAS.map((chakra, idx) => (
              <button
                key={chakra.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentChakraIndex 
                    ? 'scale-125 ring-2 ring-offset-2 ring-white' 
                    : 'hover:scale-110'
                }`}
                style={{ backgroundColor: chakra.color }}
                onClick={() => handleChakraCardClick(idx)}
                title={`${chakra.name} - ${chakra.sanskrit}`}
                aria-label={`Ir al chakra ${chakra.name}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Indicador de estado de autenticación mejorado */}
      {isLoggedIn && (
        <div className="fixed top-20 right-4 z-40 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-lg border border-green-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">
              Conectado como {authState.role || 'usuario'}
            </span>
          </div>
        </div>
      )}
      
      {/* Espaciado inferior para móvil */}
      <div className="h-16" />
    </main>
  );
}
