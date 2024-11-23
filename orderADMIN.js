function displayOrder() {
    let orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = "";
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log(orders); // Kiểm tra dữ liệu
    if (orders.length === 0) {
        orderTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Không có đơn hàng nào</td></tr>`;
        return;
    }
    orders.forEach((order, index) => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${order.id}</td>
            <td>${order.user}</td>
            <td>${order.date}</td>
            <td>${order.phone}</td>
            <td>${order.address}</td>
            <td class="details-action">
                <button onclick="checkBill(${index})">
                    <i class="fa-solid fa-x"></i>
                </button>
            </td>
            <td style="width:100px; text-align:center;">
                <a class="lnkSua lnkChiTiet" id="btnChiTiet${index}" 
                   data-id="${index}" data-trangthai="0" title="Xem chi tiết" 
                   href="#" onclick="handleDetailClick(event, ${index})">
                   Chi tiết
                </a>
            </td>
        `;
        orderTableBody.appendChild(newRow);
    });
}

function checkBill(index) {
    // Lấy nút mà người dùng đã nhấp vào
    const button = document.querySelector(`button[onclick="checkBill(${index})"]`);
    
    if (button) {
        const icon = button.querySelector("i"); // Tìm phần tử <i> trong nút
        if (icon) {
            // Kiểm tra và đổi biểu tượng
            if (icon.classList.contains("fa-x")) {
                alert("Duyệt đơn thành công!");
                icon.classList.remove("fa-x");
                icon.classList.add("fa-check"); // Đổi sang biểu tượng dấu check
            } else if (icon.classList.contains("fa-check")) {
                alert("Hủy duyệt đơn thành công!");
                icon.classList.remove("fa-check");
                icon.classList.add("fa-x"); // Đổi lại nếu cần
            }
        }
    }
}
