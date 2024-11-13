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
document.querySelector('.cart').addEventListener('click',() =>{
  document.querySelector('.container.slider-banner').style.display = 'none';
  document.querySelectorAll('.container.suggestion').forEach(div => {
    div.style.display = 'none';
  });
  document.querySelector('.main').innerHTML = `
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
  </div>`
});