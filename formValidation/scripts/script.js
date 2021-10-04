//Получаем форму
const form = document.querySelector('.js-form')

//Получаем массив инпутов
const inputs = form?.querySelectorAll('input')

//Выделяем классы в константы для удобства
const ERROR_TEXT_CLASS = 'error-text'
const ERROR_INPUT_CLASS = 'error-input'

//Настройки формы
const formOptions = {
    name: {
        message: 'Поле должно быть заполнено',
        isValid: function (input) {
            return input.value.trim().length > 0
        }
    },
    surname: {
        message: '',
        isValid: function (input) {
            return input.value.trim().length > 0
        }
    },
    password: {
        message: 'Длина пароля - не менее 6 символов',
        isValid: function (input) {
            return input.value.trim().length >= 6
        }
    },
    repeatPassword: {
        message: 'Пароли не совпадают',
        isValid: function (input) {
            return input.value.trim() === form.querySelector('input[name="password"]').value.trim()
        }
    },
    agree: {
        message: 'Требуется согласие',
        isValid: function (input) {
            return (input.checked);
        }
    },
}

if (form && inputs.length) {
    //Убираем html5 валидацию
    form.setAttribute('novalidate', 'novalidate')
    //Создаем моковую функцию, которая отправит данные на сервер
    function sendForm() {
        alert('form is sent!')
    }
    //Основная функция валидации
    function validate() {
        //Устанавливаем, что форма валидна. Если переменная не изменится, то так и вернем true
        let formIsValid = true
        inputs.forEach(item => {
            if (!formOptions[item.name].isValid(item)) {
                //Если функция из настроек формы вернула false, форма невалидна
                formIsValid = false
                //И если до этого мы не добавляли класс ошибки и сообщение, то добавляем
                if (!item.parentNode.querySelector(`.${ERROR_TEXT_CLASS}`)) {
                    item.classList.add(ERROR_INPUT_CLASS)
                    const errorBlock = document.createElement('div')
                    errorBlock.classList.add(ERROR_TEXT_CLASS)
                    //Текст сообщения тоже берем из настроек формы
                    errorBlock.textContent = formOptions[item.name].message
                    item.parentNode.appendChild(errorBlock)
                }
            } else {
                item.classList.remove(ERROR_INPUT_CLASS)
                const errorBlock = item.parentNode.querySelector(`.${ERROR_TEXT_CLASS}`)
                //Если блок ошибки есть, удаляем его.
                if (errorBlock) {
                    item.parentNode.removeChild(errorBlock)
                }

            }
        })
        return formIsValid
    }
    //Функция для обнуления формы. Убираем ошибки, чистим инпуты и убираем лишний обработчик на форме.
    function clearErrors() {
        inputs.forEach(item => {
            item.value = ''
            const errorBlock = item.parentNode.querySelector(`.${ERROR_TEXT_CLASS}`)
            if (errorBlock) {
                item.parentNode.removeChild(errorBlock)
            }

        })
        form.oninput = null
    }
    //Функция, которая вызывается непосредственно перед отправкой формы
    form.onsubmit = function (e) {
        //Отменяем поведение браузера по умолчанию (перезагрузка страницы)
        e.preventDefault()
        if (validate()) {
            //Если все в порядке, очищаем ошибки и отправляем форму AJAX
            clearErrors()
            sendForm()
        } else {
            //Если валидация не пройдена - навешиваем ее уже на каждое событие ввода в форму, чтобы пользователь мог отследить исчезновение ошибок.
            form.oninput = function () {
                validate()
            }
        }
    }
}