import React, { useEffect } from 'react';

export default function MovieModal({ movie, onClose, onPlay, onToggleList, inList, onToggleWatchLater, inWatchLater, similar, onSimilar }) {
  useEffect(() => {
    if (!movie) return;
    const handler = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [movie, onClose]);
  if (!movie) return null;
  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className="movie-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose} aria-label="Close"><i className="bi bi-x-lg"></i></button>
        <div className="modal-hero"><img src={movie.image} alt={movie.title} onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85'; }}/><div className="modal-gradient" /></div>
        <div className="modal-body-custom">
          <span className="eyebrow">{movie.type === 'Series' ? 'SERIES' : 'FEATURED MOVIE'}</span>
          <h2>{movie.title}</h2>
          <div className="meta"><span className="match">{movie.rating >= 8.5 ? '98%' : '94%'} Match</span><span>{movie.year}</span><span>{movie.genre}</span><span>{movie.duration}</span><span className="quality">HD</span></div>
          <p>{movie.description}</p>
          <div className="d-flex gap-2 flex-wrap mb-4">
            <button className="btn btn-light" onClick={() => onPlay(movie)}><i className="bi bi-play-fill me-2"></i>Play Preview</button>
            <button className="btn btn-outline-light" onClick={() => onToggleList(movie)}><i className={`bi ${inList ? 'bi-check-lg' : 'bi-plus-lg'} me-2`}></i>{inList ? 'In My List' : 'My List'}</button>
            <button className="btn btn-outline-light" onClick={() => onToggleWatchLater(movie)}><i className={`bi ${inWatchLater ? 'bi-clock-fill' : 'bi-clock'} me-2`}></i>{inWatchLater ? 'Saved for Later' : 'Watch Later'}</button>
          </div>
          <div className="detail-grid"><div><span>Rating</span><strong>★ {movie.rating}/10</strong></div><div><span>Genre</span><strong>{movie.genre}</strong></div><div><span>Type</span><strong>{movie.type}</strong></div><div><span>Quality</span><strong>Full HD</strong></div></div>
          {similar.length > 0 && <div className="similar"><h3>More like this</h3><div className="similar-grid">{similar.map(item => <button key={item.id} onClick={() => onSimilar(item)}><img src={item.image} alt=""/><span>{item.title}</span></button>)}</div></div>}
        </div>
      </div>
    </div>
  );
}
