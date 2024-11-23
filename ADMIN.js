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

let cartQuantity_inputs = document.querySelectorAll('.product-quantity');
    cartQuantity_inputs.forEach(input =>{
        input.addEventListener("change", handle_changeItemQuantity);
    });

function handle_changeItemQuantity(){
    if(isNaN(this.value)|| this.value<0){
        this.value = 0;
    }
    this.value = Math.floor(this.value);
}

document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.querySelector(".circle-avatar");
    const dropdown = document.querySelector(".user-dropdown");
    // Xử lý khi click vào avatar
    avatar.addEventListener("click", (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
        }
    });
    // Ẩn dropdown khi click ra ngoài
    document.addEventListener("click", () => {
        dropdown.style.display = "none";
    });
});


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

// Lấy sản phẩm từ LocalStorage
function getProductsFromLocalStorage() {
    try {
        const products = localStorage.getItem("products");
        return products ? JSON.parse(products) : [];
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm từ LocalStorage", error);
        return [];
    }
}

// Lưu sản phẩm vào LocalStorage
function saveProductsToLocalStorage(products) {
    try {
        localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
        console.error("Lỗi khi lưu sản phẩm vào LocalStorage", error);
    }
}

// Đặt lại form
function resetForm() {
    document.getElementById("Add-id_product").value = "";
    document.getElementById("Add-id_product").readOnly = false; 
    document.getElementById("Add-name_product").value = "";
    document.getElementById("Add-price").value = "";
    document.getElementById("add-quantity").value = "0";
    document.getElementById("Add-detail_Product").value = ""; 
    document.getElementById("select_category").value = "";
    document.getElementById("select_ram").value = "";
    document.getElementById("select_storage").value = "";
    document.getElementById("fileInput").value = "";
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

// Xử lý khi nhấn nút Create hoặc Update
document.getElementById("btn-submit").onclick = function() {
    if (this.innerText === "Create") {
        addNewProduct();
    } else if (this.innerText === "Update") {
        updateProduct();
    }
    resetForm();
};

// Hiển thị danh sách sản phẩm
function displayProducts() {
    let productTableBody = document.getElementById("productTableBody");
    productTableBody.innerHTML = "";  // Xóa nội dung cũ trong bảng
    let products = getProductsFromLocalStorage();  // Lấy sản phẩm từ LocalStorage

    products.forEach((product, index) => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${product.name}</td>
            <td><img src="${product.image}" width="50"></td>
            <td>${product.ram}</td>
            <td>${product.storage}</td>
            <td>${parseInt(product.price).toLocaleString('vi-VN')}đ</td> 
            <td class="details-action">
                <button onclick="editProduct(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="confirmDeleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        productTableBody.appendChild(newRow);  // Thêm dòng mới vào bảng
    });
}

function generateUniqueId() {
    return "P" + Date.now();
}

