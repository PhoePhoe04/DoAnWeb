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

// Phần sắp xếp
function toggleSort(pageId, category, element) {
  let sort = element.closest(".sort");

  if (element.classList.contains("sorted")) {
    element.classList.remove("sorted");
  } else {
    sort.querySelectorAll(".sortBtn").forEach((btn) => {
      btn.classList.remove("sorted");
    });
    element.classList.add("sorted");
  }

  if (
    element.classList.contains("sort-increase") &&
    element.classList.contains("sorted")
  ) {
    sortIncreament(pageId);
  } else if (
    element.classList.contains("sort-decrease") &&
    element.classList.contains("sorted")
  ) {
    sortDecrement(pageId);
  } else {
    let pageContainer = document
      .getElementById(pageId)
      .querySelector(".products");
    productManager.displayProductsToUI(
      pageContainer.id,
      productManager.getProductsByCategory(category)
    );
  }
}

// Hàm sắp xếp giá tăng dần
function sortIncreament(pageId) {
  const page = document.getElementById(pageId);
  const productContainer = page.querySelector(".products");
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
}

// Hàm sắp xếp giá giảm dần
function sortDecrement(pageId) {
  const page = document.getElementById(pageId);
  const productContainer = page.querySelector(".products");
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
}

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
  let parent = activeElement.closest(".sort");
  // Xóa class "sorted" khỏi tất cả các nút
  parent
    .querySelectorAll(".sortBtn")
    .forEach((btn) => btn.classList.remove("sorted"));

  // Thêm class "sorted" vào nút được bấm
  activeElement.classList.add("sorted");
}
