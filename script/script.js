"use strict";

const startButton = document.querySelector('.start-button');
const firstScreen = document.querySelector('.first-screen');
const mainForm = document.querySelector('.main-form');
const formCalculate = document.querySelector('.form-calculate');
const endButton = document.querySelector('.end-button');
const total = document.querySelector('.total');
const fastRange = document.querySelector('.fast-range');

function showElem(e) {
    e.style.display = 'block';
}

function hideElem(e) {
    e.style.display = 'none';
}

function handlerCallBackForm(event) {
    const target = event.target;
    if (target.classList.contains('want-faster')) {
        target.checked ? showElem(fastRange) : hideElem(fastRange);
    }
}

startButton.addEventListener('click', function () {
    showElem(mainForm);
    hideElem(firstScreen);
});

endButton.addEventListener('click', function () {
    for (const elem of formCalculate.elements) {
        if (elem.tagName === 'FIELDSET') {
            hideElem(elem);
        }
    }
});

formCalculate.addEventListener('change', handlerCallBackForm);