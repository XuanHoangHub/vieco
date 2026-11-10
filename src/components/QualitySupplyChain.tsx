import React, { useEffect, useRef } from 'react';
import { Award, CheckCircle, MapPin, Factory, Beaker, FileCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const QualitySupplyChain: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const qcGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (stepsRef.current) {
        gsap.from(stepsRef.current.children, {
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 35,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        });
      }

      if (qcGridRef.current) {
        gsap.from(qcGridRef.current.children, {
          scrollTrigger: {
            trigger: qcGridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const supplySteps = [
    {
      step: '01',
      title: 'Thu Gom & Sấy Khô Bã Cà Phê',
      location: 'Đắk Lắk, Tây Nguyên',
      icon: <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />,
      desc: 'Tuyển chọn nguồn bã cà phê Robusta chuẩn mực từ các hợp tác xã chế biến cà phê Đắk Lắk, sấy khô công nghiệp loại bỏ ẩm và tạp chất.',
    },
    {
      step: '02',
      title: 'Nghiên Cứu Vật Liệu Bio-Composite',
      location: 'Phòng Lab Vật Liệu Sinh Học',
      icon: <Beaker className="w-5 h-5 text-cyan-400 shrink-0" />,
      desc: 'Phối trộn bã cà phê với hạt polymer sinh thái, tạo thành các tấm vật liệu dày 1.0 - 1.3 mm có cơ tính dẻo dai, chống thấm và không nứt gãy.',
    },
    {
      step: '03',
      title: 'Chế Tác Thủ Công OEM Chuyên Nghiệp',
      location: 'Xưởng May Túi Ví Cao Cấp TP.HCM',
      icon: <Factory className="w-5 h-5 text-[#df9854] shrink-0" />,
      desc: 'Cắt laser chính xác, lót màng chắn sóng Niken-Đồng và gia công từng đường kim mũi chỉ theo phom dáng Bifold & Mini Zip chuẩn mực.',
    },
  ];

  const qcLevels = [
    {
      level: 'Cấp Độ 1',
      title: 'Kiểm Định Độ Bền Cơ Học Vật Liệu',
      badge: 'Thử nghiệm uốn gập',
      desc: 'Thử nghiệm uốn gập liên tục 10.000 chu kỳ trên tấm composite để đảm bảo không bị giòn gãy, bong tróc nếp gấp hay bai dão trong quá trình sử dụng hàng ngày.',
      result: '100% Đạt Chuẩn Đàn Hồi',
    },
    {
      level: 'Cấp Độ 2',
      title: 'Kiểm Định Chắn Sóng RFID & NFC',
      badge: 'Thử nghiệm máy POS/NFC',
      desc: 'Quét trực tiếp bằng máy POS không tiếp xúc và smartphone hỗ trợ NFC ở mọi góc độ 360 độ quanh ví. Đạt chuẩn nội bộ ngăn chặn tối thiểu 19/20 lần quét từ bên ngoài.',
      result: 'Ngăn Chặn Tối Thiểu 19/20 Lần',
    },
    {
      level: 'Cấp Độ 3',
      title: 'Kiểm Định Tín Hiệu Bluetooth & Hoàn Thiện',
      badge: 'Thử nghiệm Apple Find My',
      desc: 'Đo lường cường độ suy hao sóng BLE 2.4 GHz qua khoang định vị Dual-Zone, kiểm tra độ mượt của dây khóa kéo YKK và đường chỉ may sắc sảo trước khi đóng gói.',
      result: 'Sóng BLE 2.4 GHz Ổn Định',
    },
  ];

  return (
    <section ref={sectionRef} id="quality" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c88242]/10 border border-[#c88242]/30 text-[#df9854] text-xs font-semibold tracking-wider uppercase font-tech mb-4 whitespace-nowrap">
            <Award className="w-3.5 h-3.5 shrink-0" />
            <span>Minh Bạch Nguồn Gốc & Quy Trình</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#f5efeb] tracking-tight mb-5 text-balance">
            Tự Hào <span className="shimmer-text whitespace-nowrap">Chuỗi Giá Trị Nội Địa</span> & Kiểm Soát Chất Lượng 3 Cấp Độ
          </h2>
          <p className="text-base sm:text-lg text-[#b5a89e] leading-relaxed text-pretty">
            EcoShield Wallet không phải là sản phẩm thương mại mua đi bán lại. Mỗi chiếc ví đến tay bạn là kết tinh của sự hợp tác chặt chẽ cùng các đối tác kỹ thuật uy tín tại Việt Nam.
          </p>
        </div>

        {/* Domestic Supply Chain Steps */}
        <div className="mb-20">
          <h3 className="text-lg font-bold text-[#f5efeb] mb-8 text-center font-serif-title whitespace-nowrap">
            Hành Trình Phụ Phẩm Cà Phê Việt Hóa Thành Chiếc Ví Bảo Mật
          </h3>
          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            {supplySteps.map((step, idx) => (
              <div
                key={idx}
                className="glass-coffee rounded-3xl p-6 sm:p-8 border border-[#c88242]/20 flex flex-col justify-between relative group hover:border-[#c88242]/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-bold font-tech text-[#c88242]/60 group-hover:text-[#c88242] transition-colors whitespace-nowrap">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#140f0d] border border-[#c88242]/20 flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                  </div>

                  <span className="text-xs font-tech text-[#c88242] block mb-1 whitespace-nowrap">
                    {step.location}
                  </span>
                  <h4 className="text-lg font-bold text-[#f5efeb] mb-3 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#b5a89e] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Truy xuất nguồn gốc minh bạch</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Tier QC Inspection (Kiểm nghiệm 3 Cấp Độ) */}
        <div className="glass-coffee rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#c88242]/20 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold font-serif-title text-[#f5efeb] mb-3 text-balance">
              Quy Trình Kiểm Nghiệm Thực Tế 100% Lô Pilot
            </h3>
            <p className="text-xs sm:text-sm text-[#b5a89e] text-pretty">
              Trước khi xuất xưởng và giao đến tay khách hàng, từng chiếc ví đều phải trải qua 3 cấp độ kiểm định nghiêm ngặt.
            </p>
          </div>

          <div ref={qcGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qcLevels.map((qc, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#140f0d] border border-zinc-800 flex flex-col justify-between hover:border-[#c88242]/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <span className="text-xs font-bold text-[#c88242] font-tech uppercase whitespace-nowrap">
                      {qc.level}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-300 font-tech whitespace-nowrap">
                      {qc.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#f5efeb] mb-2 leading-snug">
                    {qc.title}
                  </h4>
                  <p className="text-xs text-[#b5a89e] leading-relaxed mb-6">
                    {qc.desc}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-[#c88242]/20 flex items-center justify-between text-xs gap-2">
                  <span className="text-zinc-400 whitespace-nowrap">Tiêu chuẩn:</span>
                  <span className="font-bold text-emerald-400 font-tech whitespace-nowrap">{qc.result}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pilot Batch Notice */}
          <div className="mt-8 p-4 rounded-2xl bg-[#c88242]/10 border border-[#c88242]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-[#df9854] shrink-0" />
              <p className="text-xs text-[#eddccb]">
                <strong>Cam kết xuất xưởng:</strong> Mỗi sản phẩm đi kèm phiếu kiểm định chất lượng số sê-ri lô Pilot đầu tiên và thẻ bảo hành 1-đổi-1 trong 12 tháng.
              </p>
            </div>
            <span className="text-xs font-tech text-[#df9854] font-bold shrink-0 whitespace-nowrap">
              QC Tested: Pass 100%
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
