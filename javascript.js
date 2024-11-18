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

  addProduct(product) {
    if (product instanceof Product) {
      this.productList.push(product);
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
      <button>Mua ngay</button>
      `;
  }

  // Trình bày sản phẩm ra màn hình
  displayProductsToUI(containerID) {
    const container = document.getElementById(containerID);
    container.innerHTML = ""; // Xóa các sản phẩm cũ

    this.productList.forEach((product) => {
      if (product.quantity > 0) {
        const productDiv = document.createElement("div");

        productDiv.classList.add("product");
        this.displayProduct(productDiv, product);
        container.appendChild(productDiv);
      }
    });
  }

  displayProductsWithType(containerID, type) {
    const container = document.getElementById(containerID);
    container.innerHTML = ""; // Xóa các sản phẩm cũ

    this.productList.forEach((product) => {
      if (String(product.type) === String(type) && product.quantity > 0) {
        const productDiv = document.createElement("div");

        productDiv.classList.add("product");
        this.displayProduct(productDiv, product);
        container.appendChild(productDiv);
      }
    });
  }

  // Trình bài option filter
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
// const product4 = new Product(
//   "iphone",
//   "ip13",
//   "",
//   "iPhone 13",
//   20000000,
//   20,
//   "8 GB",
//   "256 GB"
// );
// const product5 = new Product(
//   "iphone",
//   "ip14",
//   "",
//   "iPhone 14",
//   20000000,
//   20,
//   "8 GB",
//   "256 GB"
// );
// const product6 = new Product(
//   "iphone",
//   "ip15",
//   "",
//   "iPhone 15",
//   20000000,
//   20,
//   "8 GB",
//   "256 GB"
// );
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

// productManager.addProduct(product1);
// productManager.addProduct(product2);
// productManager.addProduct(product3);
// productManager.addProduct(product4);
// productManager.addProduct(product5);
// productManager.addProduct(product6);
// productManager.addProduct(product7);
// productManager.addProduct(product8);
// productManager.addProduct(product9);
// productManager.addProduct(product10);

// productManager.saveToLocalStorage();

productManager.loadFromLocalStorage();

productManager.displayProductsToUI("productsSuggestion");
productManager.displayProductsWithType("productIPhone", "iphone");

// ============================================================ Cart ============================================================

// su kien gio hang
document.querySelector(".cart").addEventListener("click", () => {
  document.querySelector(".container.slider-banner").style.display = "none";
  document.querySelectorAll(".container.suggestion").forEach((div) => {
    div.style.display = "none";
  });
  document.querySelector("#iphone-page").style.display = "none";
  document.querySelector("#shopping_cart_page").style.display = "block";
  if (this.productList.length > 0) {
    document.querySelector("#empty").style.display = "none";
    document.querySelector("#non_empty").style.display = "block";
  }
});
returnToMainPage = () => {
  document.querySelector("#shopping_cart_page").style.display = "none";
  document.querySelector(".container.slider-banner").style.display = "block";
  document.querySelectorAll(".container.suggestion").forEach((div) => {
    div.style.display = "block";
  });
  document.querySelector("#iphone-page").style.display = "block";
  document.querySelector("#sc_top").style.display = "none";
};
document.querySelector("#return_main_page").onclick = returnToMainPage;
getInforProduct = (productDiv) => {
  productDiv.querySelector("button").addEventListener("click", () => {
    productManager.loadFromLocalStorage();
    this.productList.forEach((element) => {
      if (
        element.name == productDiv.querySelector(".productName").textContent
      ) {
        const table = document.querySelector(".cart");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        cell1.innerHTML = `${element.name}`;
        var cell2 = row.insertCell(1);
        cell2.innerHTML = `${element.img}`;
        var cell3 = row.insertCell(2);
        cell3.innerHTML = `${element.price}`;
        var cell4 = row.insertCell(3);
        cell4.innerHTML = `<div id="control_quantity">
                    <button class="change_number">-</button>
                    <div id="quantity">1</div>
                    </div>
                    <button class="change_number">+</button>`;
        document.querySelectorAll(".change_number").forEach((button) => {
          button.addEventListener("click", () => {
            var i = parseInt(document.querySelector("#quantity").textContent);
            if (button.textContent == "-") i -= 1;
            if (button.textContent == "+") i += 1;
            if (i >= 0) document.querySelector("#quantity").textContent = i;
            else alert("Số sản phẩm phải lớn hơn hoặc bằng 0");
          });
        });
        var quantity = parseInt(
          document.querySelector("#quantity").textContent
        );
        var chu = document
          .querySelector("#productPrice")
          .textContent.toString();
        var price = parseInt(chu.split(/.\VNĐ/));
        var cell5 = row.insertCell(4);
        totalPrice = price * quantity;
        cell5.innerHTML = totalPrice.toLocaleString("vi-VN") + ` VNĐ`;
      }
    });
  });
};
