function showMoreProducts() {
  const items = document.querySelectorAll(
    ".products .product:nth-child(n + 7)"
  );
  const button = document.getElementById("showMoreBtn");

  items.forEach((item) => {
    item.style.display = item.style.display === "none" ? "block" : "none";
  });

  // Thay đổi văn bản nút dựa trên trạng thái hiển thị
  button.textContent =
    button.textContent === "Hiển thị thêm" ? "Thu gọn" : "Hiển thị thêm";
}
// su kien gio hang
document.querySelector(".cart").addEventListener("click", () => {
  document.querySelector(".container.slider-banner").style.display = "none";
  document.querySelectorAll(".container.suggestion").forEach((div) => {
    div.style.display = "none";
  });
  document.querySelector(".main").innerHTML = `
  <h1 id="gio_hang">Giỏ hàng của bạn</h1>
  <div id="bang_gh">
    <div id="phone_area">
      <div>Điện thoại</div>
      <hr>
      <div></div>
    </div>
    <div id="price_area">
      <div>Đơn giá</div>
      <hr>
      <div>VNĐ</div>
    </div> 
    <div id="quantity_area">
      <div>Số lượng</div>
      <hr>
      <div id="control_quantity">
        <button>-</button>
        <div id="quantity">0</div>
        <button>+</button>
      </div>
    </div>
    <div id="total_area">
      <div>Tổng tiền</div>
      <hr>
      <div>VNĐ</div>
    </div>
  </div>`;
});

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
    page.classList.remove("active");
    page.classList.add("section");
  });

  // Tìm phần tử có id trùng với pageId và thêm class 'active'
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
    targetPage.classList.remove("section");
  }
}
