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
    localStorage.setItem("productList", JSON.stringify(this.productList));
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
      <div class="productPrice">${product.price}</div>
      <div class="btnProduct">
        <button class="viewDetailBtn">Xem chi tiết</button>
        <button>Mua ngay</button>
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

  filterProducts(containerID) {
    // Lấy các tùy chọn được chọn
    const costSelected = document.querySelector(".cost-options .selected");
    const ramSelected = document.querySelector(".ram-options .selected");
    const storageSelected = document.querySelector(
      ".storage-options .selected"
    );

    // Lấy khoảng giá từ tùy chọn
    const { min: costMin, max: costMax } = costSelected
      ? this.getCostRange(costSelected.textContent)
      : { min: 0, max: Infinity };

    // Lọc sản phẩm
    const filteredProducts = this.productList.filter((product) => {
      const isPriceMatch = product.price >= costMin && product.price <= costMax;
      const isRamMatch = ramSelected
        ? product.ram === ramSelected.textContent.trim()
        : true;
      const isStorageMatch = storageSelected
        ? product.storage === storageSelected.textContent.trim()
        : true;
      return (
        isPriceMatch && isRamMatch && isStorageMatch && product.quantity > 0
      );
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

// const product1 = new Product(
//   "iphone",
//   "ipX",
//   "",
//   "iPhone X",
//   20000000,
//   20,
//   "8 GB",
//   "256 GB"
// );
// const product2 = new Product(
//   "iphone",
//   "ip11",
//   "",
//   "iPhone 11",
//   20000000,
//   20,
//   "8 GB",
//   "256 GB"
// );
// const product3 = new Product(
//   "iphone",
//   "ip12",
//   "",
//   "iPhone 12",
//   20000000,
//   20,
//   "8 GB",
//   "256 GB"
// );
const product1 = new Product(
  "iphone",
  "ip13",
  "./assets/item/ip13.jpg",
  "iPhone 13",
  20000000,
  20,
  "8 GB",
  "256 GB"
);
const product2 = new Product(
  "iphone",
  "ip14",
  "./assets/item/ip14.jpg",
  "iPhone 14",
  20000000,
  20,
  "8 GB",
  "256 GB"
);
const product3 = new Product(
  "iphone",
  "ip15",
  "./assets/item/ip15.jpg",
  "iPhone 15",
  20000000,
  20,
  "8 GB",
  "256 GB"
);
const product4 = new Product(
  "iphone",
  "ip16",
  "./assets/item/ip16.jpg",
  "iPhone 16",
  30000000,
  20,
  "16 GB",
  "256 GB"
);
// const product7 = new Product(
//   "samsung",
//   "",
//   "ssS24",
//   "SAMSUNG S24",
//   20000000,
//   20,
//   "8 GB",
//   "256 GB"
// );
// const product8 = new Product(
//   "samsung",
//   "",
//   "ssS21",
//   "SAMSUNG S21",
//   20000000,
//   20,
//   "8 GB",
//   "256 GB"
// );
// const product9 = new Product(
//   "samsung",
//   "",
//   "ssS20",
//   "SAMSUNG S20",
//   20000000,
//   20,
//   "8 GB",
//   "256 GB"
// );
// const product10 = new Product(
//   "samsung",
//   "",
//   "ssS22",
//   "SAMSUNG S22",
//   20000000,
//   20,
//   "8 GB",
//   "256 GB"
// );

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);
productManager.addProduct(product4);
// productManager.addProduct(product5);
// productManager.addProduct(product6);

productManager.loadFromLocalStorage();

productManager.displayProductsToUI("productsSuggestion");
productManager.displayProductsWithType("productIPhone", "iphone");

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
          <div class="detailCash">${product.price} VND</div>
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

// Gán sự kiện cho phần chọn lựa option filter
function filterProductsToUI(idProducts) {
  document.querySelectorAll(".option").forEach((option) => {
    if (option.closest(".cost-options")) {
      option.addEventListener("click", () => {
        if (option.classList.contains("selected")) {
          option.classList.remove("selected");
        } else {
          // Loại bỏ 'selected' khỏi các tùy chọn khác trong cùng nhóm
          option
            .closest(".cost-options")
            .querySelectorAll(".option")
            .forEach((opt) => opt.classList.remove("selected"));

          // Thêm 'selected' vào option đang được click
          option.classList.add("selected");
        }
        productManager.filterProducts(idProducts);
      });
    } else {
      option.addEventListener("click", () => {
        if (option.classList.contains("selected")) {
          option.classList.remove("selected");
        } else {
          option.classList.add("selected");
        }
        productManager.filterProducts(idProducts);
      });
    }
  });
}

filterProductsToUI("productIPhone");
