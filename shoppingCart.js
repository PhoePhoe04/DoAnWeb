var totalPrice = 0 ;
order = [];
user = {};
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
    user.img = product.img;
    user.name = product.name;
    user.storage = product.storage;
    user.ram = product.ram;
    cellData.innerHTML = `<div>
      <img src="${product.img}" alt="${product.id}" width="80" height="80"/>
      <div>${product.name}</div>
      <div class="detailPhone">
        <div>${product.storage}</div>
        <div>${product.ram}</div>
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
  }
});
document.querySelector("#dat_hang").addEventListener("click", () => {
  document.querySelector("#khung_dat_hang").style.display = "block";
  const dataUser = sessionStorage.getItem("loggedInUser");
  if (dataUser) {

    var khachHang = JSON.parse(dataUser);
    document.querySelector("#frmdathang #customerName").value = khachHang.username;
    document.querySelector("#customerName").readOnly = true;
    document.querySelector("#frmdathang #customerAddress").value = khachHang.address;
    document.querySelector("#frmdathang #customerAddress").select();
    document.querySelector("#frmdathang #cusPhoneNumber").value = khachHang.phone;
    document.querySelector("#cusPhoneNumber").readOnly = true;
  }
  document.querySelector("#transferPayment").addEventListener("click", (event) => {
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
    document.querySelector("#card").addEventListener("change", () => {
      if(document.querySelector("#card").checked)
      {
        document.querySelector("#cash").checked = false;
        document.querySelector("#inputBankCard").style.display = "block";
        document.querySelector("#cardNumber").required;
        document.querySelector("#nameOnCard").required;
        document.querySelector("#dateCreated").required;        
      }
    });
    document.querySelector("#frmdathang").onsubmit = () => {
      
    };
  });
  document.querySelector("#khung_dat_hang img").addEventListener("click", () => {
    document.querySelector("#khung_dat_hang").style.display = "none";
  })
});
