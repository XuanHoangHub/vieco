import React, { useState, useEffect } from 'react';
import { Shield, Volume2, VolumeX, Menu, X, ShoppingBag } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onPreOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onPreOrderClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  const navLinks = [
    { label: 'Vấn Đề', href: '#pain-points' },
    { label: 'Công Nghệ 3 Lớp', href: '#technology' },
    { label: 'Mô Phỏng Trực Quan', href: '#simulators' },
    { label: 'Bộ Sưu Tập & Giá', href: '#pricing' },
    { label: 'Kiểm Định QC', href: '#quality' },
    { label: 'Hỏi Đáp (FAQ)', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    sound.playClick();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0908]/92 backdrop-blur-xl border-b border-[#c88242]/20 py-2.5 shadow-2xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Brand Logo - Fixed Width & No Shrink, Modern Sans-Serif */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0 select-none whitespace-nowrap"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#c88242] to-[#8c5225] flex items-center justify-center shadow-lg shadow-[#c88242]/20 border border-[#df9854]/40 transition-transform group-hover:scale-105 shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-base sm:text-lg font-extrabold font-heading tracking-tight text-[#f5efeb]">
                  EcoShield
                </span>
                <span className="text-[#c88242] text-[11px] font-tech font-bold tracking-wider uppercase">
                  Wallet
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#b5a89e] font-tech mt-0.5 whitespace-nowrap">
                Bio-Composite Cà Phê
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Only shown on xl screens to guarantee generous spacing with NO word breaks) */}
          <nav className="hidden xl:flex items-center xl:gap-5 2xl:gap-7 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs font-semibold text-[#b5a89e] hover:text-[#f5efeb] transition-colors relative py-1.5 whitespace-nowrap shrink-0 group cursor-pointer"
              >
                <span className="whitespace-nowrap">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c88242] transition-all duration-200 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Audio Toggle Button with Animated Equalizer Bars */}
            <button
              onClick={handleToggleSound}
              className="px-2.5 py-2 rounded-xl bg-[#1a1310] hover:bg-[#251b17] border border-[#c88242]/20 text-[#eddccb] transition-all cursor-pointer shrink-0 flex items-center gap-1.5 active:scale-95"
              title={isMuted ? 'Bật âm thanh hiệu ứng (Web Audio)' : 'Tắt âm thanh hiệu ứng'}
              aria-label="Toggle Sound Effects"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-500 shrink-0" />
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#c88242] shrink-0" />
                  <div className="flex items-end gap-0.5 h-3 px-0.5">
                    <span className="w-0.5 bg-[#c88242] rounded-full animate-eq-1" />
                    <span className="w-0.5 bg-[#df9854] rounded-full animate-eq-2" />
                    <span className="w-0.5 bg-[#c88242] rounded-full animate-eq-3" />
                  </div>
                </>
              )}
            </button>

            {/* Pilot Batch Pill (Shown on desktop, guaranteed single line) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#c88242]/10 border border-[#c88242]/30 text-[#df9854] text-[11px] font-tech font-semibold shrink-0 whitespace-nowrap select-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="whitespace-nowrap">Lô Pilot: 200 chiếc</span>
            </div>

            {/* Pre-order CTA Button - Single Line Guaranteed with Luxury Shimmer */}
            <button
              onClick={() => {
                sound.playClick();
                onPreOrderClick();
              }}
              className="btn-shimmer-wrap py-2.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-[#c88242] to-[#b2692c] hover:from-[#df9854] hover:to-[#c88242] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-[#c88242]/20 flex items-center gap-2 cursor-pointer active:scale-95 shrink-0 whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="whitespace-nowrap">Đặt Trước Từ 249K</span>
            </button>

            {/* Mobile / Tablet Menu Hamburger (Visible up to xl) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-[#1a1310] border border-[#c88242]/20 text-zinc-300 hover:text-white cursor-pointer shrink-0 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#0c0908]/96 backdrop-blur-2xl border-b border-[#c88242]/20 px-4 pt-3 pb-6 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-2 max-w-lg mx-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="py-3 px-3 rounded-lg text-sm font-medium text-[#eddccb] hover:bg-[#1a1310] hover:text-[#c88242] border-b border-zinc-900/60 whitespace-nowrap transition-colors flex items-center justify-between"
              >
                <span className="whitespace-nowrap">{link.label}</span>
                <span className="text-[#c88242] text-xs font-tech">→</span>
              </a>
            ))}
            <div className="pt-3 px-3 flex items-center justify-between text-xs text-[#b5a89e]">
              <span className="whitespace-nowrap">Tây Nguyên Bio-Composite</span>
              <span className="text-[#c88242] font-tech whitespace-nowrap">Chắn RFID & Apple Find My</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
