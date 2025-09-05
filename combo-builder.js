// --- LOGIC FOR MOBILE NAVIGATION ---
const header = document.querySelector('header');
const btnMobileNav = document.querySelector('.btn-mobile-nav');

btnMobileNav.addEventListener('click', () => {
    header.classList.toggle('nav-open');
});

// --- LOGIC FOR COMBO BUILDER & SLIDER ---
document.addEventListener('DOMContentLoaded', () => {

    // --- COMBO BUILDER LOGIC ---
    const comboBuilder = document.querySelector('.combo-builder');
    if (comboBuilder) {
        const comboItems = document.querySelectorAll('.combo-item');
        const totalItemsEl = document.getElementById('total-items');
        const originalTotalEl = document.getElementById('original-total');
        const discountAmountEl = document.getElementById('discount-amount');
        const finalPriceEl = document.getElementById('final-price');
        const whatsappLink = document.getElementById('custom-combo-whatsapp-link');
        const phoneNumber = '919526616666';

        const cart = {};

        comboItems.forEach(item => {
            const id = item.dataset.id;
            const minusBtn = item.querySelector('.minus');
            const plusBtn = item.querySelector('.plus');
            const quantityEl = item.querySelector('.quantity');

            cart[id] = {
                name: item.dataset.name,
                price: parseInt(item.dataset.price),
                quantity: 0
            };

            minusBtn.addEventListener('click', () => {
                if (cart[id].quantity > 0) {
                    cart[id].quantity--;
                    updateUI();
                }
            });

            plusBtn.addEventListener('click', () => {
                cart[id].quantity++;
                updateUI();
            });

            function updateItemUI() {
                quantityEl.textContent = cart[id].quantity;
                minusBtn.disabled = cart[id].quantity === 0;
            }
            
            function updateUI() {
                updateItemUI();
                updateSummary();
            }
        });

        function getDiscount(totalQuantity) {
            if (totalQuantity >= 5) return 0.15; // 15% off for 5+
            if (totalQuantity >= 3) return 0.10; // 10% off for 3-4
            if (totalQuantity >= 2) return 0.05; // 5% off for 2
            return 0;
        }

        function updateSummary() {
            let totalItems = 0;
            let originalTotal = 0;

            for (const id in cart) {
                totalItems += cart[id].quantity;
                originalTotal += cart[id].quantity * cart[id].price;
            }

            const discountRate = getDiscount(totalItems);
            const discountAmount = Math.floor(originalTotal * discountRate);
            const finalPrice = originalTotal - discountAmount;

            totalItemsEl.textContent = totalItems;
            originalTotalEl.textContent = `₹${originalTotal}`;
            discountAmountEl.textContent = `- ₹${discountAmount} (${(discountRate * 100).toFixed(0)}%)`;
            finalPriceEl.textContent = `₹${finalPrice}`;

            if (totalItems > 0) {
                whatsappLink.classList.remove('disabled');
                whatsappLink.href = generateWhatsAppLink(finalPrice);
            } else {
                whatsappLink.classList.add('disabled');
                whatsappLink.href = '#';
            }
        }

        function generateWhatsAppLink(finalPrice) {
            let message = "I'd like to order a custom pack:\n\n";
            for (const id in cart) {
                if (cart[id].quantity > 0) {
                    message += `${cart[id].name} x ${cart[id].quantity}\n`;
                }
            }
            message += `\nTotal: ₹${finalPrice}`;
            const encodedMessage = encodeURIComponent(message);
            return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        }
    }

    // --- COMBO SLIDER LOGIC ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        const slides = document.querySelectorAll('.combo-slide');
        const prevButton = document.getElementById('prev-slide');
        const nextButton = document.getElementById('next-slide');
        
        let currentSlide = 0;
        const totalSlides = slides.length;

        function updateSlider() {
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            prevButton.disabled = currentSlide === 0;
            nextButton.disabled = currentSlide === totalSlides - 1;
        }

        nextButton.addEventListener('click', () => {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateSlider();
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
        
        updateSlider();
    }
});