// Thêm sản phẩm mới
function addNewProduct() {
    let productId = document.getElementById("Add-id_product").value || generateUniqueId(); // Tạo ID nếu rỗng
    let name = document.getElementById("Add-name_product").value;
    let category = document.getElementById("select_category").value;
    let ram = document.getElementById("select_ram").value;
    let storage = document.getElementById("select_storage").value;
    let price = document.getElementById("Add-price").value;
    let detail = document.getElementById("Add-detail_Product").value;
    let quantity = document.getElementById("add-quantity").value;
    let imageFile = document.getElementById("fileInput").files[0];
    // Kiểm tra nếu thông tin không đầy đủ
    if (!name || !category || !ram || !storage || !price || !quantity || !imageFile) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
        return;
    }
    // Kiểm tra xem quantity có phải là số và lớn hơn 0
    if (isNaN(quantity) || quantity <= 0) {
        alert("Số lượng phải là một số và lớn hơn 0.");
        return;
    }
    let products = getProductsFromLocalStorage();
    // Kiểm tra nếu ID sản phẩm đã tồn tại trong LocalStorage
    let existingProduct = products.find(product => product.id === productId);
    if (existingProduct) {
        alert("Sản phẩm với ID này đã tồn tại.");
        return;
    }
    let reader = new FileReader();
    reader.onload = function(event) {
        // Thêm sản phẩm vào danh sách
        products.push({
            id: productId,
            name,
            category,
            ram,
            storage,
            price,
            detail,
            quantity,
            image: event.target.result
        });
        // Lưu sản phẩm vào LocalStorage và hiển thị lại danh sách sản phẩm
        saveProductsToLocalStorage(products);
        displayProducts();
        // Đặt lại form sau khi thêm sản phẩm mới
        resetForm();
        // Chuyển đổi giữa các phần tử
        document.getElementById("containerTable").style.display = "none";
        document.getElementById("recentProducts").style.display = "block";
        // Thông báo thêm sản phẩm thành công
        alert("Thêm sản phẩm thành công!");
    };

    reader.readAsDataURL(imageFile);
}
// Hàm cập nhật sản phẩm
function updateProduct() {
    let productId = document.getElementById("Add-id_product").value;
    let name = document.getElementById("Add-name_product").value;
    let category = document.getElementById("select_category").value;
    let ram = document.getElementById("select_ram").value;
    let storage = document.getElementById("select_storage").value;
    let price = document.getElementById("Add-price").value;
    let detail = document.getElementById("Add-detail_Product").value;
    let quantity = document.getElementById("add-quantity").value;
    let imageFile = document.getElementById("fileInput").files[0];

    // Kiểm tra nếu thông tin không đầy đủ
    if (!productId || !name || !category || !ram || !storage || !price || !quantity) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
        return;
    }

    // Kiểm tra xem quantity có phải là số và lớn hơn 0
    if (isNaN(quantity) || quantity <= 0) {
        alert("Số lượng phải là một số và lớn hơn 0.");
        return;
    }

    // Lấy tất cả sản phẩm từ LocalStorage
    let products = getProductsFromLocalStorage();
    
    // Tìm sản phẩm theo productId
    let product = products.find(p => p.id === productId);  // Dùng find để tìm sản phẩm theo id

    if (!product) {
        alert("Không tìm thấy sản phẩm với ID này.");
        return;
    }

    // Cập nhật thông tin sản phẩm
    product.name = name;
    product.price = price;
    product.category = category;
    product.ram = ram;
    product.storage = storage;
    product.detail = detail;
    product.quantity = quantity;
    // Kiểm tra nếu có hình ảnh mới
    if (imageFile) {
        let reader = new FileReader();
        reader.onload = function(event) {
            product.image = event.target.result;  // Cập nhật hình ảnh
            saveProductsToLocalStorage(products);  // Lưu lại sản phẩm
            displayProducts();  // Hiển thị lại sản phẩm
            resetForm();  // Reset form
            document.getElementById("containerTable").style.display = "none";
            document.getElementById("recentProducts").style.display = "block";
        };
        reader.readAsDataURL(imageFile);
    } else {
        // Nếu không có hình ảnh mới, chỉ cập nhật các thuộc tính khác
        saveProductsToLocalStorage(products);
        displayProducts();
        resetForm();
        document.getElementById("containerTable").style.display = "none";
        document.getElementById("recentProducts").style.display = "block";
    }
}


// Sửa thông tin sản phẩm
function editProduct(index) {
    let products = getProductsFromLocalStorage();
    let product = products[index];
    // Lưu lại index sản phẩm để khi update, biết chính xác sản phẩm nào
    editIndex = index;
    // Cập nhật form với thông tin sản phẩm cần chỉnh sửa
    document.getElementById("Add-id_product").value = product.id;
    document.getElementById("Add-id_product").readOnly = true;
    document.getElementById("Add-name_product").value = product.name;
    document.getElementById("Add-price").value = product.price;
    document.getElementById("select_category").value = product.category || "";
    document.getElementById("select_ram").value = product.ram || "";
    document.getElementById("select_storage").value = product.storage || "";
    document.getElementById("Add-detail_Product").value = product.detail;
    document.getElementById("add-quantity").value = product.quantity || 0;
    // Thay đổi nút từ "Add" thành "Update"
    document.getElementById("btn-submit").innerText = "Update";
    // Hiển thị form cập nhật
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
            <td>${product.ram}</td>
            <td>${product.storage}</td>
            <td>${parseInt(product.price).toLocaleString('vi-VN')}đ</td> 
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
    displayOrder();
    displayStatics();
};