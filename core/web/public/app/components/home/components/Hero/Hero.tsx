import './Hero.css';
import React from 'react';

function HeroSection() {
  return (
    <section className="hero-section">
    <div className="hero-background"></div>
    <div className="container">
      <div className="hero">
        <h1>Run LLMs without the<br />grunt work</h1>
        <p className="hero-description">
          LazyOllama is a containerized solution for running Ollama models on your own hardware. Easily manage, start, and stop your models with a simple web interface.
        </p>
        <div className="hero-buttons">
          <a href="#" className="btn btn-primary">Get Started</a>
          <a href="#" className="btn btn-secondary">
            docker pull lazyollama/latest
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Downloads</div>
          </div>
          <div className="stat">
            <div className="stat-number">15+</div>
            <div className="stat-label">Models</div>
          </div>
          <div className="stat">
            <div className="stat-number">128</div>
            <div className="stat-label">Contributors</div>
          </div>
        </div>

        <div className="preview">
          <div className="preview-header">
            <div className="browser-dots">
              <div className="browser-dot browser-dot-red"></div>
              <div className="browser-dot browser-dot-yellow"></div>
              <div className="browser-dot browser-dot-green"></div>
            </div>
          </div>
          <div className="preview-content">
            <img src="/api/placeholder/860/500" alt="LazyOllama Dashboard" className="preview-image" />
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default HeroSection;
