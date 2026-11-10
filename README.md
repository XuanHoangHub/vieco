# EcoShield Wallet — Landing Page (3D & SEO Optimized)

> Chiếc ví thời trang tiên phong kết hợp **3 giá trị cốt lõi**: Vật liệu composite chứa phụ phẩm cà phê Đắk Lắk thân thiện môi trường – Lớp lót chắn sóng RFID bảo mật thẻ ngân hàng – Khoang định vị thông minh tương thích Apple Find My giúp bạn không bao giờ thất lạc ví.

---

## 🌟 Tính Năng Nổi Bật

- **Interactive 3D WebGL (Three.js)**: Mô phỏng góc nhìn 3D trực quan, hỗ trợ xoay $360^\circ$ và tính năng **"Bóc Tách 3 Lớp" (Exploded Layer View)** chi tiết:
  1. *Lớp ngoài*: Bio-Composite phụ phẩm cà phê Đắk Lắk ($1.0 - 1.3\text{ mm}$).
  2. *Lớp giữa*: Lưới dệt kim loại Niken & Đồng chắn sóng RFID $13.56\text{ MHz}$.
  3. *Lớp trong*: Khoang kép độc quyền (Dual-Zone Architecture) chứa Smart Tag Apple Find My ($2.4\text{ GHz}$ BLE).
- **Mô phỏng Quẹt Trộm RFID vs Lớp Khiên Bảo Vệ**: Thử nghiệm trực quan cơ chế chặn sóng đọc lén thẻ ngân hàng.
- **Trình Mô Phỏng Apple Find My Radar**: Mô phỏng giao diện tìm ví với đồng hồ khoảng cách và phát âm thanh định vị (sử dụng Web Audio API).
- **Product Configurator Trực Quan**: Tùy biến kiểu dáng (Bifold / Mini Zip), phiên bản (Essential / Smart), và màu sắc cà phê với giá tiền cập nhật theo thời gian thực.
- **Form Đặt Trước Tối Ưu Chuyển Đổi**: Kiểm tra dữ liệu tức thì, áp dụng voucher khuyến mại (`ECOVIETNAM`), hiệu ứng pháo hoa Confetti và sinh mã đơn hàng.
- **Chuẩn SEO & Schema.org**: Tích hợp đầy đủ thẻ Open Graph, Twitter Cards, và Structured Data JSON-LD (`Product`, `Offer`, `FAQPage`, `Organization`).
- **Smooth Scroll & Animation**: Tích hợp Lenis mượt mà cùng GSAP ScrollTrigger, tự động nhận diện `prefers-reduced-motion` thân thiện với người dùng.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Custom Coffee Aesthetic Design System
- **3D & Graphics**: Three.js, WebGL, SVG Vector Graphics
- **Motion & Audio**: GSAP, Lenis Smooth Scroll, Web Audio API (Synthesizer)
- **Icons & Effects**: Lucide React, Canvas Confetti

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy môi trường phát triển (Dev server)
```bash
npm run dev
```

### 3. Build sản phẩm (Production)
```bash
npm run build
npm run preview
```

---

## 📜 Bản Quyền & Tuyên Bố Pháp Lý

- *Apple, iPhone, iPad và Apple Find My là các nhãn hiệu của Apple Inc., được đăng ký tại Hoa Kỳ và các quốc gia khác.*
- *Vật liệu composite bã cà phê là giải pháp tận dụng phụ phẩm nông nghiệp kết hợp polymer sinh thái nhằm hướng tới kinh tế tuần hoàn tại Việt Nam.*
