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
          ? 'bg-[#0c0908]/90 backdrop-blur-xl border-b border-[#c88242]/20 py-2.5 shadow-2xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo - Fixed Width & No Shrink */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0 select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c88242] to-[#8c5225] flex items-center justify-center shadow-lg shadow-[#c88242]/20 border border-[#df9854]/40 transition-transform group-hover:scale-105 shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-base sm:text-lg font-bold font-serif-title tracking-tight text-[#f5efeb]">
                  EcoShield
                </span>
                <span className="text-[#c88242] text-[11px] font-tech font-semibold tracking-wide">
                  Wallet
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#b5a89e] font-tech mt-0.5">
                Bio-Composite Cà Phê
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Only shown when width is sufficient, never wraps text) */}
          <nav className="hidden lg:flex items-center lg:gap-3 xl:gap-6 shrink">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-xs font-semibold text-[#b5a89e] hover:text-[#f5efeb] transition-colors relative py-1 whitespace-nowrap shrink-0 group cursor-pointer"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c88242] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Audio Toggle Button */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-[#1a1310] hover:bg-[#251b17] border border-[#c88242]/20 text-[#eddccb] transition-colors cursor-pointer shrink-0"
              title={isMuted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh'}
              aria-label="Toggle Sound Effects"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#c88242]" />
              )}
            </button>

            {/* Pilot Batch Pill (Hidden on narrow screens to prevent crowding) */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c88242]/10 border border-[#c88242]/30 text-[#df9854] text-[11px] font-tech font-semibold shrink-0 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Lô Pilot: 200 chiếc</span>
            </div>

            {/* Pre-order CTA Button */}
            <button
              onClick={() => {
                sound.playClick();
                onPreOrderClick();
              }}
              className="py-2.5 px-4 sm:px-5 rounded-xl bg-gradient-to-r from-[#c88242] to-[#b2692c] hover:from-[#df9854] hover:to-[#c88242] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-[#c88242]/20 flex items-center gap-2 cursor-pointer active:scale-95 shrink-0 whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="whitespace-nowrap">Đặt Trước Từ 249K</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#1a1310] border border-zinc-800 text-zinc-300 cursor-pointer shrink-0"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0908]/95 backdrop-blur-2xl border-b border-[#c88242]/20 px-4 pt-3 pb-6 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="py-2.5 text-sm font-medium text-[#eddccb] hover:text-[#c88242] border-b border-zinc-900/80 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs text-[#b5a89e]">
              <span className="whitespace-nowrap">Tây Nguyên Bio-Composite</span>
              <span className="text-[#c88242] font-tech whitespace-nowrap">Chắn RFID & Apple Find My</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
