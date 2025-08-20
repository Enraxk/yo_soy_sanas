import Link from "next/link";
import { Button } from "./ui/button";

export function GaleriaButton() {
  return (
    <Button asChild variant="outline">
      <Link href="/galeria">Ver galería</Link>
    </Button>
  );
}
