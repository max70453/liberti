document.addEventListener('DOMContentLoaded', function() {
    // Подключаем маску для телефона
    const phoneMaskScript = document.createElement('script');
    phoneMaskScript.src = 'https://unpkg.com/imask';
    document.head.appendChild(phoneMaskScript);

    // Получаем кнопку обратного звонка
    const callbackBtn = document.getElementById('callbackBtn');
    
    // Функция для инициализации маски телефона
    function initPhoneMask(element) {
        IMask(element, {
            mask: '+{7} (000) 000-00-00'
        });
    }
    
    // Функция валидации формы
    function validateForm(form) {
        let isValid = true;
        form.querySelectorAll('input[required], textarea[required]').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
                if (input.type === 'tel') {
                    // Валидация телефона
                    const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
                    if (!phoneRegex.test(input.value)) {
                        isValid = false;
                        input.classList.add('is-invalid');
                    }
                } else if (input.type === 'email') {
                    // Валидация email
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.classList.add('is-invalid');
                    }
                }
            }
        });
        return isValid;
    }
    
    // Создаем модальное окно
    function createModal() {
        // Создаем элементы модального окна
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.id = 'callbackModal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        // Создаем заголовок модального окна
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        
        const modalTitle = document.createElement('h5');
        modalTitle.className = 'modal-title';
        modalTitle.textContent = 'Заказать обратный звонок';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', closeModal);
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // Создаем тело модального окна с формой
        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        
        const form = document.createElement('form');
        form.id = 'callbackForm';
        
        // Поле для имени
        const nameGroup = document.createElement('div');
        nameGroup.className = 'form-group mb-3';
        
        const nameLabel = document.createElement('label');
        nameLabel.setAttribute('for', 'name');
        nameLabel.textContent = 'Ваше имя:';
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'form-control';
        nameInput.id = 'name';
        nameInput.name = 'name';
        nameInput.required = true;
        
        nameGroup.appendChild(nameLabel);
        nameGroup.appendChild(nameInput);
        
        // Поле для телефона
        const phoneGroup = document.createElement('div');
        phoneGroup.className = 'form-group mb-3';
        
        const phoneLabel = document.createElement('label');
        phoneLabel.setAttribute('for', 'phone');
        phoneLabel.textContent = 'Ваш телефон:';
        
        const phoneInput = document.createElement('input');
        phoneInput.type = 'tel';
        phoneInput.className = 'form-control';
        phoneInput.id = 'phone';
        phoneInput.name = 'phone';
        phoneInput.required = true;
        phoneInput.placeholder = '+7 (___) ___-__-__';
        
        phoneGroup.appendChild(phoneLabel);
        phoneGroup.appendChild(phoneInput);

        // Поле для email
        const emailGroup = document.createElement('div');
        emailGroup.className = 'form-group mb-3';
        
        const emailLabel = document.createElement('label');
        emailLabel.setAttribute('for', 'email');
        emailLabel.textContent = 'Ваш email:';
        
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.className = 'form-control';
        emailInput.id = 'email';
        emailInput.name = 'email';
        emailInput.required = true;
        emailInput.placeholder = 'example@domain.com';
        
        emailGroup.appendChild(emailLabel);
        emailGroup.appendChild(emailInput);
        
        // Поле для сообщения
        const messageGroup = document.createElement('div');
        messageGroup.className = 'form-group mb-3';
        
        const messageLabel = document.createElement('label');
        messageLabel.setAttribute('for', 'message');
        messageLabel.textContent = 'Ваше сообщение:';
        
        const messageInput = document.createElement('textarea');
        messageInput.className = 'form-control';
        messageInput.id = 'message';
        messageInput.name = 'message';
        messageInput.rows = 4;
        messageInput.required = true;
        messageInput.placeholder = 'Опишите ваш вопрос...';
        
        messageGroup.appendChild(messageLabel);
        messageGroup.appendChild(messageInput);
        
        // Поле для выбора времени
        const timeGroup = document.createElement('div');
        timeGroup.className = 'form-group mb-3';
        
        const timeLabel = document.createElement('label');
        timeLabel.setAttribute('for', 'time');
        timeLabel.textContent = 'Удобное время для звонка:';
        
        const timeInput = document.createElement('input');
        timeInput.type = 'text';
        timeInput.className = 'form-control';
        timeInput.id = 'time';
        timeInput.name = 'time';
        timeInput.placeholder = 'Например: с 10:00 до 18:00';
        
        timeGroup.appendChild(timeLabel);
        timeGroup.appendChild(timeInput);
        
        // Кнопка отправки формы
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'btn btn-primary';
        submitButton.textContent = 'Отправить';
        
        // Добавляем все элементы формы
        form.appendChild(nameGroup);
        form.appendChild(phoneGroup);
        form.appendChild(emailGroup);
        form.appendChild(messageGroup);
        form.appendChild(timeGroup);
        form.appendChild(submitButton);
        
        // Обработчик отправки формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(this)) {
                // Защита от спама
                submitButton.disabled = true;
                setTimeout(() => submitButton.disabled = false, 5000);

                // Сбор данных формы
                const formData = {
                    name: nameInput.value,
                    phone: phoneInput.value,
                    email: emailInput.value,
                    message: messageInput.value,
                    time: timeInput.value,
                    timestamp: new Date().toISOString()
                };
                
                // Здесь будет отправка данных на сервер
                console.log('Отправка данных:', formData);
                
                // Показываем уведомление
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.textContent = 'Спасибо! Мы перезвоним вам в ближайшее время.';
                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 3000);
                
                closeModal();
                this.reset();
            }
        });
        
        // Инициализируем маску для телефона
        initPhoneMask(phoneInput);

        modalBody.appendChild(form);
        
        // Собираем модальное окно
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalOverlay.appendChild(modalContent);
        
        return modalOverlay;
    }
    
    // Функция открытия модального окна
    function openModal() {
        // Проверяем, существует ли уже модальное окно
        let modal = document.getElementById('callbackModal');
        
        if (!modal) {
            // Если нет, создаем его
            modal = createModal();
            document.body.appendChild(modal);
        }
        
        // Показываем модальное окно
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
    }
    
    // Функция закрытия модального окна
    function closeModal() {
        const modal = document.getElementById('callbackModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Возвращаем прокрутку страницы
        }
    }
    
    // Добавляем обработчик клика на кнопку
    if (callbackBtn) {
        callbackBtn.addEventListener('click', openModal);
    }
    
    // Добавляем стили для модального окна
    function addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .modal-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                justify-content: center;
                align-items: center;
            }
            
            .modal-content {
                background-color: white;
                border-radius: 5px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                border-bottom: 1px solid #e9ecef;
            }
            
            .modal-title {
                margin: 0;
                font-size: 1.25rem;
            }
            
            .close-button {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                color: #000;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: #28a745;
                color: white;
                padding: 15px 25px;
                border-radius: 4px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                z-index: 1100;
                animation: slideIn 0.5s ease-out, fadeOut 0.5s ease-out 2.5s;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Добавляем стили при загрузке страницы
    addModalStyles();
});