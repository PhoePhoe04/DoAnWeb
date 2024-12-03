// ============================================================ Main ============================================================

// Sự kiện cho nút hiển thị thêm
function showMoreProducts() {
  const items = document.querySelectorAll(
    ".products .product:nth-child(n + 9)"
  );
  const button = document.getElementById("showMoreBtn");

  // Kiểm tra trạng thái hiện tại của các mục
  const isHidden = Array.from(items).every(
    (item) => item.style.display === "none" || item.style.display === ""
  );

  // Cập nhật trạng thái hiển thị
  items.forEach((item) => {
    item.style.display = isHidden ? "block" : "none";
  });

  // Thay đổi văn bản nút
  button.textContent = isHidden ? "Thu gọn" : "Hiển thị thêm";
}

// Đảm bảo rằng các mục bị ẩn khi trang tải
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(
    ".products .product:nth-child(n + 9)"
  );
  items.forEach((item) => {
    item.style.display = "none";
  });
});

//Sự kiện tìm kiếm
function searchProducts(keyword) {
  // Lấy danh sách tất cả các sản phẩm
  const products = document.querySelectorAll(".products .product");

  // Lặp qua từng sản phẩm
  products.forEach((product) => {
    const productName = product.querySelector(".productName").textContent;

    // Kiểm tra tên sản phẩm có chứa từ khóa không (không phân biệt chữ hoa/thường)
    if (productName.toLowerCase().includes(keyword.toLowerCase())) {
      product.style.display = "block"; // Hiển thị sản phẩm khớp
    } else {
      product.style.display = "none"; // Ẩn sản phẩm không khớp
    }
  });
}

// SLIDER-BANNER
const slides = document.querySelectorAll(".banner");
const slidesContainer = document.querySelector(".slider");
const totalSlides = slides.length;
let currentIndex = 0;

function showSlides() {
  // Tính toán vị trí dịch chuyển cho từng cặp slide
  slidesContainer.style.transform = `translateX(-${
    currentIndex * (1200 / 2 + 5)
  }px)`;

  // Cập nhật currentIndex để chuyển đến cặp slide kế tiếp
  currentIndex = (currentIndex + 1) % totalSlides;

  // Nếu đã đến slide cuối cùng, chuyển về vị trí ban đầu
  if (currentIndex === totalSlides - 1) {
    currentIndex = 0;
  }
}

setInterval(showSlides, 3000); // Thay đổi slide mỗi 3 giây

// Chuyển trang
function changePage(pageId) {
  // Tìm tất cả các phần tử có class 'page'
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    // Gỡ bỏ class 'active' và thêm class 'section' cho tất cả các trang
    page.classList.replace("active", "section");
  });

  // Tìm phần tử có id trùng với pageId và thêm class 'active'
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.replace("section", "active");
  }
}

// FILTER BUTTON
function togglePopup(idBtn) {
  const filterBtn = document.querySelector(idBtn);
  const triangle = filterBtn.querySelector(".triangle");
  const filterPopup = filterBtn.querySelector(".filter-popup");

  const isActive = triangle.classList.contains("active");

  // Chuyển đổi giữa 'active' và 'section'
  if (isActive) {
    triangle.classList.replace("active", "section");
    filterPopup.classList.replace("active", "section");
  } else {
    triangle.classList.replace("section", "active");
    filterPopup.classList.replace("section", "active");
  }
  document.addEventListener("click", function handleClickOutside(event) {
    if (!filterBtn.contains(event.target)) {
      triangle.classList.replace("active", "section");
      filterPopup.classList.replace("active", "section");
      document.removeEventListener("click", handleClickOutside);
    }
  });
}

// DETAIL POPUP
function toggleDetailPopup() {
  const detailPopup = document.getElementById("productPopup");

  const isActive = detailPopup.classList.contains("active");

  if (isActive) {
    detailPopup.classList.replace("active", "section");
  } else {
    detailPopup.classList.replace("section", "active");
  }
}

// +++++++++++++++++++++++++++++++++++ OOP +++++++++++++++++++++++++++++++++++
class Product {
  constructor(category, id, image, name, price, quantity, ram, storage) {
    this.category = category;
    this.id = id;
    this.image = image;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.ram = ram;
    this.storage = storage;
  }
}

class ProductManager {
  constructor() {
    this.productList = [];
  }

  getProductsByCategory(category) {
    return this.productList.filter((product) => product.category === category);
  }

