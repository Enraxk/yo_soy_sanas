"use client";

import { useState } from 'react';

export function DebugCredentials() {
  const [showDebug, setShowDebug] = useState(false);

  const envUser = process.env.NEXT_PUBLIC_ADMIN_USER;
  const envPass = process.env.NEXT_PUBLIC_ADMIN_PASS;
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={() => setShowDebug(!showDebug)}
        className="bg-red-600 text-white px-3 py-1 text-xs rounded"
      >
        Debug Credenciales
      </button>
      
      {showDebug && (
        <div className="absolute bottom-full right-0 mb-2 bg-black text-white p-4 rounded shadow-lg text-xs max-w-sm">
          <div className="space-y-2">
            <div>
              <strong>Variables de Entorno:</strong>
            </div>
            <div>
              User: "{envUser || 'UNDEFINED'}"
            </div>
            <div>
              Pass: "{envPass ? envPass.substring(0, 5) + '...' + envPass.substring(envPass.length - 3) : 'UNDEFINED'}"
            </div>
            <div>
              Pass Length: {envPass?.length || 0}
            </div>
            <div className="border-t pt-2 mt-2">
              <strong>Caracteres especiales en pass:</strong>
            </div>
            <div>
              Contiene #: {envPass?.includes('#') ? 'SÍ' : 'NO'}
            </div>
            <div>
              Contiene $: {envPass?.includes('$') ? 'SÍ' : 'NO'}
            </div>
            <div>
              Contiene &: {envPass?.includes('&') ? 'SÍ' : 'NO'}
            </div>
            <div>
              Contiene *: {envPass?.includes('*') ? 'SÍ' : 'NO'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
