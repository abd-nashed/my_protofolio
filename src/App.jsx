import { lazy, Suspense } from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import ProjectDetails from './pages/ProjectDetails';

const Hero = lazy(() => import('./pages/Hero'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </Suspense>
          }
        />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
      </Routes>
    </>
  );
}

export default App;