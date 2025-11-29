"use client";

import { useState, useEffect } from 'react';

/**
 * Hook para manejar el estado de edición simple
 * Verifica si el usuario está autenticado para editar
 * Se actualiza automáticamente cuando cambia el estado de autenticación
 */
export function useSimpleEdit() {
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Función para verificar autenticación
    const checkAuth = () => {
      const savedAuth = localStorage.getItem('simple-admin-auth');
      setIsEditMode(savedAuth === 'authenticated');
    };

    // Verificar al cargar
    checkAuth();

    // Escuchar cambios en localStorage (desde otras pestañas)
    window.addEventListener('storage', checkAuth);
    
    // También revisar periódicamente para cambios locales
    const interval = setInterval(checkAuth, 500);

    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  return {
    isEditMode,
    setIsEditMode
  };
}
