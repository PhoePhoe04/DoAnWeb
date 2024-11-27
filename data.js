document.addEventListener('DOMContentLoaded', function() {

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

    // let orders = [

    // ];
    // localStorage.setItem('orders', JSON.stringify(orders)); 

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
