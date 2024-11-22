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
            storage: "256GB",
            price: "34990000",
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
            price: "29990000",
            detail: "iPhone 15 với màn hình 6.1 inch, camera 48MP, và chip A16 Bionic.",
            quantity: 30,
            image: "./assets/item/ip15.jpg"
        },
        {
            id: "P009",
            name: "iPhone 14 Pro Max",
            category: "iphone",
            ram: "6GB",
            storage: "128GB",
            price: "33990000",
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
            price: "29990000",
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
            price: "25990000",
            detail: "iPhone 14 với màn hình 6.1 inch, camera 12MP, và chip A15 Bionic.",
            quantity: 40,
            image: "./assets/item/ip14.jpg"
        },
        {
            id: "P012",
            name: "iPhone 13",
            category: "iphone",
            ram: "6GB",
            storage: "128GB",
            price: "22990000",
            detail: "iPhone 13 với màn hình 6.1 inch, camera 12MP, và chip A15 Bionic.",
            quantity: 50,
            image: "./assets/item/ip13.jpg"
        },
        {
            id: "P013",
            name: "iPhone 12",
            category: "iphone",
            ram: "4GB",
            storage: "64GB",
            price: "18990000",
            detail: "iPhone 12 với màn hình 6.1 inch, camera 12MP, và chip A14 Bionic.",
            quantity: 60,
            image: "./assets/item/ip12.jpg"
        },
        {
            id: "P014",
            name: "iPhone 11",
            category: "iphone",
            ram: "4GB",
            storage: "64GB",
            price: "15990000",
            detail: "iPhone 11 với màn hình 6.1 inch, camera 12MP, và chip A13 Bionic.",
            quantity: 70,
            image: "./assets/item/ip11.jpg"
        }
        
    ];
    localStorage.setItem('products', JSON.stringify(products));
});
