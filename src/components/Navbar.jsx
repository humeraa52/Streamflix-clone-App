import React from 'react';

export default function Navbar({ query, onSearch, onSearchFocus, myListCount, watchLaterCount, profileOpen, onProfile, onNavigate, currentPage }) {
  const links = [
    ['home','Home'], ['movies','Movies'], ['series','TV Shows'], ['top10','Top 10'],
    ['genres','Genres'], ['my-list','My List'], ['watch-later','Watch Later'], ['history','History'], ['about','About']
  ];
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top stream-nav">
      <div className="container-fluid px-3 px-lg-5">
        <button className="navbar-brand fw-bold brand nav-brand-button" onClick={() => onNavigate('home')}>STREAMFLIX</button>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            {links.map(([id,label]) => (
              <li className="nav-item" key={id}>
                <button className={`nav-link nav-button ${currentPage === id ? 'active' : ''}`} onClick={() => onNavigate(id)}>
                  {label}
                  {id === 'my-list' && <span className="badge text-bg-light ms-1">{myListCount}</span>}
                  {id === 'watch-later' && watchLaterCount > 0 && <span className="badge text-bg-light ms-1">{watchLaterCount}</span>}
                </button>
              </li>
            ))}
          </ul>
          <div className="search-box netflix-search"><i className="bi bi-search"></i><input value={query} onFocus={onSearchFocus} onChange={e => onSearch(e.target.value)} placeholder="Titles, people, genres" aria-label="Search movies"/><kbd>⌘K</kbd></div>
          <button className={`profile ms-lg-2 mt-3 mt-lg-0 profile-button ${profileOpen ? 'open' : ''}`} onClick={onProfile} aria-expanded={profileOpen}><span className="avatar">IK</span><i className="bi bi-chevron-down small"></i></button>
        </div>
      </div>
    </nav>
  );
}
