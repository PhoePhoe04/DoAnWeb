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
