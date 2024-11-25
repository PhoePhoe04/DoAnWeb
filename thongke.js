// Hàm chuyển đổi ngày thành định dạng "dd/mm/yyyy"
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
function displayStatics() {
    let staticsTableBody = document.getElementById("staticsTableBody");
    staticsTableBody.innerHTML = "";
    let statics = JSON.parse(localStorage.getItem("statics")) || [];

    console.log(statics); // Kiểm tra dữ liệu
    statics.forEach((statics) => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${statics.name}</td>
            <td><img src="${statics.image}" width="50"></td>
            <td>${statics.date}</td>
            <td>${statics.quantity}</td>
            <td>${statics.totalPrice.toLocaleString("vi-VN")} đ</td>
        `;
        staticsTableBody.appendChild(newRow);
    });
}
