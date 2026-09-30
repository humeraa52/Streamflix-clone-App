import React, { useEffect, useState } from 'react';

export default function Hero({ movies, onPlay, onInfo }) {
  const [index, setIndex] = useState(0);
  const movie = movies[index] || movies[0];

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % movies.length), 7000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (!movie) return null;
  return (
    <section id="home" className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,5,8,.99) 0%, rgba(5,5,8,.82) 36%, rgba(5,5,8,.18) 78%), linear-gradient(0deg, #08080b 0%, transparent 35%), url(${movie.image})` }}>
      <div className="container-fluid px-3 px-lg-5 hero-content">
        <div className="hero-copy">
          <span className="eyebrow"><i className="bi bi-play-circle-fill"></i> STREAMFLIX ORIGINAL</span>
          <h1>{movie.title}</h1>
          <div className="meta"><span className="match">98% Match</span><span>{movie.year}</span><span>16+</span><span>{movie.duration}</span><span className="quality">HD</span></div>
          <p>{movie.description}</p>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-light hero-btn" onClick={() => onPlay(movie)}><i className="bi bi-play-fill me-2"></i>Play Now</button>
            <button className="btn btn-secondary hero-btn info-btn" onClick={() => onInfo(movie)}><i className="bi bi-info-circle me-2"></i>More Info</button>
          </div>
        </div>
        <div className="hero-dots">
          {movies.map((m, i) => <button key={m.id} aria-label={`Show ${m.title}`} className={i === index ? 'active' : ''} onClick={() => setIndex(i)} />)}
        </div>
        <div className="hero-nav"><button onClick={() => setIndex((index - 1 + movies.length) % movies.length)}><i className="bi bi-chevron-left"></i></button><button onClick={() => setIndex((index + 1) % movies.length)}><i className="bi bi-chevron-right"></i></button></div>
      </div>
    </section>
  );
}
