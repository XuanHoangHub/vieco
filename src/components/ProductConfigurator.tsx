import React, { useState } from 'react';
import { Check, ShieldCheck, Tag, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { sound } from '../utils/audio';

export interface SelectedProduct {
  style: 'bifold' | 'minizip';
  edition: 'essential' | 'smart';
  color: 'espresso' | 'hazelnut' | 'highlands';
  price: number;
  originalPrice?: number;
  name: string;
}

interface ProductConfiguratorProps {
  onSelectProduct: (product: SelectedProduct) => void;
}

export const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({ onSelectProduct }) => {
  const [selectedStyle, setSelectedStyle] = useState<'bifold' | 'minizip'>('bifold');
  const [selectedEdition, setSelectedEdition] = useState<'essential' | 'smart'>('smart');
  const [selectedColor, setSelectedColor] = useState<'espresso' | 'hazelnut' | 'highlands'>('espresso');

  // Pricing Matrix based on requirements
  const prices = {
    bifold: {
      essential: { price: 279000, originalPrice: 279000, discount: 0 },
      smart: { price: 529000, originalPrice: 579000, discount: 50000 },
    },
    minizip: {
      essential: { price: 249000, originalPrice: 249000, discount: 0 },
      smart: { price: 499000, originalPrice: 549000, discount: 50000 },
    },
  };

  const currentPricing = prices[selectedStyle][selectedEdition];

  const colorMeta = {
    espresso: {
      name: 'Nâu Đậm Espresso',
      hex: '#231813',
      borderHex: '#3a271e',
      desc: 'Sắc nâu đậm nguyên bản từ bã cà phê sấy thô Đắk Lắk'
    },
    hazelnut: {
      name: 'Nâu Trầm Hazelnut',
      hex: '#3f2d22',
      borderHex: '#583e2f',
      desc: 'Tông nâu ấm ánh mật ong tinh tế và sang trọng'
    },
    highlands: {
      name: 'Nâu Đất Tây Nguyên',
      hex: '#513725',
      borderHex: '#6d4b33',
      desc: 'Sắc trầm ấm gợi nhớ vùng đất bazan màu mỡ'
    }
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN').format(num) + 'đ';
  };

  const handleCheckoutClick = () => {
    sound.playClick();
    const styleName = selectedStyle === 'bifold' ? 'Ví Nam Bifold' : 'Ví Nữ Mini Zip';
    const editionName = selectedEdition === 'smart' ? 'Bản Smart kèm Tag' : 'Bản Essential';
    
    onSelectProduct({
      style: selectedStyle,
      edition: selectedEdition,
      color: selectedColor,
      price: currentPricing.price,
      originalPrice: currentPricing.originalPrice,
      name: `${styleName} - ${editionName} (${colorMeta[selectedColor].name})`,
    });

    const formEl = document.getElementById('pre-order-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c88242]/10 border border-[#c88242]/30 text-[#df9854] text-xs font-semibold tracking-wider uppercase font-tech mb-4">
            <Tag className="w-3.5 h-3.5" />
            Bộ Sưu Tập & Bảng Giá Ưu Đãi Đặt Trước
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#f5efeb] tracking-tight mb-5">
            Lựa Chọn <span className="shimmer-text">Phiên Bản EcoShield</span> Của Bạn
          </h2>
          <p className="text-base sm:text-lg text-[#b5a89e] leading-relaxed">
            Thiết kế 2 kiểu dáng thời trang cùng 2 cấp độ trang bị công nghệ để bạn dễ dàng lựa chọn theo đúng phong cách và nhu cầu.
          </p>
        </div>

        {/* Main Configurator Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Representation & Material Texture Box (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="glass-coffee rounded-3xl p-6 sm:p-8 border border-[#c88242]/20 relative overflow-hidden shadow-2xl">
              
              {/* Top Bar on Visual Preview */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c88242] animate-ping" />
                  <span className="text-xs font-tech text-[#eddccb] uppercase tracking-wider">
                    {selectedStyle === 'bifold' ? 'Dáng Ngang Cổ Điển' : 'Dáng Khóa Kéo Tinh Tế'}
                  </span>
                </div>
                {selectedEdition === 'smart' && (
                  <span className="px-3 py-1 rounded-full bg-[#c88242]/20 border border-[#c88242]/50 text-[#df9854] text-[11px] font-bold tracking-wide uppercase">
                    ⭐ Bán Chạy Nhất (Kèm Smart Tag)
                  </span>
                )}
              </div>

              {/* Realistic SVG Representation of Wallet & Components */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-[#16100d] to-[#0c0908] border border-zinc-800 flex items-center justify-center p-8 overflow-hidden group">
                {/* Ambient glow behind wallet */}
                <div
                  className="absolute w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
                  style={{ backgroundColor: colorMeta[selectedColor].borderHex }}
                />

                {/* SVG Illustration of Wallet */}
                <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                  {selectedStyle === 'bifold' ? (
                    // BIFOLD WALLET VECTOR
                    <div className="relative w-64 sm:w-80 h-44 sm:h-52 rounded-2xl shadow-2xl transition-all duration-300 flex flex-col justify-between p-4 border"
                      style={{
                        backgroundColor: colorMeta[selectedColor].hex,
                        borderColor: colorMeta[selectedColor].borderHex,
                        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.08)`
                      }}
                    >
                      {/* Leather Edge Stitching */}
                      <div className="absolute inset-1.5 rounded-xl border border-dashed border-[#c88242]/40 pointer-events-none" />

                      {/* Header with Embossed Logo */}
                      <div className="flex items-center justify-between z-10">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-[#c88242]/30 border border-[#c88242] flex items-center justify-center text-[9px] text-[#eddccb] font-bold">
                            E
                          </div>
                          <span className="text-[11px] font-bold tracking-widest text-[#eddccb]/80 font-tech">
                            ECOSHIELD
                          </span>
                        </div>
                        <span className="text-[9px] font-tech text-[#c88242]">1.0 - 1.3 mm</span>
                      </div>

                      {/* Middle: RFID Shielding Mesh Indicator */}
                      <div className="relative z-10 flex items-center justify-between bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-[#c88242]/20">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-[10px] text-zinc-300">RFID 13.56 MHz Protected</span>
                        </div>
                        <span className="text-[9px] font-tech text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                          Active
                        </span>
                      </div>

                      {/* Bottom: Smart Tag Chamber (If Smart) */}
                      <div className="flex items-center justify-between z-10 pt-1">
                        <span className="text-[10px] text-zinc-400">Composite Bã Cà Phê</span>
                        {selectedEdition === 'smart' ? (
                          <div className="flex items-center gap-1.5 bg-zinc-900/90 px-2.5 py-1 rounded-full border border-emerald-500/40 text-[10px] text-emerald-300 font-tech">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>Apple Find My Tag Included</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-zinc-500 font-tech">Khoang Chờ Sẵn</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    // MINI ZIP WALLET VECTOR
                    <div className="relative w-56 sm:w-64 h-56 sm:h-64 rounded-3xl shadow-2xl transition-all duration-300 flex flex-col justify-between p-5 border"
                      style={{
                        backgroundColor: colorMeta[selectedColor].hex,
                        borderColor: colorMeta[selectedColor].borderHex,
                        boxShadow: `0 25px 50px -12px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.08)`
                      }}
                    >
                      {/* Golden Zip Line along Top and Right */}
                      <div className="absolute top-2 right-2 left-2 h-2 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 rounded-full opacity-80 shadow-md" />
                      <div className="absolute -top-1 right-6 w-4 h-6 bg-gradient-to-b from-amber-400 to-amber-800 rounded-sm shadow-md border border-amber-300" />

                      {/* Embossed Detail */}
                      <div className="mt-4 flex items-center justify-between z-10">
                        <div className="w-6 h-6 rounded-full bg-[#c88242]/30 border border-[#c88242] flex items-center justify-center text-[10px] text-[#eddccb] font-bold">
                          E
                        </div>
                        <span className="text-[10px] font-tech text-[#c88242]">Mini Zip Edition</span>
                      </div>

                      {/* Middle Feature Badge */}
                      <div className="bg-black/40 backdrop-blur-sm p-2 rounded-xl border border-[#c88242]/20 text-center">
                        <div className="text-[11px] font-bold text-[#f5efeb]">Khóa Kéo Kim Loại Êm Ái</div>
                        <div className="text-[9px] text-[#b5a89e]">Ngăn tiền xu & thẻ an toàn</div>
                      </div>

                      {/* Bottom Badge */}
                      <div className="flex items-center justify-between z-10">
                        <span className="text-[10px] text-zinc-400">100% Thuần Chay</span>
                        {selectedEdition === 'smart' && (
                          <span className="text-[10px] font-tech text-emerald-400">Tag 365 Ngày Pin</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Material Detail Snippet */}
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#140f0d] border border-[#c88242]/15">
                  <span className="text-xs text-[#b5a89e] block">Độ Dày</span>
                  <span className="text-sm font-bold text-[#eddccb] font-tech">1.0 - 1.3 mm</span>
                </div>
                <div className="p-3 rounded-xl bg-[#140f0d] border border-[#c88242]/15">
                  <span className="text-xs text-[#b5a89e] block">Kháng Nước</span>
                  <span className="text-sm font-bold text-emerald-400 font-tech">Sinh Hoạt Tốt</span>
                </div>
                <div className="p-3 rounded-xl bg-[#140f0d] border border-[#c88242]/15">
                  <span className="text-xs text-[#b5a89e] block">Bảo Hành</span>
                  <span className="text-sm font-bold text-[#df9854] font-tech">12 Tháng 1-Đổi-1</span>
                </div>
              </div>
            </div>

            {/* Quick Feature Comparison Table */}
            <div className="glass-coffee rounded-2xl p-5 border border-[#c88242]/20">
              <h4 className="text-sm font-bold text-[#f5efeb] mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c88242]" />
                So Sánh 2 Phiên Bản Công Nghệ
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 text-[#b5a89e]">
                      <th className="pb-2 font-medium">Tính năng</th>
                      <th className="pb-2 font-medium text-center">Essential</th>
                      <th className="pb-2 font-medium text-center text-[#df9854]">Smart (Toàn diện)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-[#f5efeb]">
                    <tr>
                      <td className="py-2 text-[#b5a89e]">Chất liệu composite bã cà phê</td>
                      <td className="py-2 text-center text-emerald-400">✓ Có</td>
                      <td className="py-2 text-center text-emerald-400 font-bold">✓ Có</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-[#b5a89e]">Lớp chắn RFID 13.56 MHz</td>
                      <td className="py-2 text-center text-emerald-400">✓ Có</td>
                      <td className="py-2 text-center text-emerald-400 font-bold">✓ Có</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-[#b5a89e]">Khoang chứa Smart Tag</td>
                      <td className="py-2 text-center text-zinc-400">Khoang chờ sẵn</td>
                      <td className="py-2 text-center text-emerald-400 font-bold">Khoang kép độc lập</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-[#b5a89e]">Thiết bị định vị Smart Tag</td>
                      <td className="py-2 text-center text-zinc-500">Chưa bao gồm</td>
                      <td className="py-2 text-center text-[#df9854] font-bold">Đi kèm 01 Smart Tag (Find My)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Product Options & Pricing Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-coffee rounded-3xl p-6 sm:p-8 border-2 border-[#c88242]/30 shadow-2xl relative">
              
              {/* STEP 1: Select Style */}
              <div className="mb-6">
                <label className="text-xs font-bold text-[#b5a89e] uppercase tracking-wider block mb-2.5">
                  1. Chọn Kiểu Dáng Thiết Kế
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { sound.playClick(); setSelectedStyle('bifold'); }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedStyle === 'bifold'
                        ? 'bg-[#c88242]/15 border-[#c88242] shadow-lg text-white'
                        : 'bg-[#140f0d] border-zinc-800 text-[#b5a89e] hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#f5efeb]">Ví Nam Bifold</div>
                    <div className="text-[11px] text-[#b5a89e] mt-0.5">Dáng ngang cổ điển lịch lãm</div>
                  </button>

                  <button
                    onClick={() => { sound.playClick(); setSelectedStyle('minizip'); }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedStyle === 'minizip'
                        ? 'bg-[#c88242]/15 border-[#c88242] shadow-lg text-white'
                        : 'bg-[#140f0d] border-zinc-800 text-[#b5a89e] hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#f5efeb]">Ví Nữ Mini Zip</div>
                    <div className="text-[11px] text-[#b5a89e] mt-0.5">Khóa kéo mượt mà tinh tế</div>
                  </button>
                </div>
              </div>

              {/* STEP 2: Select Tech Edition */}
              <div className="mb-6">
                <label className="text-xs font-bold text-[#b5a89e] uppercase tracking-wider block mb-2.5">
                  2. Chọn Cấp Độ Công Nghệ
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Smart Edition */}
                  <button
                    onClick={() => { sound.playClick(); setSelectedEdition('smart'); }}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer ${
                      selectedEdition === 'smart'
                        ? 'bg-[#c88242]/20 border-[#c88242] shadow-lg ring-1 ring-[#c88242]'
                        : 'bg-[#140f0d] border-zinc-800 text-[#b5a89e] hover:border-zinc-700'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-3 bg-amber-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Tiết kiệm 50K
                    </div>
                    <div className="font-bold text-sm text-[#f5efeb] flex items-center gap-1.5">
                      <span>Bản SMART</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-[11px] text-amber-400/90 font-medium mt-0.5">
                      Kèm Smart Tag Find My
                    </div>
                    <div className="text-xs font-tech text-[#eddccb] mt-2 font-bold">
                      {selectedStyle === 'bifold' ? '529.000đ' : '499.000đ'}
                    </div>
                  </button>

                  {/* Essential Edition */}
                  <button
                    onClick={() => { sound.playClick(); setSelectedEdition('essential'); }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedEdition === 'essential'
                        ? 'bg-[#c88242]/20 border-[#c88242] shadow-lg ring-1 ring-[#c88242]'
                        : 'bg-[#140f0d] border-zinc-800 text-[#b5a89e] hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#f5efeb]">Bản ESSENTIAL</div>
                    <div className="text-[11px] text-[#b5a89e] mt-0.5">Cơ bản (Có khoang chờ)</div>
                    <div className="text-xs font-tech text-[#eddccb] mt-2 font-bold">
                      {selectedStyle === 'bifold' ? '279.000đ' : '249.000đ'}
                    </div>
                  </button>
                </div>
              </div>

              {/* STEP 3: Select Colorway */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-[#b5a89e] uppercase tracking-wider">
                    3. Chọn Màu Sắc Cà Phê
                  </label>
                  <span className="text-xs text-[#eddccb] font-medium">
                    {colorMeta[selectedColor].name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {(['espresso', 'hazelnut', 'highlands'] as const).map((col) => (
                    <button
                      key={col}
                      onClick={() => { sound.playClick(); setSelectedColor(col); }}
                      className={`flex-1 py-3 px-2 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                        selectedColor === col
                          ? 'border-[#c88242] bg-[#c88242]/10 ring-2 ring-[#c88242]/40'
                          : 'border-zinc-800 bg-[#140f0d] hover:border-zinc-700'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-full shadow-inner border border-white/20 flex items-center justify-center"
                        style={{ backgroundColor: colorMeta[col].hex }}
                      >
                        {selectedColor === col && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-[10px] text-[#b5a89e] text-center leading-tight">
                        {col === 'espresso' ? 'Espresso' : col === 'hazelnut' ? 'Hazelnut' : 'Tây Nguyên'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PRICING BREAKDOWN BOX */}
              <div className="p-5 rounded-2xl bg-[#140f0d] border border-[#c88242]/30 mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs text-[#b5a89e]">Giá Đặt Trước Lô Pilot:</span>
                  <div className="text-right">
                    {currentPricing.discount > 0 && (
                      <span className="text-xs text-zinc-500 line-through mr-2 font-tech">
                        {formatVND(currentPricing.originalPrice)}
                      </span>
                    )}
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#f5efeb] font-tech text-[#c88242]">
                      {formatVND(currentPricing.price)}
                    </span>
                  </div>
                </div>

                {currentPricing.discount > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 p-2 rounded-lg border border-amber-900/30">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Ưu đãi đặt trước: <strong>Tiết kiệm 50.000đ</strong> so với giá niêm yết!</span>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-zinc-800 text-[11px] text-[#b5a89e] flex items-center justify-between">
                  <span>🚀 Giao hàng toàn quốc</span>
                  <span className="text-emerald-400">Kiểm tra hàng trước khi thanh toán</span>
                </div>
              </div>

              {/* Big CTA Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#c88242] to-[#b2692c] hover:from-[#df9854] hover:to-[#c88242] text-white font-bold text-base tracking-wide transition-all shadow-xl shadow-[#c88242]/30 flex items-center justify-center gap-2 group active:scale-98 cursor-pointer"
              >
                <span>CHỌN MẪU VÍ & ĐẶT TRƯỚC NGAY</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-[11px] text-center text-[#b5a89e]/80 mt-3">
                *Số lượng sản xuất lô đầu giới hạn 200 chiếc để đảm bảo chất lượng gia công.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
