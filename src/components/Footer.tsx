import React from 'react';
import { Shield, Heart, MapPin, Mail, Phone } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080605] border-t border-[#c88242]/20 pt-16 pb-12 relative overflow-hidden text-[#b5a89e]">
      {/* Background ambient accents */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c88242]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c88242] to-[#8c5225] flex items-center justify-center border border-[#df9854]/40">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold font-heading tracking-tight text-[#f5efeb]">
                EcoShield <span className="text-[#c88242] text-xs font-tech font-normal">Wallet</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#b5a89e] leading-relaxed mb-6 max-w-sm">
              Tiên phong giải pháp thời trang tuần hoàn kết hợp công nghệ bảo mật: Từ bã cà phê Tây Nguyên Đắk Lắk, khiên chắn sóng RFID 13.56 MHz đến khoang kép Apple Find My.
            </p>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-full bg-[#140f0d] border border-[#c88242]/20 text-[11px] font-tech text-[#eddccb] flex items-center gap-1.5">
                <span>🇻🇳</span>
                <span>Tự hào Chuỗi Giá Trị Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Quick Links (1 col) */}
          <div>
            <h4 className="text-xs font-bold text-[#f5efeb] uppercase tracking-wider font-tech mb-4">
              Khám Phá
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#pain-points"
                  onClick={() => sound.playClick()}
                  className="hover:text-[#c88242] transition-colors"
                >
                  Rủi ro ví truyền thống
                </a>
              </li>
              <li>
                <a
                  href="#technology"
                  onClick={() => sound.playClick()}
                  className="hover:text-[#c88242] transition-colors"
                >
                  3 Trụ cột công nghệ
                </a>
              </li>
              <li>
                <a
                  href="#simulators"
                  onClick={() => sound.playClick()}
                  className="hover:text-[#c88242] transition-colors"
                >
                  Mô phỏng RFID & Find My
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={() => sound.playClick()}
                  className="hover:text-[#c88242] transition-colors"
                >
                  Bộ sưu tập & Bảng giá
                </a>
              </li>
              <li>
                <a
                  href="#quality"
                  onClick={() => sound.playClick()}
                  className="hover:text-[#c88242] transition-colors"
                >
                  Kiểm định chất lượng 3 cấp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support (1 col) */}
          <div>
            <h4 className="text-xs font-bold text-[#f5efeb] uppercase tracking-wider font-tech mb-4">
              Liên Hệ & Hỗ Trợ
            </h4>
            <ul className="space-y-2.5 text-xs text-[#b5a89e]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c88242] shrink-0 mt-0.5" />
                <span>Nguồn liệu: Đắk Lắk | Gia công: TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c88242] shrink-0" />
                <span className="font-tech">Hotline: 098.888.xxxx (8h-21h)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c88242] shrink-0" />
                <span>contact@ecoshieldwallet.vn</span>
              </li>
            </ul>
          </div>

          {/* Social Proof Badges (1 col) */}
          <div>
            <h4 className="text-xs font-bold text-[#f5efeb] uppercase tracking-wider font-tech mb-4">
              Cam Kết Thương Hiệu
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#140f0d] border border-zinc-800">
                <div className="text-emerald-400 font-bold text-[11px]">Bảo Hành 12 Tháng</div>
                <div className="text-[10px] text-zinc-500">1-đổi-1 nếu lỗi cơ học hoặc rfid</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#140f0d] border border-zinc-800">
                <div className="text-[#df9854] font-bold text-[11px]">Kiểm Tra Trước Khi Trả Tiền</div>
                <div className="text-[10px] text-zinc-500">Đồng kiểm toàn quốc khi nhận hàng</div>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Box (Bắt buộc theo Phần 2, Mục 7) */}
        <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-[#0f0c0a] border border-zinc-900 text-[11px] leading-relaxed space-y-2">
          <p>
            * <strong className="text-zinc-400">Tuyên bố thương hiệu Apple:</strong> Apple, iPhone, iPad và Apple Find My là các nhãn hiệu của Apple Inc., được đăng ký tại Hoa Kỳ và các quốc gia khác. Thiết bị định vị đi kèm trong phiên bản EcoShield Smart là sản phẩm thương mại từ nhà phân phối hợp pháp, có tính năng tương thích với mạng lưới Apple Find My.
          </p>
          <p>
            * <strong className="text-zinc-400">Minh bạch vật liệu:</strong> Vật liệu composite bã cà phê là giải pháp tận dụng phụ phẩm nông nghiệp kết hợp polymer sinh thái để kéo dài vòng đời vật liệu, hướng tới mục tiêu thời trang bền vững và kinh tế tuần hoàn tại Việt Nam.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} EcoShield Wallet Vietnam. Bảo lưu mọi quyền.
          </div>
          <div className="flex items-center gap-1">
            <span>Thiết kế & phát triển với</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>cho người tiêu dùng Việt Nam</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
