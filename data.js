document.addEventListener('DOMContentLoaded', function() {
    let products = [
        {
            id: "P001",
            name: "iPhone 16 Pro Max",
            category: "iphone",
            ram: "8GB",
            storage: "256GB",
            price: "34490000",
            detail: "iPhone 16 Pro Max với thiết kế đẳng cấp, màn hình Super Retina XDR 6.7 inch, chip A18 Bionic mạnh mẽ.",
            quantity: 10,
            image: "./assets/item/ip16prm.jpg"
        },
        {
            id: "P002",
            name: "iPhone 16 Pro",
            category: "iphone",
            ram: "8GB",
            storage: "128GB",
            price: "28890000",
            detail: "iPhone 16 Pro với camera 48MP, màn hình Super Retina XDR 6.1 inch, chip A18 Bionic.",
            quantity: 15,
            image: "./assets/item/ip16pro.jpg"
        },
        {
            id: "P003",
            name: "iPhone 16 Plus",
            category: "iphone",
            ram: "8GB",
            storage: "128GB",
            price: "25990000",
            detail: "iPhone 16 Plus với màn hình lớn 6.7 inch, camera 48MP, và chip A18 Bionic.",
            quantity: 20,
            image: "./assets/item/ip16+.jpg"
        },
        {
            id: "P004",
            name: "iPhone 16",
            category: "iphone",
            ram: "8GB",
            storage: "128GB",
            price: "22290000",
            detail: "iPhone 16 với màn hình 6.1 inch, camera 12MP, và chip A17 Bionic.",
            quantity: 25,
            image: "./assets/item/ip16.jpg"
        },
        {
            id: "P005",
            name: "iPhone 15 Pro Max",
            category: "iphone",
            ram: "8GB",
            storage: "256GB",
            price: "29590000",
            detail: "iPhone 15 Pro Max với màn hình OLED 6.7 inch, camera 48MP, và chip A17 Pro.",
            quantity: 10,
            image: "./assets/item/ip15prm.jpg"
        },
        {
            id: "P006",
            name: "iPhone 15 Pro",
            category: "iphone",
            ram: "8GB",
            storage: "256GB",
            price: "28490000",
            detail: "iPhone 15 Pro với màn hình 6.1 inch, camera 48MP, và chip A17 Pro.",
            quantity: 15,
            image: "./assets/item/ip15.jpg"
        },
        {
            id: "P007",
            name: "iPhone 15+",
            category: "iphone",
            ram: "6GB",
            storage: "128GB",
            price: "22890000",
            detail: "iPhone 15+ với màn hình 6.7 inch, camera 48MP, và chip A16 Bionic.",
            quantity: 20,
            image: "./assets/item/ip15+.jpg"
        },
        {
            id: "P008",
            name: "iPhone 15",
            category: "iphone",
            ram: "6GB",
            storage: "128GB",
            price: "19890000",
            detail: "iPhone 15 với màn hình 6.1 inch, camera 48MP, và chip A16 Bionic.",
            quantity: 30,
            image: "./assets/item/ip15.jpg"
        },
        {
            id: "P009",
            name: "iPhone 14 Pro Max",
            category: "iphone",
            ram: "6GB",
            storage: "256GB",
            price: "28590000",
            detail: "iPhone 14 Pro Max với màn hình 6.7 inch, camera 48MP, và chip A16 Bionic.",
            quantity: 25,
            image: "./assets/item/ip14prm.jpg"
        },
        {
            id: "P010",
            name: "iPhone 14+",
            category: "iphone",
            ram: "6GB",
            storage: "256GB",
            price: "23590000",
            detail: "iPhone 14+ với màn hình 6.7 inch, camera 12MP, và chip A15 Bionic.",
            quantity: 30,
            image: "./assets/item/ip14+.jpg"
        },
        {
            id: "P011",
            name: "iPhone 14",
            category: "iphone",
            ram: "6GB",
            storage: "128GB",
            price: "17490000",
            detail: "iPhone 14 với màn hình 6.1 inch, camera 12MP, và chip A15 Bionic.",
            quantity: 40,
            image: "./assets/item/ip14.jpg"
        },
        {
            id: "P012",
            name: "iPhone 13",
            category: "iphone",
            ram: "4GB",
            storage: "128GB",
            price: "13490000",
            detail: "iPhone 13 với màn hình 6.1 inch, camera 12MP, và chip A15 Bionic.",
            quantity: 50,
            image: "./assets/item/ip13.jpg"
        },
        {
            id: "P013",
            name: "iPhone 12",
            category: "iphone",
            ram: "4GB",
            storage: "128GB",
            price: "13590000",
            detail: "iPhone 12 với màn hình 6.1 inch, camera 12MP, và chip A14 Bionic.",
            quantity: 60,
            image: "./assets/item/ip12.jpg"
        },
        {
            id: "P014",
            name: "iPhone 11",
            category: "iphone",
            ram: "4GB",
            storage: "128GB",
            price: "10190000",
            detail: "iPhone 11 với màn hình 6.1 inch, camera 12MP, và chip A13 Bionic.",
            quantity: 70,
            image: "./assets/item/ip11.jpg"
        },
        {
            id: "P015",
            name: "Xiaomi 14T",
            category: "xiaomi",
            ram: "12GB",
            storage: "256GB",
            price: "11990000",
            detail: "Xiaomi 14T với màn hình 6.67 inch, camera chính 50MP, và chip Snapdragon 8 Gen 2.",
            quantity: 20,
            image: "./assets/item/Xiaomi14T.jpg"
        },
        {
            id: "P016",
            name: "Xiaomi 14",
            category: "xiaomi",
            ram: "12GB",
            storage: "256GB",
            price: "19990000",
            detail: "Xiaomi 14 với màn hình 6.36 inch, camera chính 50MP, và chip Snapdragon 8 Gen 2.",
            quantity: 20,
            image: "./assets/item/Xiaomi14.jpg"
        },
        {
            id: "P017",
            name: "Xiaomi 14T Pro",
            category: "xiaomi",
            ram: "12GB",
            storage: "512GB",
            price: "16490000",
            detail: "Xiaomi 14T Pro với màn hình 6.67 inch, camera chính 200MP, và chip Snapdragon 8 Gen 3.",
            quantity: 20,
            image: "./assets/item/Xiaomi14TPro.jpg"
        },
        {
            id: "P018",
            name: "Xiaomi 14 Ultra",
            category: "xiaomi",
            ram: "16GB",
            storage: "512GB",
            price: "29990000",
            detail: "Xiaomi 14 Ultra với màn hình 6.73 inch, camera chính 200MP, và chip Snapdragon 8 Gen 3, thiết kế cao cấp.",
            quantity: 20,
            image: "./assets/item/Xiaomi14TUltr.jpg"
        },
        {
            id: "P019",
            name: "Xiaomi Note 13",
            category: "xiaomi",
            ram: "8GB",
            storage: "128GB",
            price: "4390000",
            detail: "Xiaomi Note 13 với màn hình AMOLED 6.67 inch, camera chính 108MP, và viên pin 5000mAh.",
            quantity: 20,
            image: "./assets/item/XiaomiNote13.jpg"
        },
        {
            id: "P020",
            name: "Xiaomi Note 13 Pro",
            category: "xiaomi",
            ram: "8GB",
            storage: "128GB",
            price: "5990000",
            detail: "Xiaomi Note 13 Pro với màn hình 6.73 inch, camera 200MP, chip Snapdragon 8 Gen 2, pin 5100mAh.",
            quantity: 20,
            image: "./assets/item/XiaomiNote13Pro.jpg"
        },
        {
            id: "P021",
            name: "Xiaomi POCO M6",
            category: "xiaomi",
            ram: "6GB",
            storage: "128GB",
            price: "3890000",
            detail: "Xiaomi POCO M6 với màn hình 6.67 inch AMOLED, chip Snapdragon 870, camera 64MP, pin 4500mAh.",
            quantity: 20,
            image: "./assets/item/XiaomiPOCO.jpg"
        },
        {
            id: "P022",
            name: "Xiaomi Redmi 13",
            category: "xiaomi",
            ram: "8GB",
            storage: "128GB",
            price: "4090000",
            detail: "Xiaomi Redmi 13 với màn hình 6.67 inch FHD+, chip MediaTek Dimensity 8100, camera 50MP, pin 5000mAh.",
            quantity: 20,
            image: "./assets/item/XiaomiR13.jpg"
        },
        {
            id: "P023",
            name: "Xiaomi Redmi 14C",
            category: "xiaomi",
            ram: "4GB",
            storage: "128GB",
            price: "2990000",
            detail: "Xiaomi Redmi 14C với màn hình 6.5 inch HD+, chip MediaTek Helio G85, camera 13MP, pin 5000mAh.",
            quantity: 20,
            image: "./assets/item/XiaomiR14C.jpg"
        },
        {
            id: "P024",
            name: "Xiaomi Redmi A3",
            category: "xiaomi",
            ram: "4GB",
            storage: "128GB",
            price: "2590000",
            detail: "Xiaomi Redmi A3 với màn hình 6.5 inch, chip MediaTek Helio G25, camera 13MP, pin 5000mAh.",
            quantity: 20,
            image: "./assets/item/XiaomiRA3.jpg"
        },

        {
            id: "P025",
            name: "Oppo A3x",
            category: "oppo",
            ram: "4GB",
            storage: "64GB",
            price: "3290000",
            detail: "Oppo A3x với màn hình 6.5 inch, chip MediaTek Helio P35, camera 13MP, pin 4230mAh.",
            quantity: 20,
            image: "./assets/item/OppoA3x.jpg"
        },
        {
            id: "P026",
            name: "Oppo A18",
            category: "oppo",
            ram: "4GB",
            storage: "128GB",
            price: "3290000",
            detail: "Oppo A18 với màn hình 6.6 inch, chip MediaTek Dimensity 700, camera 48MP, pin 5000mAh.",
            quantity: 20,
            image: "./assets/item/OppoA18.jpg"
        },
        {
            id: "P027",
            name: "Oppo A58",
            category: "oppo",
            ram: "8GB",
            storage: "128GB",
            price: "5490000",
            detail: "Oppo A58 sở hữu màn hình 6.72 inch, chip MediaTek Dimensity 700, camera 50MP, pin 5000mAh, sạc nhanh 33W.",
            quantity: 20,
            image: "./assets/item/OppoA58.jpg"
        },
        {
            id: "P028",
            name: "Oppo A60",
            category: "oppo",
            ram: "8GB",
            storage: "128GB",
            price: "5290000",
            detail: "Oppo A60 với màn hình 6.7 inch, chip MediaTek Dimensity 800, camera 64MP, pin 5000mAh, sạc nhanh 33W.",
            quantity: 20,
            image: "./assets/item/OppoA60.jpg"
        },{
            id: "P029",
            name: "OPPO Find N3 Flip",
            category: "oppo",
            ram: "16GB",
            storage: "512GB",
            price: "41990000",
            detail: "OPPO Find N3 Flip với màn hình gập, chip MediaTek Dimensity 9000, camera chính 50MP, pin 4000mAh, sạc nhanh 44W.",
            quantity: 20,
            image: "./assets/item/OppoFN3Flip.jpg"
        },
        {
            id: "P030",
            name: "OPPO Find N3",
            category: "oppo",
            ram: "12GB",
            storage: "256GB",
            price: "22990000",
            detail: "OPPO Find N3 sở hữu màn hình gập, chip Snapdragon 8 Gen 2, camera chính 50MP, pin 4800mAh, sạc nhanh 67W.",
            quantity: 20,
            image: "./assets/item/OppoFN3.jpg"
        },
        {
            id: "P031",
            name: "OPPO Find X8",
            category: "oppo",
            ram: "16GB",
            storage: "512GB",
            price: "22990000",
            detail: "OPPO Find X8 với màn hình AMOLED 120Hz, chip Snapdragon 8 Gen 3, camera 50MP, pin 5000mAh hỗ trợ sạc nhanh 80W.",
            quantity: 20,
            image: "./assets/item/OppoFX8.jpg"
        },
        {
            id: "P032",
            name: "OPPO Find X8 Pro",
            category: "oppo",
            ram: "16GB",
            storage: "512GB",
            price: "29990000",
            detail: "OPPO Find X8 Pro với màn hình AMOLED 120Hz, chip Snapdragon 8 Gen 3, camera 50MP, pin 5000mAh hỗ trợ sạc nhanh 80W. Đặt trước đến 06/12.",
            quantity: 20,
            image: "./assets/item/OppoFX8Pro.jpg"
        },
        {
            id: "P033",
            name: "OPPO Reno10 Pro",
            category: "oppo",
            ram: "12GB",
            storage: "256GB",
            price: "19990000",
            detail: "OPPO Reno10 Pro với màn hình AMOLED 120Hz, chip MediaTek Dimensity 8200, camera 50MP, pin 4600mAh hỗ trợ sạc nhanh 67W.",
            quantity: 20,
            image: "./assets/item/OppoR10.jpg"
        },
        {
            id: "P034",
            name: "OPPO Reno11 Pro",
            category: "oppo",
            ram: "12GB",
            storage: "512GB",
            price: "11990000",
            detail: "OPPO Reno11 Pro với màn hình AMOLED 120Hz, chip Snapdragon 8 Gen 2, camera 50MP, pin 5000mAh hỗ trợ sạc nhanh 80W.",
            quantity: 20,
            image: "./assets/item/OppoR11.jpg"
        },{
            id: "P035",
            name: "OPPO Reno12",
            category: "oppo",
            ram: "8GB",
            storage: "128GB",
            price: "11990000",
            detail: "OPPO Reno12 sở hữu màn hình AMOLED 120Hz, chip Snapdragon 7 Gen 2, camera 64MP, pin 4800mAh hỗ trợ sạc nhanh 67W.",
            quantity: 20,
            image: "./assets/item/OppoR12.jpg"
        },
        {
            id: "P036",
            name: "OPPO Reno12 F",
            category: "oppo",
            ram: "12GB",
            storage: "256GB",
            price: "9190000",
            detail: "OPPO Reno12 F trang bị màn hình AMOLED, chip Snapdragon 695, camera chính 50MP, pin 5000mAh hỗ trợ sạc nhanh 33W.",
            quantity: 20,
            image: "./assets/item/OppoR12F.jpg"
        },
        {
            id: "P037",
            name: "Samsung Galaxy Z Fold6",
            category: "sam_sung",
            ram: "12GB",
            storage: "512GB",
            price: "45990000",
            detail: "Samsung Galaxy Z Fold6 với màn hình gập Dynamic AMOLED 2X, chip Snapdragon 8 Gen 3, hỗ trợ bút S Pen.",
            quantity: 20,
            image: "./assets/item/SamsungZFo6.jpg"
        },
        {
            id: "P038",
            name: "Samsung Galaxy Z Flip6",
            category: "sam_sung",
            ram: "8GB",
            storage: "256GB",
            price: "24990000",
            detail: "Samsung Galaxy Z Flip6 sở hữu thiết kế gập vỏ sò, màn hình Dynamic AMOLED 2X, chip Snapdragon 8 Gen 3.",
            quantity: 20,
            image: "./assets/item/SamsungZFl6.jpg"
        },
        {
            id: "P039",
            name: "Samsung Galaxy S24 Ultra",
            category: "sam_sung",
            ram: "12GB",
            storage: "1TB",
            price: "36990000",
            detail: "Samsung Galaxy S24 Ultra với màn hình Dynamic AMOLED 2X, camera chính 200MP, pin 5000mAh, hỗ trợ S Pen.",
            quantity: 20,
            image: "./assets/item/SamsungS24Ultr.jpg"
        },
        {
            id: "P040",
            name: "Samsung Galaxy S24+",
            category: "sam_sung",
            ram: "8GB",
            storage: "512GB",
            price: "29990000",
            detail: "Samsung Galaxy S24+ trang bị màn hình Dynamic AMOLED 2X, camera chính 50MP, chip Snapdragon 8 Gen 3.",
            quantity: 20,
            image: "./assets/item/SamsungS24+.jpg"
        },
        {
            id: "P041",
            name: "Samsung Galaxy S23 Ultra",
            category: "sam_sung",
            ram: "12GB",
            storage: "1TB",
            price: "31990000",
            detail: "Samsung Galaxy S23 Ultra với camera chính 200MP, chip Snapdragon 8 Gen 2, hỗ trợ bút S Pen.",
            quantity: 20,
            image: "./assets/item/SamsungS23Ultr.jpg"
        },
        {
            id: "P042",
            name: "Samsung Galaxy S23 FE",
            category: "sam_sung",
            ram: "8GB",
            storage: "256GB",
            price: "13990000",
            detail: "Samsung Galaxy S23 FE sở hữu màn hình Dynamic AMOLED 2X, camera chính 50MP, chip Exynos 2200.",
            quantity: 20,
            image: "./assets/item/SamsungS23+.jpg"
        },
        {
            id: "P043",
            name: "Samsung Galaxy M55",
            category: "sam_sung",
            ram: "8GB",
            storage: "128GB",
            price: "10990000",
            detail: "Samsung Galaxy M55 với màn hình AMOLED 120Hz, chip Snapdragon 7 Gen 1, pin 6000mAh.",
            quantity: 20,
            image: "./assets/item/SamSungM55.jpg"
        },
        {
            id: "P044",
            name: "Samsung Galaxy M15",
            category: "sam_sung",
            ram: "4GB",
            storage: "64GB",
            price: "3490000",
            detail: "Samsung Galaxy M15 trang bị màn hình PLS LCD, chip Exynos 850, pin 5000mAh.",
            quantity: 20,
            image: "./assets/item/SamSungM15.jpg"
        },
        {
            id: "P045",
            name: "Samsung Galaxy M35",
            category: "sam_sung",
            ram: "6GB",
            storage: "128GB",
            price: "7490000",
            detail: "Samsung Galaxy M35 với màn hình AMOLED 90Hz, camera chính 64MP, pin 5000mAh.",
            quantity: 20,
            image: "./assets/item/SamSungM35.jpg"
        },
        {
            id: "P046",
            name: "Samsung Galaxy M54",
            category: "sam_sung",
            ram: "8GB",
            storage: "256GB",
            price: "8990000",
            detail: "Samsung Galaxy M54 sở hữu màn hình AMOLED 120Hz, camera chính 108MP, pin 6000mAh.",
            quantity: 20,
            image: "./assets/item/SamSungM54.jpg"
        },
        {
            id: "P047",
            name: "Samsung Galaxy A06",
            category: "sam_sung",
            ram: "3GB",
            storage: "32GB",
            price: "2490000",
            detail: "Samsung Galaxy A06 với màn hình PLS LCD, camera kép 13MP, pin 5000mAh.",
            quantity: 20,
            image: "./assets/item/SamSungA06.jpg"
        },
        {
            id: "P048",
            name: "Samsung Galaxy A15",
            category: "sam_sung",
            ram: "4GB",
            storage: "64GB",
            price: "4490000",
            detail: "Samsung Galaxy A15 trang bị màn hình PLS LCD, chip Exynos 850, pin 5000mAh.",
            quantity: 20,
            image: "./assets/item/SamSungA15.jpg"
        },
        {
            id: "P049",
            name: "Samsung Galaxy A25",
            category: "sam_sung",
            ram: "6GB",
            storage: "128GB",
            price: "7490000",
            detail: "Samsung Galaxy A25 với màn hình AMOLED, camera chính 64MP, pin 5000mAh.",
            quantity: 20,
            image: "./assets/item/SamSungA25.jpg"
        },
        {
            id: "P050",
            name: "Samsung Galaxy A35",
            category: "sam_sung",
            ram: "8GB",
            storage: "128GB",
            price: "9490000",
            detail: "Samsung Galaxy A35 sở hữu màn hình AMOLED 120Hz, chip Snapdragon 695, camera chính 50MP.",
            quantity: 20,
            image: "./assets/item/SamSungA35.jpg"
        },
        {
            id: "P051",
            name: "Samsung Galaxy A55",
            category: "sam_sung",
            ram: "8GB",
            storage: "256GB",
            price: "11990000",
            detail: "Samsung Galaxy A55 trang bị màn hình AMOLED 120Hz, camera chính 108MP, pin 6000mAh.",
            quantity: 20,
            image: "./assets/item/SamSungA55.jpg"
        }
    ];
    localStorage.setItem('products', JSON.stringify(products));

    let customers = [
        {
            username: "Bạch Tướng",
            email: "lac@gmail.com",
            password: "123456",
            address: "Quận 10,TP.HCM",
            phone: "0912345678",
        }
    ];
    localStorage.setItem('customers', JSON.stringify(customers));

    let orders = [
        {
            id: 1,
            user: "Nguyễn Văn A",
            date: "2024-11-23",
            phone: "0123456789",
            address: "Hà Nội, Việt Nam"
        },
        {
            id: 2,
            user: "Trần Thị B",
            date: "2024-11-22",
            phone: "0987654321",
            address: "Hồ Chí Minh, Việt Nam"
        },
        {
            id: 3,
            user: "Lê Minh C",
            date: "2024-11-21",
            phone: "0912345678",
            address: "Đà Nẵng, Việt Nam"
        }
    ];
    
    localStorage.setItem('orderbill', JSON.stringify(orders));
});
