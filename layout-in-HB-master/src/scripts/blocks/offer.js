document.addEventListener('DOMContentLoaded', () => {
    const offerItem = document.querySelectorAll('.js-offer-top')
    const offerInfo = document.querySelectorAll('.js-offer-item-info')
    const plusButtons = document.querySelectorAll('.js-plus')
    const minusButtons = document.querySelectorAll('.js-minus')

    const accordion = () => {
        offerItem.forEach((offerItem, offerItemIndex) => {
            offerItem.addEventListener('click', () => {
                offerInfo.forEach((offerInfoItem, offerInfoIndex) => {
                    (offerItemIndex === offerInfoIndex)
                        ? offerInfoItem.classList.toggle('offer__item-info--show')
                        : offerInfoItem.classList.remove('offer__item-info--show')
                })
            })
        })
    }
    const toggleButton = () => {
        offerItem.forEach((offerItem, offerItemIndex) => {

            offerItem.addEventListener('click', () => {
                plusButtons.forEach((plus,plusIndex) =>{
                    if (plus.classList.contains('show') && offerItemIndex === plusIndex){
                        plus.classList.add('hide')
                        plus.classList.remove('show')
                    } else {
                        plus.classList.remove('hide')
                        plus.classList.add('show')
                    }
                })

                minusButtons.forEach((minus, minusIndex) =>{
                    if (minus.classList.contains('hide') && offerItemIndex === minusIndex){
                        minus.classList.add('show')
                        minus.classList.remove('hide')
                    } else {
                        minus.classList.remove('show')
                        minus.classList.add('hide')
                    }
                })
            })
        })
    }
    if (offerItem.length !== 0 && offerInfo.length !== 0) {
        accordion()
    }
    if (plusButtons.length !== 0 && minusButtons.length !== 0){
        toggleButton()
    }

})