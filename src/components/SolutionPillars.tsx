import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Shield, Cpu, Sparkles, CheckCircle2, Layers, Info } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export const SolutionPillars: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (showcaseRef.current) {
        gsap.from(showcaseRef.current, {
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      id: 0,
      badge: 'Trụ Cột 01',
      title: 'Vật Liệu Composite Từ Phụ Phẩm Cà Phê',
      subtitle: 'Coffee-based Bio-composite Đắk Lắk',
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      specs: [
        { label: 'Độ dày tiêu chuẩn', value: '1.0 - 1.3 mm' },
        { label: 'Nguồn gốc bã cà phê', value: 'Đắk Lắk, Tây Nguyên' },
        { label: 'Khả năng uốn gập', value: 'Không nứt gãy / bong tróc' },
        { label: 'Kháng nước', value: 'Sinh hoạt thông thường' },
      ],
      points: [
        'Tận dụng nguồn bã cà phê sấy khô được thu gom và xử lý kỹ lưỡng từ thủ phủ cà phê Đắk Lắk, kết hợp cùng nghiên cứu vật liệu composite tiên tiến trong nước.',
        'Độ dày tiêu chuẩn 1.0 - 1.3 mm tạo độ mềm mại, linh hoạt, gấp mở theo phom ví mượt mà mà không lo nứt gãy như da tái chế kém chất lượng.',
        'Bề mặt mang sắc nâu trầm tự nhiên từ hạt cà phê, kháng bụi bẩn, chống thấm nước nhẹ và thoang thoảng hương cà phê tự nhiên rất nhẹ dịu.',
        'Cam kết minh bạch: Thúc đẩy kinh tế tuần hoàn bằng cách nâng cao giá trị phụ phẩm nông nghiệp Việt Nam trong thời trang hiện đại.',
      ],
      accentHex: '#427a5b',
    },
    {
      id: 1,
      badge: 'Trụ Cột 02',
      title: 'Lớp Khiên Chắn Sóng RFID Bảo Mật Thẻ Tuyệt Đối',
      subtitle: 'Vải dẫn điện dệt Niken & Đồng siêu mỏng',
      icon: <Shield className="w-6 h-6 text-[#df9854]" />,
      tagColor: 'text-[#df9854] border-[#c88242]/30 bg-[#c88242]/10',
      specs: [
        { label: 'Tần số suy giảm', value: '13.56 MHz (NFC/POS)' },
        { label: 'Độ dày lớp khiên', value: '0.08 - 0.12 mm' },
        { label: 'Vật liệu dệt', value: 'Sợi phủ Niken & Đồng' },
        { label: 'Tỷ lệ cản sóng', value: 'Chuẩn 19/20 lần quét POS' },
      ],
      points: [
        'Tích hợp lớp vải dẫn điện chuyên dụng kết cấu sợi phủ đồng và niken siêu mỏng chỉ 0.08 - 0.12 mm ẩn sâu bên trong lớp lót ngăn thẻ, hoàn toàn không làm cộm hay mất phom dáng ví.',
        'Làm suy giảm tối đa trường điện từ ở dải tần 13.56 MHz – tần số chuẩn của toàn bộ thẻ thanh toán Visa, Mastercard, Napas Contactless hiện nay.',
        'Ngăn chặn tuyệt đối mọi hành vi đọc trộm thông tin thẻ từ xa qua thiết bị POS hoặc smartphone gắn chip NFC của kẻ gian.',
        'Không ảnh hưởng thẻ: Thẻ chỉ được bảo vệ khi nằm trong ngăn lót; ngay khi bạn rút thẻ ra, tính năng chạm thanh toán vẫn hoạt động bình thường 100%.',
      ],
      accentHex: '#c88242',
    },
    {
      id: 2,
      badge: 'Trụ Cột 03',
      title: 'Định Vị Thông Minh – Tìm Lại Ví Chỉ Trong Tích Tắc',
      subtitle: 'Apple Find My™ & Kiến trúc Dual-Zone',
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      tagColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      specs: [
        { label: 'Mạng lưới tương thích', value: 'Apple Find My (iOS)' },
        { label: 'Thời lượng pin', value: '365 ngày (thay pin dễ dàng)' },
        { label: 'Kiến trúc khoang', value: 'Dual-Zone Architecture™' },
        { label: 'Tần số kết nối', value: 'Bluetooth LE 2.4 GHz' },
      ],
      points: [
        'Tích hợp thiết bị định vị không dây Bluetooth Low Energy, tương thích trực tiếp với ứng dụng Apple Find My có sẵn trên hàng tỷ thiết bị Apple toàn cầu.',
        'Thời lượng pin bền bỉ lên đến 365 ngày sử dụng liên tục, dễ dàng tháo rời thay thế pin chuẩn cúc áo CR2032 phổ biến.',
        'Giải pháp Khoang Kép độc quyền (Dual-Zone Architecture): Giải quyết triệt để xung đột giữa lớp chắn RFID và sóng Bluetooth 2.4 GHz.',
        'Khu vực bảo mật (ngăn thẻ lót RFID) và Khu vực định vị (khoang Smart Tag) được bố trí tách biệt tuyệt đối, đảm bảo thẻ an toàn mà sóng tìm ví luôn mạnh mẽ!',
      ],
      accentHex: '#0891b2',
    },
  ];

  return (
    <section ref={sectionRef} id="technology" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c88242]/10 border border-[#c88242]/30 text-[#df9854] text-xs font-semibold tracking-wider uppercase font-tech mb-4 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Giải Pháp Đột Phá</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#f5efeb] tracking-tight mb-5 text-balance">
            EcoShield Wallet – <span className="shimmer-text whitespace-nowrap">Định Nghĩa Lại</span> Chiếc Ví Thế Hệ Mới
          </h2>
          <p className="text-base sm:text-lg text-[#b5a89e] leading-relaxed text-pretty">
            Không chạy theo những lời quảng cáo hoa mỹ, EcoShield tập trung vào giải pháp kỹ thuật thực tế, minh bạch nguồn gốc và tối ưu hóa trải nghiệm sử dụng hàng ngày.
          </p>
        </div>

        {/* 3 Pillar Tabs Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => {
                sound.playClick();
                setActivePillar(pillar.id);
              }}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap ${
                activePillar === pillar.id
                  ? 'bg-[#c88242] text-white border-[#df9854] shadow-xl shadow-[#c88242]/25 scale-102'
                  : 'bg-[#140f0d] text-[#b5a89e] border-zinc-800 hover:border-zinc-700 hover:text-[#f5efeb]'
              }`}
            >
              <span>{pillar.badge}</span>
              <span className="hidden md:inline">• {pillar.title.slice(0, 22)}...</span>
            </button>
          ))}
        </div>

        {/* Active Pillar Showcase Card */}
        <div
          ref={showcaseRef}
          className="glass-coffee rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#c88242]/20 shadow-2xl relative overflow-hidden mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c88242]/30 text-xs font-tech font-semibold mb-4 bg-[#c88242]/10 text-[#df9854] whitespace-nowrap">
                  {pillars[activePillar].badge}: {pillars[activePillar].subtitle}
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-serif-title text-[#f5efeb] mb-6 leading-tight text-balance">
                  {pillars[activePillar].title}
                </h3>

                <div className="space-y-3.5 mb-8">
                  {pillars[activePillar].points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <p className="text-sm text-[#eddccb] leading-relaxed">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-800">
                {pillars[activePillar].specs.map((sp, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#140f0d] border border-zinc-800">
                    <span className="text-[10px] text-[#b5a89e] block font-medium whitespace-nowrap">{sp.label}</span>
                    <span className="text-xs font-bold text-[#f5efeb] font-tech mt-1 block whitespace-nowrap">
                      {sp.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Card (5 Cols) - Infographic Cross-Section Visual */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-gradient-to-b from-[#18110e] to-[#0c0908] p-6 border border-[#c88242]/25 relative overflow-hidden shadow-inner">
                <div className="text-xs font-bold text-[#c88242] uppercase tracking-wider font-tech mb-4 flex items-center justify-between">
                  <span className="whitespace-nowrap">Mặt Cắt Kỹ Thuật Độc Quyền</span>
                  <Layers className="w-4 h-4 shrink-0" />
                </div>

                {/* 3-Layer Cross-Section Visual Stack */}
                <div className="space-y-4">
                  {/* Layer 1: Coffee Bio-Composite */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    activePillar === 0
                      ? 'bg-[#c88242]/20 border-[#c88242] shadow-lg ring-1 ring-[#c88242]'
                      : 'bg-[#140f0d] border-zinc-800 opacity-80'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <span className="text-xs font-bold text-[#f5efeb] flex items-center gap-1.5 whitespace-nowrap">
                        <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        Lớp Ngoài: Bio-Composite Cà Phê
                      </span>
                      <span className="text-[10px] font-tech text-[#c88242] whitespace-nowrap">1.0 - 1.3 mm</span>
                    </div>
                    <p className="text-[11px] text-[#b5a89e]">
                      Tận dụng bã cà phê Đắk Lắk sấy khô + polymer liên kết, chống nước và nứt gãy.
                    </p>
                  </div>

                  {/* Layer 2: RFID Shielding Mesh */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    activePillar === 1
                      ? 'bg-[#c88242]/20 border-[#c88242] shadow-lg ring-1 ring-[#c88242]'
                      : 'bg-[#140f0d] border-zinc-800 opacity-80'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <span className="text-xs font-bold text-[#f5efeb] flex items-center gap-1.5 whitespace-nowrap">
                        <Shield className="w-3.5 h-3.5 text-[#df9854] shrink-0" />
                        Lớp Giữa: Lưới Chắn Sóng RFID
                      </span>
                      <span className="text-[10px] font-tech text-amber-400 whitespace-nowrap">0.08 - 0.12 mm</span>
                    </div>
                    <p className="text-[11px] text-[#b5a89e]">
                      Sợi phủ Niken & Đồng triệt tiêu trường sóng 13.56 MHz chống đọc lén POS.
                    </p>
                  </div>

                  {/* Layer 3: Dual-Zone Smart Tag Chamber */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    activePillar === 2
                      ? 'bg-[#c88242]/20 border-[#c88242] shadow-lg ring-1 ring-[#c88242]'
                      : 'bg-[#140f0d] border-zinc-800 opacity-80'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <span className="text-xs font-bold text-[#f5efeb] flex items-center gap-1.5 whitespace-nowrap">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        Khoang Kép: Smart Tag Độc Lập
                      </span>
                      <span className="text-[10px] font-tech text-cyan-400 whitespace-nowrap">BLE 2.4 GHz</span>
                    </div>
                    <p className="text-[11px] text-[#b5a89e]">
                      Nằm ngoài vùng chắn RFID, tương thích Apple Find My, pin 365 ngày dễ thay thế.
                    </p>
                  </div>
                </div>

                <div className="mt-5 p-3 rounded-lg bg-[#0e0b0a] border border-[#c88242]/20 flex items-center gap-2 text-[10px] text-[#eddccb]">
                  <Info className="w-4 h-4 text-[#c88242] shrink-0" />
                  <span>Cấu tạo 3 lớp đạt chuẩn thử nghiệm uốn cong & suy giảm trường vô tuyến.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
