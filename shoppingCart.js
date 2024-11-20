var totalPrice = 0 ;
function getInforProduct(productDiv) {
  const productName = productDiv.querySelector(".productName").textContent;
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
  var i = r.parentNote.parentNote.rowIndex;
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
    const button = event.target;
    const quantityDiv = button.parentElement.querySelector("div");
    const row = button.closest("tr");
    const productName = row.cells[0].textContent;
    const product = productManager.productList.find(
      (p) => p.name === productName
    );

    if (product) {
      let quantity = parseInt(quantityDiv.textContent);
      var price =parseInt(product.price);

      if (button.textContent === "+") {
        if (quantity < product.quantity) {
          quantity++;
          totalPrice += price;
        }
      } else if (button.textContent === "-") {
        if (quantity > 0) {
          quantity--;
          totalPrice -= price;
        }
      }

      quantityDiv.textContent = quantity;
      row.cells[4].textContent = (price * quantity);
      document.querySelector("#totalCost").textContent = totalPrice;
    }
  }
});
document.addEventListener("click", function (event) {
  if (event.target.matches(".product button")) {
    const productDiv = event.target.closest(".product");
    getInforProduct(productDiv);
    alert("Bạn đã thêm sản phẩm vào giỏ hàng thành công");
    document.querySelector("#totalCost").textContent = totalPrice;
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
