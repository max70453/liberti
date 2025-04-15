// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initCart();
});

// Основные функции для работы с корзиной
const Cart = {
    // Получение товаров из localStorage
    getItems() {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    },

    // Сохранение товаров в localStorage
    saveItems(items) {
        localStorage.setItem('cart', JSON.stringify(items));
        this.updateCartCounter();
    },

    // Добавление товара в корзину
    addItem(product) {
        const items = this.getItems();
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            items.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveItems(items);
        this.showNotification('Товар добавлен в корзину');
    },

    // Удаление товара из корзины
    removeItem(productId) {
        const items = this.getItems().filter(item => item.id !== productId);
        this.saveItems(items);
        this.updateCartDisplay();
    },

    // Изменение количества товара
    updateQuantity(productId, quantity) {
        const items = this.getItems();
        const item = items.find(item => item.id === productId);
        
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveItems(items);
            this.updateCartDisplay();
        }
    },

    // Очистка корзины
    clear() {
        localStorage.removeItem('cart');
        this.updateCartCounter();
        this.updateCartDisplay();
    },

    // Подсчет общей стоимости
    calculateTotal() {
        return this.getItems().reduce((total, item) => {
            let price = 0;
            if (item.price) {
                const priceStr = String(item.price).replace(/[^0-9.-]+/g, '');
                price = parseFloat(priceStr);
                if (isNaN(price)) price = 0;
            }
            const quantity = parseInt(item.quantity) || 1;
            return total + (price * quantity);
        }, 0).toFixed(2);
    },


    // Обновление счетчика товаров в корзине
    updateCartCounter() {
        const counter = document.querySelector('.cart-counter');
        if (counter) {
            const itemsCount = this.getItems().reduce((total, item) => total + item.quantity, 0);
            counter.textContent = itemsCount;
            counter.style.display = itemsCount > 0 ? 'block' : 'none';
        }
    },

    // Показ уведомления
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    },

    // Обновление отображения корзины
    updateCartDisplay() {
        const cartContainer = document.querySelector('.cart-items-container');
        if (!cartContainer) return;

        const items = this.getItems();
        cartContainer.innerHTML = '';

        if (items.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart-message">Ваша корзина пуста</p>';
            return;
        }

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title || ''}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.title || ''}</h3>
                    <p class="cart-item-price">${item.price || 0}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity || 1}" min="1" class="quantity-input" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        // Обновление итоговой суммы
        const totalElement = document.querySelector('.cart-total');
        if (totalElement) {
            console.log(this.calculateTotal());
            
            totalElement.textContent = `Итого: ${this.calculateTotal()} ₽`;
        }

        // Добавление обработчиков событий
        this.addEventListeners();
    },

    // Добавление обработчиков событий для элементов корзины
    addEventListeners() {
        // Обработчики для кнопок изменения количества
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const input = e.target.parentElement.querySelector('.quantity-input');
                const currentQuantity = parseInt(input.value) || 1;
                const newQuantity = e.target.classList.contains('minus') ? Math.max(1, currentQuantity - 1) : currentQuantity + 1;
                input.value = newQuantity;
                this.updateQuantity(productId, newQuantity);
            });
        });

        // Обработчики для полей ввода количества
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = e.target.dataset.id;
                const newQuantity = Math.max(1, parseInt(e.target.value) || 1);
                e.target.value = newQuantity;
                this.updateQuantity(productId, newQuantity);
            });
        });

        // Обработчики для кнопок удаления
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                this.removeItem(productId);
            });
        });
    }
};

// Инициализация корзины
function initCart() {
    // Добавление счетчика корзины в header
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        const counter = document.createElement('span');
        counter.className = 'cart-counter';
        cartIcon.appendChild(counter);
    }

    // Обновление счетчика
    Cart.updateCartCounter();

    // Если мы на странице корзины, отображаем содержимое
    if (window.location.pathname.includes('cart.html')) {
        Cart.updateCartDisplay();
    }

    // Добавление обработчиков для кнопок "Добавить в корзину"
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const product = {
                    id: productCard.dataset.productId,
                    title: productCard.querySelector('.product-title').textContent,
                    price: parseFloat(productCard.querySelector('.product-price').dataset.price),
                    image: productCard.querySelector('.product-image').src
                };
                Cart.addItem(product);
            }
        });
    });
}