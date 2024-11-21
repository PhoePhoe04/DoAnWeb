var totalPrice = 0 ;
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
  }
}
deleteRow = (r) => {
  var i = r.parentNode.parentNode.rowIndex;
  const row = document.querySelector("#cart").rows[i];
  const quantity = parseInt(row.cells[2].querySelector(".quantity").textContent);
  const price = parseInt(row.cells[1].textContent);
  totalPrice -= price * quantity;
  document.querySelector("#totalCost").textContent = totalPrice;
  document.querySelector("#cart").deleteRow(i);
}
document.addEventListener("click", function (event) {
  if (event.target.matches(".deleteRow")) {
    const row = event.target.closest("tr");
    const productName = row.cells[0].textContent;
    const product = productManager.productList.find(
      (p) => p.name === productName
    );

    if (product) {
      const quantity = parseInt(row.cells[3].querySelector(".quantity").textContent);
      const price = parseInt(product.price);
      totalPrice -= price * quantity;
      document.querySelector("#totalCost").textContent = totalPrice;
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
    row.cells[3].textContent = price * quantity;

    totalPrice = Array.from(document.querySelectorAll("#cart tr"))
      .slice(1)
      .reduce((sum, row) => {
        const rowQuantity = parseInt(row.querySelector(".quantity").textContent);
        const rowPrice = parseInt(row.cells[1].textContent);
        return sum + rowQuantity * rowPrice;
      }, 0);

    document.querySelector("#totalCost").textContent = totalPrice;
  }
});
document.addEventListener("click", function (event) {
  if (event.target.matches(".product button")) {
    if(sessionStorage.getItem("loggedInUser") == null)
    {
      alert("Bạn phải đăng nhập vô Website mới được mua hàng");
    }else{
      const productDiv = event.target.closest(".product");
      getInforProduct(productDiv, ".productName");
      alert("Bạn đã thêm sản phẩm vào giỏ hàng thành công");
      document.querySelector("#totalCost").textContent = totalPrice;
    }
  }
});
document.addEventListener("click", function (event) {
  if (event.target.matches(".detail-product .btnAddtoCart")) {
    if(sessionStorage.getItem("loggedInUser") == null)
    {
      alert("Bạn phải đăng nhập vô Website mới được mua hàng");
    }else{
      const productDiv = event.target.closest(".detail-product");
      getInforProduct(productDiv,".detailName");
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
    document.querySelector("#frmdathang #customerAddress").value = khachHang.address;
    document.querySelector("#frmdathang #customerAddress").select();
    document.querySelector("#frmdathang #cusPhoneNumber").value = khachHang.phone;
  }
});
document.querySelector("#khung_dat_hang img").addEventListener("click", () => {
  document.querySelector("#khung_dat_hang").style.display = "none";
});
