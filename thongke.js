// Hàm chuyển đổi ngày thành định dạng "dd/mm/yyyy"
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    var year = date.getFullYear();
    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
}

document.getElementById('filterButton').addEventListener('click', function () {
    // Lấy giá trị từ các trường ngày
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;

    // Kiểm tra xem người dùng đã chọn ngày hợp lệ chưa
    if (startDate && endDate) {
        displayStatics(); // Nếu đã chọn ngày, gọi hàm displayStatics
        document.getElementById('staticsTable').style.display = "table"; // Hiển thị bảng thống kê
    } else {
        // Nếu không có ngày đầu hoặc ngày cuối, ẩn bảng thống kê
        document.getElementById('staticsTable').style.display = "none";
    }
});

function displayStatics() {
    // Lấy giá trị từ các trường ngày và loại sản phẩm
    var startDate = new Date(document.getElementById("startDate").value);
    var endDate = new Date(document.getElementById("endDate").value);
    var selectedProductType = document.getElementById("productType").value;

    let staticsTableBody = document.getElementById("staticsTableBody");
    staticsTableBody.innerHTML = ""; // Xóa dữ liệu cũ
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let totalAmount = 0; // Tổng giá tiền
    let totalQuantity = 0; // Tổng số lượng
    let productMap = {}; // Lưu trữ sản phẩm để gộp

    // Lọc và xử lý dữ liệu
    orders.forEach((order) => {
        let orderDate = new Date(order.boughtDate);

        order.boughtProducts.forEach((product) => {
            // Kiểm tra điều kiện lọc
            if (
                (!isNaN(startDate) && orderDate < startDate) || // Nếu có startDate và ngày mua < startDate
                (!isNaN(endDate) && orderDate > endDate) || // Nếu có endDate và ngày mua > endDate
                (selectedProductType && product.productType !== selectedProductType) // Nếu chọn loại sản phẩm và không khớp
            ) {
                return; // Bỏ qua các sản phẩm không phù hợp
            }

            // Chuyển đổi totalPrice từ chuỗi sang số
            let numericTotalPrice = parseInt(
                product.totalPrice.replace(/[^0-9]/g, "") // Loại bỏ ký tự không phải số
            );

            // Gộp sản phẩm giống nhau
            if (productMap[product.name]) {
                productMap[product.name].quantity += parseInt(product.quantity);
                productMap[product.name].totalPrice += numericTotalPrice;
            } else {
                productMap[product.name] = {
                    img: product.img,
                    date: formatDate(orderDate),
                    quantity: parseInt(product.quantity),
                    totalPrice: numericTotalPrice,
                };
            }

            // Tính tổng số lượng và giá tiền
            totalQuantity += parseInt(product.quantity);
            totalAmount += numericTotalPrice;
        });
    });

    // Hiển thị sản phẩm trong bảng
    for (let productName in productMap) {
        let product = productMap[productName];
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${productName}</td>
            <td><img src="${product.img}" width="50"></td>
            <td>${product.date}</td>
            <td>${product.quantity}</td>
            <td>${product.totalPrice.toLocaleString("vi-VN")} đ</td>
        `;
        staticsTableBody.appendChild(newRow);
    }

    // Hiển thị tổng giá tiền và tổng số lượng
    const totalAmountRow = document.createElement("tr");
    totalAmountRow.innerHTML = `
        <td colspan="3"><strong>Tổng:</strong></td>
        <td style="color: red"><strong>${totalQuantity}</strong></td>
        <td style="color: red"><strong>${totalAmount.toLocaleString("vi-VN")} đ</strong></td>
    `;
    staticsTableBody.appendChild(totalAmountRow);
}