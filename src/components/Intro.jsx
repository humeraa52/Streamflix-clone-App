import React, { useEffect, useState } from 'react';

export default function Intro({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setLeaving(true), 1650);
    const doneTimer = setTimeout(() => onDone(), 2250);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div className={`stream-intro ${leaving ? 'is-leaving' : ''}`} aria-label="StreamFlix opening">
      <div className="intro-light intro-light-a" />
      <div className="intro-light intro-light-b" />
      <div className="intro-logo-wrap">
        <div className="intro-s" aria-hidden="true">S</div>
        <div className="intro-wordmark"><span>STREAM</span><b>FLIX</b></div>
      </div>
      <button className="intro-skip" type="button" onClick={onDone}>Skip intro</button>
    </div>
  );
}
