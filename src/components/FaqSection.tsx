import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { sound } from '../utils/audio';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Vật liệu từ bã cà phê có bị thấm nước, ẩm mốc hay có mùi lạ không?',
      a: 'Hoàn toàn không. Phụ phẩm bã cà phê đã trải qua quy trình sấy khô công nghiệp tiêu chuẩn, loại bỏ triệt để độ ẩm và tạp chất hữu cơ, sau đó kết hợp cùng chất kết dính polymer tạo thành tấm vật liệu bio-composite bền chắc. Ví có khả năng chống bám bẩn, chịu được nước ở mức sinh hoạt thông thường (đi mưa, vô tình rơi nước lau khô ngay) và mang hương sắc trầm ấm rất nhẹ nhàng, tuyệt đối không bị ẩm mốc.',
    },
    {
      q: 'Lớp chắn RFID trong ví có làm hỏng thẻ ngân hàng hay làm yếu sóng tìm kiếm của Smart Tag không?',
      a: 'Lớp vải dẫn điện chuyên dụng chỉ làm suy giảm trường sóng vô tuyến điện từ khi thẻ nằm gọn trong ngăn bảo mật nhằm ngăn máy quẹt trộm từ xa, hoàn toàn không làm ảnh hưởng đến dải từ tính hay chip điện tử của thẻ. Đặc biệt, nhờ kiến trúc "Khoang Kép" (Dual-Zone Architecture) độc quyền của EcoShield, khoang định vị Smart Tag được bố trí nằm riêng biệt bên ngoài vùng chắn sóng, giúp tín hiệu Bluetooth 2.4 GHz luôn mạnh mẽ và thông suốt!',
    },
    {
      q: 'Điện thoại nào có thể sử dụng tính năng định vị của bản EcoShield Smart?',
      a: 'Thiết bị Smart Tag đi kèm trong phiên bản EcoShield Smart tương thích trực tiếp với ứng dụng Apple Find My có sẵn trên các thiết bị iPhone, iPad (chạy hệ điều hành iOS/iPadOS) mà bạn không cần phải cài đặt thêm bất kỳ ứng dụng bên thứ 3 nào. (Lưu ý: Thiết bị Smart Tag là phụ kiện thương mại tương thích với mạng lưới Find My của Apple Inc.).',
    },
    {
      q: 'Khi Smart Tag hết pin thì tôi phải làm sao? Chế độ bảo hành thế nào?',
      a: 'Khoang định vị được thiết kế thông minh với nẹp gài co giãn linh hoạt, giúp bạn dễ dàng tháo rời Smart Tag để thay pin sau khoảng 1 năm (365 ngày) sử dụng liên tục. Pin sử dụng là loại pin cúc áo tiêu chuẩn rất dễ mua tại mọi nhà sách hay tiệm tạp hóa. Cả ví và thiết bị định vị đều được hưởng chính sách bảo hành chính hãng 1-đổi-1 trong 12 tháng minh bạch bằng văn bản từ EcoShield.',
    },
    {
      q: 'Tôi mua bản Essential trước, sau này mua thêm Smart Tag gắn vào được không?',
      a: 'Hoàn toàn được! Phiên bản EcoShield Essential vẫn được giữ nguyên cấu trúc thiết kế và may sẵn khoang chứa định vị tiêu chuẩn. Bạn hoàn toàn có thể sở hữu và trải nghiệm chất liệu composite cà phê cùng tính năng bảo vệ thẻ RFID trước, sau đó dễ dàng nâng cấp thêm thiết bị Smart Tag bất cứ lúc nào bạn muốn.',
    },
  ];

  const handleToggle = (idx: number) => {
    sound.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c88242]/10 border border-[#c88242]/30 text-[#df9854] text-xs font-semibold tracking-wider uppercase font-tech mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Giải Đáp Thắc Mắc & Hỗ Trợ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#f5efeb] tracking-tight mb-5">
            Câu Hỏi Thường Gặp Về <span className="shimmer-text">EcoShield Wallet</span>
          </h2>
          <p className="text-base sm:text-lg text-[#b5a89e] leading-relaxed">
            Mọi thắc mắc về vật liệu bio-composite, cơ chế chắn sóng RFID và tính năng định vị Apple Find My được giải đáp minh bạch dưới đây.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass-coffee rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#c88242]/50 bg-[#1c1513]/90 shadow-xl'
                    : 'border-[#c88242]/15 hover:border-[#c88242]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#f5efeb] flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#c88242]/20 border border-[#c88242]/40 text-[#df9854] text-xs flex items-center justify-center shrink-0 font-tech">
                      0{index + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#140f0d] border border-zinc-800 flex items-center justify-center text-[#c88242] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#c88242]/20 border-[#c88242]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-7 pt-1 text-xs sm:text-sm text-[#eddccb] leading-relaxed border-t border-zinc-800/80 animate-fade-in">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-6 rounded-2xl glass-coffee border border-[#c88242]/20">
          <p className="text-xs sm:text-sm text-[#b5a89e]">
            Bạn vẫn còn câu hỏi khác? Đội ngũ tư vấn EcoShield sẵn sàng hỗ trợ trực tiếp qua Zalo / Hotline:{' '}
            <strong className="text-[#df9854] font-tech">098.888.xxxx</strong> (8:00 - 21:00 hàng ngày).
          </p>
        </div>

      </div>
    </section>
  );
};
