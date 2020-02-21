"use strict";
const YES_NO = ['Нет', 'Да'];
const DAYS_NAMES = ['день', 'дня', 'дней'];
const DATA = {
    whichSite: ['landing', 'multiPage', 'onlineStore'],
    price: [4000, 8000, 26000],
    desktopTemplates: [50, 40, 30],
    adapt: 20,
    mobileTemplates: 15,
    editable: 10,
    metrikaYandex: [500, 1000, 2000],
    analyticsGoogle: [850, 1350, 3000],
    sendOrder: 500,
    deadlineDay: [
        [2, 7],
        [3, 10],
        [7, 14]
    ],
    deadlinePercent: [20, 17, 15]
};

const startButton = document.querySelector('.start-button');
const firstScreen = document.querySelector('.first-screen');
const mainForm = document.querySelector('.main-form');
const formCalculate = document.querySelector('.form-calculate');
const endButton = document.querySelector('.end-button');
const total = document.querySelector('.total');
const fastRange = document.querySelector('.fast-range');
const totalPriceSum = document.querySelector('.total_price__sum');
const adapt = document.getElementById('adapt');
const mobileTemplates = document.getElementById('mobileTemplates');
const typeSite = document.querySelector('.type-site');
const maxDeadline = document.querySelector('.max-deadline');
const rangeDeadline = document.querySelector('.range-deadline');
const deadlineValue = document.querySelector('.deadline-value');

function declOfNum(n, titles) {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

function showElem(e) {
    e.style.display = 'block';
}

function hideElem(e) {
    e.style.display = 'none';
}

function renderTextContent(total, site, maxDeadlineDay, minDeadlineDay) {
    typeSite.textContent = site;
    totalPriceSum.textContent = total;
    maxDeadline.textContent = declOfNum(maxDeadlineDay, DAYS_NAMES);
    rangeDeadline.min = minDeadlineDay;
    rangeDeadline.max = maxDeadlineDay;
    deadlineValue.textContent = declOfNum(rangeDeadline.value, DAYS_NAMES);
}

function priceCalculation(elem) {
    let result = 0;
    let index = 0;
    const options = [];
    let site = '';
    let maxDeadlineDay = DATA.deadlineDay[index][1];
    let minDeadlineDay = DATA.deadlineDay[index][0];
    
    if (elem.name === 'whichSite') {
        for (const item of formCalculate.elements) {
            if (item.type === 'checkbox') {
                item.checked = false;
            }
        }
        hideElem(fastRange);
    }
    
    for (const item of formCalculate.elements) {
        if (item.name === 'whichSite' && item.checked) {
            index = DATA.whichSite.indexOf(item.value);
            site = item.dataset.site;
            maxDeadlineDay = DATA.deadlineDay[index][1];
            minDeadlineDay = DATA.deadlineDay[index][0];
        } else if (item.classList.contains('calc-handler') && item.checked) {
            options.push(item.value);
        }
    }
    
    options.forEach(function (key) {
        if (typeof (DATA[key]) === 'number') {
            if (key === 'sendOrder') {
                result += DATA[key];
            } else {
                result += DATA.price[index] * DATA[key] / 100;
            }
        } else {
            if (key === 'desktopTemplates') {
                result += DATA.price[index] * DATA[key][index] / 100;
            } else {
                result += DATA[key][index];
            }
        }
    });
    
    result += DATA.price[index];
    renderTextContent(result, site, maxDeadlineDay, minDeadlineDay);
}

function handlerCallBackForm(event) {
    const target = event.target;
    
    if (target.value === 'adapt') {
        if (adapt.checked) {
            mobileTemplates.disabled = false;
        } else {
            mobileTemplates.disabled = true;
            mobileTemplates.checked = false;
            document.querySelector(`.${mobileTemplates.value}_value`).textContent = YES_NO[0];
        }
    }

    if (target.classList.contains('want-faster')) {
        target.checked ? showElem(fastRange) : hideElem(fastRange);
    }

    if(target.type === 'checkbox') {
       let textNode = document.querySelector(`.${target.value}_value`);
       if(textNode) {
           textNode.textContent = !target.checked ? YES_NO[0] : YES_NO[1];
       }
    }

    if (target.classList.contains('calc-handler')) {
        priceCalculation(target);
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