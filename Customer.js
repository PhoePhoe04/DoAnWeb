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
            <button onclick="deleteCustomer(${index})" class="delete-btn">Xóa</button>
        </td>
        `;
        customerTableBody.appendChild(newRow);
    });
}

// Hàm xóa khách hàng
function deleteCustomer(index) {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
        let customers = JSON.parse(localStorage.getItem("customers")) || [];
        customers.splice(index, 1); // Xóa khách hàng tại vị trí index
        localStorage.setItem("customers", JSON.stringify(customers));
        displayCustomers(); // Cập nhật lại bảng sau khi xóa
    }
}
