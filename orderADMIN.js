function handleDetailClick(event, index) {
    event.preventDefault(); // Ngừng hành động mặc định của link
    const orderDetailsDiv = document.getElementById('orderDetails' + index);

    // Toggle hiển thị chi tiết
    if (orderDetailsDiv) {
        orderDetailsDiv.style.display = orderDetailsDiv.style.display === 'none' ? 'block' : 'none';
    }
}

function displayOrder() {
    let orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = "";
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        orderTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Không có đơn hàng nào</td></tr>`;
        return;
    }
    orders.forEach((order, index) => {
        let newRow = document.createElement("tr");
        let date = new Date(order.boughtDate);
        let formattedDate = date.toLocaleDateString('vi-VN');
        newRow.innerHTML = `
            <td>${order.id}</td>
            <td>${order.name}</td>
            <td>${formattedDate}</td>
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
        // Tạo phần chi tiết đơn hàng (ẩn theo mặc định)
        const orderDetailsDiv = document.createElement('div');
        orderDetailsDiv.id = 'orderDetails' + index;
        orderDetailsDiv.style.display = 'none';  // Ẩn theo mặc định

        // Hiển thị chi tiết sản phẩm trong đơn hàng
        const orderDetailsContent = document.createElement('div');
        orderDetailsContent.innerHTML = `
            <table class="order-detail-table">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.boughtProducts ? order.boughtProducts.map(item =>{ 
                        var price = item.totalPrice; 
                        var money = price.replace(/^\d/, "");
                        var singlePrice = parseInt(money)/parseInt(item.quantity);
                        let singlePriceFormat = singlePrice.toLocaleString("vi-VN");
                        return `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${singlePriceFormat}</td>
                            <td>${price}</td>
                        </tr>
                    `}).join('') : ''}
                </tbody>
            </table>
        `;
        orderDetailsDiv.appendChild(orderDetailsContent);
        // Thêm phần chi tiết vào bảng
        orderTableBody.appendChild(orderDetailsDiv);
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
