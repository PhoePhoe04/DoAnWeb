document.addEventListener('DOMContentLoaded', function() {
    let products = [

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
    localStorage.setItem('orders', JSON.stringify(orders));

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