  getProductById(id) {
    return this.productList.find((product) => product.id === id) || null;
  }

  // Thêm sản phẩm
  addProduct(product) {
    if (product instanceof Product) {
      this.productList.push(product);
      this.saveToLocalStorage();
      console.log(`Đã thêm sản phẩm:`, product);
    } else {
      console.log("Đối tượng không phải là sản phẩm hợp lệ.");
    }
  }

  // Cập nhật sản phẩm với id
  updateProductByID(productID, updateFields) {
    // Tìm sản phẩm cần thay đổi
    const productIndex = this.productList.findIndex(
      (product) => product.id === productID
    );

    if (productIndex === -1) {
      console.error(`Không tìm thấy sản phẩm với ID: ${productID}`);
      return;
    }
    // Cập nhật các thuộc tính được truyền vào
    Object.assign(this.productList[productIndex], updateFields);

    // Lưu lại vào localStorage
    this.saveToLocalStorage();

    console.log(
      `Đã cập nhật sản phẩm với ID: ${productID}`,
      this.productList[productIndex]
    );
  }

  // Lưu sản phẩm xuống localStorage
  saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(this.productList));
    console.log("Danh sách sản phẩm đã được lưu vào localStorage.");
  }

  // Lấy dữ liệu từ localStorage
  loadFromLocalStorage() {
    const storedData = localStorage.getItem("products");
    if (storedData) {
      this.productList = JSON.parse(storedData).map(
        (product) =>
          new Product(
            product.category,
            product.id,
            product.image,
            product.name,
            product.price,
            product.quantity,
            product.ram,
            product.storage
          )
      );
      console.log("Danh sách sản phẩm đã được tải từ localStorage.");
    }
  }

  // Cấu trúc của 1 sản phẩm
  displayProduct(productDiv, product) {
    productDiv.innerHTML = `
      <div class="productImg">
        <img src="${product.image}" alt="${product.name}"/>
      </div>
      <div class="productName">${product.name}</div>
      <div class="productDetail"></div>
      <div class="productPrice">${parseInt(product.price).toLocaleString(
        "vi-VN"
      )} VNĐ</div>
      <div class="btnProduct">
        <button class="viewDetailBtn" onclick="setViewDetailEvent(this)">Xem chi tiết</button>
        <button class="muaNgay">Mua ngay</button>
      </div>
      `;
  }

  // Trình bày sản phẩm ra màn hình
  displayProductsToUI(containerID, products) {
    const container = document.getElementById(containerID);
    container.innerHTML = ""; // Xóa các sản phẩm cũ

    products.forEach((product) => {
      if (product.quantity > 0) {
        const productDiv = document.createElement("div");

        // Thêm id và class product
        productDiv.id = product.id;
        productDiv.classList.add("product");

        this.displayProduct(productDiv, product);
        container.appendChild(productDiv);
      }
    });
  }

  // Lọc các sản phẩm theo options
  filterOptions(pageId, category) {
    let containerID = document.getElementById(pageId);

    let costFilted = containerID.querySelector(".cost-options .filted");
    let ramFilted = containerID.querySelector(".ram-options .filted");
    let storageFilted = containerID.querySelector(".storage-options .filted");

    let { min: costMin, max: costMax } = costFilted
      ? this.getCostRange(costFilted.textContent)
      : { min: 0, max: Infinity };

    let filteredProducts = this.getProductsByCategory(category).filter(
      (product) => {
        let isPriceMatch = product.price >= costMin && product.price <= costMax;
        let isRamMatch = ramFilted
          ? product.ram === ramFilted.textContent.trim()
          : true;
        let isStorageMatch = storageFilted
          ? product.storage === storageFilted.textContent.trim()
          : true;
        return (
          isPriceMatch && isRamMatch && isStorageMatch && product.quantity > 0
        );
      }
    );
    console.log("Filtered Products:", filteredProducts); // Debug danh sách lọc
    return filteredProducts;
  }

  // Hàm hỗ trợ lấy khoảng giá từ chuỗi
  getCostRange(costText) {
    if (costText.includes("Dưới")) {
      const max = parseInt(costText.match(/\d+/)[0]) * 1000000; // Ví dụ: "Dưới 2 triệu"
      return { min: 0, max };
    } else if (costText.includes("Trên")) {
      const min = parseInt(costText.match(/\d+/)[0]) * 1000000; // Ví dụ: "Trên 4 triệu"
      return { min, max: Infinity };
    } else {
      const [min, max] = costText
        .match(/\d+/g)
        .map((num) => parseInt(num) * 1000000); // "Từ 2 - 4 triệu"
      return { min, max };
    }
  }
}

