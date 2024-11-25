var totalPrice = 0;
var orders = JSON.parse(localStorage.getItem("orders")) || [];
user = {};
var boughtProductList = [];
const pattern = /[^\d]/g; // Không phải là số
const pattern1 = /dung lượng: /i; // dung lượng: chữ hoa và chữ thường
const pattern2 = /ram: /i; // ram: chữ hoa và chữ thường
var payedByCard = 0; // nguoi mua tra tien bang the ngan hang

/* Hàm tạo dòng mới trong table giỏ hàng */
function getInforProduct(productDiv, a) {
  const productName = productDiv.querySelector(a).textContent;
  const product = productManager.productList.find((p) => p.name === productName);
  if (product) {
    const table = document.querySelector("#cart");
    const newRow = table.insertRow();
    const cellData = newRow.insertCell(0);
    const cellPrice = newRow.insertCell(1);
    const cellQuantity = newRow.insertCell(2);
    const cellTotalPrice = newRow.insertCell(3);
    const cellDelete = newRow.insertCell(4);

    cellData.innerHTML = `
      <div>
        <img src="${product.img}" alt="${product.id}" width="80" height="80"/>
        <div>${product.name}</div>
        <div class="detailPhone">
          <div id="storage">Dung Lượng: ${product.storage}</div>
          <div id="ram">Ram: ${product.ram}</div>
        </div>
      </div>`;
    vnMoney = product.price.toLocaleString("vi-VN") + " VNĐ";
    cellPrice.textContent = vnMoney;
    cellQuantity.innerHTML = `
      <div class="control_quantity">
        <button>-</button>
        <div class="quantity">1</div>
        <button>+</button>
      </div>`;
    cellTotalPrice.textContent = vnMoney;
    cellDelete.innerHTML = `<div class="deleteRow">Xoá</div>`;
    totalPrice += parseInt(product.price);
    user.totalPrice = totalPrice;
  }
}

