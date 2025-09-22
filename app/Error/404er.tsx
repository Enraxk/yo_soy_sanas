"use client";

import {ErrorDialog} from "./error-dialog";

/**
 * Página de error 404: No encontrado
 */
export default function NotFound() {
    // Redirige al inicio al hacer clic en el botón
    const handleGoHome = () => {
        window.location.href = "/";
    };

    return (
        <ErrorDialog
            title="Página no encontrada (404)"
            description="La página que buscas no existe o ha sido movida. Por favor, verifica la URL o regresa al inicio."
            actionLabel="Ir al inicio"
            onAction={handleGoHome}
        />
    );
}
