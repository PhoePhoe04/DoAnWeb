document.addEventListener('DOMContentLoaded', function() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    if (products.length === 0) {
        products = [
            {
                category: "iphone",
                id: "ip11_64",
                image: "./assets/item/ip11_64.jpg",
                name: "iPhone 11 64GB",
                price: 8999000,
                quantity: 10,
                ram: "4GB",
                storage: "64GB",
            },
            {
                category: "iphone",
                id: "ip11_128",
                image: "./assets/item/ip11_128.jpg",
                name: "iPhone 11 128GB",
                price: 10190000,
                quantity: 10,
                ram: "4GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip12_64",
                image: "./assets/item/ip12_64.jpg",
                name: "iPhone 12 64GB",
                price: 11590000,
                quantity: 10,
                ram: "4GB",
                storage: "64GB"
            },
            {
                category: "iphone",
                id: "ip12_128",
                image: "./assets/item/ip12_128.jpg",
                name: "iPhone 12 128GB",
                price: 13590000,
                quantity: 10,
                ram: "4GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip13_128",
                image: "./assets/item/ip13_128.jpg",
                name: "iPhone 13 128GB",
                price: 13490000,
                quantity: 10,
                ram: "4GB",
                storage: "128GB"
            },            
            {
                category: "iphone",
                id: "ip13_256",
                image: "./assets/item/ip13_256.jpg",
                name: "iPhone 13 256GB",
                price: 17390000,
                quantity: 10,
                ram: "4GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip14_128",
                image: "./assets/item/ip14_128.jpg",
                name: "iPhone 14 128GB",
                price: 17490000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip14+_128",
                image: "./assets/item/ip14+_128.jpg",
                name: "iPhone 14 PLUS 128GB",
                price: 20090000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip14_256",
                image: "./assets/item/ip14_256.jpg",
                name: "iPhone 14 256GB",
                price: 20590000,
                quantity: 10,
                ram: "6GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip14+_256",
                image: "./assets/item/ip14+_256.jpg",
                name: "iPhone 14 PLUS 256GB",
                price: 23590000,
                quantity: 10,
                ram: "6GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip14prm_128",
                image: "./assets/item/ip14prm_128.jpg",
                name: "iPhone 14 PRO MAX 128GB",
                price: 26990000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip14prm_256",
                image: "./assets/item/ip14prm_256.jpg",
                name: "iPhone 14 PRO MAX 256GB",
                price: 28590000,
                quantity: 10,
                ram: "6GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip14prm_512",
                image: "./assets/item/ip14prm_512.jpg",
                name: "iPhone 14 PRO MAX 512GB",
                price: 35990000,
                quantity: 10,
                ram: "6GB",
                storage: "512GB"
            },
            {
                category: "iphone",
                id: "ip15_128",
                image: "./assets/item/ip15_128.jpg",
                name: "iPhone 15 128GB",
                price: 19890000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip15+_128",
                image: "./assets/item/ip15+_128.jpg",
                name: "iPhone 15 PLUS 128GB",
                price: 22890000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip15prm_256",
                image: "./assets/item/ip15prm_256.jpg",
                name: "iPhone 15 PRO MAX 256GB",
                price: 29590000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip15_256",
                image: "./assets/item/ip15_256.jpg",
                name: "iPhone 15 256GB",
                price: 22990000,
                quantity: 10,
                ram: "6GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip15+_256",
                image: "./assets/item/ip15+_256.jpg",
                name: "iPhone 15 PLUS 256GB",
                price: 25990000,
                quantity: 10,
                ram: "6GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip15prm_512",
                image: "./assets/item/ip15prm_512.jpg",
                name: "iPhone 15 PRO MAX 512GB",
                price: 34990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                category: "iphone",
                id: "ip15pr_256",
                image: "./assets/item/ip15pr_256.jpg",
                name: "iPhone 15 PRO 256GB",
                price: 28490000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip15prm_1TB",
                image: "./assets/item/ip15prm_1TB.jpg",
                name: "iPhone 15 PRO MAX 1TB",
                price: 40290000,
                quantity: 10,
                ram: "8GB",
                storage: "1 TB"
            },
            {
                category: "iphone",
                id: "ip15pr_128",
                image: "./assets/item/ip15pr_128.jpg",
                name: "iPhone 15 PRO 128GB",
                price: 25590000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip15pr_512",
                image: "./assets/item/ip15pr_512.jpg",
                name: "iPhone 15 PRO 512GB",
                price: 33490000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                category: "iphone",
                id: "ip15_512",
                image: "./assets/item/ip15_512.jpg",
                name: "iPhone 15 512GB",
                price: 27990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                category: "iphone",
                id: "ip15+_512",
                image: "./assets/item/ip15+_512.jpg",
                name: "iPhone 15 PLUS 512GB",
                price: 29990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                category: "iphone",
                id: "ip16prm_256",
                image: "./assets/item/ip16prm_256.jpg",
                name: "iPhone 16 PRO MAX 256GB",
                price: 34990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip16prm_512",
                image: "./assets/item/ip16prm_512.jpg",
                name: "iPhone 16 PRO MAX 512GB",
                price: 40890000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                category: "iphone",
                id: "ip16prm_1TB",
                image: "./assets/item/ip16prm_1TB.png",
                name: "iPhone 16 PRO MAX 1TB",
                price: 46790000,
                quantity: 10,
                ram: "8GB",
                storage: "1 TB"
            },
            {
                category: "iphone",
                id: "ip16pr_128",
                image: "./assets/item/ip16pr_128.png",
                name: "iPhone 16 PRO 128GB",
                price: 28890000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip16pr_256",
                image: "./assets/item/ip16pr_256.png",
                name: "iPhone 16 PRO 256GB",
                price: 31990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip16pr_512",
                image: "./assets/item/ip16pr_512.png",
                name: "iPhone 16 PRO 512GB",
                price: 37990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                category: "iphone",
                id: "ip16pr_1TB",
                image: "./assets/item/ip16pr_1TB.png",
                name: "iPhone 16 PRO 1 TB",
                price: 43990000,
                quantity: 10,
                ram: "8GB",
                storage: "1 TB"
            },
            {
                category: "iphone",
                id: "ip16+_128",
                image: "./assets/item/ip16+_128.jpg",
                name: "iPhone 16 PLUS 128GB",
                price: 26990000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip16+_256",
                image: "./assets/item/ip16+_256.png",
                name: "iPhone 16 PLUS 256GB",
                price: 27990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip16+_512",
                image: "./assets/item/ip16+_512.png",
                name: "iPhone 16 PLUS 512GB",
                price: 32990000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                category: "iphone",
                id: "ip16_128",
                image: "./assets/item/ip16_128.png",
                name: "iPhone 16 PLUS 128GB",
                price: 22290000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                category: "iphone",
                id: "ip16_256",
                image: "./assets/item/ip16_256.png",
                name: "iPhone 16 PLUS 256GB",
                price: 25490000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                category: "iphone",
                id: "ip16_512",
                image: "./assets/item/ip16_512.png",
                name: "iPhone 16 PLUS 512GB",
                price: 29890000,
                quantity: 10,
                ram: "8GB",
                storage: "512GB"
            },
            {
                category: "samsung",
                id: "ssgS24_Ultra_5G_256",
                image: "./assets/item/ssgS24_Ultra_5G_256.jpg",
                name: "SamSung Galaxy S24 Ultra 5G 256GB",
                price: 29990000,
                quantity: 10,
                ram: "12GB",
                storage: "256GB"
            },
            {
                category: "samsung",
                id: "ssgS24_Ultra_5G_512",
                image: "./assets/item/ssgS24_Ultra_5G_512.jpg",
                name: "SamSung Galaxy S24 Ultra 5G 512GB",
                price: 33490000,
                quantity: 10,
                ram: "12GB",
                storage: "512GB"
            },
            {
                category: "samsung",
                id: "ssgA16_128",
                image: "./assets/item/ssgA16_128.jpg",
                name: "SamSung Galaxy A16 128GB",
                price: 5890000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                category: "samsung",
                id: "ssgA16_256",
                image: "./assets/item/ssgA16_256.jpg",
                name: "SamSung Galaxy A16 256GB",
                price: 6690000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                category: "samsung",
                id: "ssgA16_5G_128",
                image: "./assets/item/ssgA16_5G_128.jpg",
                name: "SamSung Galaxy A16 5G 128GB",
                price: 6090000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                category: "samsung",
                id: "ssgA16_5G_256",
                image: "./assets/item/ssgA16_5G.jpg",
                name: "SamSung Galaxy A16 5G 256GB",
                price: 6990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                category: "samsung",
                id: "ssgA55_5G_256",
                image: "./assets/item/ssgA55_5G_256.jpg",
                name: "SamSung Galaxy A55 5G 12GB-256GB",
                price: 10990000,
                quantity: 10,
                ram: "12GB",
                storage: "256GB"
            },
            {
                category: "samsung",
                id: "ssgA55_5G_128",
                image: "./assets/item/ssgA55_5G_128.jpg",
                name: "SamSung Galaxy A55 5G 12GB/128GB",
                price: 10990000,
                quantity: 10,
                ram: "12GB",
                storage: "128GB"
            },
            {
                category: "samsung",
                id: "ssgA55_5G_256_8gb",
                image: "./assets/item/ssgA55_5G_256_8gb.jpg",
                name: "SamSung Galaxy A55 5G 8GB/256GB",
                price: 10990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                category: "xiaomi",
                id: "xiaomi_rn13_8-128",
                image: "./assets/item/xiaomi_rn13_8-128.jpg",
                name: "Xiaomi Redmi Note 13 8GB/128GB",
                price: 4390000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                category: "xiaomi",
                id: "xiaomi_rn13pr_8-128",
                image: "./assets/item/xiaomi_rn13pr_8-128.jpg",
                name: "Xiaomi Redmi Note 13 PRO 8GB/128GB",
                price: 5990000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                category: "xiaomi",
                id: "xiaomi_r13_8-128",
                image: "./assets/item/xiaomi_r13_8-128.jpg",
                name: "Xiaomi Redmi 13 8GB/128GB",
                price: 4090000,
                quantity: 10,
                ram: "8GB",
                storage: "128GB"
            },
            {
                category: "xiaomi",
                id: "xiaomi_r13_8-128",
                image: "./assets/item/xiaomi_r13_8-128.jpg",
                name: "Xiaomi Redmi 13 8GB/128GB",
                price: 3490000,
                quantity: 10,
                ram: "6GB",
                storage: "128GB"
            },
            {
                category: "xiaomi",
                id: "xiaomi_r13_8-128",
                image: "./assets/item/xiaomi_r13_8-128.jpg",
                name: "Xiaomi Redmi 13 8GB/128GB",
                price: 4990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            },
            {
                category: "oppo",
                id: "xiaomi_r13_8-128",
                image: "./assets/item/xiaomi_r13_8-128.jpg",
                name: "Xiaomi Redmi 13 8GB/128GB",
                price: 4990000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            }
            
        ];
    }
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
            },
            {
                username: "ADMIN",
                email: "admin",
                password: "123456",
                address: "Quận 12",
                phone: "090002003",
            }
        ];
    }
    localStorage.setItem('customers', JSON.stringify(customers));
});
