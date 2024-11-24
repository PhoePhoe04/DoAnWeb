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
    return JSON.parse(localStorage.getItem('products')) || [];
}


// Lưu sản phẩm vào LocalStorage
function saveProductToLocalStorage(product) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}


// Đặt lại form
function resetForm() {
    document.getElementById("Add-id_product").value = "";
    document.getElementById("Add-id_product").readOnly = false; 
    document.getElementById("Add-name_product").value = "";
    document.getElementById("Add-price").value = "";
    document.getElementById("add-quantity").value = "0";
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
document.getElementById("btn-submit").onclick = function(event) {
    event.preventDefault();
    // Kiểm tra xem nút hiện tại là "Create" hay "Update"
    if (this.innerText === "Create") {
        addNewProduct(); // Thêm sản phẩm mới
    } else if (this.innerText === "Update") {
        updateProduct(); // Cập nhật sản phẩm
    }
};

function toggleDisplay() {
    document.getElementById("containerTable").style.display = "none";
    document.getElementById("recentProducts").style.display = "block";
    resetForm();
}

class Product {
    constructor(id, name, category, ram, storage, price, quantity, image) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.ram = ram;
        this.storage = storage;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }

}

class ProductManager {
    constructor() {
        this.products = this.loadProductsFromLocalStorage();
    }

    // Lấy sản phẩm từ localStorage
    loadProductsFromLocalStorage() {
        try {
            const storedProducts = localStorage.getItem("products");
            return storedProducts ? JSON.parse(storedProducts) : [];
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm từ LocalStorage", error);
            return [];
        }
    }

    // Lưu sản phẩm vào localStorage
    saveProductsToLocalStorage() {
        try {
            localStorage.setItem("products", JSON.stringify(this.products));
        } catch (error) {
            console.error("Lỗi khi lưu sản phẩm vào LocalStorage", error);
        }
    }

    // Thêm sản phẩm mới
    addProduct(product) {
        this.products.push(product);
        this.saveProductsToLocalStorage(); // Lưu vào localStorage sau khi thêm sản phẩm
    }

    // Cập nhật sản phẩm
    updateProduct(productId, updatedProduct) {
        const productIndex = this.products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            this.products[productIndex] = updatedProduct;
            this.saveProductsToLocalStorage();  // Lưu lại vào localStorage sau khi cập nhật
        }
    }

    // Xóa sản phẩm
    deleteProduct(productId) {
        const productIndex = this.products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProductsToLocalStorage();  // Lưu lại vào localStorage sau khi xóa
        }
    }

    // Lấy tất cả sản phẩm
    getAllProducts() {
        return this.products;
    }
}

const productManager = new ProductManager();

function addNewProduct() {
    const id = document.getElementById('Add-id_product').value;  // Lấy ID từ input
    const name = document.getElementById('Add-name_product').value;
    const category = document.getElementById('select_category').value;
    const ram = document.getElementById('select_ram').value;
    const storage = document.getElementById('select_storage').value;
    const price = document.getElementById('Add-price').value;
    const quantity = document.getElementById('add-quantity').value;
    const imageFile = document.getElementById('fileInput').files[0];

    // Kiểm tra nếu ID đã có sẵn
    const products = productManager.getAllProducts();
    if (products.some(product => product.id === id)) {
        alert("ID này đã tồn tại. Vui lòng chọn ID khác.");
        return;
    }

    // Kiểm tra các trường còn lại
    if (!name || !category || !ram || !storage || !price || !quantity || !imageFile || !id) {
        alert("Please fill in all the fields.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const newProduct = new Product(
            id,
            name,
            category,
            ram,
            storage,
            price,
            quantity,
            event.target.result
        );
        
        productManager.addProduct(newProduct);
        alert("Tạo sản phẩm thành công");
        displayProducts();
        
        // Quay lại trang recentProduct sau 2 giây
        setTimeout(() => {
            toggleDisplay(); 
        }, 500);
    };
    reader.readAsDataURL(imageFile);
}

