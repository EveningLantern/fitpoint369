import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import ThemeToggle from './ThemeToggle.jsx';
import logo from '../assets/logo.png';

const NAV_PAGES = ['home', 'programs', 'diet', 'workouts', 'offers', 'contact'];

export default function Navbar({ currentPage, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const nav = (page) => {
    setPage(page);
    setMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAboutActive = ['about', 'stories', 'faq'].includes(currentPage);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <div className="navbar-logo" onClick={() => nav('home')} id="nav-logo">
          <img src={logo} alt="FitPoint369 Logo" className="logo-img" />
          FitPoint<span>369</span>
        </div>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <span
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => nav('home')}
              id="nav-home"
            >
              Home
            </span>
          </li>

          {/* About Dropdown */}
          <li className="nav-dropdown-wrapper" ref={dropdownRef}>
            <span
              className={`nav-link ${isAboutActive ? 'active' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              id="nav-about"
            >
              About <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▾</span>
            </span>
            {dropdownOpen && (
              <div className="nav-dropdown">
                <span className="dropdown-item" onClick={() => nav('about')} id="nav-about-us">
                  <span className="dropdown-item-icon">🏢</span>
                  About Us
                </span>
                <span className="dropdown-item" onClick={() => nav('stories')} id="nav-stories">
                  <span className="dropdown-item-icon">⭐</span>
                  Success Stories
                </span>
                <span className="dropdown-item" onClick={() => nav('faq')} id="nav-faq">
                  <span className="dropdown-item-icon">❓</span>
                  FAQ
                </span>
              </div>
            )}
          </li>

          <li>
            <span
              className={`nav-link ${currentPage === 'programs' ? 'active' : ''}`}
              onClick={() => nav('programs')}
              id="nav-programs"
            >
              Programs
            </span>
          </li>
          <li>
            <span
              className={`nav-link ${currentPage === 'diet' ? 'active' : ''}`}
              onClick={() => nav('diet')}
              id="nav-diet"
            >
              Diet &amp; Nutrition
            </span>
          </li>
          <li>
            <span
              className={`nav-link ${currentPage === 'workouts' ? 'active' : ''}`}
              onClick={() => nav('workouts')}
              id="nav-workouts"
            >
              Workouts
            </span>
          </li>
          <li>
            <span
              className={`nav-link nav-link-offers ${currentPage === 'offers' ? 'active' : ''}`}
              onClick={() => nav('offers')}
              id="nav-offers"
            >
              <span className="spark-icon">✦</span> Offers
            </span>
          </li>
          <li>
            <span
              className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
              onClick={() => nav('contact')}
              id="nav-contact"
            >
              Contact
            </span>
          </li>
        </ul>

        {/* Right Side: Theme Toggle + Hamburger */}
        <div className="navbar-right">
          <ThemeToggle />
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            id="hamburger-btn"
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`} id="mobile-nav">
        <div className="mobile-nav-theme-row">
          <ThemeToggle />
        </div>
        <span className="mobile-nav-link" onClick={() => nav('home')} id="mn-home">Home</span>
        <span className="mobile-nav-link mobile-nav-section-label">About</span>
        <span className="mobile-nav-link mobile-nav-sub" onClick={() => nav('about')} id="mn-about">About Us</span>
        <span className="mobile-nav-link mobile-nav-sub" onClick={() => nav('stories')} id="mn-stories">Success Stories</span>
        <span className="mobile-nav-link mobile-nav-sub" onClick={() => nav('faq')} id="mn-faq">FAQ</span>
        <span className="mobile-nav-link" onClick={() => nav('programs')} id="mn-programs">Programs</span>
        <span className="mobile-nav-link" onClick={() => nav('diet')} id="mn-diet">Diet &amp; Nutrition</span>
        <span className="mobile-nav-link" onClick={() => nav('workouts')} id="mn-workouts">Workouts</span>
        <span className="mobile-nav-link offers-mobile" onClick={() => nav('offers')} id="mn-offers">✦ Offers</span>
        <span className="mobile-nav-link" onClick={() => nav('contact')} id="mn-contact">Contact</span>
      </div>
    </>
  );
}
