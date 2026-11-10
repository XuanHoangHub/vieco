import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Radio, Volume2, Compass, CheckCircle2, Smartphone, CreditCard, Lock, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const InteractiveSimulators: React.FC = () => {
  // RFID Simulator State
  const [walletState, setWalletState] = useState<'closed' | 'open'>('closed');
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'blocked' | 'success'>('idle');
  const [blockedAttempts, setBlockedAttempts] = useState(19);

  // Find My Radar State
  const [isRinging, setIsRinging] = useState(false);
  const [distance, setDistance] = useState(1.4);

  const handleTestRfidScan = () => {
    sound.playClick();
    setScanStatus('scanning');

    setTimeout(() => {
      if (walletState === 'closed') {
        sound.playShieldDeflect();
        setScanStatus('blocked');
        setBlockedAttempts((prev) => prev + 1);
      } else {
        sound.playPaymentSuccess();
        setScanStatus('success');
      }
    }, 700);
  };

  const handleTriggerFindMySound = () => {
    sound.playFindMyPing();
    setIsRinging(true);
    setTimeout(() => {
      sound.playFindMyPing();
    }, 500);
    setTimeout(() => {
      setIsRinging(false);
    }, 2000);
  };

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c88242]/10 border border-[#c88242]/30 text-[#df9854] text-xs font-semibold tracking-wider uppercase font-tech mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Trải Nghiệm Trực Quan Độc Quyền
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#f5efeb] tracking-tight mb-5">
            Mô Phỏng Trực Tiếp <span className="shimmer-text">Công Nghệ Bảo Mật</span>
          </h2>
          <p className="text-base sm:text-lg text-[#b5a89e] leading-relaxed">
            Tận mắt kiểm chứng cơ chế chắn sóng RFID 13.56 MHz ngăn chặn móc túi điện tử và hệ thống định vị Apple Find My phản hồi tức thì.
          </p>
        </div>

        {/* Dual Interactive Simulators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* SIMULATOR 1: RFID HACKER VS SHIELD TESTER */}
          <div className="glass-coffee rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-[#c88242]/20 shadow-2xl">
            {/* Top Indicator */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#c88242]/15 border border-[#c88242]/30 flex items-center justify-center text-[#c88242]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#f5efeb]">Kiểm Nghiệm Quẹt Trộm RFID</h3>
                    <p className="text-xs text-[#b5a89e]">Tần số sóng vô tuyến bảo mật 13.56 MHz</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-tech text-[#c88242] uppercase tracking-wider block">Ngăn chặn</span>
                  <span className="text-sm font-bold text-emerald-400 font-tech">{blockedAttempts} lần an toàn</span>
                </div>
              </div>

              {/* Interactive Wallet State Toggle */}
              <div className="bg-[#140f0d] p-1.5 rounded-2xl border border-[#c88242]/20 flex items-center mb-6">
                <button
                  onClick={() => { sound.playClick(); setWalletState('closed'); setScanStatus('idle'); }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    walletState === 'closed'
                      ? 'bg-[#c88242] text-white shadow-md'
                      : 'text-[#b5a89e] hover:text-[#f5efeb]'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Ví Đang Đóng (Lớp Khiên Kích Hoạt)</span>
                </button>
                <button
                  onClick={() => { sound.playClick(); setWalletState('open'); setScanStatus('idle'); }}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    walletState === 'open'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-[#b5a89e] hover:text-[#f5efeb]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Rút Thẻ Ra (Chủ Động Thanh Toán)</span>
                </button>
              </div>

              {/* Simulation Stage Display */}
              <div className="relative h-56 rounded-2xl bg-[#0c0908] border border-zinc-800 flex items-center justify-center p-6 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#c88242_1px,transparent_1px),linear-gradient(to_bottom,#c88242_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Left: Simulated POS Reader / Skimmer */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-24 rounded-xl bg-zinc-900 border-2 border-zinc-700 p-2 flex flex-col justify-between shadow-xl">
                    <div className="w-full h-5 rounded bg-zinc-800 flex items-center justify-center text-[8px] font-tech text-amber-400">
                      POS 13.56M
                    </div>
                    <div className="w-full flex justify-center">
                      <Radio className={`w-6 h-6 ${scanStatus === 'scanning' ? 'text-amber-400 animate-ping' : 'text-zinc-600'}`} />
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800" />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-2 font-tech">Thiết Bị Quét Lén</span>
                </div>

                {/* Center: Shield Wave Interaction */}
                <div className="relative z-10 flex-1 flex items-center justify-center px-4">
                  {scanStatus === 'idle' && (
                    <div className="text-center">
                      <div className="text-xs text-zinc-500 font-tech">Nhấn "Thử Quét Sóng POS"</div>
                      <div className="text-[10px] text-zinc-600">Khoảng cách quét: 5 cm</div>
                    </div>
                  )}

                  {scanStatus === 'scanning' && (
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-amber-400 animate-bounce" />
                      <div className="w-3 h-3 rounded-full bg-amber-400 animate-bounce [animation-delay:0.15s]" />
                      <div className="w-3 h-3 rounded-full bg-amber-400 animate-bounce [animation-delay:0.3s]" />
                    </div>
                  )}

                  {scanStatus === 'blocked' && (
                    <div className="text-center animate-fade-in">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mx-auto mb-1 shield-pulse">
                        <ShieldAlert className="w-6 h-6 text-red-400" />
                      </div>
                      <span className="text-[11px] font-bold text-red-400 uppercase font-tech">
                        Sóng Bị Triệt Tiêu 100%
                      </span>
                    </div>
                  )}

                  {scanStatus === 'success' && (
                    <div className="text-center animate-fade-in">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-1">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 uppercase font-tech">
                        Thanh Toán Thành Công
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: EcoShield Wallet / Card Target */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-24 h-32 rounded-xl p-2.5 transition-all duration-300 flex flex-col justify-between ${
                      walletState === 'closed'
                        ? 'bg-[#211713] border-2 border-[#c88242] shadow-xl'
                        : 'bg-[#0f1f17] border-2 border-emerald-500 shadow-xl translate-x-2'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold text-[#c88242] font-tech">ECOSHIELD</span>
                      {walletState === 'closed' ? (
                        <Lock className="w-3 h-3 text-[#c88242]" />
                      ) : (
                        <CreditCard className="w-3 h-3 text-emerald-400" />
                      )}
                    </div>
                    <div className="text-center py-2">
                      <div className="text-[10px] font-bold text-[#f5efeb]">
                        {walletState === 'closed' ? 'Ví Đang Đóng' : 'Thẻ Rút Ra'}
                      </div>
                      <div className="text-[8px] text-[#b5a89e]">
                        {walletState === 'closed' ? 'Lớp màng Niken/Đồng' : 'Sẵn sàng quẹt'}
                      </div>
                    </div>
                    <div className="w-full h-1 rounded-full bg-[#c88242]/40" />
                  </div>
                  <span className="text-[10px] text-zinc-400 mt-2 font-tech">EcoShield Bio-Wallet</span>
                </div>
              </div>

              {/* Status Report Text */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#140f0d] border border-[#c88242]/20">
                {walletState === 'closed' ? (
                  <p className="text-xs text-[#eddccb] leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Khiên chắn hoạt động:</strong> Lớp vải dẫn điện chuyên dụng (0.08 - 0.12 mm) làm suy hao trường điện từ 13.56 MHz, khiến mọi thiết bị POS/NFC bên ngoài hoàn toàn không thể đánh cắp tiền hay thông tin thẻ.
                    </span>
                  </p>
                ) : (
                  <p className="text-xs text-[#eddccb] leading-relaxed flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tiện lợi tuyệt đối:</strong> Khi bạn chủ động rút thẻ ra khỏi ví, thẻ thanh toán chạm không tiếp xúc (Contactless) hoạt động trơn tru trong tích tắc mà không cần thao tác phức tạp.
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Test Trigger Button */}
            <div className="mt-6">
              <button
                onClick={handleTestRfidScan}
                disabled={scanStatus === 'scanning'}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#c88242] to-[#b2692c] hover:from-[#df9854] hover:to-[#c88242] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#c88242]/25 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <Radio className={`w-4 h-4 ${scanStatus === 'scanning' ? 'animate-spin' : ''}`} />
                <span>{scanStatus === 'scanning' ? 'Đang Phát Sóng Thử Nghiệm...' : 'KÍCH HOẠT MÔ PHỎNG QUÉT THỬ'}</span>
              </button>
            </div>
          </div>

          {/* SIMULATOR 2: APPLE FIND MY RADAR & DUAL-ZONE ARCHITECTURE */}
          <div className="glass-coffee rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border border-[#c88242]/20 shadow-2xl">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#f5efeb]">Mạng Lưới Apple Find My™</h3>
                    <p className="text-xs text-[#b5a89e]">Kiến trúc Khoang Kép (Dual-Zone) không nghẽn sóng</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-[#140f0d] px-3 py-1.5 rounded-full border border-zinc-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-tech text-emerald-400">BLE 2.4 GHz</span>
                </div>
              </div>

              {/* Find My Radar Interface Screen */}
              <div className="relative h-64 rounded-2xl bg-[#090b0d] border border-zinc-800 flex flex-col items-center justify-center p-6 overflow-hidden">
                {/* Radar Concentric Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-52 h-52 rounded-full border border-emerald-500/20" />
                  <div className="w-36 h-36 rounded-full border border-emerald-500/30" />
                  <div className="w-20 h-20 rounded-full border border-emerald-500/40" />
                  {/* Rotating Radar Sweep Line */}
                  <div className="absolute w-52 h-52 rounded-full overflow-hidden animate-radar">
                    <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-500/30 to-transparent origin-bottom-right" />
                  </div>
                </div>

                {/* Target Pin (EcoShield Wallet Location) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-lg transition-transform ${
                      isRinging ? 'scale-125 bg-emerald-500/40 animate-pulse' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-emerald-400/60 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                      🏷️
                    </div>
                  </div>

                  <div className="mt-3 text-center bg-[#090b0d]/90 px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-md">
                    <span className="text-xs font-bold text-white block">EcoShield Smart Wallet</span>
                    <span className="text-[10px] text-emerald-400 font-tech">
                      Khoảng cách: {distance}m • Đang ở gần bạn
                    </span>
                  </div>
                </div>

                {/* Audio wave effect indicator when ringing */}
                {isRinging && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-500 text-black px-2.5 py-1 rounded-full text-[10px] font-bold animate-bounce">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Đang phát chuông...</span>
                  </div>
                )}
              </div>

              {/* Dual-Zone Explanation Card */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#140f0d] border border-[#c88242]/20">
                <p className="text-xs text-[#eddccb] leading-relaxed">
                  <strong>Đột phá Dual-Zone Architecture:</strong> Lớp RFID nếu bọc kín ví sẽ chặn sóng Bluetooth khiến bạn không thể tìm ví. EcoShield giải quyết bài toán này bằng cách <em>tách biệt hoàn toàn</em> ngăn thẻ có lót chắn sóng và khoang định vị Smart Tag độc lập.
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-tech text-[#b5a89e] pt-2 border-t border-zinc-800">
                  <span>Pin: ~365 ngày (thay được)</span>
                  <span className="text-emerald-400">iOS Find My App</span>
                </div>
              </div>
            </div>

            {/* Find My Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleTriggerFindMySound}
                className="flex-1 py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/40 text-emerald-400 font-bold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Phát Âm Thanh Tìm Ví</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setDistance((prev) => (prev > 0.8 ? +(prev - 0.3).toFixed(1) : 1.8));
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Mô Phỏng Lại Gần Ví</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
