const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");
const userMenu = document.querySelector(".user-menu");
const usernameDisplay = document.querySelector(".username-display");
const logoutButton = document.querySelector(".btnLogout");
const phoneInput = document.querySelector("#phone");

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});
loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});
function centerLoginModal() {
    wrapper.style.position = 'fixed';  // Đặt vị trí cố định cho form để hiển thị ở trung tâm màn hình
    wrapper.style.top = '50%';        // Căn giữa theo trục Y
    wrapper.style.left = '50%';       // Căn giữa theo trục X
    wrapper.style.transform = 'translate(-50%, -50%)'; // Dịch chuyển để chính giữa màn hình
    wrapper.style.zIndex = '1000';    // Đảm bảo form nằm trên cùng
    wrapper.style.visibility = 'visible'; // Hiển thị form
    wrapper.style.opacity = '1';      // Đặt độ mờ thành hoàn toàn hiển thị
}
function hideLoginModal() {
    wrapper.style.visibility = 'hidden'; // Ẩn form bằng cách thay đổi thuộc tính visibility
    wrapper.style.opacity = '0';        // Làm cho form biến mất với opacity
}
btnPopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
    centerLoginModal();
});
iconClose.addEventListener('click', ()=>{
    loginMessage.innerText = "";
    document.getElementById("loginEmail").value = '';
    document.getElementById("loginPassword").value = '';
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');  
    wrapper.classList.add('active-login');
    hideLoginModal();
});

// Ngăn nhập ký tự không phải số
phoneInput.addEventListener("input", function (event) {
    this.value = this.value.replace(/[^0-9]/g, ""); // Xóa tất cả ký tự không phải số
});

// Lắng nghe sự kiện đăng ký
document.querySelector(".register .btn").addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn hành động mặc định của form
    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const repassword = document.querySelector("#repassword").value;
    const address = document.querySelector("#address").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    // Kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        alert("Email phải có định dạng xxx@gmail.com.");
        return;
    }
    // Kiểm tra mật khẩu
    if (password !== repassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
    }
    // Lấy danh sách khách hàng từ localStorage
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    if (customers.some(customer => customer.email === email)) {
        alert("Email đã tồn tại.");
        return;
    }
    // Thêm khách hàng mới
    const newCustomer = {
        username,
        email,
        password,
        address,
        phone,
        locked: false,
    };
    customers.push(newCustomer);
    // Lưu vào localStorage
    localStorage.setItem("customers", JSON.stringify(customers));
    // Hiển thị thông báo thành công
    alert("Đăng ký thành công!");
    // Reset form đăng ký
    document.querySelector(".register form").reset();
    // Chuyển về form đăng nhập (ẩn form đăng ký)
    document.querySelector(".wrapper").classList.remove("active"); // Loại bỏ lớp `active` để hiển thị form đăng nhập
    document.querySelector(".wrapper").classList.add("active-popup"); // Đảm bảo rằng wrapper sẽ mở khi chuyển
});

loginButton.addEventListener("click", function (event) {
    event.preventDefault(); // Ngừng hành động mặc định của form
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
        loginMessage.innerText = "Vui lòng điền đầy đủ thông tin.";
        loginMessage.style.color = "red";
        return;
    }
    if (email === "admin" && password === "123456") {
        // Nếu tài khoản là admin, chuyển hướng đến trang ADMIN.html
        window.location.href = "indexADMIN.html"; 
        return;
    }
    // Kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        loginMessage.innerText = "Định dạng email không hợp lệ.";
        loginMessage.style.color = "red";
        return;
    }
    // Kiểm tra tài khoản trong localStorage
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const user = customers.find(customer => customer.email === email);
    if (user) {
        if (user.password === password) {
            if (user.locked) {
                loginMessage.innerText = "Tài khoản của bạn đã bị khóa.";
                loginMessage.style.color = "red";
                setTimeout(() => {
                    logout();
                }, 1000);
                return;
            }
    
            // Đăng nhập thành công
            loginMessage.innerText = "Đăng nhập thành công!";
            loginMessage.style.color = "green";
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
            usernameDisplay.textContent = user.username;
            userMenu.style.display = "inline-flex";  // Hiển thị menu người dùng
            btnPopup.style.display = "none";  // Ẩn nút Login

            // Tự động đóng form và reload lại trang
            setTimeout(() => {
                wrapper.classList.remove("active-popup"); // Đóng form
                location.reload(); // Reload lại trang để chuyển về giao diện người dùng
            }, 1000); // Thực hiện sau 1 giây (500ms)
        } else {
            loginMessage.innerText = "Mật khẩu không chính xác.";
            loginMessage.style.color = "red";
        }
    } else {
        loginMessage.innerText = "Email không tồn tại.";
        loginMessage.style.color = "red";
        document.getElementById("loginEmail").value = '';
        document.getElementById("loginPassword").value = '';
    }    
});

// Xử lý đăng xuất
logoutButton.addEventListener("click", function () {
    // Xóa thông tin người dùng khỏi sessionStorage
    sessionStorage.removeItem("loggedInUser");
    //Sử dụng hàm này để ẩn nút xem lịch sử mua hàng
    checkOrderHistory();
    // Ẩn menu người dùng
    userMenu.style.display = "none";
    // Hiển thị lại nút Login
    btnPopup.style.display = "inline-block";
    // Làm sạch form đăng nhập
    document.getElementById("loginEmail").value = '';
    document.getElementById("loginPassword").value = '';
    // Ẩn thông báo "Đăng nhập thành công"
    loginMessage.innerText = '';
    loginMessage.style.color = '';
    // Cập nhật lại giao diện sau khi đăng xuất
    alert("Đã đăng xuất thành công.");
});
window.onload = function() {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        // Kiểm tra nếu tài khoản trong sessionStorage vẫn còn trong localStorage
        const customers = JSON.parse(localStorage.getItem("customers")) || [];
        const userInLocalStorage = customers.find(customer => customer.email === user.email);
        if (userInLocalStorage) {
            if (userInLocalStorage.locked) {
                // Nếu tài khoản bị khóa, tự động đăng xuất
                alert("Tài khoản của bạn đã bị khóa");
                logout();
            } else {
                // Nếu tài khoản vẫn hoạt động, hiển thị thông tin người dùng
                usernameDisplay.textContent = user.username;
                userMenu.style.display = "inline-flex"; // Hiển thị menu người dùng
                btnPopup.style.display = "none"; // Ẩn nút Login
            }
        } else {
            // Nếu tài khoản không còn trong localStorage, đăng xuất người dùng
            logout();
        }
    } else {
        // Nếu không có tài khoản trong sessionStorage, quay về form đăng nhập
        userMenu.style.display = "none";
        btnPopup.style.display = "inline-block";
        loginMessage.innerText = '';
        loginMessage.style.color = '';
    }
};