var totalPrice = 0 ;
orders = [];
user = {};
const boughtProductList = [];
const pattern = /[^\d]/g; // Không phải là số
const pattern1 =/dung lượng: /i// dung lượng: chữ hoa và chữ thường
const pattern2 = /ram: /i//ram: chữ hoa và chữ thường
/* Hàm tạo dòng mới trong table giỏ hàng */
function getInforProduct(productDiv, a) {
  const productName = productDiv.querySelector(a).textContent;
  //Tìm sản phẩm trong giỏ hàng
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
        <div id="storage">Dung Lượng: ${product.storage}</div>
        <div id="ram">Ram: ${product.ram}</div>
      </div>
    </div>`
    vnMoney = product.price.toLocaleString("vi-VN") + " VNĐ";
    cellPrice.textContent = vnMoney;
    cellQuantity.innerHTML = `<div class="control_quantity">
      <button>-</button>
      <div class="quantity">1</div>
      <button>+</button>
    </div>`
    cellTotalPrice.textContent = vnMoney;
    cellDelete.innerHTML = `<div class="deleteRow">Xoá</div>`
    totalPrice += parseInt(product.price);
    user.totalPrice = totalPrice;
  }
}
//Xoá dòng trong table của giỏ hàng và cập nhập lại tổng số tiền
document.addEventListener("click", function (event) {
  if (event.target.matches(".deleteRow")) {
    const row = event.target.closest("tr");
    const productData = row.cells[0].querySelector("div");
    const productName = productData.querySelector("div").textContent;
    const product = productManager.productList.find(
      (p) => p.name === productName
    );

    if (product) {
      const quantity = parseInt(row.cells[2].querySelector(".quantity").textContent);
      const price = parseInt(product.price);
      totalPrice -= price * quantity;
      vnMoney = totalPrice.toLocaleString("vi-VN") + " VNĐ";
      document.querySelector("#totalCost").textContent = vnMoney;
      user.totalPrice = totalPrice;
    }

    row.remove();
  }
});
/* Tăng giảm số lượng sản phẩm trong giỏ hàng và cập nhật lại tổng số tiền */
document.addEventListener("click", function (event) {
  if (event.target.matches(".control_quantity button")) {
    const isIncrement = event.target.textContent === "+";
    const row = event.target.closest("tr");
    const quantityDiv = row.querySelector(".quantity");
    let quantity = parseInt(quantityDiv.textContent);
    vnMoney = row.cells[1].textContent;
    number = vnMoney.replace(pattern,"");
    console.log(number);
    
    const price = parseInt(number);
    const productName = row.cells[0].querySelector("div > div").textContent;
    const product = productManager.productList.find((p) => p.name === productName);

    if (isIncrement) {
      if (quantity < product.quantity) {
        quantity++;
      } else {
        alert("Số lượng sản phẩm không đủ");
      }
    } else if (quantity > 1) {
      quantity--;
    }

    quantityDiv.textContent = quantity;
    user.quanity = quantity;
    row.cells[3].textContent = (price * quantity).toLocaleString("vi-VN")+" VNĐ";

    totalPrice = Array.from(document.querySelectorAll("#cart tr"))
      .slice(1)
      .reduce((sum, row) => {
        const rowQuantity = parseInt(row.querySelector(".quantity").textContent);
        return sum + rowQuantity * price;
      }, 0);
    vnMoney = totalPrice.toLocaleString("vi-VN") + " VNĐ";
    document.querySelector("#totalCost").textContent = vnMoney;
    user.totalPrice = totalPrice;
  }
});
//Nhấn nút mua ngay để bỏ sản phẩm vào giỏ hàng
// Vời điều kiện đã đăng nhập
document.addEventListener("click", function (event) {
  if (event.target.matches(".muaNgay")) {
    if (sessionStorage.getItem("loggedInUser") == null) {
      alert("Bạn phải đăng nhập vô Website mới được mua hàng");
    } else {
      const productDiv = event.target.closest(".product");
      getInforProduct(productDiv, ".productName");
      alert("Bạn đã thêm sản phẩm vào giỏ hàng thành công");
      vnMoney = totalPrice.toLocaleString("vi-VN") + " VNĐ";
      document.querySelector("#totalCost").textContent = vnMoney;
    }
  }
});

returnToMainPage = () => {
  document.querySelector("#shopping_cart_page").style.display = "none";
  document.querySelector(".container.slider-banner").style.display = "block";
  document.querySelectorAll(".container.suggestion").forEach((div) => {
    div.style.display = "block";
  });
};
//Trờ về giao diện chính 
document.querySelectorAll("#return_main_page").forEach((button) => {
  button.onclick = returnToMainPage;
});
/* Nhấn nút giỏ hàng */
document.querySelector(".cart").addEventListener("click", function () {
  document.querySelector("#shopping_cart_page").style.display = "block";
  //điều kiện để xác định giỏ hàng rỗng và có sản phẩm
  if (document.querySelector("#cart").rows.length > 1) {
    document.querySelector("#empty").style.display = "none";
    document.querySelector("#non_empty").style.display = "block";
  }
});
// chuyển thông tin user trong local storage sang from dat hang
xuLyFromdathang = (dataUser) => {
  if (dataUser) {
    var khachHang = JSON.parse(dataUser);
    document.querySelector("#frmdathang #customerName").value = khachHang.username;
    document.querySelector("#customerName").readOnly = true;
    document.querySelector("#frmdathang #customerAddress").value = khachHang.address;
    document.querySelector("#frmdathang #customerAddress").select();
    document.querySelector("#frmdathang #cusPhoneNumber").value = khachHang.phone;
    document.querySelector("#cusPhoneNumber").readOnly = true;
  }
};
//xử lý sự kiện khi tick checkbox trong thanh toán
changeCheckbox = () => {
  if(document.querySelector("#card").checked)
  {
    document.querySelector("#cash").checked = false;
    document.querySelector("#inputBankCard").style.display = "block";
    document.querySelector("#cardNumber").required;
    document.querySelector("#nameOnCard").required;
    document.querySelector("#dateCreated").required;        
  }
  if(document.querySelector("#cash").checked)
    {
      document.querySelector("#card").checked = false;
      document.querySelector("#inputBankCard").style.display = "none";     
    }
};
// xử lỹ sự kiện khi nhấn nút phương thức thanh toán
handlesangUIThanhToan = () => {
  const userName = document.querySelector("#customerName");
  const userAddress = document.querySelector("#customerAddress");
  const userPhone = document.querySelector("#cusPhoneNumber");
  const day = new Date();
  //lưu toàn bộ thông tin cần thiết vào user
  user.name = userName.value;
  user.address = userAddress.value;
  user.phone = userPhone.value;
  user.boughtDate = day;
  document.querySelector("#frmdathang h1").style.display = "none";
  document.querySelector("#frmdathang div").style.display ="none";
  document.querySelector("#sangUIThanhToan").style.display = "none";
  document.querySelector("#frmdathang fieldset").style.display = "block";
  document.querySelector("#card").addEventListener("change",changeCheckbox );
  document.querySelector("#frmdathang").onsubmit = (event) => {
    event.preventDefault();
    const table = document.querySelector("#cart");
    getUserBoughtPhones(table);
    document.querySelector("#khung_dat_hang").style.display = "none";
    const cartTable = document.querySelector("#cart");
    while (cartTable.rows.length > 1) {
      cartTable.deleteRow(1);// xoá toàn bộ dữ liệu trong bảng giỏ hàng
    }
    document.querySelector("#non_empty").style.display = "none";
    document.querySelector("#empty").style.display = "block";
    alert("Đơn hàng của bạn đã được gửi lên Admin");
    document.querySelector("#empty h1").textContent = "Chào mừng bạn trở lại cửa hàng của chúng tui";
    document.querySelector("#readOrderHistory").style.display = "block";
    document.querySelector("#empty h1").textContent = "Chào Mừng Bạn Trờ Lại Cửa Hàng Chúng Tôi"
    document.querySelector("#empty #firstP").textContent = "Giỏ hàng của bạn đang trống";
    document.querySelector("#empty #secondP").textContent = "Chúng tui có nhiều điện thoại tuyệt vời dành cho bạn";
    createOrderHistoryButton();
  };
}
//tạo dòng mới trong bảng Lịch sử mua hàng
createNewRowOH = (sp, data) => {
  const newRow = document.createElement("tr");
  
  newRow.innerHTML = `<td>
    <img src="${sp.img}" alt="${sp.id}" width="80" height="80"/>
    <div>${sp.name}</div>
      <div class="detailPhone">
        <div id="storage">Dung Lượng: ${sp.storage}</div>
        <div id="ram">Ram: ${sp.ram}</div>
      </div>
  </td>
  <td>${sp.quantity}</td>
  <td>${sp.totalPrice}</td>`;
  data.appendChild(newRow);
};
//tạo lịch sử đơn hàng
createOrderHistoryButton = () => {
  const emptyContainer = document.querySelector("#empty");
  const button = document.querySelector("#readOrderHistory");
  //Khi người dùng nhấn xem lịch sử mua hàng
  button.addEventListener("click", () => {
    document.querySelector("#readOrderHistory").style.display = "none";
    document.querySelector("#empty img").style.display = "none";
    document.querySelector("#empty h1").textContent = "Xem Lịch Sử Mua Hàng"
    document.querySelectorAll("#empty p").forEach(div => {
      div.style.display = "none";
    })
    document.querySelector("#return_main_page").style.display = "none";
    const orderHistory = document.createElement("table");
    orderHistory.id = "orderHistory";
    orderHistory.innerHTML = `<tr>
      <th>Thông tin điện thoại</th>
      <th>Số lượng</th>
      <th>Giá tiền</th>
    </tr>`;
    boughtProductList.forEach(bought => {
      createNewRowOH(bought, orderHistory);
    });
    emptyContainer.appendChild(orderHistory);
    const closeButton = document.createElement("button");
    closeButton.textContent = "Đóng";
    closeButton.addEventListener("click", () => {
      orderHistory.remove();
      closeButton.remove();
      document.querySelector("#empty img").style.display = "block";
      document.querySelector("#empty h1").style.display = "block";
      document.querySelectorAll("#empty p").forEach(div => {
        div.style.display = "block";
      })
      document.querySelector("#xacNhanThanhToan").remove();
      document.querySelector("#return_main_page").style.display = "block";
      document.querySelector("#readOrderHistory").style.display = "block";
    });
    emptyContainer.appendChild(closeButton);
    const infor = document.createElement("div");
    infor.textContent = `${user.name} đã thanh toán ${user.totalPrice.toLocaleString("vi-VN")} VNĐ`;
    infor.id = "xacNhanThanhToan";
    infor.style.fontSize = "2rem";
    emptyContainer.appendChild(infor);
  });
  emptyContainer.appendChild(button);
};
//lấy toàn bộ dữ liệu điện thoại đã mua của khách hàng lưu vào local storage
getUserBoughtPhones = (table) => {
  const rows = table.querySelectorAll("tr"); 

  rows.forEach((row, index) => {
    if (index === 0) return; // Skip the header row
    const cells = row.querySelectorAll("td");
    const imgElement = cells[0].querySelector("div > img");
    const nameElement = cells[0].querySelector("div > div");
    const storageElement = cells[0].querySelector("div > .detailPhone > #storage");
    const ramElement = cells[0].querySelector("div > .detailPhone > #ram");
    const boughtProduct = {
      img: imgElement ? imgElement.src : "",
      id: imgElement ? imgElement.alt : "",
      name: nameElement ? nameElement.textContent : "",
      storage: storageElement ? storageElement.textContent.replace(pattern1, "") : "",
      ram: ramElement ? ramElement.textContent.replace(pattern2,"") : "",
      quantity: cells[2].querySelector(".control_quantity > .quantity") ? cells[2].querySelector(".control_quantity > .quantity").textContent : "0",
      totalPrice: cells[3].textContent
    };
    boughtProductList.push(boughtProduct);

  user.boughtProducts = boughtProductList;
  orders.push(user);
  localStorage.setItem("orders", JSON.stringify(orders));
});}
//xử lý sự kiện sau khi người dùng nhấn đặt hàng
document.querySelector("#dat_hang").addEventListener("click", () => {
  document.querySelector("#khung_dat_hang").style.display = "block";
  const dataUser = sessionStorage.getItem("loggedInUser");
  xuLyFromdathang(dataUser);
  document.querySelector("#sangUIThanhToan").addEventListener("click",(event) => {
    event.preventDefault();
    handlesangUIThanhToan();
  });
  //Nhấn nút X
  document.querySelector("#khung_dat_hang img").addEventListener("click", () => {
    document.querySelector("#khung_dat_hang").style.display = "none";
  })
});
//Nếu khách hàng xoá hết toàn bộ dòng trong giỏ hàng thì cho sang giao diện empty
const cartObserver = new MutationObserver(function (mutationsList, observer) {
  if (document.querySelector("#cart").rows.length == 1) {
    document.querySelector("#non_empty").style.display = "none";
    document.querySelector("#empty").style.display = "flex";
  }
});

cartObserver.observe(document.querySelector("#cart"), { childList: true, subtree: true });
