//слайдер
new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }, 
    //spaceBetween: 45,
    // //roundLengths: true,
    //loopAdditionalSlides: 30,
    // //autoHeight: true,
    breakpoints: {
        320: {
            slidesPerView: 1
        },
        993: {
            slidesPerView: 3
        }
    },
    //slidesPerView: 3, //'auto'
    // spaceBetween: 45, //указывается в пикселях
    centerSlides: true, // первый активный слайд будет показываться по центру
    loop: true,
    speed: 1000,
    // autoHeight: true, 
    //fadeEffect: { crossFade: true, }
    //normalizeSlideIndex: false,
    // slidesPerGroup: 1,
    //loopedSlides: 2, //это не оч пон
    //speed: 1000,
    initialSlide: 0, //стартовый слайд
    //observer: true,
    //observeParents: true,
    //parallax: true,
}); // после этой инициализации появится возможность свайпать слайды!!!

// обработка формы
$(document).ready(function(){
    // когда на крестик нажимаем у всплывающих окон
    $('.modal__close').on('click', function(){
        $('.overlay, #call, #thnx').fadeOut('slow');
    });

    // появление форм, при нажатии на кнопки
    $('.btn-overlay').on('click', function(){
        $('.overlay, #call').fadeIn('slow');
    });

    // маска ввода для номера телефона - благодаря плагину
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // валидация
    function validateForms(form) {
        $(form).validate({ 
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: { // текст ошибок, при непрохождении валидации. Полям присваивается класс error
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Длина имени не должна быть менее {0} символов!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Некорректный адрес электронной почты!"
                }
                //,agreement: " !!!!"
              }
        });
    };
    validateForms('#call form'); // id блока + form - если форма внутри этого блока с id. Иначе просто id(если это id тега form)
    validateForms('#consultation form');

    // отправка формы
    $('form').submit(function(e) { // после того, как форма сабмитится - все данные с нее будут отправляться. e- even
        e.preventDefault(); // чтобы после отправки формы автоматически не было перезагрузки страницы
        if (!$(this).valid()) { // если форма не прошла валидацию - данные не отправятся на сервер
            return;
        }
        $.ajax({ // метод ajax - метод внутри jQuery
            type: "POST", // отправка данных, или взятие данных с сервера
            url: "mailer/smart.php", // куда будут отправляться данные
            data: $(this).serialize() // что за данные отправляются на сервер - данные с формы, к которым применен метод serialize
        }).done( function () { //что происходит после выполнения этой операции
            $(this).find("input").val(""); // очищаем форму после отправки
            $('#call').fadeOut();
            $('.overlay, #thnx').fadeIn();

            $('form').trigger('reset'); //обновление форм
        }); 
        return false;
    }); 

    // появление success-окна
    // $('.btn-form').on('click', function() {
    //     $('#call').fadeOut('slow');
    //     $('#thnx').fadeIn('slow');
    // });
});

// меню-бургер
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.promo__menu'),
    close = document.querySelector('.menu-close'),
    burger = document.querySelector('.promo__burger');

    burger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    close.addEventListener('click', () => {
        menu.classList.remove('active');
    });

});







//console.log(document.getElementsByTagName('button'));

// slick-slider
// $(document).ready(function(){ // загружать слайдер только тогда, когда документ полностью готов. $ - это и есть библиотека jQuery
//     //$('.slider').slick();
//     $('.slider').slick({
//     //dots: true,
//     //infinite: true,
//     speed: 1000, //ms
//     slidesToShow: 1,
//     //slidesToScroll: 3,
//     //lazyLoad: 'false',
//     //autoplay: true,
//     //slidesToScroll: 'auto',
//     //centerMode: true,
//     //variableWidth: true,
//     //useCSS: false,
//     //draggable: true,
//     //centerPadding: 0,
//     //adaptiveHeight: true,
//     prevArrow: '<button type="button" class="prev"><img src="icons/slider/arrow_left.png" alt="arrow1"></button>',
//     nextArrow: '<button type="button" class="next"><img src="icons/slider/arrow_right.png" alt="arrow2"></button>'//,
//     //vertical: false,
//     //arrows: false
//     //fade: true, //проявление картинки
//     //cssEase: 'linear' //тип проявления, здесь равномерное
//     //autoplay: true,
//     // autoplaySpeed: 2000
//     });

//     // document.querySelector('.slick-track').style.transition = "none";
//     // console.log(document.querySelector('.slick-track'));

//     // const elem = document.querySelector('.slick-track');
//     // elem.style.transition = "none";

//     // console.log($('.slider').slick('slickGetOption', 'slidesToShow'));
//     // const List = document.querySelectorAll('.slider-item'),
//     //       slidesToShow = $('.slider').slick('slickGetOption', 'slidesToShow');

