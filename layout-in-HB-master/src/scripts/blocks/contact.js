// const { init } = require("browser-sync")

const map =() => {
    let map = new ymaps.Map('map',{
         center: [55.753625, 37.625882],
         zoom: 16
         
    })
    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('rulerControl');
    map.behaviors.disable(['scrollZoom']);
    map.geoObjects
        .add(new ymaps.Placemark([55.753625, 37.625882], {
            balloonContent: '<strong>Красный</strong>'
        }))    
}

ymaps.ready(map)