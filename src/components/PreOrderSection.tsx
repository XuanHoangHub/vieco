import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, Tag, Gift, Phone, Mail, User, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sound } from '../utils/audio';
import type { SelectedProduct } from './ProductConfigurator';

gsap.registerPlugin(ScrollTrigger);

interface PreOrderSectionProps {
  selectedProduct?: SelectedProduct | null;
}

export const PreOrderSection: React.FC<PreOrderSectionProps> = ({ selectedProduct }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  // Selected Version in Form
  const [chosenVersion, setChosenVersion] = useState<string>(
    selectedProduct
      ? `${selectedProduct.style}-${selectedProduct.edition}`
      : 'bifold-smart'
  );

  // Update chosen version if parent selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setChosenVersion(`${selectedProduct.style}-${selectedProduct.edition}`);
    }
  }, [selectedProduct]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (formCardRef.current) {
        gsap.from(formCardRef.current, {
          scrollTrigger: {
            trigger: formCardRef.current,
            start: 'top 85%',
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

  // Order submission modal state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Version Pricing catalog
  const versionCatalog: Record<string, { label: string; price: number; originalPrice?: number; discountNote?: string }> = {
    'minizip-essential': {
      label: 'Ví Nữ Mini Zip - Bản Essential (Cơ bản)',
      price: 249000,
    },
    'bifold-essential': {
      label: 'Ví Nam Bifold - Bản Essential (Cơ bản)',
      price: 279000,
    },
    'minizip-smart': {
      label: 'Ví Nữ Mini Zip - Bản Smart kèm Tag (Bán chạy)',
      price: 499000,
      originalPrice: 549000,
      discountNote: 'Tiết kiệm 50.000đ',
    },
    'bifold-smart': {
      label: 'Ví Nam Bifold - Bản Smart kèm Tag (Toàn diện)',
      price: 529000,
      originalPrice: 579000,
      discountNote: 'Tiết kiệm 50.000đ',
    },
  };

  const currentSelection = versionCatalog[chosenVersion] || versionCatalog['bifold-smart'];
  const basePrice = currentSelection.price;
  const discountAmount = Math.round(basePrice * (discountPercent / 100));
  const finalPrice = basePrice - discountAmount;

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num) + 'đ';
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const code = couponCode.trim().toUpperCase();

    if (code === 'ECOVIETNAM') {
      setDiscountPercent(10);
      setCouponMessage('Áp dụng thành công mã ECOVIETNAM: Giảm thêm 10%!');
    } else if (code === 'COFFEE2026') {
      setDiscountPercent(5);
      setCouponMessage('Áp dụng mã COFFEE2026: Giảm thêm 5%!');
    } else {
      setDiscountPercent(0);
      setCouponMessage('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handleSubmitPreOrder = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    if (!fullName || !phone) {
      alert('Vui lòng nhập Họ tên và Số điện thoại nhận hàng.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomId = 'ECO-' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedOrderId(randomId);
      setIsSuccessModalOpen(true);
      sound.playSuccessCelebration();

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c88242', '#df9854', '#3d6e53', '#ffffff']
        });
      } catch {
        // Fallback
      }
    }, 600);
  };

  return (
    <section ref={sectionRef} id="pre-order-form" className="py-20 md:py-28 relative scroll-mt-20">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-gradient-to-br from-[#c88242]/10 to-emerald-500/05 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c88242]/10 border border-[#c88242]/30 text-[#df9854] text-xs font-semibold tracking-wider uppercase font-tech mb-4 whitespace-nowrap">
            <Gift className="w-3.5 h-3.5 shrink-0" />
            <span>Lô Pilot Đợt 1 Giới Hạn 200 Chiếc</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#f5efeb] tracking-tight mb-5 text-balance">
            Sở Hữu <span className="shimmer-text whitespace-nowrap">EcoShield Wallet</span> – Bảo Vệ Tài Sản, Sống Xanh
          </h2>
          <p className="text-base sm:text-lg text-[#b5a89e] leading-relaxed text-pretty font-body">
            Số lượng sản xuất đợt đầu (Pilot Batch) có giới hạn nhằm đảm bảo kiểm soát chất lượng 100% trên từng đường kim mũi chỉ. Đăng ký đặt trước ngay hôm nay để nhận mức giá ưu đãi đặc biệt!
          </p>

          {/* Remaining spots progress indicator */}
          <div className="mt-6 max-w-md mx-auto p-3.5 rounded-2xl bg-[#140f0d] border border-[#c88242]/25">
            <div className="flex items-center justify-between text-xs font-tech mb-1.5 gap-2">
              <span className="text-[#b5a89e] whitespace-nowrap">Số lượng đặt trước:</span>
              <span className="text-[#df9854] font-bold whitespace-nowrap">162 / 200 chiếc đã đăng ký</span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#c88242] to-emerald-400 rounded-full w-[81%]" />
            </div>
            <span className="text-[11px] text-emerald-400 font-tech mt-1.5 block text-center whitespace-nowrap">
              🔥 Chỉ còn 38 suất ưu đãi giá đặt trước hôm nay!
            </span>
          </div>
        </div>

        {/* Form Container Card */}
        <div
          ref={formCardRef}
          className="glass-coffee rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#c88242]/30 shadow-2xl relative"
        >
          <form onSubmit={handleSubmitPreOrder} className="space-y-8">
            
            {/* 1. Lựa chọn phiên bản */}
            <div>
              <label className="text-sm font-bold text-[#f5efeb] flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-[#c88242] shrink-0" />
                <span className="whitespace-nowrap">1. Lựa chọn phiên bản EcoShield Wallet của bạn:</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {Object.entries(versionCatalog).map(([key, item]) => {
                  const isChecked = chosenVersion === key;
                  return (
                    <label
                      key={key}
                      onClick={() => sound.playClick()}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-[#c88242]/15 border-[#c88242] ring-1 ring-[#c88242] shadow-lg'
                          : 'bg-[#140f0d] border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="walletVersion"
                        value={key}
                        checked={isChecked}
                        onChange={() => setChosenVersion(key)}
                        className="mt-1 accent-[#c88242] w-4 h-4 cursor-pointer shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[#f5efeb] leading-snug">
                          {item.label}
                        </div>
                        {item.discountNote && (
                          <span className="inline-block text-[10px] font-tech text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/40 mt-1 whitespace-nowrap">
                            {item.discountNote}
                          </span>
                        )}
                        <div className="text-xs font-tech text-[#c88242] font-bold mt-2 whitespace-nowrap">
                          Giá: {formatVND(item.price)}
                          {item.originalPrice && (
                            <span className="text-zinc-500 line-through ml-2 font-normal whitespace-nowrap">
                              {formatVND(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 2. Thông tin cá nhân người nhận */}
            <div>
              <label className="text-sm font-bold text-[#f5efeb] flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-[#c88242] shrink-0" />
                <span className="whitespace-nowrap">2. Thông tin nhận thông báo & giao hàng:</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Họ tên */}
                <div>
                  <label className="text-xs font-medium text-[#b5a89e] block mb-1.5 whitespace-nowrap">
                    Họ và tên của bạn *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#140f0d] border border-zinc-800 focus:border-[#c88242] rounded-xl py-3 pl-10 pr-4 text-sm text-[#f5efeb] placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Số điện thoại / Zalo */}
                <div>
                  <label className="text-xs font-medium text-[#b5a89e] block mb-1.5 whitespace-nowrap">
                    Số điện thoại (Zalo) nhận ưu đãi *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#140f0d] border border-zinc-800 focus:border-[#c88242] rounded-xl py-3 pl-10 pr-4 text-sm text-[#f5efeb] placeholder-zinc-600 focus:outline-none transition-colors font-tech"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-medium text-[#b5a89e] block mb-1.5 whitespace-nowrap">
                    Email nhận thông tin xác nhận
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="ban@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#140f0d] border border-zinc-800 focus:border-[#c88242] rounded-xl py-3 pl-10 pr-4 text-sm text-[#f5efeb] placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Địa chỉ giao hàng */}
                <div>
                  <label className="text-xs font-medium text-[#b5a89e] block mb-1.5 whitespace-nowrap">
                    Địa chỉ nhận hàng (Tùy chọn ghi sau)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Số nhà, đường, tỉnh/thành"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#140f0d] border border-zinc-800 focus:border-[#c88242] rounded-xl py-3 pl-10 pr-4 text-sm text-[#f5efeb] placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Ghi chú */}
              <div className="mt-4">
                <label className="text-xs font-medium text-[#b5a89e] block mb-1.5 whitespace-nowrap">
                  Ghi chú riêng (Màu sắc ưu tiên / Khắc tên laze)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Chọn màu Nâu Đậm Espresso, khắc chữ 'EcoLife'..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#140f0d] border border-zinc-800 focus:border-[#c88242] rounded-xl p-3 text-sm text-[#f5efeb] placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* 3. Coupon Voucher Code Box */}
            <div className="p-4 rounded-2xl bg-[#140f0d] border border-zinc-800">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã ưu đãi (Gợi ý: ECOVIETNAM)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-black/40 border border-zinc-800 focus:border-[#c88242] rounded-xl px-4 py-2.5 text-xs text-[#f5efeb] uppercase font-tech focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[#eddccb] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                >
                  Áp Dụng
                </button>
              </div>
              {couponMessage && (
                <p className={`text-xs mt-2 font-tech ${discountPercent > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {couponMessage}
                </p>
              )}
            </div>

            {/* 4. Tổng kết giá & Nút Submit */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs text-[#b5a89e] block whitespace-nowrap">Tổng tiền tạm tính (Thanh toán khi nhận hàng):</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-[#c88242] font-tech whitespace-nowrap">
                    {formatVND(finalPrice)}
                  </span>
                  {discountAmount > 0 && (
                    <span className="text-xs text-emerald-400 font-tech whitespace-nowrap">
                      (-{formatVND(discountAmount)})
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-zinc-500 font-tech">
                  *Không cần chuyển khoản trước 100%. Nhận hàng kiểm tra rồi mới trả tiền.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-shimmer-wrap w-full sm:w-auto py-4 px-10 rounded-2xl bg-gradient-to-r from-[#c88242] to-[#b2692c] hover:from-[#df9854] hover:to-[#c88242] text-white font-bold text-base tracking-wide transition-all shadow-xl shadow-[#c88242]/30 flex items-center justify-center gap-2 group cursor-pointer active:scale-98 whitespace-nowrap"
              >
                <span className="whitespace-nowrap">{isSubmitting ? 'Đang Xử Lý...' : 'HOÀN TẤT ĐẶT TRƯỚC - GIỮ ƯU ĐÃI NGAY'}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0" />
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* ORDER CONFIRMATION MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-coffee rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-[#c88242]/50 shadow-2xl relative text-center">
            
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>

            <h3 className="text-2xl font-bold font-heading text-[#f5efeb] mb-2 tracking-tight">
              Đặt Trước Thành Công!
            </h3>
            <p className="text-xs sm:text-sm text-[#b5a89e] mb-6 text-pretty">
              Cảm ơn <strong className="text-[#f5efeb]">{fullName}</strong> đã đồng hành cùng thời trang cà phê bền vững EcoShield.
            </p>

            {/* Order Slip Details */}
            <div className="p-4 rounded-2xl bg-[#140f0d] border border-zinc-800 text-left text-xs space-y-2 mb-6 font-tech">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500 whitespace-nowrap">Mã đơn đặt trước:</span>
                <span className="text-[#c88242] font-bold whitespace-nowrap">{generatedOrderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 whitespace-nowrap">Sản phẩm:</span>
                <span className="text-[#f5efeb] font-medium">{currentSelection.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 whitespace-nowrap">Số điện thoại:</span>
                <span className="text-[#f5efeb] whitespace-nowrap">{phone}</span>
              </div>
              <div className="flex justify-between border-t border-zinc-800 pt-2 font-bold text-sm">
                <span className="text-zinc-400 whitespace-nowrap">Số tiền thanh toán:</span>
                <span className="text-emerald-400 whitespace-nowrap">{formatVND(finalPrice)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-3.5 px-6 rounded-xl bg-[#c88242] hover:bg-[#df9854] text-white font-bold text-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              Đã Hiểu & Đóng Cửa Sổ
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
