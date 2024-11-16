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
btnPopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click', ()=>{
    loginMessage.innerText = "";
    document.getElementById("loginEmail").value = '';
    document.getElementById("loginPassword").value = '';
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');  
    wrapper.classList.add('active-login');
});

// Ngăn nhập ký tự không phải số
phoneInput.addEventListener("input", function (event) {
    this.value = this.value.replace(/[^0-9]/g, ""); // Xóa tất cả ký tự không phải số
});

// Lắng nghe sự kiện đăng ký
document.querySelector(".register .btn").addEventListener("click", function (event) {
    event.preventDefault(); // Dừng hành động mặc định của form

    // Lấy dữ liệu từ các input
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

    // Kiểm tra xem email đã tồn tại chưa
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    if (customers.some((customer) => customer.email === email)) {
        alert("Email đã tồn tại.");
        return;
    }

    // Mã hóa mật khẩu
    const encryptedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

    // Lưu thông tin khách hàng
    customers.push({
        username,
        email,
        password: encryptedPassword,
        address,
        phone,
    });
    localStorage.setItem("customers", JSON.stringify(customers));

    // Hiển thị thông báo thành công
    alert("Đăng ký thành công!");

    // Chuyển về form đăng nhập sau 2 giây
    setTimeout(() => {
        document.querySelector(".register form").reset(); // Xóa dữ liệu trong form đăng ký
        document.querySelector(".wrapper").classList.remove("active"); // Chuyển về form login
    }, 500);
});

// Xử lý đăng nhập
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

    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const user = customers.find(customer => customer.email === email);

    if (user) {
        const encryptedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
        if (encryptedPassword === user.password) {
            // Đăng nhập thành công
            loginMessage.innerText = "Đăng nhập thành công!";
            loginMessage.style.color = "green";
            
            // Lưu thông tin người dùng vào sessionStorage
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));

            // Cập nhật menu người dùng
            usernameDisplay.textContent = user.username;
            userMenu.style.display = "inline-flex"; // Hiển thị menu người dùng

            // Ẩn nút Login và hiện thị thông tin người dùng
            btnPopup.style.display = "none";

            // Đợi 2 giây trước khi đóng form login
            setTimeout(() => {
                wrapper.classList.remove("active-popup"); // Đóng form login
            }, 500); 
        } else {
            loginMessage.innerText = "Mật khẩu không chính xác.";
            loginMessage.style.color = "red";
        }
    } else {
        loginMessage.innerText = "Email không tồn tại.";
        loginMessage.style.color = "red";

        // Xóa các trường đã nhập trong form login nếu email không tồn tại
        document.getElementById("loginEmail").value = '';
        document.getElementById("loginPassword").value = '';
    }
});

// Xử lý đăng xuất
logoutButton.addEventListener("click", function () {
    // Xóa thông tin người dùng khỏi sessionStorage
    sessionStorage.removeItem("loggedInUser");

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
            // Nếu tài khoản vẫn còn trong localStorage, hiển thị thông tin người dùng
            usernameDisplay.textContent = user.username;

            // Hiển thị menu người dùng
            userMenu.style.display = "inline-flex";

            // Ẩn nút Login
            btnPopup.style.display = "none";
        } else {
            // Nếu tài khoản không còn trong localStorage, đăng xuất người dùng
            sessionStorage.removeItem("loggedInUser");
            userMenu.style.display = "none";
            btnPopup.style.display = "inline-block";

            // Làm sạch form đăng nhập
            document.getElementById("loginEmail").value = '';
            document.getElementById("loginPassword").value = '';

            // Ẩn thông báo đăng nhập
            loginMessage.innerText = '';
            loginMessage.style.color = '';

            alert("Tài khoản của bạn đã bị xóa. Vui lòng đăng nhập lại.");
        }
    } else {
        // Nếu không có tài khoản trong sessionStorage, quay về form đăng nhập
        userMenu.style.display = "none";
        btnPopup.style.display = "inline-block";
        loginMessage.innerText = '';
        loginMessage.style.color = '';
    }
};