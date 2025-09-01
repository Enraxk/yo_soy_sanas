"use client";

import { ErrorDialog } from "@/components/ui/error-dialog";

/**
 * Página de error 500: Error interno del servidor
 */
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorDialog
      title="Error interno (500)"
      description={error?.message || "Ha ocurrido un error inesperado. Por favor, intentalo de nuevo más tarde."}
      actionLabel="Recargar"
      onAction={reset}
    />
  );
}
