document.addEventListener('DOMContentLoaded', function() {
    let products = JSON.parse(localStorage.getItem('products')) || []
    let newProducts = [
            {
                id: "ip11_64",
                category: "iphone",
                image: "./assets/item/ip11_64.jpg",
                name: "iPhone 11 64GB",
                price: 8999000,
                quantity: 10,
                ram: "4GB",
                storage: "64GB"
            },
            {
                id: "ip11_128",
                category: "iphone",
                image: "./assets/item/ip11_128.jpg",
                name: "iPhone 11 128GB",
                price: 10190000,
                quantity: 10,
                ram: "4GB",
                storage: "128GB"
            },
            {
                id: "ip12_64",
                category: "iphone",
                image: "./assets/item/ip12_64.jpg",
                name: "iPhone 12 64GB",
                price: 11590000,
                quantity: 10,
                ram: "4GB",
                storage: "64GB"
            },
            {
                id: "ip12_128",
                category: "iphone",
                image: "./assets/item/ip11_128.jpg",
                name: "iPhone 12 128GB",
                price: 13590000,
                quantity: 10,
                ram: "4GB",
                storage: "128GB"
            },
            {
                id: "ip13_128",
                category: "iphone",
                image: "./assets/item/ip13_128.jpg",
                name: "iPhone 13 128GB",
                price: 13490000,
                quantity: 10,
                ram: "4GB",
                storage: "128GB"
            },
            {
                id: "ip13_256",
                category: "iphone",
                image: "./assets/item/ip13_256.jpg",
                name: "iPhone 13 256GB",
                price: 17390000,
                quantity: 10,
                ram: "4GB",
                storage: "256GB"
            },
            {
                id: "ip14_128",
                category: "iphone",
                image: "./assets/item/ip14_128.jpg",
                name: "iPhone 14 128GB",
                price: 17490000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                id: "ip14+_128",
                category: "iphone",
                image: "./assets/item/ip14+_128.jpg",
                name: "iPhone 14 PLUS 128GB",
                price: 20090000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                id: "ip14_256",
                category: "iphone",
                image: "./assets/item/ip14_256.jpg",
                name: "iPhone 14 256GB",
                price: 20590000,
                quantity: 10,
                ram: "6GB",
                storage: "256GB"
            },
            {
                id: "ip14+_256",
                category: "iphone",
                image: "./assets/item/ip14+_256.jpg",
                name: "iPhone 14 PLUS 256GB",
                price: 23590000,
                quantity: 10,
                ram: "6GB",
                storage: "256GB"
            },
            {
                id: "ip14prm_128",
                category: "iphone",
                image: "./assets/item/ip14prm_128.jpg",
                name: "iPhone 14 PRO MAX 128GB",
                price: 26990000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                id: "ip14prm_256",
                category: "iphone",
                image: "./assets/item/ip14prm_256.jpg",
                name: "iPhone 14 PRO MAX 256GB",
                price: 28590000,
                quantity: 10,
                ram: "6GB",
                storage: "256GB"
            },
            {
                id: "ip14prm_512",
                category: "iphone",
                image: "./assets/item/ip14prm_512.jpg",
                name: "iPhone 14 PRO MAX 512GB",
                price: 35990000,
                quantity: 10,
                ram: "6GB",
                storage: "512GB"
            },
            {
                id: "ip15_128",
                category: "iphone",
                image: "./assets/item/ip15_128.jpg",
                name: "iPhone 15 128GB",
                price: 19890000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                id: "ip15+_128",
                category: "iphone",
                image: "./assets/item/ip15+_128.jpg",
                name: "iPhone 15 PLUS 128GB",
                price: 22890000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                id: "ip15+_256",
                category: "iphone",
                image: "./assets/item/ip15+_256.jpg",
                name: "iPhone 15 PLUS 256GB",
                price: 22890000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },{
                id: "ip15+_512",
                category: "iphone",
                image: "./assets/item/ip15+_512.jpg",
                name: "iPhone 15 PLUS 512GB",
                price: 22890000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                id: "ip15prm_128",
                category: "iphone",
                image: "./assets/item/ip15pr_128.jpg",
                name: "iPhone 15 PRO 128GB",
                price: 21990000, 
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                id: "ip15pro_256",
                category: "iphone",
                image: "./assets/item/ip15pr_256.jpg",
                name: "iPhone 15 PRO 256GB",
                price: 28990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                id: "ip15pro_512",
                category: "iphone",
                image: "./assets/item/ip15pr_512.jpg",
                name: "iPhone 15 PRO 512GB",
                price: 34990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },            
            {
                id: "ip15prm_256",
                category: "iphone",
                image: "./assets/item/ip15prm_256.jpg",
                name: "iPhone 15 PRO MAX 256GB",
                price: 29590000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                id: "ip15prm_512",
                category: "iphone",
                image: "./assets/item/ip15prm_512.jpg",
                name: "iPhone 15 PRO MAX 512GB",
                price: 39990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                id: "ip16_128",
                category: "iphone",
                image: "./assets/item/ip16_128.png",
                name: "iPhone 16 128GB",
                price: 24990000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                id: "ip16_256",
                category: "iphone",
                image: "./assets/item/ip16_256.png",
                name: "iPhone 16 256GB",
                price: 27990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                id: "ip16_512",
                category: "iphone",
                image: "./assets/item/ip16_512.png",
                name: "iPhone 16 512GB",
                price: 32990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                id: "ip16+_128",
                category: "iphone",
                image: "./assets/item/ip16+_128.jpg",
                name: "iPhone 16 Plus 128GB",
                price: 26990000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                id: "ip16+_256",
                category: "iphone",
                image: "./assets/item/ip16+_256.png",
                name: "iPhone 16 Plus 256GB",
                price: 29990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                id: "ip16+_512",
                category: "iphone",
                image: "./assets/item/ip16+_512.png",
                name: "iPhone 16 Plus 512GB",
                price: 34990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                id: "ip16pro_128",
                category: "iphone",
                image: "./assets/item/ip16pr_128.png",
                name: "iPhone 16 Pro 128GB",
                price: 30990000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                id: "ip16pro_256",
                category: "iphone",
                image: "./assets/item/ip16pr_256.png",
                name: "iPhone 16 Pro 256GB",
                price: 33990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                id: "ip16pro_512",
                category: "iphone",
                image: "./assets/item/ip16pr_512.png",
                name: "iPhone 16 Pro 512GB",
                price: 37990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                id: "ip16pro_1tb",
                category: "iphone",
                image: "./assets/item/ip16pr_1TB.png",
                name: "iPhone 16 Pro 1TB",
                price: 43990000,
                quantity: 10,
                ram: "8GB",
                storage: "1TB"
            },
            {
                id: "ip16prm_256",
                category: "iphone",
                image: "./assets/item/ip16prm_256.jpg",
                name: "iPhone 16 Pro Max 256GB",
                price: 38990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                id: "ip16prm_512",
                category: "iphone",
                image: "./assets/item/ip16prm_512.jpg",
                name: "iPhone 16 Pro Max 512GB",
                price: 42990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                id: "ip16prm_1tb",
                category: "iphone",
                image: "./assets/item/ip16prm_1TB.png",
                name: "iPhone 16 Pro Max 1TB",
                price: 49990000,
                quantity: 10,
                ram: "8GB",
                storage: "1TB"
            },
            {
                id: "ssgS24_Ultra_5G_256",
                category: "samsung",
                image: "./assets/item/ssgS24_Ultra_5G_256.jpg",
                name: "SamSung Galaxy S24 Ultra 5G 256 GB",
                price: 29990000,
                quantity: 10,
                ram: "12 GB",
                storage: "256 GB"
            },
            {
                id: "ssgS24_Ultra_5G_512",
                category: "samsung",
                image: "./assets/item/ssgS24_Ultra_5G_512.jpg",
                name: "SamSung Galaxy S24 Ultra 5G 512 GB",
                price: 33490000,
                quantity: 10,
                ram: "12 GB",
                storage: "512 GB"
            },
            {
                id: "ssgA16_128",
                category: "samsung",
                image: "./assets/item/ssgA16_128.jpg",
                name: "SamSung Galaxy A16 128 GB",
                price: 5890000,
                quantity: 10,
                ram: "8 GB",
                storage: "128 GB"
            },
            {
                id: "ssgA16_256",
                category: "samsung",
                image: "./assets/item/ssgA16_256.jpg",
                name: "SamSung Galaxy A16 256 GB",
                price: 6690000,
                quantity: 10,
                ram: "8 GB",
                storage: "256 GB"
            },
            {
                id: "ssgA16_5G_128",
                category: "samsung",
                image: "./assets/item/ssgA16_5G_128.jpg",
                name: "SamSung Galaxy A16 5G 128 GB",
                price: 6090000,
                quantity: 10,
                ram: "8 GB",
                storage: "128 GB"
            },
            {
                id: "ssgA16_5G_256",
                category: "samsung",
                image: "./assets/item/ssgA16_5G.jpg",
                name: "SamSung Galaxy A16 5G 256 GB",
                price: 6990000,
                quantity: 10,
                ram: "8 GB",
                storage: "256 GB"
            },
            {
                id: "ssgA55_5G_256",
                category: "samsung",
                image: "./assets/item/ssgA55_5G_256.jpg",
                name: "SamSung Galaxy A55 5G 12GB-256 GB",
                price: 10990000,
                quantity: 10,
                ram: "12 GB",
                storage: "256 GB"
            },
            {
                id: "ssgA55_5G_128",
                category: "samsung",
                image: "./assets/item/ssgA55_5G_128.jpg",
                name: "SamSung Galaxy A55 5G 12GB/128 GB",
                price: 10990000,
                quantity: 10,
                ram: "12 GB",
                storage: "128 GB"
            },
            {
                id: "ssgA55_5G_256_8gb",
                category: "samsung",
                image: "./assets/item/ssgA55_5G_256_8gb.jpg",
                name: "SamSung Galaxy A55 5G 8GB/256 GB",
                price: 10990000,
                quantity: 10,
                ram: "8 GB",
                storage: "256 GB"
            },
            {
                id: "ssgZ_Fold6_5G_512",
                category: "samsung",
                image: "./assets/item/ssgZ_Fold6_5G_512.jpg",
                name: "SamSung Galaxy Z Fold 6 5G 512 GB",
                price: 46990000,
                quantity: 10,
                ram: "12 GB",
                storage: "512 GB"
            },
            {
                id: "ssgZ_Fold6_5G_256",
                category: "samsung",
                image: "./assets/item/ssgZ_Fold6_5G_256.jpg",
                name: "SamSung Galaxy Z Fold 6 5G 256 GB",
                price: 42990000,
                quantity: 10,
                ram: "12 GB",
                storage: "256 GB"
            },
            {
                id: "ssgZ_Fold6_5G_1TB",
                category: "samsung",
                image: "./assets/item/ssgZ_Fold6_5G_1TB.jpg",
                name: "SamSung Galaxy Z Fold 6 5G 1TB",
                price: 54990000,
                quantity: 10,
                ram: "12 GB",
                storage: "1TB"
            },
            
  
    ];
    // newProducts.forEach(newProduct => {
    //     // Kiểm tra nếu sản phẩm đã tồn tại (theo `id`)
    //     if (!products.some(product => product.id === newProduct.id)) {
    //         // Nếu không tồn tại, thêm sản phẩm mới vào mảng `products`
    //         products.push(newProduct);
    //     }
    // });      
    localStorage.setItem('products', JSON.stringify(products));

    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    if (customers.length === 0) {
        customers = [
            {
                username: "Bạch Tướng",
                email: "lac@gmail.com",
                password: "123456",
                address: "Quận 10,TP.HCM",
                phone: "0912345678",
            }
        ];
    }
    localStorage.setItem('customers', JSON.stringify(customers));

/*     let orders = [
        {
            id: "ORD001",
            user: "Nguyễn Văn A",
            date: "2024-11-23",
            phone: "0987654321",
            address: "123 Đường ABC, Quận 1, TP.HCM",
            items: [
                {
                    productName: "Sản phẩm A",
                    quantity: 2,
                    price: 50000
                },
                {
                    productName: "Sản phẩm B",
                    quantity: 1,
                    price: 100000
                }
            ]
        },
        {
            id: "ORD002",
            user: "Trần Thị B",
            date: "2024-11-22",
            phone: "0912345678",
            address: "456 Đường XYZ, Quận 2, TP.HCM",
            items: [
                {
                    productName: "Sản phẩm C",
                    quantity: 1,
                    price: 200000
                },
                {
                    productName: "Sản phẩm D",
                    quantity: 3,
                    price: 150000
                }
            ]
        }
    ];
    localStorage.setItem('orders', JSON.stringify(orders)); */

    let statics = [
        {
            name: "Iphone 11",
            image: "./assets/item/ip11_64.jpg",
            date: "2024-11-21",
            quantity: 20,
            totalPrice: 200000000
        }
    ];
    localStorage.setItem('statics', JSON.stringify(statics));
});