function setViewDetailEvent(buttonElement) {
  // Ngăn chặn sự kiện nếu không truyền đúng nút
  if (!buttonElement) {
    console.error("Nút không hợp lệ!");
    return;
  }

  // Xử lý sự kiện khi bấm vào nút
  const productElement = buttonElement.closest(".product");
  if (!productElement) {
    console.error("Không tìm thấy phần tử cha của nút.");
    return;
  }

  const productId = productElement.id;
  const product = productManager.getProductById(productId);

  if (product) {
    createPopup(product); // Hiển thị thông tin chi tiết sản phẩm
  } else {
    console.error("Không tìm thấy sản phẩm với ID:", productId);
  }
}

// ==================================================== Products Manager ====================================================
const productManager = new ProductManager();

// productManager.addProduct(new Product("iphone","ip11_64","./assets/item/ip11_64.jpg", "iPhone 11 64GB", 8999000, 10, "4GB", "64GB"));
// productManager.addProduct(new Product("iphone","ip11_128","./assets/item/ip11_128.jpg", "iPhone 11 128GB", 10190000, 10, "4GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip12_64","./assets/item/ip12_64.jpg", "iPhone 12 64GB", 11590000, 10, "4GB", "64GB"));
// productManager.addProduct(new Product("iphone","ip12_128","./assets/item/ip12_128.jpg", "iPhone 12 128GB", 13590000, 10, "4GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip13_128","./assets/item/ip13_128.jpg", "iPhone 13 128GB", 13490000, 10, "4GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip13_256","./assets/item/ip13_256.jpg", "iPhone 13 256GB", 17390000, 10, "4GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip14_128","./assets/item/ip14_128.jpg", "iPhone 14 128GB", 17490000, 10, "6GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip14+_128","./assets/item/ip14+_128.jpg", "iPhone 14 PLUS 128GB", 20090000, 10, "6GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip14_256","./assets/item/ip14_256.jpg", "iPhone 14 256GB", 20590000, 10, "6GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip14+_256","./assets/item/ip14+_256.jpg", "iPhone 14 PLUS 256GB", 23590000, 10, "6GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip14prm_128","./assets/item/ip14prm_128.jpg", "iPhone 14 PRO MAX 128GB", 26990000, 10, "6GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip14prm_256","./assets/item/ip14prm_256.jpg", "iPhone 14 PRO MAX 256GB", 28590000, 10, "6GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip14prm_512","./assets/item/ip14prm_512.jpg", "iPhone 14 PRO MAX 512GB", 35990000, 10, "6GB", "512GB"));
// productManager.addProduct(new Product("iphone","ip15_128","./assets/item/ip15_128.jpg", "iPhone 15 128GB", 19890000, 10, "6GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip15+_128","./assets/item/ip15+_128.jpg", "iPhone 15 PLUS 128GB", 22890000, 10, "6GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip15prm_256","./assets/item/ip15prm_256.jpg", "iPhone 15 PRO MAX 256GB", 29590000, 10, "8GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip15_256","./assets/item/ip15_256.jpg", "iPhone 15 256GB", 22990000, 10, "6GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip15+_256","./assets/item/ip15+_256.jpg", "iPhone 15 PLUS 256GB", 25990000, 10, "6GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip15prm_512","./assets/item/ip15prm_512.jpg", "iPhone 15 PRO MAX 512GB", 34990000, 10, "8GB", "512GB"));
// productManager.addProduct(new Product("iphone","ip15pr_256","./assets/item/ip15pr_256.jpg", "iPhone 15 PRO 256GB", 28490000, 10, "8GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip15prm_1TB","./assets/item/ip15prm_1TB.jpg", "iPhone 15 PRO MAX 1TB", 40290000, 10, "8GB", "1 TB"));
// productManager.addProduct(new Product("iphone","ip15pr_128","./assets/item/ip15pr_128.jpg", "iPhone 15 PRO 128GB", 25590000, 10, "8GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip15pr_512","./assets/item/ip15pr_512.jpg", "iPhone 15 PRO 512GB", 33490000, 10, "8GB", "512GB"));
// productManager.addProduct(new Product("iphone","ip15+_512","./assets/item/ip15+_512.jpg", "iPhone 15 PLUS 512GB", 29990000, 10, "8GB", "512GB"));
// productManager.addProduct(new Product("iphone","ip15_512","./assets/item/ip15_512.jpg", "iPhone 15 512GB", 27990000, 10, "8GB", "512GB"));
// productManager.addProduct(new Product("iphone","ip16prm_256","./assets/item/ip16prm_256.jpg", "iPhone 16 PRO MAX 256GB", 34990000, 10, "8GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip16prm_512","./assets/item/ip16prm_512.jpg", "iPhone 16 PRO MAX 512GB", 40890000, 10, "8GB", "512GB"));
// productManager.addProduct(new Product("iphone","ip16prm_1TB","./assets/item/ip16prm_1TB.png", "iPhone 16 PRO MAX 1TB", 46790000, 10, "8GB", "1 TB"));
// productManager.addProduct(new Product("iphone","ip16pr_128","./assets/item/ip16pr_128.png", "iPhone 16 PRO 128GB", 28890000, 10, "8GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip16pr_256","./assets/item/ip16pr_256.png", "iPhone 16 PRO 256GB", 31990000, 10, "8GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip16pr_512","./assets/item/ip16pr_512.png", "iPhone 16 PRO 512GB", 37990000, 10, "8GB", "512GB"));
// productManager.addProduct(new Product("iphone","ip16pr_1TB","./assets/item/ip16pr_1TB.png", "iPhone 16 PRO 1 TB", 43990000, 10, "8GB", "1 TB"));
// productManager.addProduct(new Product("iphone","ip16+_128","./assets/item/ip16+_128.jpg", "iPhone 16 PLUS 128GB", 26990000, 10, "8GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip16+_256","./assets/item/ip16+_256.png", "iPhone 16 PLUS 256GB", 27990000, 10, "8GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip16+_512","./assets/item/ip16+_512.png", "iPhone 16 PLUS 512GB", 32990000, 10, "8GB", "512GB"));
// productManager.addProduct(new Product("iphone","ip16_128","./assets/item/ip16_128.png", "iPhone 16 PLUS 128GB", 22290000, 10, "8GB", "128GB"));
// productManager.addProduct(new Product("iphone","ip16_256","./assets/item/ip16_256.png", "iPhone 16 PLUS 256GB", 25490000, 10, "8GB", "256GB"));
// productManager.addProduct(new Product("iphone","ip16_512","./assets/item/ip16_512.png", "iPhone 16 PLUS 512GB", 29890000, 10, "8GB", "512GB"));

