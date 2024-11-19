function displayCustomers() {
    let customerTableBody = document.getElementById("customerTableBody");
    customerTableBody.innerHTML = "";
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    customers.forEach((customer, index) => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
        <td>${customer.username}</td>
        <td>${customer.email}</td>
        <td>${customer.address}</td>
        <td>${customer.phone}</td>
        <td>
            <button onclick="lockCustomer(${index})" class="lock-btn">${customer.locked ? "Mở khóa" : "Khóa"}</button>
        </td>
        `;
        customerTableBody.appendChild(newRow);
    });
}


function lockCustomer(index) {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    // Lấy khách hàng đã chọn
    let customer = customers[index];
    // Thay đổi trạng thái khóa của tài khoản
    customer.locked = !customer.locked;
    // Lưu lại thông tin khách hàng vào localStorage
    localStorage.setItem("customers", JSON.stringify(customers));
    // Cập nhật lại giao diện
    displayCustomers();
    // Hiển thị thông báo
    if (customer.locked) {
        alert(`Tài khoản ${customer.username} đã bị khóa.`);
    } else {
        alert(`Tài khoản ${customer.username} đã được mở khóa.`);
    }
}

