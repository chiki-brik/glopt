// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.74760440321213,37.62705956745902], 
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 17
    });

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Создание макета балуна на основе Twitter Bootstrap.
    MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="popover top">' +
            //'<a class="close" href="#">&times;</a>' + // это если нужен крестик
            '<div class="arrow"></div>' +
            '<div class="popover-inner">' +
            '$[[options.contentLayout observeSize minWidth=100 maxWidth=235 maxHeight=350]]' +
            '</div>' +
            '</div>', {
            /**
             * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
             * @function
             * @name build
             */
            build: function () {
                this.constructor.superclass.build.call(this);

                this._$element = $('.popover', this.getParentElement());

                this.applyElementOffset();

                this._$element.find('.close')
                    .on('click', $.proxy(this.onCloseClick, this));
            },

            /**
             * Удаляет содержимое макета из DOM.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
             * @function
             * @name clear
             */
            clear: function () {
                this._$element.find('.close')
                    .off('click');

                this.constructor.superclass.clear.call(this);
            },

            /**
             * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name onSublayoutSizeChange
             */
            onSublayoutSizeChange: function () {
                MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                if(!this._isElement(this._$element)) {
                    return;
                }

                this.applyElementOffset();

                this.events.fire('shapechange');
            },

            /**
             * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
             * @function
             * @name applyElementOffset
             */
            // при разных размерах балуна все равно будет выровнено
            applyElementOffset: function () {
                console.log(window.screen.width);
                if (window.screen.width <= 576) {
                    this._$element.css({ // 70 - чтобы было расстояние до балуна от метки
                        left: -(this._$element[0].offsetWidth / 2) + this._$element[0].offsetWidth - 255,
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight) + this._$element[0].offsetHeight / 2 - 140
                    });
                } else {
                    this._$element.css({ // 70 - чтобы было расстояние до балуна от метки
                        left: -(this._$element[0].offsetWidth / 2) + this._$element[0].offsetWidth - 70,
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight) + this._$element[0].offsetHeight / 2 - 15 // 15 - чтобы чуть выше центра метки
                    });
                };
                // this._$element.css({ // 70 - чтобы было расстояние до балуна от метки
                //     left: -(this._$element[0].offsetWidth / 2) + this._$element[0].offsetWidth - 70,
                //     top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight) + this._$element[0].offsetHeight / 2 - 15 // 15 - чтобы чуть выше центра метки
                // });
            },

            // /**
            //  * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
            //  * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
            //  * @function
            //  * @name onCloseClick
            //  */
            // onCloseClick: function (e) {
            //     e.preventDefault();

            //     this.events.fire('userclose');
            // },

            /**
             * Используется для автопозиционирования (balloonAutoPan).
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
             * @function
             * @name getClientBounds
             * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
             */
            getShape: function () {
                if(!this._isElement(this._$element)) {
                    return MyBalloonLayout.superclass.getShape.call(this);
                }

                var position = this._$element.position();

                return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                    [position.left, position.top], [
                        position.left + this._$element[0].offsetWidth,
                        position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                    ]
                ]));
            },

            /**
             * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
             * @function
             * @private
             * @name _isElement
             * @param {jQuery} [element] Элемент.
             * @returns {Boolean} Флаг наличия.
             */
            _isElement: function (element) {
                return element && element[0] && element.find('.arrow')[0];
            }
        }),

    // // Создание вложенного макета содержимого балуна.
    MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
        //'<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
            '<div class="popover-content">$[properties.balloonContent]</div>'
    ),
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    customPlacemark0 = new ymaps.Placemark([55.74760440321213,37.62705956745902], { // Создаем метку с координатами точки
        balloonContent: '<div class="map-title">г. Москва</div> <div class="map-text">ул. Садовническая, дом 5, офис 4-6 <br> 700 от м. Новокузнецкая <br> Тел: +7 (926) 423 01 00</div><a class="map-email">info@glopt.ru</a>'
    }, {
        // Необходимо указать данный тип макета.    
        //iconLayout: 'default#imageWithContent', // если тут что-то написано должно быть внутри      
        iconLayout: 'default#image', 
        iconImageHref: './icons/map/map_label.png', // картинка иконки
        iconImageSize: [51, 63],// Размеры метки.
        iconShadow: true,
        iconShadowImageHref: './icons/map/label_shadow.png', // тень для метки
        iconShadowImageSize: [54, 43], // изначально может не показать тень, без задания размеров
        iconShadowImageOffset: [-3, -18], // смещение тени 

        balloonShadow: false,
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        balloonLayout: MyBalloonLayout,
        balloonContentLayout: MyBalloonContentLayout,
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        balloonPanelMaxMapArea: 0,
        hideIconOnBalloonOpen: false,
        //balloonLayout: "default#imageWithContent",
        //balloonContentSize: [329, 158],
        //ballooncloseButton: false,
        //balloonLayout: "default#imageWithContent", // указываем что содержимое балуна - стилизовано
        //balloonContentSize: [329, 158], // размер нашего кастомного балуна в пикселях
        //balloonImageHref: 'src/icons/map/baloon.png', // Картинка бэкграунд балуна
        //balloonImageOffset: [1000, -100], // смещание балуна, его необходимо подогнать
        //balloonImageSize: [270, 90], // размер картинки-бэкграунда балуна
        //balloonShadow: true
    }
    ); // содержимое балуна в формате html, все стили в css
  
    // Добавляем метки на карту
    myMap.geoObjects.add(customPlacemark0); //сюда добавляем название переменной из var
    customPlacemark0.balloon.open(); // чтобы балун был открыт при первой загрузке

    // отслеживает клик именно по метке (и создает там немного кастомайз балун)
    // customPlacemark0.events.add('click', function() { // клик именно на метку, можно сделать клик на карту myMap
    //     if (!myMap.balloon.isOpen()) {
    //         myMap.balloon.open([55.74760440321213,37.62705956745902], '<div class="map-title">г. Москва</div> <div class="map-text">ул. Садовническая, дом 5, офис 4-6 <br> 700 от м. Новокузнецкая <br> Тел: +7 (926) 423 01 00</div><a class="map-email">info@glopt.ru</a>', {
    //                 // Опция: не показываем кнопку закрытия.
    //                 closeButton: false,
    //                 offset: [130,85],
    //                 minHeight: 150,
    //                 minWidth: 290,
    //             });
    //     } else {
    //         myMap.balloon.close();
    //     }
    //     console.log(myMap.balloon.isOpen()); // проверяет открыт ли балун
    // });

}