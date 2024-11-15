const wrapper = document.querySelector('.wrapper');
const dangnhapLink = document.querySelector('.dangnhap-link');
const dangkyLink = document.querySelector('.dangky-link');

dangkyLink.addEventListener('click', ()=> {
  wrapper.classList.add('active');
});
dangnhapLink.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
});