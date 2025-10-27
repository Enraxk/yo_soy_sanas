"use client";

import { useState,  useCallback } from 'react';
import { type AuthState, type LoginCredentials, type CodeVerificationRequest, type ApiResponse } from '@/lib/types';

/**
 * Hook personalizado para el manejo de autenticación
 * Incluye login con email, verificación por código y gestión de estado
 * @returns Estado de autenticación y funciones de control
 * @example
 * const { authState, login, verifyCode, logout } = useAuth();
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: false,
  });

  const [pendingEmail, setPendingEmail] = useState<string>('');

  /**
   * Realiza el login enviando las credenciales al servidor
   * @param credentials - Email y contraseña del usuario
   * @returns Promise con el resultado del login
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<ApiResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || !data.ok) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: data.error || 'Error en el login',
        }));
        return data;
      }

      // Si el login es exitoso, guardamos el email para verificación
      setPendingEmail(credentials.email);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: undefined,
      }));

      return { ok: true, message: 'Código enviado al email' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error de conexión';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { ok: false, error: errorMessage };
    }
  }, []);

  /**
   * Verifica el código enviado por email
   * @param request - Email y código de verificación
   * @returns Promise con el resultado de la verificación
   */
  const verifyCode = useCallback(async (request: CodeVerificationRequest): Promise<ApiResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || !data.ok) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: data.error || 'Código incorrecto',
        }));
        return data;
      }

      // Autenticación exitosa
      setAuthState({
        isAuthenticated: true,
        email: request.email,
        role: 'admin', // Por ahora solo admin
        isLoading: false,
        error: undefined,
      });

      setPendingEmail('');
      return { ok: true, message: 'Autenticación exitosa' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error de conexión';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { ok: false, error: errorMessage };
    }
  }, []);

  /**
   * Cierra la sesión del usuario
   */
  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
    });
    setPendingEmail('');
  }, []);

  /**
   * Limpia los errores de autenticación
   */
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: undefined }));
  }, []);

  /**
   * Reinicia el proceso de autenticación
   */
  const reset = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
    });
    setPendingEmail('');
  }, []);

  return {
    // Estado
    authState,
    pendingEmail,
    
    // Acciones
    login,
    verifyCode,
    logout,
    clearError,
    reset,
    
    // Utilidades
    isLoggedIn: authState.isAuthenticated,
    isLoading: authState.isLoading,
    hasError: !!authState.error,
    isAdmin: authState.role === 'admin',
    needsVerification: !!pendingEmail && !authState.isAuthenticated,
  };
}