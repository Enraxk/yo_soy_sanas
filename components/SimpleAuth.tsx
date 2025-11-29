"use client";

import { useState, useEffect } from 'react';

interface SimpleAuthProps {
  children: React.ReactNode;
  requireAuth?: boolean; // Si es true, solo muestra el contenido si está autenticado
}

export function SimpleAuth({ children, requireAuth = false }: SimpleAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si ya está autenticado al cargar
    const savedAuth = localStorage.getItem('simple-admin-auth');
    setIsAuthenticated(savedAuth === 'authenticated');
    setIsLoading(false);
    
    // Escuchar cambios en el localStorage (cuando se hace login/logout desde la navbar)
    const handleStorageChange = () => {
      const savedAuth = localStorage.getItem('simple-admin-auth');
      setIsAuthenticated(savedAuth === 'authenticated');
    };

    window.addEventListener('storage', handleStorageChange);
    
    // También escuchar cambios locales
    const interval = setInterval(() => {
      const savedAuth = localStorage.getItem('simple-admin-auth');
      setIsAuthenticated(savedAuth === 'authenticated');
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Si requireAuth es true y no está autenticado, mostrar mensaje
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceso Restringido</h2>
          <p className="text-gray-600 mb-4">
            Necesitas iniciar sesión como administrador para ver este contenido.
          </p>
          <p className="text-sm text-gray-500">
            Haz clic en el ícono de usuario en la navbar para acceder.
          </p>
        </div>
      </div>
    );
  }

  // Siempre mostrar el contenido (AdminAuth en la navbar maneja la barra superior)
  return <>{children}</>;
}
