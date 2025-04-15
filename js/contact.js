document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.untree_co-section form');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    let isSubmitting = false;

    // Функция валидации email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Функция валидации поля
    function validateField(field, errorMessage) {
        const value = field.value.trim();
        if (!value) {
            showError(field, errorMessage);
            return false;
        }
        removeError(field);
        return true;
    }

    // Показать ошибку
    function showError(field, message) {
        removeError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = 'red';
    }

    // Убрать ошибку
    function removeError(field) {
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.style.borderColor = '';
    }

    // Показать уведомление
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '5px';
        notification.style.color = '#fff';
        notification.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
        notification.style.zIndex = '1000';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Обработчик отправки формы
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (isSubmitting) return;

        const fname = this.querySelector('#fname');
        const lname = this.querySelector('#lname');
        const email = this.querySelector('#email');
        const message = this.querySelector('#message');

        // Валидация полей
        const isFirstNameValid = validateField(fname, 'Пожалуйста, введите имя');
        const isLastNameValid = validateField(lname, 'Пожалуйста, введите фамилию');
        const isMessageValid = validateField(message, 'Пожалуйста, введите сообщение');

        // Валидация email
        let isEmailValid = validateField(email, 'Пожалуйста, введите email');
        if (isEmailValid && !isValidEmail(email.value)) {
            showError(email, 'Пожалуйста, введите корректный email');
            isEmailValid = false;
        }

        if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isMessageValid) {
            return;
        }

        // Защита от двойной отправки
        isSubmitting = true;
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        try {
            // Имитация отправки данных на сервер
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Сохранение в localStorage для демонстрации
            const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            contactMessages.push({
                firstName: fname.value,
                lastName: lname.value,
                email: email.value,
                message: message.value,
                date: new Date().toISOString()
            });
            localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

            showNotification('Сообщение успешно отправлено!');
            this.reset();
        } catch (error) {
            showNotification('Произошла ошибка при отправке сообщения', 'error');
        } finally {
            isSubmitting = false;
            submitButton.disabled = false;
            submitButton.textContent = 'Отправить сообщение';
        }
    });

    // Очистка ошибок при вводе
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            removeError(this);
        });
    });
});
