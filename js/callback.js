document.addEventListener('DOMContentLoaded', function() {
    // Получаем кнопку обратного звонка
    const callbackBtn = document.getElementById('callbackBtn');
    
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
        
        phoneGroup.appendChild(phoneLabel);
        phoneGroup.appendChild(phoneInput);
        
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
        form.appendChild(timeGroup);
        form.appendChild(submitButton);
        
        // Обработчик отправки формы
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь можно добавить логику отправки данных на сервер
            alert('Спасибо! Мы перезвоним вам в ближайшее время.');
            closeModal();
        });
        
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
        `;
        document.head.appendChild(style);
    }
    
    // Добавляем стили при загрузке страницы
    addModalStyles();
});