import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import Footer from './components/Footer';
import MovieModal from './components/Modal';
import VideoPlayer from './components/VideoPlayer';
import Intro from './components/Intro';
import { movies, genres } from './data/movies';

const readStorage = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

const PAGE_NAMES = ['home','movies','series','top10','genres','my-list','watch-later','history','about'];

export default function App() {
  const [query, setQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selected, setSelected] = useState(null);
  const [playerMovie, setPlayerMovie] = useState(null);
  const [myList, setMyList] = useState(() => readStorage('streamflix-list', []));
  const [watchLater, setWatchLater] = useState(() => readStorage('streamflix-watch-later', []));
  const [history, setHistory] = useState(() => readStorage('streamflix-history', []));
  const [profileOpen, setProfileOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace('#','');
    return PAGE_NAMES.includes(hash) ? hash : 'home';
  });

  useEffect(() => { localStorage.setItem('streamflix-list', JSON.stringify(myList)); }, [myList]);
  useEffect(() => { localStorage.setItem('streamflix-watch-later', JSON.stringify(watchLater)); }, [watchLater]);
  useEffect(() => { localStorage.setItem('streamflix-history', JSON.stringify(history)); }, [history]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#','');
      if (PAGE_NAMES.includes(hash)) setPage(hash);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = id => {
    setPage(id);
    window.location.hash = id;
    setProfileOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = message => setToast(message);
  const toggleCollection = (setter, label, movie) => {
    setter(prev => {
      const exists = prev.some(x => x.id === movie.id);
      showToast(exists ? `${movie.title} removed from ${label}` : `${movie.title} added to ${label}`);
      return exists ? prev.filter(x => x.id !== movie.id) : [...prev, movie];
    });
  };
  const toggleList = movie => toggleCollection(setMyList, 'My List', movie);
  const toggleWatchLater = movie => toggleCollection(setWatchLater, 'Watch Later', movie);
  const playMovie = movie => {
    setSelected(null);
    setPlayerMovie(movie);
    setHistory(prev => [{ ...movie, progress: movie.progress || 18 }, ...prev.filter(x => x.id !== movie.id)].slice(0, 10));
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = movies.filter(m => {
      const haystack = `${m.title} ${m.genre} ${m.description} ${m.type}`.toLowerCase();
      return (!normalized || haystack.includes(normalized)) && (activeGenre === 'All' || m.genre === activeGenre);
    });
    if (sortBy === 'rating') return [...result].sort((a,b) => b.rating-a.rating);
    if (sortBy === 'newest') return [...result].sort((a,b) => b.year-a.year || b.rating-a.rating);
    if (sortBy === 'az') return [...result].sort((a,b) => a.title.localeCompare(b.title));
    return result;
  }, [query, activeGenre, sortBy]);

  const related = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    const direct = movies.filter(m => `${m.title} ${m.genre} ${m.description}`.toLowerCase().includes(q));
    const genreHints = movies.filter(m => direct.some(d => d.genre === m.genre) && !direct.some(d => d.id === m.id));
    return [...direct, ...genreHints].filter((m,i,a) => a.findIndex(x => x.id === m.id) === i).slice(0,12);
  }, [query]);

  const movieOnly = movies.filter(m => m.type === 'Movie');
  const seriesOnly = movies.filter(m => m.type === 'Series');
  const trending = filtered.slice(0, 12);
  const popular = [...movies].sort((a,b) => b.rating-a.rating).slice(0,12);
  const topTen = [...movies].sort((a,b) => b.rating-a.rating).slice(0,10);
  const heroMovies = movies.filter(m => m.hero || m.rating >= 8.7).slice(0,6);
  const becauseYouWatched = history.length
    ? movies.filter(m => history.some(h => h.genre === m.genre) && !history.some(h => h.id === m.id)).slice(0,10)
    : movies.filter(m => m.genre === 'Sci-Fi').slice(0,10);

  const genreHighlights = genres.filter(g => g !== 'All').map(g => ({
    name: g,
    count: movies.filter(m => m.genre === g).length,
    image: movies.find(m => m.genre === g)?.image
  }));

  const featuredSpotlight = [...movies].sort((a,b) => b.rating-a.rating).slice(0,3);

  const rowProps = { onSelect:setSelected, list:myList, onToggleList:toggleList, watchLater, onToggleWatchLater:toggleWatchLater, onPlay:playMovie };

  const Controls = () => (
    <section className="control-panel" aria-label="Movie filters">
      <div className="control-copy"><span>EXPLORE</span><h2>{query ? `Results for “${query}”` : 'Find your next watch'}</h2><p>{filtered.length} titles ready to explore</p></div>
      <div className="controls">
        <select value={activeGenre} onChange={e => setActiveGenre(e.target.value)} aria-label="Filter by genre">{genres.map(g => <option key={g}>{g}</option>)}</select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="Sort movies"><option value="featured">Featured</option><option value="rating">Highest Rated</option><option value="newest">Newest</option><option value="az">A–Z</option></select>
        {(query || activeGenre !== 'All' || sortBy !== 'featured') && <button className="clear-btn" onClick={() => {setQuery('');setActiveGenre('All');setSortBy('featured');}}>Clear</button>}
      </div>
    </section>
  );

  const PageHeader = ({kicker,title,text}) => (
    <section className="page-header">
      <span className="section-kicker">{kicker}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );

  const EmptyState = ({icon='bi-collection-play', title, text, action='Browse Movies', onAction}) => (
    <div className="empty-state">
      <div className="empty-icon"><i className={`bi ${icon}`}></i></div>
      <span className="section-kicker">YOUR SPACE</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <button className="premium-btn" onClick={onAction || (() => navigate('movies'))}>{action}<i className="bi bi-arrow-right"></i></button>
    </div>
  );

  const HomeShowcase = () => (
    <section className="home-showcase">
      <div className="showcase-heading">
        <div><span className="section-kicker">STREAMFLIX PICKS</span><h2>Tonight's cinematic shortlist</h2><p>Three standout titles selected from the highest-rated library.</p></div>
        <button className="ghost-link" onClick={() => navigate('top10')}>View Top 10 <i className="bi bi-arrow-up-right"></i></button>
      </div>
      <div className="spotlight-grid">
        {featuredSpotlight.map((m, i) => (
          <button className="spotlight-card" key={m.id} onClick={() => setSelected(m)}>
            <img src={m.image} alt="" />
            <span className="spotlight-shade"></span>
            <span className="spotlight-rank">0{i+1}</span>
            <span className="spotlight-info"><small>{m.genre} • {m.year} • {m.duration}</small><strong>{m.title}</strong><em><i className="bi bi-star-fill"></i> {m.rating.toFixed(1)}</em></span>
          </button>
        ))}
      </div>
    </section>
  );

  const GenreShowcase = () => (
    <section className="genre-showcase">
      <div className="showcase-heading"><div><span className="section-kicker">BROWSE YOUR MOOD</span><h2>Explore by genre</h2></div><button className="ghost-link" onClick={() => navigate('genres')}>All genres <i className="bi bi-arrow-right"></i></button></div>
      <div className="genre-showcase-grid">
        {genreHighlights.slice(0,8).map(g => (
          <button key={g.name} className="genre-showcase-card" onClick={() => {setActiveGenre(g.name); navigate('movies')}} style={{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.9)),url(${g.image})`}}>
            <span>{g.name}</span><small>{g.count} titles</small><i className="bi bi-arrow-up-right"></i>
          </button>
        ))}
      </div>
    </section>
  );

  const CollectionPage = ({ title, kicker='COLLECTION', text, data }) => (
    <main className="container-fluid px-3 px-lg-5 content page-content">
      <PageHeader kicker={kicker} title={title} text={text} />
      {data.length ? <>
        <div className="collection-meta"><span><i className="bi bi-grid-3x3-gap-fill"></i> {data.length} titles</span><span><i className="bi bi-stars"></i> Curated for you</span><span><i className="bi bi-play-circle"></i> Instant playback</span></div>
        <MovieRow title={`${title} • ${data.length} titles`} movies={data} {...rowProps} />
        {data.length > 12 && <MovieRow title="More to Explore" movies={data.slice(12)} {...rowProps} />}
      </> : <EmptyState title={`Your ${title.toLowerCase()} is empty`} text="Save titles here and they will appear instantly in your personal StreamFlix library." />}
    </main>
  );

  const renderPage = () => {
    if (page === 'home') return (
      <>
        <Hero movies={heroMovies} onPlay={playMovie} onInfo={setSelected} />
        <main id="movies" className="container-fluid px-3 px-lg-5 content">
          <Controls />
          <div className="stats-strip">
            <div><strong>{movies.length}</strong><span>Titles</span></div>
            <div><strong>{genres.length - 1}</strong><span>Genres</span></div>
            <div><strong>{movies.filter(m => m.rating >= 8.5).length}</strong><span>Highly Rated</span></div>
            <div><strong>HD</strong><span>Playback</span></div>
          </div>
          {query && <MovieRow title={`Search results for “${query}”`} movies={related.length ? related : filtered} {...rowProps} />}
          {history.length > 0 && <MovieRow title="Continue Watching" movies={history} {...rowProps} />}
          <MovieRow title="Trending Now" movies={trending} {...rowProps} />
          <HomeShowcase />
          <MovieRow title="Popular on StreamFlix" movies={popular} {...rowProps} />
          <MovieRow title="Top 10 Today" movies={topTen} {...rowProps} ranked />
          <MovieRow title={history.length ? 'Because You Watched' : 'Recommended For You'} movies={becauseYouWatched} {...rowProps} />
          <GenreShowcase />
        </main>
      </>
    );
    if (page === 'movies') return <CollectionPage kicker="MOVIES" title="Movies" text="Explore feature films across action, drama, adventure, romance and more." data={movieOnly} />;
    if (page === 'series') return <CollectionPage kicker="SERIES" title="TV Shows" text="Binge-worthy series, mysteries, comedies and originals collected in one place." data={seriesOnly} />;
    if (page === 'top10') return <CollectionPage kicker="TRENDING" title="Top 10 Today" text="The highest-rated titles currently featured on StreamFlix." data={topTen} />;
    if (page === 'genres') return (
      <main className="container-fluid px-3 px-lg-5 content page-content">
        <PageHeader kicker="COLLECTIONS" title="Browse by Genre" text="Pick a mood and discover titles from your favorite genre." />
        <div className="genre-pills page-genres">{genres.filter(g => g !== 'All').map(g => <button key={g} className={`genre-pill ${activeGenre === g ? 'active' : ''}`} onClick={() => {setActiveGenre(g); navigate('movies')}}>{g}</button>)}</div>
        {genres.filter(g => g !== 'All').map(g => <MovieRow key={g} title={g} movies={movies.filter(m => m.genre === g)} {...rowProps} />)}
      </main>
    );
    if (page === 'my-list') return <CollectionPage kicker="YOUR LIBRARY" title="My List" text="Your saved favorites, ready whenever you are." data={myList} />;
    if (page === 'watch-later') return <CollectionPage kicker="YOUR LIBRARY" title="Watch Later" text="Keep titles here for your next movie night." data={watchLater} />;
    if (page === 'history') return <CollectionPage kicker="YOUR ACTIVITY" title="Continue Watching" text="Pick up where you left off and discover similar titles." data={history} />;
    return (
      <main className="container px-3 page-content about-page">
        <PageHeader kicker="STREAMFLIX" title="About StreamFlix" text="A modern streaming-style frontend project built to demonstrate responsive UI, reusable React components, local storage and video playback." />
        <div className="about-hero-card">
          <div><span className="section-kicker">THE PROJECT</span><h2>A streaming experience, designed like a real product.</h2><p>StreamFlix combines a cinematic interface with practical frontend features: reusable React components, responsive layouts, local persistence, search, filters, collections and a dedicated video player.</p></div>
          <div className="about-orbit"><div className="orbit-core">SF</div><span className="orbit-chip chip-one">React</span><span className="orbit-chip chip-two">Vite</span><span className="orbit-chip chip-three">Local Storage</span></div>
        </div>
        <div className="about-grid">
          <article><i className="bi bi-grid-1x2"></i><h3>9 Website Pages</h3><p>Home, Movies, TV Shows, Top 10, Genres, My List, Watch Later, History and About are available as separate hash routes.</p></article>
          <article><i className="bi bi-play-btn"></i><h3>Dedicated Playback</h3><p>Open any title in a focused video experience and keep watched titles available in Continue Watching.</p></article>
          <article><i className="bi bi-lightning-charge"></i><h3>Smart Interactions</h3><p>Live search, genre filters, sorting, toast feedback, modal details and one-click collections make the UI feel app-like.</p></article>
          <article><i className="bi bi-phone"></i><h3>Responsive by Design</h3><p>Reusable rows, cards and navigation adapt across desktop, tablet and mobile screens.</p></article>
        </div>
        <div className="tech-ribbon"><span>BUILT WITH</span><b>React</b><b>Vite</b><b>Bootstrap</b><b>CSS</b><b>HTML5 Video</b><b>LocalStorage</b></div>
      </main>
    );
  };

  // Keep every hook above unconditional; the intro is rendered only after all hooks are registered.
  if (showIntro) return <Intro onDone={() => setShowIntro(false)} />;

  return (
    <div onClick={() => profileOpen && setProfileOpen(false)}>
      <Navbar query={query} onSearch={value => {setQuery(value);setSearchOpen(Boolean(value));}} onSearchFocus={() => setSearchOpen(Boolean(query))} myListCount={myList.length} watchLaterCount={watchLater.length} profileOpen={profileOpen} onProfile={e => {e?.stopPropagation?.();setProfileOpen(v=>!v);}} onNavigate={navigate} currentPage={page} />

      {searchOpen && query && <div className="search-panel" onClick={e=>e.stopPropagation()}>
        <div className="search-panel-head"><span>SEARCH RESULTS</span><button onClick={()=>{setQuery('');setSearchOpen(false)}}>Clear</button></div>
        {related.length ? related.slice(0,6).map(movie => <button key={movie.id} className="search-result-item" onClick={()=>{setSelected(movie);setSearchOpen(false)}}><img src={movie.image} alt=""/><span><strong>{movie.title}</strong><small>{movie.genre} • {movie.year}</small></span><i className="bi bi-chevron-right"/></button>) : <div className="search-empty">No exact title found — try a genre like Sci-Fi, Thriller or Drama.</div>}
        <button className="see-all" onClick={()=>{setSearchOpen(false);navigate('movies')}}>See all results <i className="bi bi-arrow-right"/></button>
      </div>}

      {profileOpen && <div className="profile-menu" onClick={e=>e.stopPropagation()}>
        <div className="profile-head"><span className="avatar large">IK</span><div><strong>IK</strong><small>StreamFlix Member</small></div></div>
        <button onClick={()=>navigate('history')}>Continue Watching <span>{history.length}</span></button>
        <button onClick={()=>navigate('my-list')}>My List <span>{myList.length}</span></button>
        <button onClick={()=>navigate('watch-later')}>Watch Later <span>{watchLater.length}</span></button>
        <button onClick={()=>showToast('Profiles & settings are ready for demo')}>Settings <i className="bi bi-gear"/></button>
      </div>}

      {renderPage()}
      <Footer />
      <MovieModal movie={selected} onClose={()=>setSelected(null)} onPlay={playMovie} onToggleList={toggleList} inList={selected ? myList.some(x=>x.id===selected.id):false} onToggleWatchLater={toggleWatchLater} inWatchLater={selected ? watchLater.some(x=>x.id===selected.id):false} similar={selected ? movies.filter(m=>m.genre===selected.genre && m.id!==selected.id).slice(0,6):[]} onSimilar={setSelected}/>
      <VideoPlayer movie={playerMovie} onClose={()=>setPlayerMovie(null)} />
      {toast && <div className="toast-custom"><i className="bi bi-check-circle-fill"></i>{toast}</div>}
    </div>
  );
}
