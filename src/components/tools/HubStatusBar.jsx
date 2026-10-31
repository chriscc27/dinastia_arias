import { useState } from 'react';
import { hubFetch, setHubUrl, useHubUrl } from '../../lib/qaHub';

const formatoHora = (iso) => (iso ? new Date(iso).toLocaleString('es-BO', { dateStyle: 'medium', timeStyle: 'short' }) : '—');

// Barra que indica de dónde salen los datos (EN VIVO desde el QA Hub o CAPTURA guardada) y permite conectar un servidor.
export default function HubStatusBar({ resource, fuente, actualizado }) {
  const base = useHubUrl();
  const [abierto, setAbierto] = useState(false);
  const [valor, setValor] = useState(base);
  const [prueba, setPrueba] = useState(null);

  const probar = async () => {
    setPrueba({ estado: 'probando' });
    try {
      const salud = await hubFetch(valor.trim().replace(/\/+$/, ''), '/api/health', { timeout: 8000 });
      setPrueba({ estado: 'ok', texto: `${salud.servicio} · ${salud.dataset} · Zabbix ${salud.zabbix}` });
      setHubUrl(valor);
      setAbierto(false);
    } catch (err) {
      setPrueba({ estado: 'error', texto: err.message });
    }
  };

  const enVivo = resource.live;

  return (
    <div className={`tl-hub ${enVivo ? 'is-live' : ''}`}>
      <div className="tl-hub-row">
        <span className={`tl-hub-pill ${enVivo ? 'live' : 'snap'}`}>
          <span className="tl-hub-dot" aria-hidden="true" />
          {resource.loading ? 'CONECTANDO…' : enVivo ? 'EN VIVO' : 'CAPTURA'}
        </span>
        <span className="tl-hub-text">
          {enVivo
            ? <>Datos servidos ahora por el <strong>QA Hub</strong> ({base}) · {fuente}</>
            : <>Mostrando la última captura del servidor ({formatoHora(actualizado)}) · {fuente}</>}
          {resource.error && <em> — servidor sin respuesta: {resource.error}</em>}
        </span>
        <div className="tl-hub-actions">
          {base && (
            <button type="button" className="tl-btn ghost" onClick={resource.refresh}>Actualizar</button>
          )}
          <button type="button" className="tl-btn" onClick={() => setAbierto(!abierto)}>
            {abierto ? 'Cerrar' : base ? 'Cambiar servidor' : 'Conectar servidor'}
          </button>
        </div>
      </div>
      {abierto && (
        <div className="tl-hub-form">
          <label htmlFor="hub-url">URL del servidor QA Hub (por ejemplo, la de Cloudflare Tunnel o http://localhost:8787)</label>
          <div className="tl-hub-input-row">
            <input id="hub-url" type="url" placeholder="https://xxxx.trycloudflare.com" value={valor} onChange={(e) => setValor(e.target.value)} />
            <button type="button" className="tl-btn" onClick={probar} disabled={!valor.trim() || prueba?.estado === 'probando'}>
              {prueba?.estado === 'probando' ? 'Probando…' : 'Probar y conectar'}
            </button>
            {base && (
              <button type="button" className="tl-btn ghost" onClick={() => { setHubUrl(''); setValor(''); setPrueba(null); }}>
                Desconectar
              </button>
            )}
          </div>
          {prueba?.texto && <p className={`tl-hub-msg ${prueba.estado}`}>{prueba.texto}</p>}
        </div>
      )}
    </div>
  );
}
