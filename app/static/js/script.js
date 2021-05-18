data = {}
/*
========================================================================================================
РАБОТА НА СТРАНИЧКЕ
======================================================================================================== 
*/
// отрисовка формы для выбора категории
function createSelectCategoryForm() {
	document.querySelector('.form-input-category').addEventListener('click', function () {
		document.querySelector('.form-ad').classList.add('hide');
		document.querySelector('.select-category-form').classList.remove('hide');
	});
}

// отрисовка формы для создания объявлений
function createAdForm() {
	btn = document.querySelector(".create-ad");
	btn.addEventListener('click', function(){
		document.body.style.overflowY = 'hidden';
		document.querySelector('.background').classList.remove('hide');
		document.querySelector('.form-ad').classList.remove('hide');
		document.querySelector('.background').style.top = getCoords() + 'px';
	});

}

// закрытие формы для создания объявлений
function closeAdForm() {
	document.querySelector('.form-close').addEventListener('click', function(){
		document.body.style.overflowY = 'visible';
		document.querySelector('.background').classList.add('hide');
		document.querySelector('.form-ad').classList.add('hide');
	});
}

//закрытие развернутого объявления
function closeExpandAd() {
	document.querySelector('.expanded-ad-close').addEventListener('click', function () {
		document.body.style.overflowY = 'visible';
		document.querySelector('.background').classList.add('hide');
		document.querySelector('.expanded-ad').classList.add('hide');
	});
}

function getSelectedCategories() {
	document.querySelector('.save-categories').addEventListener('click', function() {
		data['categories'] = [];
		edu = document.querySelector('#education');
		if (edu.checked == true) {
			data['categories'].push('образование и обучение');
		}
		music = document.querySelector('#music');
		if (music.checked == true) {
			data['categories'].push('музыка');
		}
		sport = document.querySelector('#sport');
		if (sport.checked == true) {
			data['categories'].push('спорт');
		}
		work = document.querySelector('#work');
		if (work.checked == true) {
			data['categories'].push('работа');
		}
		exact_sciences = document.querySelector('#exact-sciences');
		if (exact_sciences.checked == true) {
			data['categories'].push('точные науки');
		}
		humanitarian_sciences = document.querySelector('#humanitarian-sciences');
		if (humanitarian_sciences.checked == true) {
			data['categories'].push('гуманитарные науки');
		}
		art = document.querySelector('#art');
		if (art.checked == true) {
			data['categories'].push('искусство');
		}
		section = document.querySelector('#section');
		if (section.checked == true) {
			data['categories'].push('кружки и секции');
		}
		data['categories'] = data['categories'].join(' ');
		createAd();
	});
}

function getFilterCategories() {
	document.querySelector('.select-category-filter').addEventListener('click', function() {
		data['filter-categories'] = [];
		edu = document.querySelector('#filter-education');
		if (edu.checked == true) {
			data['filter-categories'].push('образование и обучение');
		}
		music = document.querySelector('#filter-music');
		if (music.checked == true) {
			data['filter-categories'].push('музыка');
		}
		sport = document.querySelector('#filter-sport');
		if (sport.checked == true) {
			data['filter-categories'].push('спорт');
		}
		work = document.querySelector('#filter-work');
		if (work.checked == true) {
			data['filter-categories'].push('работа');
		}
		exact_sciences = document.querySelector('#filter-exact-sciences');
		if (exact_sciences.checked == true) {
			data['filter-categories'].push('точные науки');
		}
		humanitarian_sciences = document.querySelector('#filter-humanitarian-sciences');
		if (humanitarian_sciences.checked == true) {
			data['filter-categories'].push('гуманитарные науки');
		}
		art = document.querySelector('#filter-art');
		if (art.checked == true) {
			data['filter-categories'].push('искусство');
		}
		section = document.querySelector('#filter-section');
		if (section.checked == true) {
			data['filter-categories'].push('кружки и секции');
		}
		data['filter-categories'] = data['filter-categories'].join(' ');
		getFilteredByCategoryAds();
	});
}

