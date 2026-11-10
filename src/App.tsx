import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionPillars } from './components/SolutionPillars';
import { InteractiveSimulators } from './components/InteractiveSimulators';
import { ProductConfigurator } from './components/ProductConfigurator';
import type { SelectedProduct } from './components/ProductConfigurator';
import { QualitySupplyChain } from './components/QualitySupplyChain';
import { FaqSection } from './components/FaqSection';
import { PreOrderSection } from './components/PreOrderSection';
import { Footer } from './components/Footer';
import { AmbientParticles } from './components/AmbientParticles';
import { ShoppingBag, ChevronUp } from 'lucide-react';
import { sound } from './utils/audio';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyBar(scrollY > 650);
      setShowScrollTop(scrollY > 1200);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToPreOrder = () => {
    sound.playClick();
    const el = document.getElementById('pre-order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTech = () => {
    sound.playClick();
    const el = document.getElementById('technology');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0908] text-[#f5efeb] relative selection:bg-[#c88242] selection:text-white">
      {/* Floating Organic Coffee & Amber Ambient Dust Particles */}
      <AmbientParticles />

      {/* Top Navbar */}
      <Navbar onPreOrderClick={scrollToPreOrder} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero
          onPreOrderClick={scrollToPreOrder}
          onExploreTechClick={scrollToTech}
        />

        {/* 2. Customer Pain Points */}
        <ProblemSection />

        {/* 3. The 3 Solution Pillars */}
        <SolutionPillars />

        {/* 4. Interactive Live Simulators (RFID & Apple Find My) */}
        <div id="simulators" className="scroll-mt-20">
          <InteractiveSimulators />
        </div>

        {/* 5. Product Lineup & Interactive Configurator */}
        <ProductConfigurator
          onSelectProduct={(prod) => {
            setSelectedProduct(prod);
          }}
        />

        {/* 6. Domestic Supply Chain & 3-Tier Quality Control */}
        <QualitySupplyChain />

        {/* 7. Frequently Asked Questions (FAQ) */}
        <FaqSection />

        {/* 8. Pre-Order & Checkout Section */}
        <PreOrderSection selectedProduct={selectedProduct} />
      </main>

      {/* Footer & Legal Disclaimers */}
      <Footer />

      {/* Sticky Bottom Pre-Order Quick Bar */}
      {showStickyBar && (
        <aside
          aria-label="Đặt trước nhanh"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-auto z-40 animate-fade-in"
        >
          <div className="glass-coffee rounded-2xl p-2.5 sm:px-5 sm:py-3 border border-[#c88242]/40 shadow-2xl flex items-center justify-between sm:gap-4">
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-[#f5efeb] block leading-tight whitespace-nowrap">EcoShield Wallet</span>
              <span className="text-[10px] text-amber-400 font-tech whitespace-nowrap">Đặt trước chỉ từ 249.000đ</span>
            </div>

            <button
              onClick={scrollToPreOrder}
              className="btn-shimmer-wrap w-full sm:w-auto py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#c88242] to-[#b2692c] hover:from-[#df9854] hover:to-[#c88242] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg shadow-[#c88242]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">ĐẶT TRƯỚC NGAY</span>
            </button>
          </div>
        </aside>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 z-40 p-3 rounded-full bg-[#1a1310] hover:bg-[#251b17] border border-[#c88242]/30 text-[#df9854] shadow-xl transition-all cursor-pointer hidden sm:flex items-center justify-center"
          title="Lên đầu trang"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default App;
