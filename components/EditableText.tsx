"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Pencil, Save, X } from "lucide-react";
import { useSimpleEdit } from "@/hooks/useSimpleEdit";

interface EditableTextProps {
  children: string;
  storageKey: string; // Clave única para localStorage
  className?: string;
  style?: React.CSSProperties; // Soporte para estilos inline
  isTitle?: boolean; // Si es true, usa Input en lugar de Textarea
  placeholder?: string;
}

export function EditableText({ 
  children, 
  storageKey, 
  className = "", 
  style = {},
  isTitle = false,
  placeholder = "Escribe aquí..."
}: EditableTextProps) {
  const { isEditMode } = useSimpleEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(children);
  const [originalText, setOriginalText] = useState(children);

  useEffect(() => {
    // Cargar texto guardado en localStorage
    const savedText = localStorage.getItem(`editable-${storageKey}`);
    if (savedText) {
      setText(savedText);
    }
  }, [storageKey]);

  const startEditing = () => {
    setOriginalText(text);
    setIsEditing(true);
  };

  const saveText = () => {
    localStorage.setItem(`editable-${storageKey}`, text);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setText(originalText);
    setIsEditing(false);
  };

  // Si no está en modo edición, solo mostrar el texto
  if (!isEditMode) {
    return <span className={className} style={style}>{text}</span>;
  }

  // Si está editando
  if (isEditing) {
    return (
      <div className="space-y-2">
        {isTitle ? (
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className={className}
            autoFocus
          />
        ) : (
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className={`${className} min-h-[100px]`}
            autoFocus
          />
        )}
        <div className="flex gap-2">
          <Button onClick={saveText} size="sm" className="bg-green-600 hover:bg-green-700">
            <Save className="h-3 w-3 mr-1" />
            Guardar
          </Button>
          <Button onClick={cancelEdit} size="sm" variant="outline">
            <X className="h-3 w-3 mr-1" />
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  // Modo vista con opción de editar
  return (
    <div className="group relative">
      <span className={className} style={style}>{text}</span>
      <Button
        onClick={startEditing}
        size="sm"
        variant="ghost"
        className="absolute -top-1 -right-8 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="h-3 w-3" />
      </Button>
    </div>
  );
}
