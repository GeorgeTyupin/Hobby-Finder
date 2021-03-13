/*
========================================================================================================
РАБОТА НА СТРАНИЧКЕ
======================================================================================================== 
*/
function createForm() {
	btn = document.querySelector(".create-ad");
	btn.addEventListener('click', function(){
		document.querySelector('.background-form').classList.remove('hide');
	})
}

function main() {
	createForm();
}

document.addEventListener("DOMContentLoaded", main);