// productManager.addProduct(new Product("samsung","ssgS24_Ultra_5G_256","./assets/item/ssgS24_Ultra_5G_256.jpg", "SamSung Galaxy S24 Ultra 5G 256GB", 29990000, 10, "12GB", "256GB"));
// productManager.addProduct(new Product("samsung","ssgS24_Ultra_5G_512","./assets/item/ssgS24_Ultra_5G_512.jpg", "SamSung Galaxy S24 Ultra 5G 512GB", 33490000, 10, "12GB", "512GB"));
// productManager.addProduct(new Product("samsung","ssgA16_128","./assets/item/ssgA16_128.jpg", "SamSung Galaxy A16 128GB", 5890000, 10, "8GB", "128GB"));
// productManager.addProduct(new Product("samsung","ssgA16_256","./assets/item/ssgA16_256.jpg", "SamSung Galaxy A16 256GB", 6690000, 10, "8GB", "256GB"));
// productManager.addProduct(new Product("samsung","ssgA16_5G_128","./assets/item/ssgA16_5G_128.jpg", "SamSung Galaxy A16 5G 128GB", 6090000, 10, "8GB", "128GB"));
// productManager.addProduct(new Product("samsung","ssgA16_5G_256","./assets/item/ssgA16_5G.jpg", "SamSung Galaxy A16 5G 256GB", 6990000, 10, "8GB", "256GB"));
// productManager.addProduct(new Product("samsung","ssgA55_5G_256","./assets/item/ssgA55_5G_256.jpg", "SamSung Galaxy A55 5G 12GB-256GB", 10990000, 10, "12GB", "256GB"));
// productManager.addProduct(new Product("samsung","ssgA55_5G_128","./assets/item/ssgA55_5G_128.jpg", "SamSung Galaxy A55 5G 12GB/128GB", 10990000, 10, "12GB", "128GB"));
// productManager.addProduct(new Product("samsung","ssgA55_5G_256_8gb","./assets/item/ssgA55_5G_256_8gb.jpg", "SamSung Galaxy A55 5G 8GB/256GB", 10990000, 10, "8GB", "256GB"));

