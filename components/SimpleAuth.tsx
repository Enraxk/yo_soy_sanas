"use client";

import { useState, useEffect } from 'react';

interface SimpleAuthProps {
  children: React.ReactNode;
  requireAuth?: boolean; // Si es true, solo muestra el contenido si está autenticado
}

export function SimpleAuth({ children }: SimpleAuthProps) {
  // Authentication UI removed — passthrough wrapper
  return <>{children}</>;
}
