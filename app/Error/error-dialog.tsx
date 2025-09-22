"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction
} from "@/components/ui/alert-dialog";

/**
 * Componente para mostrar una ventana de error personalizada.
 * @param {Object} props
 * @param {string} props.title - Título del error.
 * @param {string} props.description - Descripción del error.
 * @param {string} [props.actionLabel] - Texto del botón de acción.
 * @param {() => void} [props.onAction] - Acción al cerrar o aceptar.
 */
export function ErrorDialog({title, description, actionLabel = "Cerrar", onAction}: {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void
}) {
    // Handler local para evitar pasar funciones directamente como prop
    const handleAction = () => {
        if (onAction) onAction();
    };

    return (
        <AlertDialog open>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleAction}>{actionLabel}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
