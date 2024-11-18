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

// ============================================================ Cart ============================================================

// su kien gio hang
document.querySelector(".cart").addEventListener("click", () => {
  document.querySelector(".container.slider-banner").style.display = "none";
  document.querySelectorAll(".container.suggestion").forEach((div) => {
    div.style.display = "none";
  });
  document.querySelector("#iphone-page").style.display = "none";
    //khi giỏ hàng có nhiều hơn hoặc bằng một sản phẩm 
/*   document.querySelectorAll(".change_number").forEach(button => {
    button.addEventListener("click",() => {
      var i = parseInt(document.querySelector("#quantity").textContent);
      if( button.textContent == "-")
        i -=1;
      if( button.textContent == "+")
        i +=1;
      if(i >= 0)
        document.querySelector("#quantity").textContent = i;
      else
        alert("Số sản phẩm phải lớn hơn hoặc bằng 0");
    });
  });  */
  //Khi giỏ hàng không có sản phẩm nào.
  document.querySelector("#shopping_cart_page").style.display="block";
});
returnToMainPage = () =>{
  document.querySelector("#shopping_cart_page").style.display="none";
  document.querySelector(".container.slider-banner").style.display = "block";
  document.querySelectorAll(".container.suggestion").forEach((div) => {
    div.style.display = "block";
  });
  document.querySelector("#iphone-page").style.display = "block";
  document.querySelector("#sc_top").style.display="none";
};
document.querySelector("#return_main_page").onclick = returnToMainPage;
// Lưu toàn bộ thông tin điện thoại vào localStorage
const productImg = document.querySelectorAll(".productImg img");
const productName = document.querySelectorAll(".productName");
const productDetail = document.querySelectorAll(".productDetail");
const productPrice = document.querySelectorAll(".productPrice");
getInfor = (mangA, a, i) => {
  var thongtin;
  if(a == "img"){
    thongtin = 1;
  } else{
    thongtin = (a == "detail")? 2:3;
  }
  mangA.forEach(A => {
    if (thongtin == 3) {
      localStorage.setItem(`${a}${i}`, A.textContent);
    }else if (thongtin == 1) {
      localStorage.setItem(`${a}${i}`, A.src);
    } else {
      
    }
    i++;
  });
};
themGioHang = () => {
  
};

// +++++++++++++++++++++++++++++++++++ OOP +++++++++++++++++++++++++++++++++++
class Product {
  constructor(type, id, img, name, price, quantity) {
    this.type = type;
    this.id = id;
    this.img = img;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
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
            product.quantity
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
      <div class="productQuantity">${product.quantity}</div>
      <button>Mua ngay</button>
      `;
  }

  displayProductsToUI(containerID) {
    const container = document.getElementById(containerID);

    this.productList.forEach((product) => {
      const productDiv = document.createElement("div");

      productDiv.classList.add("product");
      this.displayProduct(productDiv, product);
      container.appendChild(productDiv);
    });
  }

  displayProductsWithType(containerID, type) {
    const container = document.getElementById(containerID);

    this.productList.forEach((product) => {
      if (String(product.type) === String(type)) {
        const productDiv = document.createElement("div");

        productDiv.classList.add("product");
        this.displayProduct(productDiv, product);
        container.appendChild(productDiv);
      }
    });
  }
}

// ==================================================== Products Manager ====================================================
const productManager = new ProductManager();

// const product1 = new Product("iphone", "ipX", "", "iPhone X", 20000000, 20);
// const product2 = new Product("iphone", "ip11", "", "iPhone 11", 20000000, 20);
// const product3 = new Product("iphone", "ip12", "", "iPhone 12", 20000000, 20);
// const product4 = new Product("iphone", "ip13", "", "iPhone 13", 20000000, 20);
// const product5 = new Product("iphone", "ip14", "", "iPhone 14", 20000000, 20);
// const product6 = new Product("iphone", "ip15", "", "iPhone 15", 20000000, 20);
// const product7 = new Product(
//   "samsung",
//   "",
//   "ssS24",
//   "SAMSUNG S24",
//   20000000,
//   20
// );
// const product8 = new Product(
//   "samsung",
//   "",
//   "ssS21",
//   "SAMSUNG S21",
//   20000000,
//   20
// );
// const product9 = new Product(
//   "samsung",
//   "",
//   "ssS20",
//   "SAMSUNG S20",
//   20000000,
//   20
// );
// const product10 = new Product(
//   "samsung",
//   "",
//   "ssS22",
//   "SAMSUNG S22",
//   20000000,
//   20
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

