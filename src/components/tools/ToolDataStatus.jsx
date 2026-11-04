export default function ToolDataStatus({ resource, updatedAt }) {
  const { live, loading, error, base, refresh } = resource;
  const date = updatedAt ? new Date(updatedAt) : null;
  const validDate = date && !Number.isNaN(date.getTime());
  return (
    <div className={`tool-data-status${live ? ' is-live' : ''}`}>
      <div role="status">
        <strong>{live ? 'Datos consultados al servidor' : 'Última captura guardada'}</strong>
        <p>
          {loading ? 'Actualizando datos… ' : error ? 'No se pudo actualizar; se conserva la captura disponible. ' : ''}
          {validDate && <>Registro: <time dateTime={date.toISOString()}>{new Intl.DateTimeFormat('es-BO', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/La_Paz' }).format(date)}</time>. </>}
          {!live && 'Estos datos no representan el estado en tiempo real.'}
        </p>
      </div>
      {base && <button type="button" className="tl-btn ghost" onClick={refresh} disabled={loading}>{loading ? 'Actualizando…' : 'Actualizar datos'}</button>}
    </div>
  );
}
