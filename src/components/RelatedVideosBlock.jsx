import React from 'react';

export default function RelatedVideosBlock({ data, compact = false }) {
  if (!data || !data.videos || data.videos.length === 0) return null;

  return (
    <div className={`related-videos-section ${compact ? 'related-videos-compact' : ''}`}>
      <div className="related-videos-header">
        <div className="section-badge" style={{ marginBottom: '0.85rem' }}>
          <span className="badge-dot" />
          <span>{data.badge || 'RECURSOS AUDIOVISUALES DE APOYO'}</span>
        </div>
        <h3 className="related-videos-title">{data.title}</h3>
        {data.subtitle && <p className="related-videos-subtitle">{data.subtitle}</p>}
      </div>

      <div className="related-videos-grid">
        {data.videos.map((video) => (
          <article key={video.id} className="related-video-card">
            <div className="related-video-iframe-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className="related-video-body">
              <div className="related-video-meta">
                <span className="related-video-tag">{video.tag}</span>
                <span className="related-video-channel">Canal: {video.channel}</span>
              </div>

              <h4 className="related-video-card-title">{video.title}</h4>
              <p className="related-video-desc">{video.description}</p>

              <div className="related-video-footer">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="related-video-external-link"
                >
                  <span>Ver directamente en YouTube</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
