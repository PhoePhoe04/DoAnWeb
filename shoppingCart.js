var totalPrice = 0 ;
orders = [];
user = {};
const boughtProductList = [];
function getInforProduct(productDiv, a) {
  const productName = productDiv.querySelector(a).textContent;
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
        <div id="storage">${product.storage}</div>
        <div id="ram">${product.ram}</div>
      </div>
    </div>`
    cellPrice.textContent = product.price;
    cellQuantity.innerHTML = `<div class="control_quantity">
      <button>-</button>
      <div class="quantity">1</div>
      <button>+</button>
    </div>`
    cellTotalPrice.textContent = product.price;
    cellDelete.innerHTML = `<div class="deleteRow">Xoá</div>`
    totalPrice+= product.price;
    user.totalPrice = totalPrice;
  }
}
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
      document.querySelector("#totalCost").textContent = totalPrice;
      user.totalPrice = totalPrice;
    }

    row.remove();
  }
});
document.addEventListener("click", function (event) {
  if (event.target.matches(".control_quantity button")) {
    const isIncrement = event.target.textContent === "+";
    const row = event.target.closest("tr");
    const quantityDiv = row.querySelector(".quantity");
    let quantity = parseInt(quantityDiv.textContent);
    const price = parseInt(row.cells[1].textContent);
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
    row.cells[3].textContent = price * quantity;

    totalPrice = Array.from(document.querySelectorAll("#cart tr"))
      .slice(1)
      .reduce((sum, row) => {
        const rowQuantity = parseInt(row.querySelector(".quantity").textContent);
        const rowPrice = parseInt(row.cells[1].textContent);
        return sum + rowQuantity * rowPrice;
      }, 0);

    document.querySelector("#totalCost").textContent = totalPrice;
    user.totalPrice = totalPrice;
  }
});
document.addEventListener("click", function (event) {
  if (event.target.matches(".product button")) {
    if(sessionStorage.getItem("loggedInUser") == null)
    {
      alert("Bạn phải đăng nhập vô Website mới được mua hàng");
    }else{
      const productDiv = event.target.closest(".product");
      getInforProduct(productDiv,".productName");
      alert("Bạn đã thêm sản phẩm vào giỏ hàng thành công");
      document.querySelector("#totalCost").textContent = totalPrice;
    }
  }
});

returnToMainPage = () => {
  document.querySelector("#shopping_cart_page").style.display = "none";
  document.querySelector(".container.slider-banner").style.display = "block";
  document.querySelectorAll(".container.suggestion").forEach((div) => {
    div.style.display = "block";
  });
  document.querySelector("#iphone-page").style.display = "block";
};
document.querySelectorAll("#return_main_page").forEach((button) => {
  button.onclick = returnToMainPage;
});
document.querySelector(".cart").addEventListener("click", function () {
  document.querySelector(".container.slider-banner").style.display = "none";
  document.querySelectorAll(".container.suggestion").forEach((div) => {
    div.style.display = "none";
  });
  document.querySelector("#iphone-page").style.display = "none";
  document.querySelector("#shopping_cart_page").style.display = "block";
  if (document.querySelector("#cart").rows.length > 1) {
    document.querySelector("#empty").style.display = "none";
    document.querySelector("#non_empty").style.display = "block";
    document.querySelector("#shopping_cart_page").style.overflow = "auto";
  }else{
    document.querySelector("#shopping_cart_page").style.overflow = "hidden";
  }
});
handlePayment = (dataUser) => {
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
handleTransferPayment = (event) => {
  event.preventDefault();
  const userName = document.querySelector("#customerName");
  const userAddress = document.querySelector("#customerAddress");
  const userPhone = document.querySelector("#cusPhoneNumber");
  const day = new Date();
  user.name = userName.value;
  user.address = userAddress.value;
  user.phone = userPhone.value;
  user.boughtDate = day;
  document.querySelector("#frmdathang h1").style.display = "none";
  document.querySelector("#frmdathang div").style.display ="none";
  document.querySelector("#transferPayment").style.display = "none";
  document.querySelector("#frmdathang fieldset").style.display = "block";
  document.querySelector("#card").addEventListener("change",changeCheckbox );
  document.querySelector("#frmdathang").onsubmit = (event) => {
    event.preventDefault();
    const table = document.querySelector("#cart");
    getUserBoughtPhones(table);
    document.querySelector("#khung_dat_hang").style.display = "none";
    const cartTable = document.querySelector("#cart");
    while (cartTable.rows.length > 1) {
      cartTable.deleteRow(1);
    }
    document.querySelector("#non_empty").style.display = "none";
    document.querySelector("#empty").style.display = "block";
    alert("Đơn hàng của bạn đã được gửi lên Admin");
    document.querySelector("#shopping_cart_page").style.overflow = "auto";
    createOrderHistoryButton();
  };
}
createNewRowOH = (sp, data) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `<td>
    <img src="${sp.img}" alt="${sp.id}" width="80" height="80"/>
    <div>${sp.name}</div>
      <div class="detailPhone">
        <div id="storage">${sp.storage}</div>
        <div id="ram">${sp.ram}</div>
      </div>
  </td>
  <td>${sp.quantity}</td>
  <td>${sp.totalPrice}</td>`;
  data.appendChild(newRow);
};
createOrderHistoryButton = () => {
  const emptyContainer = document.querySelector("#empty");
  const button = document.querySelector("#readOrderHistory");
  button.addEventListener("click", () => {
    document.querySelector("#readOrderHistory").style.display = "none";
    document.querySelector("#empty img").style.display = "none";
    document.querySelector("#empty h1").style.display = "none";
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
      document.querySelector("#return_main_page").style.display = "block";
      document.querySelector("#readOrderHistory").style.display = "block";
    });
    emptyContainer.appendChild(closeButton);
  });
  emptyContainer.appendChild(button);
};
getUserBoughtPhones = (table) => {
  const rows = table.querySelectorAll("tr"); // Select all rows in the table

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
      storage: storageElement ? storageElement.textContent : "",
      ram: ramElement ? ramElement.textContent : "",
      quantity: cells[2].querySelector(".control_quantity > .quantity") ? cells[2].querySelector(".control_quantity > .quantity").textContent : "0",
      totalPrice: cells[3].textContent
    };
    boughtProductList.push(boughtProduct);

  user.boughtProducts = boughtProductList;
  orders.push(user);
  localStorage.setItem("orders", JSON.stringify(orders));
});}
document.querySelector("#dat_hang").addEventListener("click", () => {
  document.querySelector("#khung_dat_hang").style.display = "block";
  const shoppingCartPage = document.querySelector("#shopping_cart_page");
  shoppingCartPage.scrollTo(shoppingCartPage.scrollHeight,0);
  document.querySelector("#shopping_cart_page").style.overflow = "hidden";
  const dataUser = sessionStorage.getItem("loggedInUser");
  handlePayment(dataUser);
  document.querySelector("#transferPayment").addEventListener("click", handleTransferPayment(event));
  document.querySelector("#khung_dat_hang img").addEventListener("click", () => {
    document.querySelector("#khung_dat_hang").style.display = "none";
    document.querySelector("#shopping_cart_page").style.overflow = "auto";
  })
});
const cartObserver = new MutationObserver(function (mutationsList, observer) {
  if (document.querySelector("#cart").rows.length == 1) {
    document.querySelector("#non_empty").style.display = "none";
    document.querySelector("#empty").style.display = "flex";
  }
});

cartObserver.observe(document.querySelector("#cart"), { childList: true, subtree: true });
