import React from 'react';
import '../../styles/Home.css';
import Hero from '../StudyGroup/Hero';
import Features from './Features';
import PopularPosts from '../StudyGroup/PopularPosts';
import CTA from './CTA';

function App() {
  return (
    <div className="App">
      
      <main className="App-main">
        <Hero />
        
        <h1>
          IT 전문가를 위한 모든 지원을 하나의<br />
          플랫폼에서 완벽하게 관리하세요
        </h1>

        <Features />

        <section className="popular">
          <PopularPosts />
          <PopularPosts />
        </section>

        <section className="CTA">
          <CTA></CTA>
        </section>
      </main>

    </div>
  );
}

export default App;
