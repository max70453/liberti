document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы формы
    const checkoutForm = document.querySelector('.border.bg-white');
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    const couponInput = document.getElementById('c_code');
    const couponButton = document.getElementById('button-addon2');
    const orderTable = document.querySelector('.site-block-order-table');
    const totalElement = document.querySelector('.site-block-order-table tbody tr:last-child td:last-child');
    const checkoutButton = document.querySelector('.btn-black.btn-lg');

    // Загружаем товары из корзины
    function loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const tbody = orderTable.querySelector('tbody');
        let subtotal = 0;

        // Очищаем существующие строки
        while (tbody.children.length > 2) {
            tbody.removeChild(tbody.firstChild);
        }

        // Добавляем товары из корзины
        cart.forEach(item => {
            const priceStr = String(item.price).replace(/[^0-9.]+/g, "");
            const price = parseFloat(priceStr) || 0;
            const quantity = parseInt(item.quantity) || 1;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.name} <strong class="mx-2">x</strong> ${quantity}</td>
                <td>${(price * quantity).toFixed(2)} Р</td>
            `;
            tbody.insertBefore(tr, tbody.children[tbody.children.length - 2]);
            subtotal += price * quantity;
            console.log(quantity);
            
        });

        // Обновляем итоговую сумму
        document.querySelector('.site-block-order-table tr:nth-last-child(2) td:last-child').textContent = `${subtotal.toFixed(2)} Р`;
        totalElement.textContent = `${subtotal.toFixed(2)} Р`;
    }

    // Валидация обязательных полей
    function validateForm() {
        let isValid = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        return isValid;
    }

    // Обработка купона
    couponButton.addEventListener('click', function() {
        const couponCode = couponInput.value.trim();
        if (couponCode === 'DISCOUNT10') {
            const priceStr = totalElement.textContent.replace(/[^0-9.]+/g, "");
            const currentTotal = parseFloat(priceStr) || 0;
            const discountedTotal = currentTotal * 0.9; // 10% скидка
            totalElement.textContent = `${discountedTotal.toFixed(2)} Р`;
            alert('Купон успешно применен! Скидка 10%');
        } else {
            alert('Неверный код купона');
        }
    });

    // Обработка отправки формы
    checkoutButton.addEventListener('click', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Сохраняем данные заказа
            const orderData = {
                firstName: document.getElementById('c_fname').value,
                lastName: document.getElementById('c_lname').value,
                email: document.getElementById('c_email_address').value,
                phone: document.getElementById('c_phone').value,
                address: document.getElementById('c_address').value,
                total: totalElement.textContent,
                items: JSON.parse(localStorage.getItem('cart')) || []
            };
              // Сохраняем заказ в localStorage
                localStorage.setItem('lastOrder', JSON.stringify(orderData));
                // Очищаем корзину
                localStorage.removeItem('cart');  
                // Перенаправляем на страницу благодарности
                window.location.href = 'thankyou.html';
        } else {
            alert('Пожалуйста, заполните все обязательные поля');
        }
    });

    // Загружаем товары при загрузке страницы
    loadCartItems();
});