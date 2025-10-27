"use client";
// app/santras/page.tsx
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChakraObraCard } from '@/components/chakras/ChakraObraCard';
import { CHAKRAS } from '@/lib/chakras';
import Navbar from '@/components/ui/Navbar';

export default function SantrasPage() {
    // Aquí puedes definir los estados y handlers necesarios para la Navbar, igual que en page.tsx
    // Si no hay autenticación, puedes pasar valores por defecto o adaptar la Navbar para esta página.
    return (
        <main className="min-h-screen p-0 relative flex flex-col bg-black">
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
            <div aria-hidden className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#000' }} />
            <div className="relative z-10 max-w-2xl mx-auto pt-8 pb-4">
                    {/* Breadcrumb eliminado */}
                <h1 className="text-3xl font-bold mb-2 text-white">Galería de Santras</h1>
                <p className="text-white/70">Explora los diferentes Santras.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-6 py-8">
                {[...CHAKRAS].reverse().map((chakra) => (
                    <ChakraObraCard
                        key={chakra.id}
                        chakra={chakra}
                        className="w-40 md:w-56"
                        showDetails={true}
                    />
                ))}
            </div>
        </main>
    );
}
