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
    //khi giỏ hàng có nhiều hơn hoặc bằng một sản phẩm
    /*document.querySelector(".main").innerHTML = `
  <h1 id="gio_hang">Giỏ hàng của bạn</h1>
  <div id="bang_gh">
    <div>
      <div class="th">Điện thoại</div>
      <hr>
      <div>
        Khong co dien thoai
      </div>
    </div>
    <div>
      <div class="th">Đơn giá</div>
      <hr>
      <div>0VNĐ</div>
    </div> 
    <div>
      <div class="th">Số lượng</div>
      <hr>
      <div id="control_quantity">
        <button class="change_number">-</button>
        <div id="quantity">0</div>
        <button class="change_number">+</button>
      </div>
    </div>
    <div>
      <div class="th">Tổng tiền</div>
      <hr>
      <div>0VNĐ</div>
    </div>
  </div>`;
  document.querySelectorAll(".change_number").forEach(button => {
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
  }); */
  //Khi không có sản phẩm nào.
  document.querySelector(".main").innerHTML = `
  <div id="page_sc">
    <div id="empty_cart">
      <img src="./assets/img/logo-img/empty_cart.png" width="280" height="280"></img>
      <div id="empty_cart_info">
        <h1>Bạn chưa mua sản phẩm của cửa hàng chúng tôi</h1>
        <p>Bạn hãy tiếp tục mua sắm.</p>
        <p>Bạn sẽ tìm được chiếc điện thoại yêu thích của mình.</p>
      </div>
    </div>
    <div id="suggest_phone">
      <h1>Gợi ý những điện thoại nên mua</h3>
      <div class="phone_area">
        <img src="./assets/item/ip16.jpg" width="100" height="100"></img>
        <div class="phone_data">
          <div class="phone_name">Iphone 16 Pro Max</div>
          <div>50000000VNĐ</div>
        </div>
      </div>
      <div class="phone_area">
        <img src="./assets/item/ip15.jpg" width="100" height="100"></img>
        <div class="phone_data">
          <div class="phone_name">Iphone 15 Pro Max</div>
          <div>30000000VNĐ</div>
        </div>
      </div>
      <div class="phone_area">
        <img src="./assets/item/ip14.jpg" width="100" height="100"></img>
        <div class="phone_data">
          <div class="phone_name">Iphone 14 Pro Max</div>
          <div>28000000VNĐ</div>
        </div>
      </div>
    </div> 
  </div> `;
});