// productManager.addProduct(new Product("xiaomi","xiaomi_rn13_8-128","./assets/item/xiaomi_rn13_8-128.jpg", "Xiaomi Redmi Note 13 8GB/128GB", 4390000, 10, "8GB", "128GB"));
// productManager.addProduct(new Product("xiaomi","xiaomi_rn13pr_8-128","./assets/item/xiaomi_rn13pr_8-128.jpg", "Xiaomi Redmi Note 13 PRO 8GB/128GB", 5990000, 10, "8GB", "128GB"));
// productManager.addProduct(new Product("xiaomi","xiaomi_r13_8-128","./assets/item/xiaomi_r13_8-128.jpg", "Xiaomi Redmi 13 8GB/128GB", 4090000, 10, "8GB", "128GB"));
// productManager.addProduct(new Product("xiaomi","xiaomi_r13_8-128","./assets/item/xiaomi_r13_8-128.jpg", "Xiaomi Redmi 13 8GB/128GB", 3490000, 10, "6GB", "128GB"));
// productManager.addProduct(new Product("xiaomi","xiaomi_r13_8-128","./assets/item/xiaomi_r13_8-128.jpg", "Xiaomi Redmi 13 8GB/128GB", 4990000, 10, "8GB", "256GB"));

// productManager.addProduct(new Product("oppo","oppo_r10_8-256","./assets/item/rn10_5G_256_8gb.webp", "OPPO Reno 10 5G 8GB/256GB", 7490000, 10, "8GB", "256GB"));
// productManager.addProduct(new Product("oppo","oppo_a79_8-256","./assets/item/op_a79_256_8gb.webp", "OPPO A79 5G 8GB/256GB", 7190000, 10, "8GB", "256GB"));
// productManager.addProduct(new Product("oppo","oppo_a18_4-128","./assets/item/op_a18_128_4gb.webp", "OPPO A18 4GB/128GB", 3690000, 10, "4GB", "128GB"));
// productManager.addProduct(new Product("oppo","oppo_a58_6-128","./assets/item/op_a58_128_6gb.webp", "OPPO A58 4G 6GB/128GB", 4690000, 10, "6GB", "256GB"));
// productManager.addProduct(new Product("oppo","oppo_r11f_8-256","./assets/item/op_r11f_256_8gb.webp", "OPPO Reno11 F 5G 8GB/256GB", 8490000, 10, "8GB", "256GB"));

productManager.loadFromLocalStorage();

productManager.displayProductsToUI(
  "productsSuggestion",
  productManager.productList
);
productManager.displayProductsToUI(
  "productIPhone",
  productManager.getProductsByCategory("iphone")
);
productManager.displayProductsToUI(
  "productSamSung",
  productManager.getProductsByCategory("samsung")
);
productManager.displayProductsToUI(
  "productXiaomi",
  productManager.getProductsByCategory("xiaomi")
);
productManager.displayProductsToUI(
  "productOppo",
  productManager.getProductsByCategory("oppo")
);

// Popup detail
function createPopup(product) {
  // Kiểm tra nếu popup đã tồn tại thì không tạo mới
  if (document.getElementById("productPopup")) return;

  // Tạo div popup
  const popup = document.createElement("div");
  popup.classList.add("overlay");
  popup.classList.add("active");
  popup.id = "productPopup";

  popup.innerHTML = `
    <div class="popup-content">
      <div class="detail-content">
        <div class="image-product">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="detail-product">
          <div class="detailName">${product.name}</div>
          <div class="detailRam">RAM: ${product.ram}</div>
          <div class="detailStorage">Storage: ${product.storage}</div>
          <div class="detailCash">${product.price.toLocaleString(
            "vi-VN"
          )} VND</div>
        </div> 
      </div>
      <div id="btnPopup">
        <button class="closePopup">Đóng</button>
        <button class="btnAddtoCart">Thêm vào giỏ hàng</button>
      </div>
    </div>
  `;

  // Thêm popup vào body
  document.body.appendChild(popup);

  // Thêm sự kiện xóa popup khi bấm nút Đóng
  popup.querySelector(".closePopup").addEventListener("click", () => {
    popup.remove();
  });

  // Đóng popup khi click ra ngoài .popup-content
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.remove();
    }
  });
  //Thêm vào giỏ hàng
  popup.querySelector(".btnAddtoCart").addEventListener("click", () => {
    if (sessionStorage.getItem("loggedInUser") == null) {
      alert("Bạn phải đăng nhập vô Website mới được mua hàng");
    } else {
      getInforProduct(document.querySelector(".detail-product"), ".detailName");
      alert("Bạn đã thêm sản phẩm vào giỏ hàng thành công");
      vnMoney = totalPrice.toLocaleString("vi-VN") + " VNĐ";
      document.querySelector("#totalCost").textContent = vnMoney;
    }
  });
}

