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
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/ui/Navbar';

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
      <Navbar
        isLoggedIn={isLoggedIn}
        authState={authState}
        handleLogout={handleLogout}
        loginDialogOpen={loginDialogOpen}
        handleLoginDialogChange={handleLoginDialogChange}
        needsVerification={needsVerification}
        pendingEmail={pendingEmail}
        handleLoginSubmit={handleLoginSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        code={code}
        setCode={setCode}
      />

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
            <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Gaya, sans-serif', fontStyle: 'normal' }}>
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
          <h2 className="text-3xl font-bold text-white/90 mb-2" style={{ fontFamily: 'Gaya, sans-serif', fontStyle: 'normal' }}>
            Explora los 7 Chakras
          </h2>
          <p className="text-white/70">
            Haz clic en cualquier chakra para explorar su energía y significado espiritual
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6" style={{ overflow: 'visible' }}>
          {CHAKRAS.map((chakra, idx) => (
            <ChakraCard
              key={chakra.name}
              chakra={chakra}
              isActive={idx === currentChakraIndex}
              onClick={() => handleChakraCardClick(idx)}
              showDetails={true}
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
