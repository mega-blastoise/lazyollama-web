import './Home.css';

import React from 'react';
import { Navbar } from '../navbar';
import { Hero } from './components/Hero';

function HomePage() {
  return (
    <div className="container">
      <Navbar />
      <Hero />
    </div>
  );
}

export default HomePage;
