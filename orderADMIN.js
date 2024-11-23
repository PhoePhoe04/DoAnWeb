function displayOrder() {
    let orderTableBody = document.getElementById("orderTableBody");
    orderTableBody.innerHTML = "";
    let orders = JSON.parse(localStorage.getItem("orderbill")) || [];

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
            <td></td>
        `;
        orderTableBody.appendChild(newRow);
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
                icon.classList.add("fa-check"); // Đổi sang biểu tượng dấu check
            } else if (icon.classList.contains("fa-check")) {
                icon.classList.remove("fa-check");
                icon.classList.add("fa-x"); // Đổi lại nếu cần
            }
        }
    }
}
