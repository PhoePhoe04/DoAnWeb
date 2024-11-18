let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');
let editIndex = null;

toggle.onclick = function() {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}
    
let list = document.querySelectorAll('.navigation li');
function activeLink(){
    list.forEach((item) => item.classList.remove('hovered'));
    this.classList.add('hovered');
}
        
// Biến lưu trữ mục đang được click
let currentActiveItem = null;
// Xử lý hover effect
function activeLink() {
    if (!this.classList.contains('active')) {
        this.classList.add('hovered');
    }
}

list.forEach((item) => item.addEventListener('mouseover', activeLink));
// Xử lý click vào các mục trong navigation
list.forEach((item) => {
    item.addEventListener('click', function() {
        // Nếu mục này đã là 'active', double-click sẽ loại bỏ lớp 'active'
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            currentActiveItem = null; // Không có mục nào đang 'active'
        } else {
            // Nếu có mục trước đó, loại bỏ lớp 'active' và 'hovered'
            if (currentActiveItem) {
                currentActiveItem.classList.remove('active');
                currentActiveItem.classList.remove('hovered');
            }
            // Thêm lớp 'active' cho mục hiện tại
            this.classList.add('active');
            // Cập nhật mục hiện tại
            currentActiveItem = this;
        }
    });
});
// Xử lý khi chuột rời khỏi các mục
list.forEach((item) => {
    item.addEventListener('mouseout', function() {
        if (!this.classList.contains('active')) {
            this.classList.remove('hovered');
        }
    });
});
// Sử dụng một hàm chung để hiển thị các phần recent
function showSection(sectionId) {
    const sections = ["recentProducts", "recentCustomer", "recentOrder", "recentStatics"];
    sections.forEach(id => {
        document.getElementById(id).style.display = id === sectionId ? "block" : "none";
    });
}

// Gán sự kiện click cho các liên kết navigation
document.getElementById("productLink").addEventListener("click", () => showSection("recentProducts"));
document.getElementById("customerLink").addEventListener("click", () => showSection("recentCustomer"));
document.getElementById("orderLink").addEventListener("click", () => showSection("recentOrder"));
document.getElementById("staticsLink").addEventListener("click", () => showSection("recentStatics"));

// Hiển thị danh sách sản phẩm từ LocalStorage
function displayProducts() {
    let productTableBody = document.getElementById("productTableBody");
    productTableBody.innerHTML = "";
    let products = getProductsFromLocalStorage();
    products.forEach((product, index) => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${product.name}</td>
            <td><img src="${product.image}" width="50"></td>
            <td>${product.configuration}</td>
            <td>${product.price}đ</td>
            <td class="details-action">
                <button onclick="editProduct(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="confirmDeleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        productTableBody.appendChild(newRow);
    });
}
// Lấy sản phẩm từ LocalStorage
function getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("products")) || [];
}
// Lưu sản phẩm vào LocalStorage
function saveProductsToLocalStorage(products) {
    localStorage.setItem("products", JSON.stringify(products));
}
// Xử lý nút Add New
document.getElementById("btnAddNew").onclick = function() {
    document.getElementById("recentProducts").style.display = "none";  
    document.getElementById("containerTable").style.display = "block";
    document.getElementById("btn-submit").innerText = "Create";  
    resetForm();  // Đặt lại form khi thêm sản phẩm mới
};
// Xử lý nút Exit
document.getElementById("btn-exit").onclick = function() {
    document.getElementById("containerTable").style.display = "none";
    document.getElementById("recentProducts").style.display = "block";
    resetForm();
};
// Hàm thêm sản phẩm mới
function addNewProduct() {
    let name = document.getElementById("Add-name_product").value;
    let price = document.getElementById("Add-price").value;
    let category = document.getElementById("select_category").value;
    let configuration = document.getElementById("Add-configuration_product").value;
    let imageFile = document.getElementById("fileInput").files[0];

    if (!name || !price || !category || !configuration || !imageFile) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
        return;
    }

    let products = getProductsFromLocalStorage();
    let reader = new FileReader();
    reader.onload = function(event) {
        products.push({ 
            name, 
            price, 
            category, 
            configuration, 
            image: event.target.result 
        });
        saveProductsToLocalStorage(products);
        displayProducts();
        resetForm();
        document.getElementById("containerTable").style.display = "none";
        document.getElementById("recentProducts").style.display = "block";
    };
    reader.readAsDataURL(imageFile);
}

      
// Hàm cập nhật sản phẩm
function updateProduct() {
    let name = document.getElementById("Add-name_product").value;
    let price = document.getElementById("Add-price").value;
    let category = document.getElementById("select_category").value;
    let configuration = document.getElementById("Add-configuration_product").value;
    let imageFile = document.getElementById("fileInput").files[0];

    if (!name || !price || !category || !configuration) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
        return;
    }

    let products = getProductsFromLocalStorage();
    let product = products[editIndex];
    product.name = name;
    product.price = price;
    product.category = category;
    product.configuration = configuration;

    if (imageFile) {
        let reader = new FileReader();
        reader.onload = function(event) {
            product.image = event.target.result;
            saveProductsToLocalStorage(products);
            displayProducts();
            resetForm();
            document.getElementById("containerTable").style.display = "none";
            document.getElementById("recentProducts").style.display = "block";
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveProductsToLocalStorage(products);
        displayProducts();
        resetForm();
        document.getElementById("containerTable").style.display = "none";
        document.getElementById("recentProducts").style.display = "block";
    }
}

