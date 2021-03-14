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
	document.querySelector('.background-form').classList.add('hide');
};

function createAd() {
	$('.content').append(`				
				<div class="ad" class="ad">
					<div class="ad-img"></div>
					<h2 class="ad-name">${document.querySelector('.form-input-name').value}</h2>
					<p class="ad-category">Категория:</p>
					<a href="#" class="categories">${document.querySelector('.form-input-category').value}</a>
				</div>`)
	console.log("hello")
}

function main() {
	createForm();
}

document.addEventListener("DOMContentLoaded", main);