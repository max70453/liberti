document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины в локальном хранилище
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));    
    }
    
    // Обновление счетчика корзины при загрузке страницы
    updateCartCount();

    // Обработчик формы подписки
    const subscriptionForm = document.querySelector('.subscription-form form');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[placeholder="Введите свое имя"]');
            const emailInput = this.querySelector('input[placeholder="Введите свой email"]');
            
            if (!nameInput.value.trim()) {
                showNotification('Пожалуйста, введите ваше имя', 'error');
                return;
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Проверка на существующую подписку
            const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
            if (subscribers.some(sub => sub.email === emailInput.value)) {
                showNotification('Вы уже подписаны на рассылку', 'error');
                return;
            }
            
            // Сохранение подписки
            subscribers.push({
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                date: new Date().toISOString()
            });
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
            
            // Очистка формы и уведомление
            this.reset();
            showNotification('Спасибо за подписку на рассылку!', 'success');
        });
    }

    // Обработка кнопок добавления в корзину в слайдере
    const sliderAddToCartButtons = document.querySelectorAll('.owl-carousel .add_cart');
    sliderAddToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productItem = this.closest('.single_product_item');
            const productData = {
                id: Math.random().toString(36).substr(2, 9),
                name: productItem.querySelector('h4').textContent,
                price: productItem.querySelector('h3').textContent,
                image: productItem.querySelector('img').src
            };
            addToCart(productData);
            showNotification('Товар добавлен в корзину');
        });
    });

    // Обработка секции "Эксклюзивные кровати Либерти"
    const productSection = document.querySelector('.product-section');
    if (productSection) {
        const products = productSection.querySelectorAll('.product-item');

        products.forEach(product => {
            // Анимация при наведении
            product.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'transform 0.3s ease';
            });

            product.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });

            // Обработка клика по продукту
            product.addEventListener('click', function(e) {
                e.preventDefault();
                const productData = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: this.querySelector('.product-title').textContent,
                    price: this.querySelector('.product-price').textContent,
                    image: this.querySelector('.product-thumbnail').src
                };

                showProductModal(productData);
            });
        });
    }
});

// Функция для отображения модального окна с информацией о продукте
function showProductModal(product) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body row">
                <div class="wrap col-6">
                    <div class="modal-image-container">
                        <img src="${product.image}" alt="${product.name}" class="modal-product-image">
                    </div>
                    <div>
                        <ul>
                            <li><strong>Мягкое изголовье</strong></li>
                            <li><strong>Oтсутствие острых углов</strong></li>
                            <li><strong>Замена ножек</strong></li>
                            <li><strong>Съемный чехол</strong></li>
                            <li><strong>Подъемный механизм</strong></li>
                            <li><strong>Долговечные газлифты</strong></li>
                            <li><strong>Надёжный и безопасный механизм</strong></li>
                        </ul>
                    </div>
                </div>
                <div class="modal-details-container col-6">
                    <h3>${product.name}</h3>
                    <p class="description">
                        Выбирая кровать, мы обращаем внимание на три ключевых момента: 
                        красота, надежность и удобство. Кровать должна эстетично выглядеть 
                        и хорошо вписываться в интерьер комнаты. Она должна быть сделана 
                        из безопасных современных материалов, иметь качественную сборку.
                    </p>
                    <p class="price"><strong>${product.price}</strong></p>
                    <button class="btn btn-primary add-to-cart">Добавить в корзину</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Стили для модального окна
    const styles = document.createElement('style');
    styles.textContent = `
        .product-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            max-width: 700px; /* Увеличена максимальная ширина */
            width: 90%;
            position: relative;
            display: flex; /* Используем flexbox для контента */
            flex-direction: column; /* Элементы в столбец по умолчанию */
        }
        .modal-body {
            display: flex; /* Используем flexbox для тела модального окна */
            align-items: flex-start; /* Выравнивание элементов по верху */
            gap: 20px; /* Пространство между изображением и деталями */
            width: 100%;
        }
        .modal-image-container {
            flex: 1; /* Занимает доступное пространство */
            max-width: 50%; /* Ограничиваем ширину контейнера изображения */
        }
        .modal-product-image {
            max-width: 100%;
            height: auto;
            display: block; /* Убираем лишние отступы */
        }
        .modal-details-container {
            flex: 1; /* Занимает доступное пространство */
            max-width: 50%; /* Ограничиваем ширину контейнера деталей */
            text-align: left; /* Выравнивание текста по левому краю */
        }
        .modal-details-container h3 {
            margin-top: 0; /* Убираем верхний отступ у заголовка */
        }
        .modal-details-container .price {
            font-size: 1.2em; /* Увеличиваем размер шрифта цены */
            margin-bottom: 15px;
        }
        .modal-details-container .description {
            margin-bottom: 15px;
            color: #666; /* Цвет текста описания */
            font-size: 0.9em;
        }
        .close-modal {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 24px;
            cursor: pointer;
            line-height: 1;
        }
        /* Адаптивность для маленьких экранов */
        @media (max-width: 600px) {
            .modal-body {
                flex-direction: column; /* Элементы в столбец на маленьких экранах */
                align-items: center; /* Центрируем элементы */
                text-align: center; /* Центрируем текст */
            }
            .modal-image-container,
            .modal-details-container {
                max-width: 100%; /* Занимают всю ширину */
            }
             .modal-details-container {
                text-align: center; /* Центрируем текст в деталях */
            }
        }
    `;
    document.head.appendChild(styles);

    // Обработчики событий для модального окна
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => {
        modal.remove();
        styles.remove();
    };

    const addToCartBtn = modal.querySelector('.add-to-cart');
    addToCartBtn.onclick = () => {
        addToCart(product);
        modal.remove();
        styles.remove();
        showNotification('Товар добавлен в корзину');
    };
}

// Функция добавления товара в корзину
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Функция обновления счетчика корзины
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Функция обновления счетчика товаров в корзине
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.querySelector('.cart-counter');
    if (cartCounter) {
        cartCounter.textContent = cart.length;
    }
}

// Функция показа уведомления
// Функция валидации email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    const styles = document.createElement('style');
    styles.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            animation: slideIn 0.5s ease-out;
            z-index: 2000;
            font-size: 14px;
        }
        .notification.success {
            background: #28a745;
        }
        .notification.error {
            background: #dc3545;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
        styles.remove();
    }, 3000);
}