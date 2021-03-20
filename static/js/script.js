/*
========================================================================================================
РАБОТА НА СТРАНИЧКЕ
======================================================================================================== 
*/
function createForm() {
	btn = document.querySelector(".create-ad");
	btn.addEventListener('click', function(){
		document.querySelector('.background-form').classList.remove('hide');
	});

}

function closeForm() {
	document.querySelector('.form-close').addEventListener('click', function(){
		console.log("ok");
		document.querySelector('.background-form').classList.add('hide');
	});
}

// function closeForm() {
// 	document.querySelector('.background-form').classList.add('hide');
// };

function createAd() {
	document.querySelector('.form-submit').addEventListener('click', function(){
		$('.content').append(`				
					<div class="ad" class="ad">
						<div class="ad-img"></div>
						<h2 class="ad-name">${document.querySelector('.form-input-name').value}</h2>
						<p class="ad-category">Категория:</p>
						<a href="#" class="categories">${document.querySelector('.form-input-category').value}</a>
					</div>`)
		document.querySelector('.background-form').classList.add('hide');
		console.log("hello")
	});

function main() {
	createForm();
	createAd();
	closeForm();
}

document.addEventListener("DOMContentLoaded", main);