// Xử lý khi nhấn nút Create hoặc Update
document.getElementById("btn-submit").onclick = function() {
    if (this.innerText === "Create") {
        addNewProduct();
    } else if (this.innerText === "Update") {
        updateProduct();
    }
};
// Đặt lại form
function resetForm() {
    document.getElementById("Add-name_product").value = "";
    document.getElementById("Add-price").value = "";
    document.getElementById("select_category").value = "";
    document.getElementById("Add-configuration_product").value = "";
    document.getElementById("fileInput").value = "";
}
// Sửa thông tin sản phẩm
function editProduct(index) {
    let products = getProductsFromLocalStorage();
    let product = products[index];
    editIndex = index;

    document.getElementById("Add-name_product").value = product.name;
    document.getElementById("Add-price").value = product.price;
    document.getElementById("select_category").value = product.category || "";
    document.getElementById("Add-configuration_product").value = product.configuration || "";
    document.getElementById("btn-submit").innerText = "Update";

    document.getElementById("recentProducts").style.display = "none";  
    document.getElementById("containerTable").style.display = "block";
}
// Xóa sản phẩm
function updatePagination() {
    const products = getProductsFromLocalStorage();
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    displayPaginatedProducts();
}

function confirmDeleteProduct(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        let products = getProductsFromLocalStorage();
        products.splice(index, 1);
        saveProductsToLocalStorage(products);
        updatePagination(); // Cập nhật phân trang sau khi xóa
    }
}
let currentPage = 1;
const productsPerPage = 6; // Hiển thị 6 sản phẩm mỗi trang

// Hiển thị sản phẩm với phân trang
function displayPaginatedProducts() {
    const products = getProductsFromLocalStorage();
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    
    // Cập nhật chỉ báo trang và trạng thái của các nút
    document.getElementById("pageIndicator").innerText = `Trang ${currentPage} của ${totalPages}`;
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;

    // Cắt mảng sản phẩm để chỉ lấy sản phẩm của trang hiện tại
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);
    
    // Hiển thị các sản phẩm phân trang            
    let productTableBody = document.getElementById("productTableBody");
    productTableBody.innerHTML = ""; // Xóa nội dung hiện tại của bảng

    paginatedProducts.forEach((product, index) => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${product.name}</td>
            <td><img src="${product.image}" width="50"></td>
            <td>${product.configuration}</td>
            <td>${product.price}đ</td>
            <td class="details-action">
                <button onclick="editProduct(${start + index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="confirmDeleteProduct(${start + index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        productTableBody.appendChild(newRow);
    });
}

// Điều khiển phân trang
document.getElementById("prevPage").onclick = function() {
    if (currentPage > 1) {
        currentPage--;
        displayPaginatedProducts();
    }
};
document.getElementById("nextPage").onclick = function() {
    const products = getProductsFromLocalStorage();  
    const totalPages = Math.ceil(products.length / productsPerPage);  
    if (currentPage < totalPages) {  
        currentPage++; 
        displayPaginatedProducts();
    }
}; 

// Khởi tạo hiển thị cả danh sách khách hàng và sản phẩm với phân trang
window.onload = function() {
    displayCustomers();         // Hiển thị danh sách khách hàng
    displayPaginatedProducts(); // Hiển thị sản phẩm với phân trang
};