function filterProductsToUI(pageId, containerID, category) {
  const pageContainer = document.getElementById(pageId);

  pageContainer.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
      // Lấy nhóm chứa tùy chọn hiện tại (cost-options, ram-options, storage-options)
      const group = option.closest(".filter-options");

      if (group) {
        if (option.classList.contains("filted")) {
          // Nếu tùy chọn hiện tại đã được chọn, bỏ chọn
          option.classList.remove("filted");
        } else {
          // Xóa 'filted' khỏi tất cả các tùy chọn trong nhóm
          group.querySelectorAll(".option").forEach((opt) => {
            opt.classList.remove("filted");
          });

          // Thêm 'filted' vào option đang được click
          option.classList.add("filted");
        }

        // Gọi hàm filterProducts để cập nhật sản phẩm hiển thị
        productManager.displayProductsToUI(
          containerID,
          productManager.filterOptions(pageId, category)
        );
      }
    });
  });
}

filterProductsToUI("iphone-page", "productIPhone", "iphone");
filterProductsToUI("samsung-page", "productSamSung", "samsung");
filterProductsToUI("xiaomi-page", "productXiaomi", "xiaomi");
filterProductsToUI("oppo-page", "productOppo", "oppo");

// function sortSelected(pageId){
//   const page = document.getElementById(pageId);
//   const sortButtons = page.querySelectorAll(".sortBtn");

//   // Thêm sự kiện click cho từng nút
//   sortButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       // Loại bỏ class 'sorted' khỏi tất cả các nút
//       sortButtons.forEach((btn) => btn.classList.remove("sorted"));

//       // Thêm class 'sorted' vào nút được nhấn
//       button.classList.add("sorted");
//     });
//   });
// }

// sortSelected('iphone-page')

// Hàm sắp xếp giá tăng dần
function sortIncreament(pageId, containerProducts, element) {
  const page = document.getElementById(pageId);
  const productContainer = page.querySelector(`#${containerProducts}`);
  const products = Array.from(productContainer.querySelectorAll(".product"));

  // Sắp xếp sản phẩm theo giá tăng dần
  products.sort((a, b) => {
    const priceA = parseInt(
      a.querySelector(".productPrice").textContent.replace(/[^0-9]/g, "")
    );
    const priceB = parseInt(
      b.querySelector(".productPrice").textContent.replace(/[^0-9]/g, "")
    );
    return priceA - priceB;
  });

  // Xóa sản phẩm cũ và thêm sản phẩm đã sắp xếp lại
  productContainer.innerHTML = "";
  products.forEach((product) => productContainer.appendChild(product));

  // Cập nhật class "sorted"
  updateSortedClass(element);
}

// Hàm sắp xếp giá giảm dần
function sortDecrement(pageId, containerProducts, element) {
  const page = document.getElementById(pageId);
  const productContainer = page.querySelector(`#${containerProducts}`);
  const products = Array.from(productContainer.querySelectorAll(".product"));

  // Sắp xếp sản phẩm theo giá giảm dần
  products.sort((a, b) => {
    const priceA = parseInt(
      a.querySelector(".productPrice").textContent.replace(/[^0-9]/g, "")
    );
    const priceB = parseInt(
      b.querySelector(".productPrice").textContent.replace(/[^0-9]/g, "")
    );
    return priceB - priceA;
  });

  // Xóa sản phẩm cũ và thêm sản phẩm đã sắp xếp lại
  productContainer.innerHTML = "";
  products.forEach((product) => productContainer.appendChild(product));

  // Cập nhật class "sorted"
  updateSortedClass(element);
}

// Hàm cập nhật class "sorted"
function updateSortedClass(activeElement) {
  // Xóa class "sorted" khỏi tất cả các nút
  document
    .querySelectorAll(".sortBtn")
    .forEach((btn) => btn.classList.remove("sorted"));

  // Thêm class "sorted" vào nút được bấm
  activeElement.classList.add("sorted");
}