function editProduct(productId) {
    // Lấy sản phẩm từ localStorage dựa trên id
    const product = productManager.getAllProducts().find(p => p.id === productId);
    if (!product) {
        alert("Không tìm thấy sản phẩm để chỉnh sửa.");
        return;
    }

    // Hiển thị form
    document.getElementById("containerTable").style.display = "block";
    document.getElementById("recentProducts").style.display = "none";
    document.getElementById("btn-submit").innerText = "Update";  // Đổi nút thành Update

    // Điền thông tin sản phẩm vào form
    document.getElementById('Add-id_product').value = product.id;
    document.getElementById('Add-id_product').readOnly = true;  // Không cho sửa ID
    document.getElementById('Add-name_product').value = product.name;
    document.getElementById('Add-price').value = product.price;
    document.getElementById('add-quantity').value = product.quantity;
    document.getElementById('select_category').value = product.category;
    document.getElementById('select_ram').value = product.ram;
    document.getElementById('select_storage').value = product.storage;

    // Lưu trữ thông tin sản phẩm đang sửa để dùng trong hàm cập nhật
    editIndex = productId;
}

function updateProduct() {
    const id = document.getElementById('Add-id_product').value;
    const name = document.getElementById('Add-name_product').value;
    const category = document.getElementById('select_category').value;
    const ram = document.getElementById('select_ram').value;
    const storage = document.getElementById('select_storage').value;
    const price = document.getElementById('Add-price').value;
    const quantity = document.getElementById('add-quantity').value;
    const imageFile = document.getElementById('fileInput').files[0];

    if (!name || !category || !ram || !storage || !price || !quantity || !imageFile) {
        alert("Please fill in all the fields.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const updatedProduct = new Product(
            id,
            name,
            category,
            ram,
            storage,
            price,
            quantity,
            event.target.result
        );

        // Cập nhật sản phẩm trong ProductManager
        productManager.updateProduct(id, updatedProduct);

        // Hiển thị thông báo thành công
        alert("Cập nhật sản phẩm thành công");
        displayPaginatedProducts();
        
        // Quay lại trang recentProduct sau 2 giây
        setTimeout(() => {
            toggleDisplay();
        }, 500);
    };
    reader.readAsDataURL(imageFile);
}

// Hàm xác nhận xóa sản phẩm
function confirmDeleteProduct(productId) {
    console.log("Xóa sản phẩm với id:", productId); // Debug
    const product = productManager.getAllProducts().find(p => String(p.id) === String(productId));
    if (!product) {
        alert("Không tìm thấy sản phẩm để xóa.");
        return;
    }
    
    const confirmation = confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${product.name}?`);
    if (confirmation) {
        // Xóa sản phẩm
        productManager.deleteProduct(product.id);
        // Kiểm tra nếu số lượng sản phẩm đã thay đổi và cần điều chỉnh số trang
        const totalProducts = productManager.getAllProducts().length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        // Nếu trang hiện tại lớn hơn tổng số trang, giảm số trang
        if (currentPage > totalPages) {
            currentPage = totalPages; // Đặt lại trang hiện tại về số trang hợp lệ
        }
        // Cập nhật lại phân trang sau khi xóa sản phẩm
        displayPaginatedProducts();
        alert('Sản phẩm đã bị xóa!');
    }
}

function displayProducts() {
    const products = getProductsFromLocalStorage();
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = ""; // Xóa bảng trước khi hiển thị lại

    products.forEach(product => {
        const newRow = document.createElement('tr');
        newRow.classList.add('newRow');
        newRow.innerHTML = `
            <td>${product.name}</td>
            <td><img src="${product.image}" width="50" alt="${product.name}"></td>
            <td>${product.ram}</td>
            <td>${product.storage}</td>
            <td>${parseInt(product.price).toLocaleString('vi-VN')}đ</td>
            <td class="details-action">
                <button onclick="editProduct('${product.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="confirmDeleteProduct('${product.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        productTableBody.appendChild(newRow);
    });
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

    paginatedProducts.forEach(product => {
        const newRow = document.createElement('tr');
        newRow.classList.add('newRow');
        newRow.innerHTML = `
            <td>${product.name}</td>
            <td><img src="${product.image}" width="50" alt="${product.name}"></td>
            <td>${product.ram}</td>
            <td>${product.storage}</td>
            <td>${parseInt(product.price).toLocaleString('vi-VN')}đ</td>
            <td class="details-action">
                <button onclick="editProduct('${product.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="confirmDeleteProduct('${product.id}')"><i class="fa-solid fa-trash"></i></button>
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
    displayProducts();
    displayCustomers();              // Hiển thị khách hàng
    displayPaginatedProducts();      // Hiển thị sản phẩm với phân trang
    displayOrder();                  // Hiển thị các đơn hàng
    displayStatics();                // Hiển thị thống kê
};