// создание объявления
function createAd() {
	data['ad_name'] = document.querySelector('.form-input-name').value
	data['ad-description'] = document.querySelector('.form-description').value
	data['author-contacts'] = document.querySelector('.form-contacts').value
	$('.content-wrap').append(`				
			<div class="ad" class="ad">
				<div class="ad-img"></div>
				<h2 class="ad-name">${data['ad_name']}</h2>
				<p class="ad-category">Категория:</p>
				<a href="#" class="categories">${data['categories']}</a>
			</div>`);
	console.log(data)
	sendingAd(data);
	document.body.style.overflowY = 'visible';
	document.querySelector('.background').classList.add('hide');
}

//раскрытие объявления
function expandAd() {
	$('.ad').on('click', function () {
		document.querySelector('.background').classList.remove('hide');
		document.querySelector('.expanded-ad').classList.remove('hide');
		console.log($(this).children()[1].innerHTML);
		console.log(document.querySelector('.expanded-ad-name').innerHTML)
		document.querySelector('.background').style.top = getCoords() + 'px';
		document.body.style.overflowY = 'hidden';
		document.querySelector('.expanded-ad-name').innerHTML = $(this).children()[1].innerHTML;
		document.querySelector('.expanded-ad-category-text').innerHTML = $(this).children()[3].innerHTML;
		document.querySelector('.expanded-ad-description-text').innerHTML = $(this).children()[4].innerHTML;
		document.querySelector('.expanded-ad-contacts-text').innerHTML = $(this).children()[5].innerHTML;
	});
}

//получение коодинаты темного фона
function getCoords() {
	return window.pageYOffset;
}



/*
========================================================================================================
РЕНДЕРИНГ ДАННЫХ С СЕРВЕРА НА СТРАНИЧКЕ
========================================================================================================
*/
function renderName() {
	$.post("/checkname", 'checkname', success = function (response) {
		response = JSON.parse(response);
		if (response) {
			console.log(response);
			document.querySelector('.singin').classList.add('hide');
			document.querySelector('.create-ad').classList.remove('hide');
		} else {
			console.log('aaa');
			document.querySelector('.create-ad').classList.add('hide');
		}
	});
}

function renderAd(response) {
	response.forEach(element => {
		$('.content-wrap').append(`				
			<div class="ad" class="ad">
				<div class="ad-img"></div>
				<h2 class="ad-name">${element[1]}</h2>
				<p class="ad-category">Категория:</p>
				<a href="#" class="categories">${element[3]}</a>
				<p class="hide">${element[4]}</p>
				<p class="hide">${element[6]}</p>
			</div>`
		);
	});
	removeIndentFromAds();
}

function removeIndentFromAds() {
	ads = $('.ad')
	ads[0].style.marginTop = "0px";
	ads[1].style.marginTop = "0px";
	console.log(ads)
}

function removeAds() {
	$('.ad').remove();
}



/*
========================================================================================================
РАБОТА С СЕРВЕРОМ
========================================================================================================
*/

// отправка информации об объявлении на сервер
function  sendingAd(data) {
	$.post("/", data, success = function(response) {
		response = JSON.parse(response);
		console.log(response)
	});
}

function getAds() {
	$.post("/getads", data, success = function (response) {
		response = JSON.parse(response);
		// document.querySelector('.render-btn').classList.add('hide');
		console.log(response);
		renderAd(response);
	});
}

function getFilteredByCategoryAds() {
	$.post("/getfilteredbycategoryads", data, success = function (response) {
		response = JSON.parse(response);
		removeAds();
		renderAd(response);
	});
}

function getFilteredByNameAds() {
	console.log(document.querySelector('.search-img'))
	$('.search-img').on('click', function() {
		data['filter-name'] = document.querySelector('.searchinput').value
		$.post("/getfilteredbynameads", data, success = function (response) {
			response = JSON.parse(response);
			removeAds();
			renderAd(response);
			console.log(response)
		});
	});
}



/*
========================================================================================================
ВЫЗОВ ФУНКЦИЙ
========================================================================================================
*/
function main() {
	createAdForm();
	createAd();
	closeAdForm();
	renderName();
	closeExpandAd();
	expandAd();
	createSelectCategoryForm();
	getSelectedCategories();
	getFilterCategories();
	getFilteredByNameAds();
	document.querySelector('.render-btn').addEventListener('click', getAds);
	document.querySelector('.form-submit').addEventListener('click', createAd);
}

setTimeout(removeIndentFromAds, 1);

document.addEventListener("DOMContentLoaded", main);