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
