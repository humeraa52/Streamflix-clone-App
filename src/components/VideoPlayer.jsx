import React, { useEffect, useRef, useState } from 'react';

export default function VideoPlayer({ movie, onClose }) {
  const videoRef = useRef(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!movie) return;
    setError(false);
    setLoading(true);
    setMuted(false);
    document.body.style.overflow = 'hidden';
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [movie, onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !movie) return;
    let cancelled = false;
    const start = async () => {
      if (cancelled) return;
      try {
        await video.play();
      } catch {
        // Browsers may block sound during programmatic playback. Start silently,
        // then let the user turn audio on with the visible button.
        try {
          video.muted = true;
          setMuted(true);
          await video.play();
        } catch {
          // A real source/load error is handled by the video's error event.
        }
      }
    };
    if (video.readyState >= 2) start();
    else video.addEventListener('canplay', start, { once: true });
    return () => {
      cancelled = true;
      video.removeEventListener('canplay', start);
    };
  }, [movie]);

  if (!movie) return null;

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.paused) return;
    video.play().catch(() => {});
  };

  return (
    <div className="player-backdrop" onClick={onClose}>
      <div className="player-shell" onClick={e => e.stopPropagation()}>
        <div className="player-top">
          <div><span>NOW PREVIEWING</span><strong>{movie.title}</strong></div>
          <button type="button" onClick={onClose} aria-label="Close player"><i className="bi bi-x-lg" /></button>
        </div>
        <div className="video-stage">
          {loading && !error && <div className="video-loading"><span className="spinner-border spinner-border-sm" /> <span>Loading preview…</span></div>}
          {!error ? (
            <>
              <video
                ref={videoRef}
                controls
                autoPlay
                muted={muted}
                playsInline
                preload="auto"
                poster={movie.image}
                onLoadedData={() => setLoading(false)}
                onCanPlay={() => setLoading(false)}
                onPlaying={() => setLoading(false)}
                onError={() => { setLoading(false); setError(true); }}
              >
                <source src={movie.videoUrl} type="video/mp4" />
              </video>
              {!loading && <div className="video-playing-badge"><i className="bi bi-broadcast-pin" /> DEMO PREVIEW</div>}
            </>
          ) : (
            <div className="video-error">
              <i className="bi bi-exclamation-circle" />
              <h3>Preview file could not be loaded</h3>
              <p>The StreamFlix demo video is missing or the development server is not serving the <code>public/videos</code> folder.</p>
              <button type="button" className="btn btn-light btn-sm" onClick={() => {
                setError(false); setLoading(true);
                requestAnimationFrame(() => videoRef.current?.load());
              }}>Try Again</button>
            </div>
          )}
        </div>
        <div className="player-info">
          <div><strong>{movie.title}</strong><span>{movie.year} • {movie.genre} • {movie.duration}</span></div>
          <div className="video-player-actions">
            <button type="button" onClick={toggleMute}><i className={`bi ${muted ? 'bi-volume-mute' : 'bi-volume-up'}`} /> {muted ? 'Turn sound on' : 'Mute'}</button>
            <button type="button" onClick={() => videoRef.current?.requestFullscreen?.()}><i className="bi bi-fullscreen" /> Fullscreen</button>
          </div>
          <p>Original StreamFlix demo preview • Every title has its own local preview file.</p>
        </div>
      </div>
    </div>
  );
}
