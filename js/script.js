// Dữ liệu mẫu cho slider và sản phẩm
const sliderImages = [
    'https://picsum.photos/id/1015/600/300',
    'https://picsum.photos/id/1016/600/300',
    'https://picsum.photos/id/1018/600/300'
];
const products = [
    { id: 1, name: 'Áo thun JS', price: 120000, img: 'https://picsum.photos/id/100/200/150', desc: 'Áo thun chất liệu cotton, in logo JS.' },
    { id: 2, name: 'Sách học JS', price: 90000, img: 'https://picsum.photos/id/101/200/150', desc: 'Sách hướng dẫn lập trình JavaScript cơ bản.' },
    { id: 3, name: 'USB 32GB', price: 150000, img: 'https://picsum.photos/id/102/200/150', desc: 'USB 32GB lưu trữ tiện lợi.' }
];

// --- Slider ---
let currentSlide = 0;
const sliderImg = document.getElementById('sliderImg');
function showSlide(idx) {
    sliderImg.src = sliderImages[idx];
}
document.getElementById('prevBtn').onclick = function() {
    currentSlide = (currentSlide - 1 + sliderImages.length) % sliderImages.length;
    showSlide(currentSlide);
};
document.getElementById('nextBtn').onclick = function() {
    currentSlide = (currentSlide + 1) % sliderImages.length;
    showSlide(currentSlide);
};
showSlide(currentSlide);

// --- Hiển thị sản phẩm ---
const productsDiv = document.getElementById('products');
products.forEach(prod => {
    const prodDiv = document.createElement('div');
    prodDiv.className = 'product';
    prodDiv.innerHTML = `
        <img src="${prod.img}" alt="${prod.name}" style="width:100%;border-radius:6px;">
        <h3>${prod.name}</h3>
        <p>${prod.price.toLocaleString()}đ</p>
        <button onclick="addToCart(${prod.id})">Thêm vào giỏ</button>
        <div class="product-details">
            <strong>Chi tiết:</strong> ${prod.desc}
        </div>
    `;
    // Hiệu ứng hover: show/hide .product-details
    prodDiv.addEventListener('mouseover', function() {
        prodDiv.querySelector('.product-details').style.display = 'block';
    });
    prodDiv.addEventListener('mouseout', function() {
        prodDiv.querySelector('.product-details').style.display = 'none';
    });
    productsDiv.appendChild(prodDiv);
});

// --- Giỏ hàng ---
let cart = [];
window.addToCart = function(id) {
    const prod = products.find(p => p.id === id);
    const found = cart.find(item => item.id === id);
    if (found) found.qty++;
    else cart.push({ ...prod, qty: 1 });
    renderCart();
};
function renderCart() {
    const cartDiv = document.getElementById('cart');
    if (cart.length === 0) {
        cartDiv.innerHTML = '<i>Chưa có sản phẩm nào trong giỏ.</i>';
        return;
    }
    let html = '<ul>';
    let total = 0;
    cart.forEach(item => {
        html += `<li>${item.name} x ${item.qty} = ${(item.price*item.qty).toLocaleString()}đ</li>`;
        total += item.price * item.qty;
    });
    html += `</ul><b>Tổng: ${total.toLocaleString()}đ</b>`;
    cartDiv.innerHTML = html;
}
renderCart();

// --- Form kiểm lỗi ---
const form = document.getElementById('subscribeForm');
form.onsubmit = function(e) {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    if (!name) {
        document.getElementById('nameError').textContent = 'Vui lòng nhập tên.';
        valid = false;
    }
    if (!email) {
        document.getElementById('emailError').textContent = 'Vui lòng nhập email.';
        valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('emailError').textContent = 'Email không hợp lệ.';
        valid = false;
    }
    if (valid) {
        alert('Đăng ký thành công!');
        form.reset();
    }
};

// --- Countdown clock ---
function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) {
            document.getElementById('countdown').textContent = 'Hết khuyến mãi!';
            clearInterval(timer);
            return;
        }
        const h = Math.floor(diff / 1000 / 60 / 60);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        document.getElementById('countdown').textContent = `${h}h ${m}m ${s}s`;
    }
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
}
// Đếm ngược đến 23:59 hôm nay
const now = new Date();
const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
startCountdown(end); 