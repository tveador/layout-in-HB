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
    phone:{
        message: 'Поле должно быть заполнено',
        isValid: function (input) {
            return input.value.trim().length > 0
    }
    },

    personal: {
        message: 'Требуется согласие',
        isValid: function (input) {
            return (input.checked);
        }

    },
    email:{
        message:'Поле должно быть заполнено',
        isValid: function(input){
            return input.value.trim().length > 0
        }
    }

}

if (form && inputs.length) {
    form.setAttribute('novalidate', 'novalidate')
    function sendForm() {
        alert('form is sent!')
    }
    function validate() {
        let formIsValid = true
        inputs.forEach(item => {
            if (!formOptions[item.name].isValid(item)) {
                formIsValid = false
                if (!item.parentNode.querySelector(`.${ERROR_TEXT_CLASS}`)) {
                    item.classList.add(ERROR_INPUT_CLASS)
                    const errorBlock = document.createElement('div')
                    errorBlock.classList.add(ERROR_TEXT_CLASS)
                    errorBlock.textContent = formOptions[item.name].message
                    item.parentNode.appendChild(errorBlock)
                }
            } else {
                item.classList.remove(ERROR_INPUT_CLASS)
                const errorBlock = item.parentNode.querySelector(`.${ERROR_TEXT_CLASS}`)
                if (errorBlock) {
                    item.parentNode.removeChild(errorBlock)
                }

            }
        })
        return formIsValid
    }
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
    form.onsubmit = function (e) {
        e.preventDefault()
        if (validate()) {
            clearErrors()
            sendForm()
        } else {
            form.oninput = function () {
                validate()
            }
        }
    }
}