// Xoá dòng trong table của giỏ hàng và cập nhập lại tổng số tiền
document.addEventListener("click", function (event) {
  if (event.target.matches(".deleteRow")) {
    const row = event.target.closest("tr");
    const productData = row.cells[0].querySelector("div");
    const productName = productData.querySelector("div").textContent;
    const product = productManager.productList.find((p) => p.name === productName);

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

// Tăng giảm số lượng sản phẩm trong giỏ hàng và cập nhật lại tổng số tiền
document.addEventListener("click", function (event) {
  if (event.target.matches(".control_quantity button")) {
    const isIncrement = event.target.textContent === "+";
    const row = event.target.closest("tr");
    const quantityDiv = row.querySelector(".quantity");
    let quantity = parseInt(quantityDiv.textContent);
    let vnMoney = row.cells[1].textContent;
    let number = vnMoney.replace(pattern, "");

    const price = parseInt(number);
    const productName = row.cells[0].querySelector("div > div").textContent;
    const product = productManager.productList.find((p) => p.name === productName);

    if (isIncrement) {
      if (quantity < product.quantity) {
        quantity++;
        totalPrice += price
      } else {
        alert("Số lượng sản phẩm không đủ");
      }
    } else if (quantity > 1) {
      quantity--;
      totalPrice -= price;
    }

    quantityDiv.textContent = quantity;
    row.cells[3].textContent = (price * quantity).toLocaleString("vi-VN") + " VNĐ";

    
    
    vnMoney = totalPrice.toLocaleString("vi-VN") + " VNĐ";
    document.querySelector("#totalCost").textContent = vnMoney;
    user.totalPrice = totalPrice;
  }
});

// Nhấn nút mua ngay để bỏ sản phẩm vào giỏ hàng với điều kiện đã đăng nhập
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


/* Nhấn nút giỏ hàng */
document.querySelector(".cart").addEventListener("click", function () {
  document.querySelector("#shopping_cart_page").style.display = "block";
  if (document.querySelector("#cart").rows.length > 1) {
    document.querySelector("#empty").style.display = "none";
    document.querySelector("#non_empty").style.display = "block";
  }
});

// Xử lý sự kiện khi tick checkbox trong thanh toán
changeCheckbox = () => {
  if (document.querySelector("#cash").checked) {
    document.querySelector("#card").checked = false;
    document.querySelector("#inputBankCard").style.display = "none";
    document.querySelector("#cardNumber").required = false;
    document.querySelector("#nameOnCard").required = false;
    document.querySelector("#dateCreated").required = false;
  }
};
// Tính tổng số tiền trong bảng orderHistory
function calculateTotalOrderPrice() {
  const orderHistoryTable = document.querySelector("#orderHistory");
  let total = 0;
  if (orderHistoryTable) {
    const rows = orderHistoryTable.querySelectorAll("tr");
    rows.forEach((row, index) => {
      if (index === 0) return; // Skip the header row
      const priceCell = row.cells[2];
      const priceText = priceCell.textContent.replace(pattern, "");
      const price = parseInt(priceText);
      total += price;
    });
  }
  return total;
}
function createOrderHistory(){
  const emptyContainer = document.querySelector("#empty");
  var button = document.querySelector("#readOrderHistory");
  if(!button){
    const readOrderHistoryButton = document.createElement("button");
    readOrderHistoryButton.id = "readOrderHistory";
    readOrderHistoryButton.textContent = "Xem Lịch Sử Mua Hàng";
    emptyContainer.appendChild(readOrderHistoryButton);
    button = readOrderHistoryButton;
  }
  button.addEventListener("click", () => {
    document.querySelector("#readOrderHistory").style.display = "none";
    document.querySelector("#empty img").style.display = "none";
    document.querySelector("#empty h1").textContent = "Xem Lịch Sử Mua Hàng";
    document.querySelectorAll("#empty p").forEach((div) => {
      div.style.display = "none";
    });
  const newTable = document.createElement("table");
  newTable.id = "orderHistory";
  newTable.innerHTML = `
    <table>
      <tr>
          <th>ID</th>
          <th>Khách hàng</th>
          <th>Ngày lập</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Xem thông tin sản phẩm</th>
      </tr>
    </table>
  `;
  emptyContainer.appendChild(newTable);
});
}
// Lấy toàn bộ dữ liệu điện thoại đã mua của khách hàng lưu vào local storage
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
      ram: ramElement ? ramElement.textContent.replace(pattern2, "") : "",
      quantity: cells[2].querySelector(".control_quantity > .quantity") ? cells[2].querySelector(".control_quantity > .quantity").textContent : "0",
      totalPrice: cells[3].textContent
    };
    boughtProductList.push(boughtProduct);
  });
  const orderId = `ORD${String(orders.length + 1).padStart(3, '0')}`;
  const userName = document.querySelector("#customerName");
  const userAddress = document.querySelector("#customerAddress");
  const userPhone = document.querySelector("#cusPhoneNumber");
  const day = new Date();
  user.id = orderId;
  user.name = userName.value;
  user.address = userAddress.value;
  user.phone = userPhone.value;
  user.boughtDate = day;
  user.boughtProducts = boughtProductList;
  orders.push(user);
  localStorage.setItem("orders", JSON.stringify(orders));
boughtProductList=[];
}
// Xử lý sự kiện sau khi người dùng nhấn đặt hàng
document.querySelector("#dat_hang").addEventListener("click", () => {
  document.querySelector("#khung_dat_hang").style.display = "block";
  document.querySelector("#khung_dat_hang").style.overflow = "hidden";
  const dataUser = sessionStorage.getItem("loggedInUser");
  if (dataUser) {
    var khachHang = JSON.parse(dataUser);
    const a = document.querySelector("#frmdathang #customerAddress");
    const b = document.querySelector("#frmdathang #cusPhoneNumber");
    document.querySelector("#frmdathang #customerName").value = khachHang.username;
    document.querySelector("#customerName").readOnly = true;
    a.value = khachHang.address;
    b.value = khachHang.phone;
    a.required = true;
    b.required = true;
  }
});
// Nhấn nút X
document.querySelector("#dong_dat_hang").addEventListener("click", () => {
  document.querySelector("#khung_dat_hang").style.display = "none";
});
//Kiem tra thong tin dat hang truoc khi submit from
function validatePhoneNumber()
{
  const phonePattern = /[0-9]{10}/;
  const userPhone = document.querySelector("#cusPhoneNumber").value;

  if (!phonePattern.test(userPhone)) {
    alert("Số điện thoại không đúng định dạng");
    return false;
  }

  const table = document.querySelector("#cart");
  getUserBoughtPhones(table);

  document.querySelector("#frmdathang").style.display = "none";
}
document.querySelector("#frmdathang").onsubmit = (event) => {
  event.preventDefault();
  return validatePhoneNumber();
};
document.querySelector("#cash").addEventListener("change", () => {
  if (document.querySelector("#cash").checked) {
    document.querySelector("#inputBankCard").style.display = "none";
    document.querySelector("#cardNumber").required = false;
    document.querySelector("#nameOnCard").required = false;
    document.querySelector("#dateCreated").required = false;
  }
  if(document.querySelector("#card").checked)
  {
    document.querySelector("#inputBankCard").style.display = "block";
    document.querySelector("#cardNumber").required = true;
    document.querySelector("#nameOnCard").required = true;
    document.querySelector("#dateCreated").required = true;
    payedByCard ++;
  }
});

