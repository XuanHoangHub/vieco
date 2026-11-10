// SEO metadata & Structured Data (JSON-LD) configuration according to Phần 1 of the brief

export const seoData = {
  meta: {
    title: "EcoShield Wallet | Ví Bã Cà Phê Chống Quét Thẻ RFID & Định Vị",
    description: "Khám phá EcoShield Wallet: Sự kết hợp giữa vật liệu composite bã cà phê bền vững, lớp chắn sóng RFID 13.56 MHz bảo mật thẻ và thiết bị định vị thông minh tương thích Apple Find My. Đặt trước ngay!",
    canonical: "https://ecoshieldwallet.vn/vi-thong-minh-ba-ca-phe-rfid",
    primaryKeywords: [
      "Ví thông minh chống mất",
      "Ví bảo vệ thẻ RFID",
      "Ví thời trang từ bã cà phê",
      "EcoShield Wallet"
    ],
    secondaryKeywords: [
      "Ví nam Bifold chống trộm",
      "Ví nữ Mini Zip định vị",
      "Ví da sinh học cà phê Việt Nam",
      "Ví tích hợp tìm kiếm Apple Find My",
      "Phụ kiện thời trang bền vững"
    ],
    ogImage: "https://ecoshieldwallet.vn/images/vi-thong-minh-ba-ca-phe-ecoshield-wallet.jpg",
  },
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://ecoshieldwallet.vn/#product",
        "name": "EcoShield Wallet - Ví Thông Minh Composite Bã Cà Phê Chống RFID",
        "description": "Ví thời trang bền vững sản xuất từ composite bã cà phê Tây Nguyên, tích hợp lớp lót chắn sóng RFID 13.56 MHz và khoang định vị độc lập tương thích Apple Find My.",
        "image": [
          "https://ecoshieldwallet.vn/images/vi-thong-minh-ba-ca-phe-ecoshield-wallet.jpg",
          "https://ecoshieldwallet.vn/images/cau-tao-3-lop-ecoshield-wallet.jpg"
        ],
        "brand": {
          "@type": "Brand",
          "name": "EcoShield Wallet"
        },
        "countryOfOrigin": {
          "@type": "Country",
          "name": "Vietnam"
        },
        "material": "Coffee bio-composite (1.0 - 1.3 mm), Nickel-copper shielding mesh",
        "offers": [
          {
            "@type": "Offer",
            "name": "EcoShield Essential - Ví Nữ Mini Zip",
            "price": "249000",
            "priceCurrency": "VND",
            "availability": "https://schema.org/PreOrder",
            "itemCondition": "https://schema.org/NewCondition",
            "url": "https://ecoshieldwallet.vn/vi-thong-minh-ba-ca-phe-rfid#pricing"
          },
          {
            "@type": "Offer",
            "name": "EcoShield Essential - Ví Nam Bifold",
            "price": "279000",
            "priceCurrency": "VND",
            "availability": "https://schema.org/PreOrder",
            "itemCondition": "https://schema.org/NewCondition",
            "url": "https://ecoshieldwallet.vn/vi-thong-minh-ba-ca-phe-rfid#pricing"
          },
          {
            "@type": "Offer",
            "name": "EcoShield Smart - Ví Nữ Mini Zip (Kèm Smart Tag)",
            "price": "499000",
            "priceCurrency": "VND",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/PreOrder",
            "itemCondition": "https://schema.org/NewCondition",
            "url": "https://ecoshieldwallet.vn/vi-thong-minh-ba-ca-phe-rfid#pricing"
          },
          {
            "@type": "Offer",
            "name": "EcoShield Smart - Ví Nam Bifold (Kèm Smart Tag)",
            "price": "529000",
            "priceCurrency": "VND",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/PreOrder",
            "itemCondition": "https://schema.org/NewCondition",
            "url": "https://ecoshieldwallet.vn/vi-thong-minh-ba-ca-phe-rfid#pricing"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "128"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://ecoshieldwallet.vn/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Vật liệu từ bã cà phê có bị thấm nước, ẩm mốc hay có mùi lạ không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hoàn toàn không. Phụ phẩm bã cà phê đã trải qua quy trình sấy khô tiêu chuẩn, loại bỏ tạp chất và kết hợp cùng chất kết dính polymer tạo thành tấm vật liệu bio-composite bền chắc. Ví có khả năng chống bám bẩn, chịu được nước ở mức sinh hoạt thông thường và mang hương sắc trầm ấm rất nhẹ nhàng, không bị ẩm mốc."
            }
          },
          {
            "@type": "Question",
            "name": "Lớp chắn RFID trong ví có làm hỏng thẻ ngân hàng hay làm yếu sóng tìm kiếm của Smart Tag không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Lớp vải dẫn điện chỉ làm suy giảm sóng vô tuyến khi thẻ nằm trong ngăn bảo mật để ngăn máy quẹt trộm, hoàn toàn không làm ảnh hưởng đến từ tính hay chip của thẻ. Đặc biệt, nhờ thiết kế 2 khu vực độc lập (Dual-Zone Architecture), tín hiệu Bluetooth 2.4 GHz của Smart Tag hoàn toàn không bị cản trở."
            }
          },
          {
            "@type": "Question",
            "name": "Điện thoại nào có thể sử dụng tính năng định vị của bản EcoShield Smart?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Thiết bị Smart Tag đi kèm trong phiên bản EcoShield Smart tương thích trực tiếp với ứng dụng Apple Find My có sẵn trên các thiết bị iPhone, iPad (hệ điều hành iOS/iPadOS) mà không cần cài đặt thêm ứng dụng bên thứ 3."
            }
          },
          {
            "@type": "Question",
            "name": "Khi Smart Tag hết pin thì tôi phải làm sao? Chế độ bảo hành thế nào?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Khoang định vị được thiết kế thông minh giúp bạn dễ dàng tháo rời Smart Tag để thay pin chuẩn thông dụng sau khoảng 1 năm sử dụng. Cả ví và thiết bị định vị đều được hưởng chính sách bảo hành chính hãng minh bạch bằng văn bản từ EcoShield và nhà phân phối."
            }
          },
          {
            "@type": "Question",
            "name": "Tôi mua bản Essential trước, sau này mua thêm Smart Tag gắn vào được không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Hoàn toàn được! Phiên bản EcoShield Essential vẫn được may sẵn cấu trúc khoang chứa định vị. Bạn có thể trải nghiệm chất liệu cà phê và tính năng chống RFID trước, sau đó nâng cấp thêm thiết bị Smart Tag bất cứ lúc nào."
            }
          }
        ]
      }
    ]
  }
};
