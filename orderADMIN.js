// Lấy sản phẩm từ LocalStorage
function getOrdersFromLocalStorage() {
    try {
        const orders = localStorage.getItem("orders");
        return orders ? JSON.parse(orders) : [];
    } catch (error) {
        console.error("Lỗi khi lấy đơn hàng từ LocalStorage", error);
        return [];
    }
}

// Lưu sản phẩm vào LocalStorage
function saveOrdersToLocalStorage(orders) {
    try {
        localStorage.setItem("orders", JSON.stringify(orders));
    } catch (error) {
        console.error("Lỗi khi lưu đơn hàng vào LocalStorage", error);
    }
}
function displayOrder() {
    let orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = "";
    let orders = getOrdersFromLocalStorage();

    orders.forEach((orders, index) => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${orders.id}</td>
            <td>${orders.user}</td>
            <td>${orders.date}</td>
            <td>${orders.phone}</td>
            <td>${orders.address}</td>
            <td class="details-action">
                <button onclick="checkBill(${index})"><i class="fa-solid fa-x"></i></i></button>
            </td>
            <td style="width:100px; float:right; text-align:right;">
                <a class="lnkSua lnkChiTiet" name="btnChiTiet${index}" id="btnChiTiet${index}" 
                   data-id="${index}" data-trangthai="0" title="Xem chi tiết" href="#" 
                   onclick="handleDetailClick(event, ${index})">
                   Chi tiết
                </a>
            </td>
        `;
        orderTableBody.appendChild(newRow);  // Thêm dòng mới vào bảng
    });
}
function checkBill(index) {
    // Hiển thị thông báo duyệt đơn
    alert("Duyệt đơn thành công!");

    // Lấy nút mà người dùng đã nhấp vào
    const button = document.querySelector(`button[onclick="checkBill(${index})"]`);
    
    if (button) {
        const icon = button.querySelector("i"); // Tìm phần tử <i> trong nút
        if (icon) {
            // Kiểm tra và đổi biểu tượng
            if (icon.classList.contains("fa-x")) {
                icon.classList.remove("fa-x");
                icon.classList.add("fa-check"); // Đổi sang biểu tượng dấu X
            } else {
                icon.classList.remove("fa-check");
                icon.classList.add("fa-x"); // Đổi lại nếu cần
            }
        }
    }
}
