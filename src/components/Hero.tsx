import React from 'react';
import { ArrowRight, Shield, Cpu, MapPin, Leaf, ChevronDown } from 'lucide-react';
import { ThreeWalletViewer } from './ThreeWalletViewer';
import { sound } from '../utils/audio';

interface HeroProps {
  onPreOrderClick: () => void;
  onExploreTechClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPreOrderClick, onExploreTechClick }) => {
  const trustBadges = [
    {
      icon: <Leaf className="w-4 h-4 text-emerald-400" />,
      label: 'Tận dụng phụ phẩm cà phê Tây Nguyên',
      sub: 'Đắk Lắk Bio-composite',
    },
    {
      icon: <Shield className="w-4 h-4 text-[#df9854]" />,
      label: 'Chắn sóng NFC/RFID 13.56 MHz',
      sub: 'Bảo vệ thẻ ngân hàng 100%',
    },
    {
      icon: <Cpu className="w-4 h-4 text-cyan-400" />,
      label: 'Tương thích Apple Find My',
      sub: 'Khoang kép độc lập (Dual-Zone)',
    },
    {
      icon: <MapPin className="w-4 h-4 text-red-400" />,
      label: 'Thiết kế & Gia công chuẩn mực tại Việt Nam',
      sub: 'OEM TP. Hồ Chí Minh',
    },
  ];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Ambient Glows & Coffee Motif */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#c88242]/12 to-emerald-500/08 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#c88242]/08 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-coffee border border-[#c88242]/30 shadow-lg shadow-[#c88242]/10">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c88242] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#df9854]" />
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#eddccb]">
              Tiên phong thời trang tuần hoàn & phụ kiện bảo mật 2026
            </span>
            <span className="hidden sm:inline text-xs font-tech text-[#c88242] border-l border-[#c88242]/30 pl-2">
              Lô Pilot Đợt 1
            </span>
          </div>
        </div>

        {/* Hero Title (H1) & Sub-headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-serif-title font-bold text-[#f5efeb] tracking-tight leading-[1.15] mb-6">
            EcoShield Wallet: Khi Phụ Phẩm Cà Phê Việt Hóa Thành{' '}
            <span className="shimmer-text">"Khiên Chắn"</span> Bảo Vệ Tài Sản Của Bạn
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#b5a89e] leading-relaxed max-w-3xl mx-auto">
            Chiếc ví thời trang tiên phong kết hợp <strong className="text-[#f5efeb]">3 giá trị cốt lõi</strong>: Vật liệu composite chứa phụ phẩm cà phê thân thiện môi trường – Lớp lót chắn sóng RFID bảo mật thẻ ngân hàng – Khoang định vị thông minh giúp bạn không bao giờ thất lạc ví.
          </p>
        </div>

        {/* Main Interactive 3D Showcase & Visual Banner */}
        <div className="my-8 max-w-5xl mx-auto">
          <ThreeWalletViewer color="espresso" initialExploded={false} />
        </div>

        {/* CTA Buttons Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-16">
          <button
            onClick={() => {
              sound.playClick();
              onPreOrderClick();
            }}
            className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-[#c88242] to-[#b2692c] hover:from-[#df9854] hover:to-[#c88242] text-white font-bold text-base tracking-wide transition-all shadow-xl shadow-[#c88242]/30 flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
          >
            <span>ĐẶT TRƯỚC NGAY - ƯU ĐÃI TỪ 249.000Đ</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onExploreTechClick();
            }}
            className="w-full sm:w-auto py-4 px-8 rounded-2xl glass-coffee hover:bg-[#251b17] border border-[#c88242]/30 text-[#eddccb] font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Tìm hiểu công nghệ bên trong</span>
            <ChevronDown className="w-4 h-4 text-[#c88242]" />
          </button>
        </div>

        {/* 4 Trust Badges (Điểm nhấn niềm tin) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="glass-coffee rounded-2xl p-4 sm:p-5 border border-[#c88242]/15 flex items-start gap-3.5 glass-coffee-hover"
            >
              <div className="w-9 h-9 rounded-xl bg-[#140f0d] border border-[#c88242]/25 flex items-center justify-center shrink-0 mt-0.5">
                {badge.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#f5efeb] leading-snug">
                  {badge.label}
                </h4>
                <p className="text-[11px] text-[#b5a89e] mt-1 font-tech">
                  {badge.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
