import React, { useState, useEffect } from 'react';
import './index.css';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Programs from './pages/Programs.jsx';
import Diet from './pages/Diet.jsx';
import Workouts from './pages/Workouts.jsx';
import Stories from './pages/Stories.jsx';
import FAQ from './pages/FAQ.jsx';
import Offers from './pages/Offers.jsx';
import Events from './pages/Events.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const setPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Re-run scroll reveal on page change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':     return <Home setPage={setPage} />;
      case 'about':    return <About />;
      case 'programs': return <Programs />;
      case 'diet':     return <Diet />;
      case 'workouts': return <Workouts />;
      case 'stories':  return <Stories setPage={setPage} />;
      case 'faq':      return <FAQ />;
      case 'offers':   return <Offers />;
      case 'events':   return <Events />;
      case 'contact':  return <Contact />;
      default:         return <Home setPage={setPage} />;
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} setPage={setPage} />
      <main>{renderPage()}</main>
    </>
  );
}
