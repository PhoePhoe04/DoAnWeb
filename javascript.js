// ============================================================ Main ============================================================

// Sự kiện cho nút hiển thị thêm
function showMoreProducts() {
  const items = document.querySelectorAll(
    ".products .product:nth-child(n + 9)"
  );
  const button = document.getElementById("showMoreBtn");

  items.forEach((item) => {
    item.style.display = item.style.display === "none" ? "block" : "none";
  });

  // Thay đổi văn bản nút dựa trên trạng thái hiển thị
  button.textContent =
    button.textContent === "Hiển thị thêm" ? "Thu gọn" : "Hiển thị thêm";
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
  constructor(type, id, img, name, price, quantity, ram, storage) {
    this.type = type;
    this.id = id;
    this.img = img;
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

  getProductById(id) {
    return this.productList.find((product) => product.id === id) || null;
  }

  addProduct(product) {
    if (product instanceof Product) {
      this.productList.push(product);
      this.saveToLocalStorage();
      console.log(`Đã thêm sản phẩm:`, product);
    } else {
      console.log("Đối tượng không phải là sản phẩm hợp lệ.");
    }
  }

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

  saveToLocalStorage() {
    localStorage.setItem("products", JSON.stringify(this.productList));
    console.log("Danh sách sản phẩm đã được lưu vào localStorage.");
  }

  loadFromLocalStorage() {
    const storedData = localStorage.getItem("productList");
    if (storedData) {
      this.productList = JSON.parse(storedData).map(
        (product) =>
          new Product(
            product.type,
            product.id,
            product.img,
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
        <image src="${product.img}" alt="${product.name}"/>
      </div>
      <div class="productName">${product.name}</div>
      <div class="productDetail"></div>
      <div class="productPrice">${product.price.toLocaleString("vi-VN")} VNĐ</div>
      <div class="btnProduct">
        <button class="viewDetailBtn">Xem chi tiết</button>
        <button class="muaNgay">Mua ngay</button>
      </div>
      `;
  }

  // Trình bày sản phẩm ra màn hình
  displayProductsToUI(containerID) {
    const container = document.getElementById(containerID);
    // container.innerHTML = ""; // Xóa các sản phẩm cũ

    this.productList.forEach((product) => {
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

  // Trình bày sản phẩm ra màn hình theo Type
  displayProductsWithType(containerID, type) {
    const container = document.getElementById(containerID);
    container.innerHTML = ""; // Xóa các sản phẩm cũ

    this.productList.forEach((product) => {
      if (String(product.type) === String(type) && product.quantity > 0) {
        const productDiv = document.createElement("div");

        // Thêm id và class product
        productDiv.id = product.id;
        productDiv.classList.add("product");
        this.displayProduct(productDiv, product);
        container.appendChild(productDiv);
      }
    });
  }

  filterProducts(pageId, containerID, type) {
    // Lấy container của page
    const pageContainer = document.getElementById(pageId);

    // Lấy các tùy chọn được chọn
    const costFilted = pageContainer.querySelector(".cost-options .filted");
    const ramFilted = pageContainer.querySelector(".ram-options .filted");
    const storageFilted = pageContainer.querySelector(".storage-options .filted");

    // Lấy khoảng giá từ tùy chọn
    const { min: costMin, max: costMax } = costFilted
      ? this.getCostRange(costFilted.textContent)
      : { min: 0, max: Infinity };

    // Lọc sản phẩm
    const filteredProducts = this.productList.filter((product) => {
      if(String(product.type) === type){
        const isPriceMatch = product.price >= costMin && product.price <= costMax;
        const isRamMatch = ramFilted
          ? product.ram === ramFilted.textContent.trim()
          : true;
        const isStorageMatch = storageFilted
          ? product.storage === storageFilted.textContent.trim()
          : true;
        return (
          isPriceMatch && isRamMatch && isStorageMatch && product.quantity > 0
        );
      }else{
        return false;
      }
    });

    // Hiển thị sản phẩm được lọc
    const container = document.getElementById(containerID);
    container.innerHTML = ""; // Xóa danh sách cũ
    filteredProducts.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.id = product.id;
      productDiv.classList.add("product");
      this.displayProduct(productDiv, product); // Hiển thị sản phẩm
      container.appendChild(productDiv);
    });

    console.log("Filtered Products:", filteredProducts); // Debug danh sách lọc
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

// ==================================================== Products Manager ====================================================
const productManager = new ProductManager();

productManager.addProduct(new Product("iphone","ip11_64","./assets/item/ip11_64.jpg", "iPhone 11 64GB", 8999000, 10, "4 GB", "64 GB"));
productManager.addProduct(new Product("iphone","ip11_128","./assets/item/ip11_128.jpg", "iPhone 11 128GB", 10190000, 10, "4 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip12_64","./assets/item/ip12_64.jpg", "iPhone 12 64GB", 11590000, 10, "4 GB", "64 GB"));
productManager.addProduct(new Product("iphone","ip12_128","./assets/item/ip11_128.jpg", "iPhone 12 128GB", 13590000, 10, "4 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip13_128","./assets/item/ip13_128.jpg", "iPhone 13 128GB", 13490000, 10, "4 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip13_256","./assets/item/ip13_256.jpg", "iPhone 13 256GB", 17390000, 10, "4 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip14_128","./assets/item/ip14_128.jpg", "iPhone 14 128GB", 17490000, 10, "6 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip14+_128","./assets/item/ip14+_128.jpg", "iPhone 14 PLUS 128GB", 20090000, 10, "6 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip14_256","./assets/item/ip14_256.jpg", "iPhone 14 256GB", 20590000, 10, "6 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip14+_256","./assets/item/ip14+_256.jpg", "iPhone 14 PLUS 256GB", 23590000, 10, "6 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip14prm_128","./assets/item/ip14prm_128.jpg", "iPhone 14 PRO MAX 128GB", 26990000, 10, "6 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip14prm_256","./assets/item/ip14prm_256.jpg", "iPhone 14 PRO MAX 256GB", 28590000, 10, "6 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip14prm_512","./assets/item/ip14prm_512.jpg", "iPhone 14 PRO MAX 512GB", 35990000, 10, "6 GB", "512 GB"));
productManager.addProduct(new Product("iphone","ip15_128","./assets/item/ip15_128.jpg", "iPhone 15 128GB", 19890000, 10, "6 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip15+_128","./assets/item/ip15+_128.jpg", "iPhone 15 PLUS 128GB", 22890000, 10, "6 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip15prm_256","./assets/item/ip15prm_256.jpg", "iPhone 15 PRO MAX 256GB", 29590000, 10, "8 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip15_256","./assets/item/ip15_256.jpg", "iPhone 15 256GB", 22990000, 10, "6 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip15+_256","./assets/item/ip15+_256.jpg", "iPhone 15 PLUS 256GB", 25990000, 10, "6 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip15prm_512","./assets/item/ip15prm_512.jpg", "iPhone 15 PRO MAX 512GB", 34990000, 10, "8 GB", "512 GB"));
productManager.addProduct(new Product("iphone","ip15pr_256","./assets/item/ip15pr_256.jpg", "iPhone 15 PRO 256GB", 28490000, 10, "8 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip15prm_1TB","./assets/item/ip15prm_1TB.jpg", "iPhone 15 PRO MAX 1TB", 40290000, 10, "8 GB", "1 TB"));
productManager.addProduct(new Product("iphone","ip15pr_128","./assets/item/ip15pr_128.jpg", "iPhone 15 PRO 128GB", 25590000, 10, "8 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip15pr_512","./assets/item/ip15pr_512.jpg", "iPhone 15 PRO 512GB", 33490000, 10, "8 GB", "512 GB"));
productManager.addProduct(new Product("iphone","ip15+_512","./assets/item/ip15+_512.jpg", "iPhone 15 PLUS 512GB", 29990000, 10, "8 GB", "512 GB"));
productManager.addProduct(new Product("iphone","ip15_512","./assets/item/ip15_512.jpg", "iPhone 15 512GB", 27990000, 10, "8 GB", "512 GB"));
productManager.addProduct(new Product("iphone","ip16prm_256","./assets/item/ip16prm_256.jpg", "iPhone 16 PRO MAX 256GB", 34990000, 10, "8 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip16prm_512","./assets/item/ip16prm_512.jpg", "iPhone 16 PRO MAX 512GB", 40890000, 10, "8 GB", "512 GB"));
productManager.addProduct(new Product("iphone","ip16prm_1TB","./assets/item/ip16prm_1TB.png", "iPhone 16 PRO MAX 1TB", 46790000, 10, "8 GB", "1 TB"));
productManager.addProduct(new Product("iphone","ip16pr_128","./assets/item/ip16pr_128.png", "iPhone 16 PRO 128 GB", 28890000, 10, "8 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip16pr_256","./assets/item/ip16pr_256.png", "iPhone 16 PRO 256 GB", 31990000, 10, "8 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip16pr_512","./assets/item/ip16pr_512.png", "iPhone 16 PRO 512 GB", 37990000, 10, "8 GB", "512 GB"));
productManager.addProduct(new Product("iphone","ip16pr_1TB","./assets/item/ip16pr_1TB.png", "iPhone 16 PRO 1 TB", 43990000, 10, "8 GB", "1 TB"));
productManager.addProduct(new Product("iphone","ip16+_128","./assets/item/ip16+_128.jpg", "iPhone 16 PLUS 128 GB", 26990000, 10, "8 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip16+_256","./assets/item/ip16+_256.png", "iPhone 16 PLUS 256 GB", 27990000, 10, "8 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip16+_512","./assets/item/ip16+_512.png", "iPhone 16 PLUS 512 GB", 32990000, 10, "8 GB", "512 GB"));
productManager.addProduct(new Product("iphone","ip16_128","./assets/item/ip16_128.png", "iPhone 16 PLUS 128 GB", 22290000, 10, "8 GB", "128 GB"));
productManager.addProduct(new Product("iphone","ip16_256","./assets/item/ip16_256.png", "iPhone 16 PLUS 256 GB", 25490000, 10, "8 GB", "256 GB"));
productManager.addProduct(new Product("iphone","ip16_512","./assets/item/ip16_512.png", "iPhone 16 PLUS 512 GB", 29890000, 10, "8 GB", "512 GB"));

productManager.addProduct(new Product("samsung","ssgS24_Ultra_5G_256","./assets/item/ssgS24_Ultra_5G_256.jpg", "SamSung Galaxy S24 Ultra 5G 256 GB", 29990000, 10, "12 GB", "256 GB"));
productManager.addProduct(new Product("samsung","ssgS24_Ultra_5G_512","./assets/item/ssgS24_Ultra_5G_512.jpg", "SamSung Galaxy S24 Ultra 5G 512 GB", 33490000, 10, "12 GB", "512 GB"));
productManager.addProduct(new Product("samsung","ssgA16_128","./assets/item/ssgA16_128.jpg", "SamSung Galaxy A16 128 GB", 5890000, 10, "8 GB", "128 GB"));
productManager.addProduct(new Product("samsung","ssgA16_256","./assets/item/ssgA16_256.jpg", "SamSung Galaxy A16 256 GB", 6690000, 10, "8 GB", "256 GB"));
productManager.addProduct(new Product("samsung","ssgA16_5G_128","./assets/item/ssgA16_5G_128.jpg", "SamSung Galaxy A16 5G 128 GB", 6090000, 10, "8 GB", "128 GB"));
productManager.addProduct(new Product("samsung","ssgA16_5G_256","./assets/item/ssgA16_5G.jpg", "SamSung Galaxy A16 5G 256 GB", 6990000, 10, "8 GB", "256 GB"));
productManager.addProduct(new Product("samsung","ssgA55_5G_256","./assets/item/ssgA55_5G_256.jpg", "SamSung Galaxy A55 5G 12GB-256 GB", 10990000, 10, "12 GB", "256 GB"));
productManager.addProduct(new Product("samsung","ssgA55_5G_128","./assets/item/ssgA55_5G_128.jpg", "SamSung Galaxy A55 5G 12GB/128 GB", 10990000, 10, "12 GB", "128 GB"));
productManager.addProduct(new Product("samsung","ssgA55_5G_256_8gb","./assets/item/ssgA55_5G_256_8gb.jpg", "SamSung Galaxy A55 5G 8GB/256 GB", 10990000, 10, "8 GB", "256 GB"));

productManager.addProduct(new Product("xiaomi","xiaomi_rn13_8-128","./assets/item/xiaomi_rn13_8-128.jpg", "Xiaomi Redmi Note 13 8GB/128 GB", 4390000, 10, "8 GB", "128 GB"));
productManager.addProduct(new Product("xiaomi","xiaomi_rn13pr_8-128","./assets/item/xiaomi_rn13pr_8-128.jpg", "Xiaomi Redmi Note 13 PRO 8GB/128 GB", 5990000, 10, "8 GB", "128 GB"));
productManager.addProduct(new Product("xiaomi","xiaomi_r13_8-128","./assets/item/xiaomi_r13_8-128.jpg", "Xiaomi Redmi 13 8GB/128 GB", 4090000, 10, "8 GB", "128 GB"));


productManager.loadFromLocalStorage();

productManager.displayProductsToUI("productsSuggestion");
productManager.displayProductsWithType("productIPhone", "iphone");
productManager.displayProductsWithType("productSamSung", "samsung");
productManager.displayProductsWithType("productXiaomi", "xiaomi");

var totalPrice = 0;
function getInforProduct(productDiv, a) {
  const productName = productDiv.querySelector(a).textContent;
  const product = productManager.productList.find(
    (p) => p.name === productName
  );

  if (product) {
    const table = document.querySelector("#cart");
    const newRow = table.insertRow();

    const cellData = newRow.insertCell(0);
    const cellPrice = newRow.insertCell(1);
    const cellQuantity = newRow.insertCell(2);
    const cellTotalPrice = newRow.insertCell(3);
    const cellDelete = newRow.insertCell(4);
    cellData.innerHTML = `<div>
      <img src="${product.img}" alt="${product.id}" width="80" height="80"/>
      <div>${product.name}</div>
      <div class="detailPhone">
        <div id="storage">${product.storage}</div>
        <div id="ram">${product.ram}</div>
      </div>
    </div>`;
    cellPrice.textContent = product.price;
    cellQuantity.innerHTML = `<div class="control_quantity">
      <button>-</button>
      <div class="quantity">1</div>
      <button>+</button>
    </div>`;
    cellTotalPrice.textContent = product.price;
    cellDelete.innerHTML = `<div class="deleteRow">Xoá</div>`;
    totalPrice += product.price;
    user.totalPrice = totalPrice;
  }
}

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
        <div class="img-product">
          <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="detail-product">
          <div class="detailName">${product.name}</div>
          <div class="detailRam">RAM: ${product.ram}</div>
          <div class="detailStorage">Storage: ${product.storage}</div>
          <div class="detailCash">${product.price.toLocaleString("vi-VN")} VND</div>
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
      document.querySelector("#totalCost").textContent = totalPrice;
    }
  });
}

// Gán sự kiện cho từng nút "Xem chi tiết"
document.querySelectorAll(".viewDetailBtn").forEach((button) => {
  button.addEventListener("click", (event) => {
    // Ngăn chặn sự kiện click lan sang div.product
    event.stopPropagation();

    // Lấy ID sản phẩm từ phần tử cha (div.product)
    const productDiv = button.closest(".product");
    const productId = productDiv.id;

    // Lấy thông tin sản phẩm từ ProductManager
    const product = productManager.getProductById(productId);

    if (product) {
      createPopup(product);
    } else {
      console.error("Không tìm thấy sản phẩm với ID:", productId);
    }
  });
});

function filterProductsToUI(pageId, containerID, type) {
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
        productManager.filterProducts(pageId,containerID, type);
      }
    });
  });
}


filterProductsToUI("iphone-page","productIPhone", "iphone");
filterProductsToUI("samsung-page","productSamSung", "samsung");
filterProductsToUI("xiaomi-page","productXiaomi", "xiaomi");
