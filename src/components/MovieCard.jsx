import React from 'react';

export default function MovieCard({ movie, onSelect, onPlay, inList, onToggleList, watchLater = [], onToggleWatchLater, ranked }) {
  const inWatchLater = watchLater.some(x => x.id === movie.id);
  return (
    <article className="movie-card" onClick={() => onSelect(movie)}>
      <div className="poster-wrap">
        {ranked && <span className="rank-number">{movie.rank || ''}</span>}
        <img src={movie.image} alt={movie.title} loading="lazy" onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=85'; }} />
        <div className="poster-overlay">
          <button className="circle-btn primary" onClick={e => { e.stopPropagation(); onPlay(movie); }} aria-label={`Play ${movie.title}`}><i className="bi bi-play-fill"></i></button>
          <button className="circle-btn" onClick={e => { e.stopPropagation(); onToggleList(movie); }} aria-label={inList ? 'Remove from list' : 'Add to list'}><i className={`bi ${inList ? 'bi-check-lg' : 'bi-plus-lg'}`}></i></button>
          <button className={`circle-btn ${inWatchLater ? 'saved' : ''}`} onClick={e => { e.stopPropagation(); onToggleWatchLater(movie); }} aria-label={inWatchLater ? 'Remove from watch later' : 'Watch later'}><i className={`bi ${inWatchLater ? 'bi-clock-fill' : 'bi-clock'}`}></i></button>
          <button className="circle-btn" onClick={e => { e.stopPropagation(); onSelect(movie); }} aria-label={`More info about ${movie.title}`}><i className="bi bi-info-lg"></i></button>
        </div>
        <span className="card-rating"><i className="bi bi-star-fill"></i> {movie.rating}</span>
        {movie.progress && <span className="progress-track"><span style={{ width: `${movie.progress}%` }} /></span>}
      </div>
      <h3>{movie.title}</h3>
      <div className="card-meta"><span>{movie.year}</span><span>•</span><span>{movie.genre}</span><span>•</span><span>{movie.duration}</span></div>
    </article>
  );
}
