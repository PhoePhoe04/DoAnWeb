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
