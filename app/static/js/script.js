data = {}
/*
========================================================================================================
РАБОТА НА СТРАНИЧКЕ
======================================================================================================== 
*/

// отрисовка формы
function createForm() {
	btn = document.querySelector(".create-ad");
	btn.addEventListener('click', function(){
		document.body.style.overflowY = 'hidden';
		document.querySelector('.background').classList.remove('hide');
		document.querySelector('.form-ad').classList.remove('hide');
		document.querySelector('.background').style.top = getCoords() + 'px';
	});

}

// закрытие формы для создания объявлений
function closeForm() {
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

// создание объявления
function createAd() {
	document.querySelector('.form-submit').addEventListener('click', function(){
		data['ad_name'] = document.querySelector('.form-input-name').value
		data['ad_category'] = document.querySelector('.form-input-category').value
		data['ad-description'] = document.querySelector('.form-description').value
		data['author-contacts'] = document.querySelector('.form-contacts').value
		$('.content-wrap').append(`				
					<div class="ad" class="ad">
						<div class="ad-img"></div>
						<h2 class="ad-name">${data['ad_name']}</h2>
						<p class="ad-category">Категория:</p>
						<a href="#" class="categories">${data['ad_category']}</a>
					</div>`);
		console.log(data)
		sendingAd(data);
		document.body.style.overflowY = 'visible';
		document.querySelector('.background').classList.add('hide');
		document.querySelector('.form-ad').classList.remove('hide');
		console.log("hello")
	});
}

//раскрытие объявления
function expandAd() {
	$('.ad').on('click', function () {
		document.querySelector('.background').classList.remove('hide');
		document.querySelector('.expanded-ad').classList.remove('hide');
		console.log($(this).children()[1].innerHTML);
		// console.log(event.target.innerHTML);
		console.log(document.querySelector('.expanded-ad-name').innerHTML)
		document.querySelector('.background').style.top = getCoords() + 'px';
		document.body.style.overflowY = 'hidden';
		document.querySelector('.expanded-ad-name').innerHTML = $(this).children()[1].innerHTML;
		document.querySelector('.expanded-ad-category-text').innerHTML = $(this).children()[3].innerHTML;
		document.querySelector('.expanded-ad-description-text').innerHTML = $(this).children()[4].innerHTML;
		document.querySelector('.expanded-ad-contacts-text').innerHTML = $(this).children()[5].innerHTML;
	});
}

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
		if (response) {
			// $('slk-user-name').text(response);
		} else {
			document.querySelector('.singin').classList.add('hide');
			document.querySelector('.slk-user-name').classList.remove('hide');
			document.querySelector('.create-ad').classList.remove('hide');
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
					</div>`);
	});
}



/*
========================================================================================================
РАБОТА С СЕРВЕРОМ
========================================================================================================
*/

// отправка информации об объявлении на сервер
function  sendingAd(data) {
	$.post("/", data, success = function(response) {
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

/*
========================================================================================================
ВЫЗОВ ФУНКЦИЙ
========================================================================================================
*/
function main() {
	createForm();
	createAd();
	closeForm();
	renderName();
	closeExpandAd();
	expandAd();
	document.querySelector('.render-btn').addEventListener('click', getAds);
	
}

document.addEventListener("DOMContentLoaded", main);