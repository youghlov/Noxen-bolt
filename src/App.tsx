import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingScreen visible={!loaded} />
      {loaded && (
        <div className="bg-[#0A0A0A] min-h-screen overflow-x-hidden">
          <Cursor />
          <Nav />
          <main>
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </div>
      )}
    </>
  );
}
