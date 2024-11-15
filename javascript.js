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

