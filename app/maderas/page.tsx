"use client";

import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { CHAKRAS } from '@/lib/chakras';
import Navbar from '@/components/ui/Navbar';

export default function MaderasPage() {
    const count = CHAKRAS.length;

    return (
        <main className="min-h-screen p-6 flex flex-col">
            <Navbar
                isLoggedIn={false}
                authState={{}}
                handleLogout={() => {}}
                loginDialogOpen={false}
                handleLoginDialogChange={() => {}}
                needsVerification={false}
                pendingEmail=""
                handleLoginSubmit={() => {}}
                email=""
                setEmail={() => {}}
                password=""
                setPassword={() => {}}
                code=""
                setCode={() => {}}
            />
            {/* Encabezado dentro de contenedor */}
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb eliminado */}
                <h1 className="text-3xl font-bold mb-2">Maderas</h1>
                <p className="text-muted-foreground">
                    Explora la colección de maderas.
                </p>
            </div>

            {/* Grid a ancho completo y ocupando el espacio restante */}
            <div className="mt-6 flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 w-full">
                    {Array.from({ length: count }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
                        >
                            <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                Imagen
                            </div>
                            <div className="p-3 space-y-2">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-3 w-40 bg-gray-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}