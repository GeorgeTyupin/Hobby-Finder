/*
========================================================================================================
РАБОТА НА СТРАНИЧКЕ
======================================================================================================== 
*/

// отрисовка формы
function createForm() {
	btn = document.querySelector(".create-ad");
	btn.addEventListener('click', function(){
		document.querySelector('.background-form').classList.remove('hide');
	});

}

// закрытие формы для создания объявлений
function closeForm() {
	document.querySelector('.form-close').addEventListener('click', function(){
		console.log("ok");
		document.querySelector('.background-form').classList.add('hide');
	});
}

// создание объявления
function createAd() {
	document.querySelector('.form-submit').addEventListener('click', function(){
		data = {}
		data['ad_name'] = document.querySelector('.form-input-name').value
		data['ad_category'] = document.querySelector('.form-input-category').value
		console.log(data);
		$('.content').append(`				
					<div class="ad" class="ad">
						<div class="ad-img"></div>
						<h2 class="ad-name">${data['ad_name']}</h2>
						<p class="ad-category">Категория:</p>
						<a href="#" class="categories">${data['ad_category']}</a>
					</div>`);
		sendingAd(data);
		document.querySelector('.background-form').classList.add('hide');
		console.log("hello")
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



function main() {
	createForm();
	createAd();
	closeForm();
}

document.addEventListener("DOMContentLoaded", main);