'use client';

import { useEffect, useState } from 'react';

export default function VisitCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const counted = sessionStorage.getItem('view_counted');

    if (counted) {
      fetch('/api/views')
        .then((r) => r.json())
        .then((d) => setViews(d.views))
        .catch(() => {});
    } else {
      fetch('/api/views', { method: 'POST' })
        .then((r) => r.json())
        .then((d) => {
          setViews(d.views);
          sessionStorage.setItem('view_counted', '1');
        })
        .catch(() => {});
    }
  }, []);

  if (views === null) return null;

  return (
    <div
      className="flex items-center gap-2 text-xs"
      style={{
        color: 'rgba(255,255,255,0.6)',
        letterSpacing: '0.05em',
        fontFamily: 'Gaya, sans-serif',
      }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
      />
      <span>
{views.toLocaleString('es-ES')} · Tu presencia es virtud serena
      </span>
    </div>
  );
}
