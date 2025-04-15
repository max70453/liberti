document.addEventListener('DOMContentLoaded', function() {
    const discountForm = document.querySelector('.our_offer .input-group');
    const emailInput = discountForm.querySelector('input[type="text"]');
    const submitButton = discountForm.querySelector('.btn_2');

    // Функция обновления состояния кнопки
    function updateButtonState(isSubscribed) {
        if (isSubscribed) {
            submitButton.style.backgroundColor = '#4CAF50';
            submitButton.textContent = 'Вы подписаны';
            submitButton.disabled = true;
        } else {
            submitButton.style.backgroundColor = '';
            submitButton.textContent = 'Получить скидку';
            submitButton.disabled = false;
        }
    }

    // Проверяем подписку при загрузке страницы
    const subscribers = JSON.parse(localStorage.getItem('discountSubscribers') || '[]');
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail && subscribers.some(sub => sub.email === userEmail)) {
        updateButtonState(true);
    }

    // Проверяем, подписан ли уже пользователь на скидку
    function isSubscribed(email) {
        const subscribers = JSON.parse(localStorage.getItem('discountSubscribers') || '[]');
        return subscribers.some(sub => sub.email === email);
    }

    // Валидация email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Показ уведомления
    function showDiscountNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border-radius: 4px;
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Обработчик отправки формы
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();

        if (!email) {
            showDiscountNotification('Пожалуйста, введите email', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showDiscountNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }

        if (isSubscribed(email)) {
            showDiscountNotification('Вы уже подписаны на скидку', 'error');
            return;
        }

        // Сохраняем подписку
        const subscribers = JSON.parse(localStorage.getItem('discountSubscribers') || '[]');
        subscribers.push({
            email: email,
            date: new Date().toISOString(),
            discountCode: Math.random().toString(36).substr(2, 8).toUpperCase()
        });
        localStorage.setItem('discountSubscribers', JSON.stringify(subscribers));

        // Сохраняем email пользователя
        localStorage.setItem('userEmail', email);
        // Очищаем поле и показываем уведомление
        emailInput.value = '';
        showDiscountNotification('Поздравляем! Ваша скидка 40% активирована!');
        // Обновляем состояние кнопки
        updateButtonState(true);
    });

    // Добавляем стили анимации
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
});
