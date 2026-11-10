import React, { useEffect, useRef } from 'react';
import { AlertCircle, Radio, Search, Trash2, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      }

      if (compareRef.current) {
        gsap.from(compareRef.current, {
          scrollTrigger: {
            trigger: compareRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const painPoints = [
    {
      icon: <Radio className="w-6 h-6 text-red-400 shrink-0" />,
      title: 'Nguy cơ "móc túi điện tử" vô hình',
      stat: 'Tần số 13.56 MHz',
      desc: 'Các loại thẻ thanh toán không tiếp xúc (Contactless / NFC / Visa / Mastercard) rất tiện lợi nhưng lại dễ dàng bị kẻ gian kích hoạt đọc trộm dữ liệu thẻ từ xa khi đứng cạnh bạn ở nơi đông người.',
      tag: 'Bảo mật thẻ nguy hiểm',
    },
    {
      icon: <Search className="w-6 h-6 text-amber-400 shrink-0" />,
      title: 'Ám ảnh thất lạc ví và giấy tờ',
      stat: '7 - 14 ngày làm lại thủ tục',
      desc: 'Chỉ một phút đãng trí để quên ví ở quán cà phê, rơi trên taxi hay rơi khi đi xe máy, bạn không chỉ mất tiền mặt mà còn tốn hàng tuần liền xếp hàng làm lại CCCD, bằng lái xe, thẻ ngân hàng.',
      tag: 'Mất mát thời gian & tâm lý',
    },
    {
      icon: <Trash2 className="w-6 h-6 text-emerald-400 shrink-0" />,
      title: 'Gánh nặng lên môi trường tự nhiên',
      stat: '500+ năm phân hủy PU',
      desc: 'Da động vật tiêu tốn tài nguyên nước và hóa chất thuộc da độc hại; trong khi da tổng hợp PU/PVC thông thường thải vi nhựa khó phân hủy. Người tiêu dùng hiện đại cần sự thay thế nhân văn hơn.',
      tag: 'Dấu chân sinh thái lớn',
    },
  ];

  return (
    <section ref={sectionRef} id="pain-points" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wider uppercase font-tech mb-4 whitespace-nowrap">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Rủi Ro Thường Trực Hàng Ngày</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#f5efeb] tracking-tight mb-5 text-balance">
            Chiếc Ví Của Bạn Có Đang Thực Sự <span className="text-red-400 whitespace-nowrap">"An Toàn"</span>?
          </h2>
          <p className="text-base sm:text-lg text-[#b5a89e] leading-relaxed text-pretty">
            Giữa nhịp sống số hóa hối hả, chiếc ví da truyền thống đang dần bộc lộ những điểm yếu chí mạng khiến bạn luôn phải sống trong cảm giác bất an.
          </p>
        </div>

        {/* 3 Main Pain Points Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {painPoints.map((item, idx) => (
            <div
              key={idx}
              className="glass-coffee rounded-3xl p-6 sm:p-8 border border-red-500/20 flex flex-col justify-between relative overflow-hidden group hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Background gradient on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/05 rounded-full blur-2xl group-hover:bg-red-500/12 transition-colors pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-tech text-red-400/90 bg-red-950/60 px-2.5 py-1 rounded-full border border-red-900/40 whitespace-nowrap">
                    {item.stat}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#f5efeb] mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-[#b5a89e] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-tech text-zinc-500 whitespace-nowrap">{item.tag}</span>
                <span className="text-xs font-bold text-red-400 whitespace-nowrap">Rủi ro cao</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Confrontation Table: Traditional Wallet vs EcoShield */}
        <div ref={compareRef} className="glass-coffee rounded-3xl p-6 sm:p-10 border border-[#c88242]/20 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#f5efeb] mb-2 font-serif-title">
              Sự Khác Biệt Giữa Ví Truyền Thống & EcoShield Wallet
            </h3>
            <p className="text-xs sm:text-sm text-[#b5a89e]">
              Bảo vệ toàn diện cả tài sản, thời gian và môi trường sống của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Wallet Box */}
            <div className="p-6 rounded-2xl bg-red-950/15 border border-red-900/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4 text-red-400 font-bold text-base">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <span className="whitespace-nowrap">Chiếc Ví Truyền Thống (Da bò / PU)</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-[#b5a89e]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span>Không có lớp chắn sóng: Máy quét NFC/POS từ xa có thể đọc lén thẻ ngân hàng.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span>Không có khoang định vị: Quên ví là coi như mất tích, không thể lần theo dấu vết.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-400 font-bold shrink-0">✕</span>
                    <span>Gây hại sinh thái: Quá trình thuộc da độc hại hoặc da giả PU khó phân hủy.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-red-900/30 text-xs text-red-400/80 font-tech">
                → Dễ bị lợi dụng, rủi ro tài chính cao
              </div>
            </div>

            {/* EcoShield Wallet Box */}
            <div className="p-6 rounded-2xl bg-[#c88242]/10 border-2 border-[#c88242]/40 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold font-tech uppercase whitespace-nowrap">
                Giải Pháp 2026
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4 text-[#df9854] font-bold text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="whitespace-nowrap">EcoShield Bio-Wallet Đột Phá</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-[#eddccb]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Lớp chắn sóng RFID 13.56 MHz:</strong> Triệt tiêu 100% rủi ro móc túi điện tử.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Dual-Zone Apple Find My:</strong> Khoang riêng không nghẽn sóng Bluetooth, tìm ví trong tích tắc.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Composite bã cà phê Đắk Lắk:</strong> Mềm dẻo 1.0 - 1.3 mm, bền bỉ, thân thiện môi trường.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-[#c88242]/30 text-xs text-emerald-400 font-tech font-bold flex items-center justify-between">
                <span>→ An tâm tài sản & Đẳng cấp sống xanh</span>
                <span className="whitespace-nowrap">Chuẩn hóa tại VN</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
