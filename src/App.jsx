import { lazy, Suspense } from 'react';
import Header from './components/Header';

const Hero = lazy(() => import('./pages/Hero'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </Suspense>
    </>
  );
}

export default App;