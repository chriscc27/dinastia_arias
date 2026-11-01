// Conexión de la página con el servidor QA Hub (Zabbix + Weka + KPIs del dataset).
// Orden para resolver la URL del servidor:
//   1. la que el visitante pegó en la barra de conexión (localStorage) — útil con un Cloudflare quick tunnel
//   2. VITE_QA_HUB_URL definida al compilar (variable del repositorio en GitHub Actions)
// Si no hay servidor o no responde, cada página usa la captura guardada en src/data/generated.
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'aitech-qa-hub-url';
const EVENTO = 'qa-hub-url-change';

export function getHubUrl() {
  try {
    const guardada = window.localStorage.getItem(STORAGE_KEY);
    if (guardada) return guardada;
  } catch {
    // localStorage bloqueado (modo privado): se usa la variable de compilación.
  }
  return import.meta.env.VITE_QA_HUB_URL || 'https://aitech-qa-hub.onrender.com';
}

export function setHubUrl(url) {
  const limpia = url.trim().replace(/\/+$/, '');
  try {
    if (limpia) window.localStorage.setItem(STORAGE_KEY, limpia);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // sin persistencia: solo vale para esta pestaña
  }
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: limpia }));
}

export function useHubUrl() {
  const [url, setUrl] = useState(getHubUrl);
  useEffect(() => {
    const actualizar = () => setUrl(getHubUrl());
    window.addEventListener(EVENTO, actualizar);
    return () => window.removeEventListener(EVENTO, actualizar);
  }, []);
  return url;
}

export async function hubFetch(base, ruta, opciones = {}) {
  const res = await fetch(base + ruta, { ...opciones, signal: AbortSignal.timeout(opciones.timeout || 15000) });
  const cuerpo = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(cuerpo.error || `HTTP ${res.status}`), { cuerpo });
  return cuerpo;
}

// Devuelve { data, live, error, loading, refresh, base }.
// live = true solo cuando los datos vienen del servidor en este momento.
export function useHubResource(ruta, snapshot, { pollMs = 0 } = {}) {
  const base = useHubUrl();
  const [estado, setEstado] = useState({ data: snapshot, live: false, error: null, loading: Boolean(base) });

  const refresh = useCallback(async () => {
    if (!base) {
      setEstado({ data: snapshot, live: false, error: null, loading: false });
      return;
    }
    setEstado((e) => ({ ...e, loading: true }));
    try {
      const data = await hubFetch(base, ruta);
      setEstado({ data, live: true, error: null, loading: false });
    } catch (err) {
      setEstado({ data: snapshot, live: false, error: err.message, loading: false });
    }
  }, [base, ruta, snapshot]);

  useEffect(() => {
    refresh();
    if (!pollMs || !base) return undefined;
    const id = setInterval(refresh, pollMs);
    return () => clearInterval(id);
  }, [refresh, pollMs, base]);

  return { ...estado, refresh, base };
}
