document.addEventListener("DOMContentLoaded", function (event) {

	/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});

	// бургер меню
	let burger = document.querySelector(".burger-menu");
	let menu = document.querySelector(".menu");
	let documentBody = document.documentElement;

	function menuOpen() {
		burger.classList.toggle("active");
		menu.classList.toggle("active");
		documentBody.classList.toggle("lock");
	}

	function menuClose() {
		burger.classList.remove("active");
		menu.classList.remove("active");
		documentBody.classList.remove("lock");
	}

	burger.addEventListener("click", function () {
		menuOpen();
	});


	const menuItems = document.querySelectorAll('.link-go');

	if (menuItems.length) {
		menuItems.forEach(menuItem => {
			menuItem.addEventListener("click", function (e) {
				menuClose();
			});
		});
	}

	let words = ["Strategic", "Passionate", "Thoughtfull"];
	let currentWord = 0;

	const valueMain = document.querySelector('.main__title span');

	if (valueMain) {
		setInterval(function () {
			currentWord++;
			if (currentWord > 2) {
				currentWord = 0;
			}

			valueMain.innerHTML = words[currentWord];
		}, 3000);
	}

	// setInterval(function() {
	//   currentWord++;
	//   if (currentWord > 2) {
	//     currentWord = 0;
	//   }
	//   var changingWord = document.querySelector(".main__title span");
	//   changingWord.classList.add("hidden");
	//   setTimeout(function() {
	//     changingWord.innerHTML = words[currentWord];
	//     changingWord.classList.remove("hidden");
	//   }, 500);
	// }, 3000);





	// закрытие меню
	const smoothLinks = document.querySelectorAll('.link-act');
	for (let smoothLink of smoothLinks) {
		smoothLink.addEventListener('click', function (e) {
			burger.classList.remove("active");
			menu.classList.remove("active");
			body.classList.remove("lock");
		});
	};

	// отправка
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);


		let formData = new FormData(form);

		if (error === 0) {

			let response = await fetch('files/sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				form.reset();
			} else {
				alert('Error');
			}
		}
	}


	// валидация
	function formValidate(form) {
		let error = 0;
		let formReq = form.querySelectorAll('.req');
		em = false;

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);


			if (input.classList.contains('email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
					em = true;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++
					em = false;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
















	//выподающее меню
	/* Проверка мобильного браузера */
	let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

	const linkDown = document.querySelector('.menu__link-down');
	const subMenu = document.querySelector('.menu__sub-list');

	if (isMobile.any()) {

		// const workItems = document.querySelectorAll('.works__item');

		// if (workItems.length) {
		// 	workItems.forEach(workItem => {
		// 		workItem.classList.add('works__item-act');
		// 	});
		// }


		document.documentElement.classList.add('touch');
		linkDown.addEventListener("click", function (e) {
			//subMenu.classList.toggle('boxes-open');
			_slideToggle(subMenu);
		});
	} else {
		document.documentElement.classList.add('mouse');
	}

	linkDown.addEventListener("click", function (e) {
		e.preventDefault();
	});




	//слайдер
	let mySwiper;
	function initSliders() {
		// Перечень слайдеров
		// Проверяем, есть ли слайдер на стронице
		if (document.querySelector('.how__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			mySwiper = new Swiper('.how__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				observer: true,
				observeParents: true,
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 500,
				effect: 'fade',
				scrollbar: {
					el: '.how__scrollbar',
					draggable: true,
				},
			});
		}

		const slidersEtem1 = document.querySelectorAll('.how__item1');
		const slidersEtem2 = document.querySelectorAll('.how__item2');
		const slidersEtem3 = document.querySelectorAll('.how__item3');
		const slidersEtem4 = document.querySelectorAll('.how__item4');

		if (slidersEtem1.length) {
			slidersEtem1.forEach(sliderEtem1 => {
				sliderEtem1.addEventListener('click', function () {
					mySwiper.slideTo(0);
				});
			});
		}

		if (slidersEtem2.length) {
			slidersEtem2.forEach(sliderEtem2 => {
				sliderEtem2.addEventListener('click', function () {
					mySwiper.slideTo(1);
				});
			});
		}


		if (slidersEtem3.length) {
			slidersEtem3.forEach(sliderEtem3 => {
				sliderEtem3.addEventListener('click', function () {
					mySwiper.slideTo(2);
				});
			});
		}

		if (slidersEtem4.length) {
			slidersEtem4.forEach(sliderEtem4 => {
				sliderEtem4.addEventListener('click', function () {
					mySwiper.slideTo(3);
				});
			});
		}

		if (document.querySelector('.includes__slider')) { // Указываем скласс нужного слайдера
			// Создаем слайдер
			new Swiper('.includes__slider', { // Указываем скласс нужного слайдера
				// Подключаем модули слайдера
				// для конкретного случая
				observer: true,
				observeParents: true,
				slidesPerView: 1.1,
				spaceBetween: 10,
				centeredSlides: true,
				speed: 500,
				pagination: {
					el: '.includes-pagination',
					clickable: true,
				},

			});
		}

	}

	const sliderMob1 = document.querySelector('.stage__slider');

	const sliderMob2 = document.querySelector('.why-us__slider');

	const sliderMob3 = document.querySelector('.why-us__slider-2');

	const sliderMob4 = document.querySelector('.do-it__slider');

	let mobSwiper1;
	let mobSwiper2;
	let mobSwiper3;
	let mobSwiper4;
	function mobileSlider1() {
		//класс слайдера
		if (sliderMob1) {
			if (window.innerWidth <= 767 && sliderMob1.dataset.mobile === 'false') {
				mobSwiper1 = new Swiper(sliderMob1, {
					observer: true,
					observeParents: true,
					observeSlideChildren: true,
					slidesPerView: 1.1,
					spaceBetween: 10,
					centeredSlides: true,
					speed: 500,
					pagination: {
						el: '.stage-pagination',
						clickable: true,
					},
				});

				sliderMob1.dataset.mobile = 'true';
			}

			if (window.innerWidth > 767) {
				sliderMob1.dataset.mobile = 'false';

				if (sliderMob1.classList.contains('swiper-initialized')) {
					mobSwiper1.destroy();
				}

			}
		}

		if (sliderMob2) {
			if (window.innerWidth <= 767 && sliderMob2.dataset.mobile === 'false') {
				mobSwiper2 = new Swiper(sliderMob2, {
					observer: true,
					observeParents: true,
					observeSlideChildren: true,
					slidesPerView: 1.1,
					spaceBetween: 10,
					centeredSlides: true,
					speed: 500,
					pagination: {
						el: '.why-us-pagination',
						clickable: true,
					},
				});

				sliderMob2.dataset.mobile = 'true';
			}

			if (window.innerWidth > 767) {
				sliderMob2.dataset.mobile = 'false';

				if (sliderMob2.classList.contains('swiper-initialized')) {
					mobSwiper2.destroy();
				}

			}
		}

		if (sliderMob3) {
			if (window.innerWidth <= 767 && sliderMob3.dataset.mobile === 'false') {
				mobSwiper3 = new Swiper(sliderMob3, {
					observer: true,
					observeParents: true,
					observeSlideChildren: true,
					slidesPerView: 1.1,
					spaceBetween: 10,
					centeredSlides: true,
					speed: 500,
					pagination: {
						el: '.why-us-pagination-2',
						clickable: true,
					},
				});

				sliderMob3.dataset.mobile = 'true';
			}

			if (window.innerWidth > 767) {
				sliderMob3.dataset.mobile = 'false';

				if (sliderMob3.classList.contains('swiper-initialized')) {
					mobSwiper3.destroy();
				}

			}
		}

		if (sliderMob4) {
			if (window.innerWidth <= 767 && sliderMob4.dataset.mobile === 'false') {
				mobSwiper4 = new Swiper(sliderMob4, {
					observer: true,
					observeParents: true,
					observeSlideChildren: true,
					slidesPerView: 1.1,
					spaceBetween: 10,
					centeredSlides: true,
					speed: 500,
					pagination: {
						el: '.do-it-pagination',
						clickable: true,
					},
				});

				sliderMob4.dataset.mobile = 'true';
			}

			if (window.innerWidth > 767) {
				sliderMob4.dataset.mobile = 'false';

				if (sliderMob4.classList.contains('swiper-initialized')) {
					mobSwiper4.destroy();
				}

			}
		}
	}


	window.addEventListener("load", function (e) {
		// Запуск инициализации слайдеров
		initSliders();
		// Запуск инициализации мобильных слайдеров
		mobileSlider1();
		window.addEventListener('resize', function (event) {
			mobileSlider1();
		});
	});




	let _slideUp = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = `${target.offsetHeight}px`;
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = !showmore ? true : false;
				!showmore ? target.style.removeProperty('height') : null;
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				!showmore ? target.style.removeProperty('overflow') : null;
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие 
				document.dispatchEvent(new CustomEvent("slideUpDone", {
					detail: {
						target: target
					}
				}));
			}, duration);
		}
	}
	let _slideDown = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.hidden = target.hidden ? false : null;
			showmore ? target.style.removeProperty('height') : null;
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				// Создаем событие 
				document.dispatchEvent(new CustomEvent("slideDownDone", {
					detail: {
						target: target
					}
				}));
			}, duration);
		}
	}
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}

	// Обработа медиа запросов из атрибутов 
	function dataMediaQueries(array, dataSetValue) {
		// Получение объектов с медиа запросами
		const media = Array.from(array).filter(function (item, index, self) {
			if (item.dataset[dataSetValue]) {
				return item.dataset[dataSetValue].split(",")[0];
			}
		});
		// Инициализация объектов с медиа запросами
		if (media.length) {
			const breakpointsArray = [];
			media.forEach(item => {
				const params = item.dataset[dataSetValue];
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});
			// Получаем уникальные брейкпоинты
			let mdQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mdQueries = uniqArray(mdQueries);
			const mdQueriesArray = [];

			if (mdQueries.length) {
				// Работаем с каждым брейкпоинтом
				mdQueries.forEach(breakpoint => {
					const paramsArray = breakpoint.split(",");
					const mediaBreakpoint = paramsArray[1];
					const mediaType = paramsArray[2];
					const matchMedia = window.matchMedia(paramsArray[0]);
					// Объекты с нужными условиями
					const itemsArray = breakpointsArray.filter(function (item) {
						if (item.value === mediaBreakpoint && item.type === mediaType) {
							return true;
						}
					});
					mdQueriesArray.push({
						itemsArray,
						matchMedia
					})
				});
				return mdQueriesArray;
			}
		}
	}

	// Уникализация массива
	function uniqArray(array) {
		return array.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});
	}



	const spollersArray = document.querySelectorAll('[data-spollers]');
	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных слойлеров
		if (spollersRegular.length) {
			initSpollers(spollersRegular);
		}
		// Получение слойлеров с медиа запросами
		let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
		if (mdQueriesArray && mdQueriesArray.length) {
			mdQueriesArray.forEach(mdQueriesItem => {
				// Событие
				mdQueriesItem.matchMedia.addEventListener("change", function () {
					initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				});
				initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_spoller-init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_spoller-init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length) {
				spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_spoller-active')) {
							spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.closest('[data-spoller]')) {
				const spollerTitle = el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
				const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle('_spoller-active');
					_slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
				}
				e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
			const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
			if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
				spollerActiveTitle.classList.remove('_spoller-active');
				_slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
			}
		}
		// Закрытие при клике вне спойлера
		const spollersClose = document.querySelectorAll('[data-spoller-close]');
		if (spollersClose.length) {
			document.addEventListener("click", function (e) {
				const el = e.target;
				if (!el.closest('[data-spollers]')) {
					spollersClose.forEach(spollerClose => {
						const spollersBlock = spollerClose.closest('[data-spollers]');
						const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
						spollerClose.classList.remove('_spoller-active');
						_slideUp(spollerClose.nextElementSibling, spollerSpeed);
					});
				}
			});
		}
	}



	function DynamicAdapt(type) {
		this.type = type;
	}
	DynamicAdapt.prototype.init = function () {
		const _this = this;
		// массив объектов
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		// массив DOM-элементов
		this.nodes = document.querySelectorAll("[data-da]");
		// наполнение оbjects объктами
		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}
		this.arraySort(this.оbjects);
		// массив уникальных медиа-запросов
		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});
		// навешивание слушателя на медиа-запрос
		// и вызов обработчика при первом запуске
		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];
			// массив объектов с подходящим брейкпоинтом
			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};
	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			//for (let i = 0; i < оbjects.length; i++) {
			for (let i = оbjects.length - 1; i >= 0; i--) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};
	// Функция перемещения
	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}
	// Функция возврата
	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}
	// Функция получения индекса внутри родителя
	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};
	// Функция сортировки массива по breakpoint и place 
	// по возрастанию для this.type = min
	// по убыванию для this.type = max
	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};
	const da = new DynamicAdapt("max");
	da.init();


	class ScrollWatcher {
		constructor(props) {
			let defaultConfig = {
				logging: true,
			}
			this.config = Object.assign(defaultConfig, props);
			this.observer;
			!document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
		}
		// Обновляем конструктор
		scrollWatcherUpdate() {
			this.scrollWatcherRun();
		}
		// Запускаем конструктор
		scrollWatcherRun() {
			document.documentElement.classList.add('watcher');
			this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
		}
		// Конструктор наблюдателей
		scrollWatcherConstructor(items) {
			if (items.length) {
				// Уникализируем параметры
				let uniqParams = uniqArray(Array.from(items).map(function (item) {
					return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
				}));
				// Получаем группы объектов с одинаковыми параметрами,
				// создаем настройки, инициализируем наблюдатель
				uniqParams.forEach(uniqParam => {
					let uniqParamArray = uniqParam.split('|');
					let paramsWatch = {
						root: uniqParamArray[0],
						margin: uniqParamArray[1],
						threshold: uniqParamArray[2]
					}
					let groupItems = Array.from(items).filter(function (item) {
						let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
						let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
						let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
						if (
							String(watchRoot) === paramsWatch.root &&
							String(watchMargin) === paramsWatch.margin &&
							String(watchThreshold) === paramsWatch.threshold
						) {
							return item;
						}
					});

					let configWatcher = this.getScrollWatcherConfig(paramsWatch);

					// Инициализация наблюдателя со своими настройками
					this.scrollWatcherInit(groupItems, configWatcher);
				});
			}
		}
		// Функция создания настроек
		getScrollWatcherConfig(paramsWatch) {
			// Создаем настройки
			let configWatcher = {}
			// Родитель, внутри которого ведется наблюдение
			if (document.querySelector(paramsWatch.root)) {
				configWatcher.root = document.querySelector(paramsWatch.root);
			}
			// Отступ срабатывания
			configWatcher.rootMargin = paramsWatch.margin;
			// Точки срабатывания
			if (paramsWatch.threshold === 'prx') {
				// Режим параллакса
				paramsWatch.threshold = [];
				for (let i = 0; i <= 1.0; i += 0.005) {
					paramsWatch.threshold.push(i);
				}
			} else {
				paramsWatch.threshold = paramsWatch.threshold.split(',');
			}
			configWatcher.threshold = paramsWatch.threshold;

			return configWatcher;
		}
		// Функция создания нового наблюдателя со своими настройками
		scrollWatcherCreate(configWatcher) {
			this.observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					this.scrollWatcherCallback(entry, observer);
				});
			}, configWatcher);
		}
		// Функция инициализации наблюдателя со своими настройками
		scrollWatcherInit(items, configWatcher) {
			// Создание нового наблюдателя со своими настройками
			this.scrollWatcherCreate(configWatcher);
			// Передача наблюдателю элементов
			items.forEach(item => this.observer.observe(item));
		}
		// Функция обработки базовых действий точек срабатываения
		scrollWatcherIntersecting(entry, targetElement) {
			if (entry.isIntersecting) {
				// Видим объект
				// Добавляем класс
				!targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null;
			} else {
				// Не видим объект
				// Убираем класс
				targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null;
			}
		}
		// Функция отключения слежения за объектом
		scrollWatcherOff(targetElement, observer) {
			observer.unobserve(targetElement);
		}

		// Функция обработки наблюдения
		scrollWatcherCallback(entry, observer) {
			const targetElement = entry.target;
			// Обработка базовых действий точек срабатываения
			this.scrollWatcherIntersecting(entry, targetElement);
			// Если есть атрибут data-watch-once убираем слежку
			targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
			// Создаем свое событие отбратной связи
			document.dispatchEvent(new CustomEvent("watcherCallback", {
				detail: {
					entry: entry
				}
			}));

			/*
			// Выбираем нужные объекты
			if (targetElement.dataset.watch === 'some value') {
				// пишем уникальную специфику
			}
			if (entry.isIntersecting) {
				// Видим объект
			} else {
				// Не видим объект
			}
			*/
		}
	}
	// Запускаем и добавляем в переменную
	let scrollWatcher = new ScrollWatcher({});

});



