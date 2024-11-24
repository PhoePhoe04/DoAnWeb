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
                id: "ip15prm_256",
                category: "iphone",
                image: "./assets/item/ip15prm_256.jpg",
                name: "iPhone 15 PRO MAX 256GB",
                price: 29590000,
                quantity: 10,
                ram: "8GB",
                storage: "256GB"
            }
    ];
    newProducts.forEach(newProduct => {
        // Kiểm tra nếu sản phẩm đã tồn tại (theo `id`)
        if (!products.some(product => product.id === newProduct.id)) {
            // Nếu không tồn tại, thêm sản phẩm mới vào mảng `products`
            products.push(newProduct);
        }
    });      
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
