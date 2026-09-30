import React, { useRef } from 'react';
import MovieCard from './MovieCard';

export default function MovieRow({ title, movies, onSelect, list, onToggleList, watchLater, onToggleWatchLater, onPlay, ranked }) {
  const rowRef = useRef(null);
  if (!movies.length) return null;
  const scroll = direction => rowRef.current?.scrollBy({ left: direction * 650, behavior: 'smooth' });
  return (
    <section className="movie-section">
      <div className="section-heading"><div><span className="section-kicker">STREAMFLIX</span><h2>{title}</h2></div><div className="row-controls"><button onClick={() => scroll(-1)} aria-label="Scroll left"><i className="bi bi-chevron-left"></i></button><button onClick={() => scroll(1)} aria-label="Scroll right"><i className="bi bi-chevron-right"></i></button></div></div>
      <div className="movie-row" ref={rowRef}>
        {movies.map((movie, index) => <MovieCard key={movie.id} movie={{...movie, rank: index + 1}} onSelect={onSelect} onPlay={onPlay} inList={list.some(x => x.id === movie.id)} onToggleList={onToggleList} watchLater={watchLater} onToggleWatchLater={onToggleWatchLater} ranked={ranked} />)}
      </div>
    </section>
  );
}
