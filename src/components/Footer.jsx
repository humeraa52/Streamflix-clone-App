import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid px-3 px-lg-5">
        <div className="socials mb-4"><i className="bi bi-facebook"></i><i className="bi bi-instagram"></i><i className="bi bi-twitter-x"></i><i className="bi bi-youtube"></i></div>
        <div className="row g-3 small text-secondary">
          <div className="col-6 col-md-3"><p>Audio and Subtitles</p><p>Media Centre</p><p>Privacy</p></div>
          <div className="col-6 col-md-3"><p>Help Centre</p><p>Terms of Use</p><p>Contact Us</p></div>
          <div className="col-6 col-md-3"><p>Gift Cards</p><p>Cookie Preferences</p><p>Speed Test</p></div>
          <div className="col-6 col-md-3"><p>Investor Relations</p><p>Jobs</p><p>Legal Notices</p></div>
        </div>
        <div className="footer-bottom mt-4 pt-3">© 2026 StreamFlix • FEWD Lab Mini Project • Built with React + Bootstrap</div>
      </div>
    </footer>
  );
}