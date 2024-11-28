var id_order = {};
function handleDetailClick(event, index) {
    event.preventDefault(); // Ngừng hành động mặc định của link
    const orderDetailsDiv = document.getElementById('orderDetails' + index);
    // Toggle hiển thị chi tiết
    if (orderDetailsDiv) {
        orderDetailsDiv.style.display = orderDetailsDiv.style.display === 'none' ? 'block' : 'none';
    }
}

// Thêm sự kiện click cho nút "Xem"
document.getElementById("seeButton").addEventListener("click", function(event) {
    event.preventDefault(); // Ngừng hành động mặc định của nút, ví dụ như submit form nếu có

    // Lấy giá trị từ các input ngày
    const startDate = document.getElementById("startDay").value;
    const endDate = document.getElementById("endDay").value;

    // Kiểm tra nếu ngày hợp lệ
    if (startDate && endDate) {
        // Chuyển đổi thành kiểu Date để so sánh
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc!");
            return;
        }

        // Lọc các đơn hàng trong phạm vi ngày đã chọn
        filterOrdersByDate(start, end);
    } else {
        alert("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.");
    }
});

// Hàm lọc đơn hàng theo ngày
function filterOrdersByDate(start, end) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = "";

    if (orders.length === 0) {
        orderTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Không có đơn hàng nào</td></tr>`;
        return;
    }

    // Lọc đơn hàng theo ngày
    orders.forEach((order, index) => {
        let orderDate = new Date(order.boughtDate); // Chuyển đổi ngày mua thành đối tượng Date

        // Kiểm tra xem ngày mua nằm trong phạm vi không
        if (orderDate >= start && orderDate <= end) {
            // Tiến hành hiển thị các đơn hàng lọc được
            let newRow = document.createElement("tr");
            let formattedDate = orderDate.toLocaleDateString('vi-VN');
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
        }
    });
}

function displayOrder() {
    let orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = "";
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let checkedOrders = JSON.parse(localStorage.getItem("checkedOrder")) || [];

    if (orders.length === 0) {
        orderTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">Không có đơn hàng nào</td></tr>`;
        return;
    }

    orders.forEach((order, index) => {
        id_order[index] = order.id;
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
        orderDetailsDiv.style.display = 'none';
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
                    ${order.boughtProducts.map(item =>{ 
                        var price = item.totalPrice; 
                        var money = price.replace(/[^\d]/g, "");
                        number = parseInt(money);
                        quantity = parseInt(item.quantity);
                        singlePrice =  number / quantity;
                        let singlePriceFormat = singlePrice.toLocaleString("vi-VN")+" VNĐ";
                        return `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>${singlePriceFormat}</td>
                            <td>${price}</td>
                        </tr>
                    `}).join('')}
                </tbody>
            </table>
        `;
        orderDetailsDiv.appendChild(orderDetailsContent);
        // Thêm phần chi tiết vào bảng
        orderTableBody.appendChild(orderDetailsDiv);

        // Kiểm tra trạng thái đã duyệt và thay đổi biểu tượng
        const orderId = order.id;
        const orderIndex = checkedOrders.findIndex(o => o.id === orderId);

        if (orderIndex !== -1 && checkedOrders[orderIndex].mode === "pass") {
            const button = document.querySelector(`button[onclick="checkBill(${index})"]`);
            const icon = button.querySelector("i");
            if (icon) {
                icon.classList.remove("fa-x");
                icon.classList.add("fa-check"); // Đổi sang biểu tượng dấu check
            }
        }
    });
}

function checkBill(index) {
    // Lấy nút mà người dùng đã nhấp vào
    const button = document.querySelector(`button[onclick="checkBill(${index})"]`);
    
    if (button) {
        const icon = button.querySelector("i"); // Tìm phần tử <i> trong nút
        if (icon) {
            let duyetDonHang = JSON.parse(localStorage.getItem("checkedOrder")) || []; // Lấy danh sách các đơn hàng đã duyệt
            
            // Kiểm tra trạng thái hiện tại của nút và thay đổi biểu tượng tương ứng
            const orderId = id_order[index];
            const orderIndex = duyetDonHang.findIndex(order => order.id === orderId);
            
            if (icon.classList.contains("fa-x")) {
                // Nếu biểu tượng là fa-x, duyệt đơn hàng
                alert("Duyệt đơn thành công!");
                icon.classList.remove("fa-x");
                icon.classList.add("fa-check"); // Đổi sang biểu tượng dấu check
                
                // Nếu đơn hàng chưa duyệt, thêm vào mảng
                if (orderIndex === -1) {
                    duyetDonHang.push({ id: orderId, mode: "pass" });
                } else {
                    // Nếu đơn hàng đã tồn tại trong mảng, chỉ cần cập nhật lại trạng thái
                    duyetDonHang[orderIndex].mode = "pass";
                }

            } else if (icon.classList.contains("fa-check")) {
                // Nếu biểu tượng là fa-check, hủy duyệt đơn hàng
                alert("Hủy duyệt đơn thành công!");
                icon.classList.remove("fa-check");
                icon.classList.add("fa-x"); // Đổi lại thành biểu tượng x

                // Nếu đơn hàng đã duyệt, thay đổi trạng thái thành "fail"
                if (orderIndex !== -1) {
                    duyetDonHang[orderIndex].mode = "fail";
                }
            }

            // Lưu lại danh sách các đơn hàng đã duyệt vào localStorage
            localStorage.setItem("checkedOrder", JSON.stringify(duyetDonHang));
        }
    }
}