//     // console.log(List.length);
//     // if ((List.length <= slidesToShow) && List.length != 1) {
//     //     // определили родительский элемент
//     //     const parent = document.querySelector('.slick-track');
//     //     for (let i = 0; i < List.length; i++) {
//     //         const sliderItem = document.createElement('div');
//     //         sliderItem.classList.add('slider-item');
//     //         console.log(sliderItem);
//     //         parent.appendChild(sliderItem);
//     //     };
//     //     console.log(parent);
//     // }

// });

// сам кайнд оф параша
// $(document).ready(function() {
//     // Assign some jquery elements we'll need
//     var $swiper = $(".swiper-container");
//     var $bottomSlide = null; // Slide whose content gets 'extracted' and placed
//     // into a fixed position for animation purposes
//     var $bottomSlideContent = null; // Slide content that gets passed between the
//     // panning slide stack and the position 'behind'
//     // the stack, needed for correct animation style
  
//     var mySwiper = new Swiper(".swiper-container", {
//       spaceBetween: 1,
//       slidesPerView: 3,
//       centeredSlides: true,
//       roundLengths: true,
//       loop: true,
//       loopAdditionalSlides: 30,
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev"
//       }
//     });
//   });
  


//const { default: Swiper } = require("swiper");

//console.log(document.getElementsByClassName('button'));

// slider
// const slider = tns({
//     container: '.slider',
//     items: 3,
//     slideBy: 1, //'page'
//     autoplay: false,
//     speed: 1200,
//     controls: false, // отключает навигацию по-умолчанию, ниже подключаем кастомизированые кнопки
//     gutter: 45,
//     nav: false, 
//     autoHeight:true,
//     prevButton: true,
//     nextButton: true,
//     mouseDrag: false,
//     center: true,
//     rewind: false,
//     touch: false, 
//     //nested: true,
//     responsive: {
//         // 640: {
//         //   edgePadding: 20,
//         //   gutter: 20,
//         //   items: 2
//         // },
//         // 700: {
//         //   gutter: 30
//         // },
//         // 991: {
//         //   items: 3
//         // }
//       }
//   });

  


// const SliderList = document.getElementsByClassName('tns-slide-active');
// console.log(SliderList);
// console.log(SliderList.length);
//console.log(SliderList.isEmptyOrNull());
// SliderList.forEach((element, i) => {
//     console.log(element.item());
// });

// const collection = document.getElementsByClassName("example");
// for (let i = 0; i < collection.length; i++) {
//   collection[i].style.backgroundColor = "red";
// }
// document.ready(function(){
//     const List = document.querySelectorAll('.tns-slide-active');
//     console.log(List);
// });



// const List = document.querySelectorAll('.tns-slide-active');
// document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
//     //const List = document.querySelectorAll('.tns-slide-active');
//     console.log(List);
// });
// const initId = document.getElementById("tns1-item0");
// var checkInitId = true; //need to check initId?
// //console.log(initId);
// initId.classList.add('initial-highlight');

// document.querySelector('.prev').addEventListener('click', function () { 
//     slider.goTo('prev');
//     //setTimeout(highlightMiddleElem(false), 5000);
//     highlightMiddleElem(false);
// }); 

// document.querySelector('.next').addEventListener('click', function () { 
//     slider.goTo('next');
//     //setTimeout(highlightMiddleElem(true), 5000);
//     highlightMiddleElem(true);
// });

// function highlightMiddleElem(control) {
//     if((initId.classList.contains('initial-highlight')) && (checkInitId)) {
//         initId.classList.remove('initial-highlight');
//         checkInitId = false;
//     }
//     const List = document.querySelectorAll('.tns-slide-active');
//     console.log(List);
//     if (control) { //next button
//         if(List[0].classList.contains('initial-highlight')) {
//             List[0].classList.remove('initial-highlight');
//         }
//     } else { //prev button
//         if(List[2].classList.contains('initial-highlight')) {
//             List[2].classList.remove('initial-highlight');
//         }
//     }
//     List[1].classList.add('initial-highlight');
// };

// // when push any control btn
// document.querySelectorAll('.btn-slider').forEach(
//     item => item.addEventListener('click', function () {
//         //console.log('zdarova otec');
//         const HiLight = document.querySelectorAll('.initial-highlight');
//         console.log(HiLight.length);
//         if (HiLight.length > 1) {
//             for (let i = 0; i < HiLight.length; i++) {
//                 if (!(HiLight[i].classList.contains('tns-slide-active'))) {
//                     HiLight[i].classList.remove('initial-highlight');
//                 }
//             }
//             highlightMiddleElem(true) 
//         }
//     })
// );
// const percents = document.querySelectorAll('.skills__percents-item-percent'),
//       lines = document.querySelectorAll('.skills__percents-item-lines .line-color');

// percents.forEach((item, i) => {
//     lines[i].style.width = item.innerHTML; //иннер - это содержимое элемента
// });

//add fic-class to active slider elems
//const SliderList = document.getElementsByClassName('tns-slide-active');//querySelector('.tns-slide-active'); //tns-slide-active