document.querySelector("#card").addEventListener("change", () => {
  if(document.querySelector("#card").checked)
  {
    document.querySelector("#inputBankCard").style.display = "block";
    document.querySelector("#cardNumber").required = true;
    document.querySelector("#nameOnCard").required = true;
    document.querySelector("#dateCreated").required = true;
    payedByCard ++;
  }
  if (document.querySelector("#cash").checked) {
    document.querySelector("#inputBankCard").style.display = "none";
    document.querySelector("#cardNumber").required = false;
    document.querySelector("#nameOnCard").required = false;
    document.querySelector("#dateCreated").required = false;
  }
});
//Kiem tra thong tin thanh toan truoc khi submit from
function validatePayedByCard(){
  if (payedByCard > 0) {
    const tenInTrenThe = document.querySelector("#nameOnCard");
    const soThe = document.querySelector("#cardNumber");
    const ngaylapthe = document.querySelector("#dateCreated");
    if (!pattern.test(tenInTrenThe.value) || pattern.test(soThe.value)) {
      alert("Tên in trên thẻ phải là chữ hoặc số thẻ phải là số");
      return false;
    }
    const patternDate = /(0[1-9]|1[0-2])\/\d{2}/; // thang/name(2 ky tu)
    if(!patternDate.test(ngaylapthe.value)){
      alert("Ngày trên thẻ không hợp lệ");
      return false;
    }
  }
  const cartTable = document.querySelector("#cart");
  while (cartTable.rows.length > 1) {
    cartTable.deleteRow(1); // Xoá toàn bộ dữ liệu trong bảng giỏ hàng
  } document.querySelector("#frmdathang").style.display = "block";
  document.querySelector("#khung_dat_hang").style.display = "none";
  document.querySelector("#non_empty").style.display = "none";
  document.querySelector("#empty").style.display = "block";
alert("Đơn hàng của bạn đã được gửi lên admin");
document.querySelector("#empty h1").textContent = "Chào mừng bạn trở lại cửa hàng của chúng tui";
  document.querySelector("#empty h1").textContent = "Chào Mừng Bạn Trờ Lại Cửa Hàng Chúng Tôi";
  document.querySelector("#empty #firstP").textContent = "Giỏ hàng của bạn đang trống";
  document.querySelector("#empty #secondP").textContent = "Chúng tui có nhiều điện thoại tuyệt vời dành cho bạn";
  totalPrice = 0;
  document.querySelector("#frmthanhtoan").reset();
}
document.querySelector("#frmthanhtoan").onsubmit = (event) =>{
  event.preventDefault();
  return validatePayedByCard();
}
// Nếu khách hàng xoá hết toàn bộ dòng trong giỏ hàng thì cho sang giao diện empty
const cartObserver = new MutationObserver(function () {
  if (document.querySelector("#cart").rows.length == 1) {
    document.querySelector("#non_empty").style.display = "none";
    document.querySelector("#empty").style.display = "flex";
  }
});

cartObserver.observe(document.querySelector("#cart"), { childList: true, subtree: true });
