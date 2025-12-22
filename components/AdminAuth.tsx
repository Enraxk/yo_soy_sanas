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
export function AdminAuth() {
  // Admin UI removed: no-op stub for compatibility with imports
  return null;
}
