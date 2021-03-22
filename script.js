const display = document.getElementById('display');
const keys = document.querySelector('.numbers');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const equalBtn = document.querySelector('.equal-btn');

let result = '';
let currentValue = '';
let previousValue = '';
let operator = '';

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {
    switch(operator) {
        case '+':
            result = add(Number(a), Number(b));
            break;
        case '-':
            result = subtract(Number(a), Number(b));
            break;
        case '*':
            result = multiply(Number(a), Number(b));
            break;
        case '/':
            if(b !== '0') {
                result = divide(Number(a), Number(b))
            } else alert("you can't do that...");
            break;
    }
    return result;
}

//delete button function and event

function backspace() {
    if(display.textContent) {
        display.textContent = display.textContent.split('').slice(0, -1).join('');
        currentValue = display.textContent;
    } else return;
}
deleteBtn.addEventListener('click', () => {
    backspace();
})

//clear function and event // 

function allClear() {
    display.textContent = '';
    currentValue = '';
    previousValue = '';
}
clearBtn.addEventListener('click', () => {
    allClear();
});

//popoulate display and store operands and operators //

keys.addEventListener('click', e => {
    const key = e.target;
    if(key.classList.contains('number-btn')) {
        currentValue += key.textContent;
        display.textContent = currentValue;
    } else if(key.classList.contains('operator-btn') && previousValue === '') {
        operator = key.textContent;
        previousValue = currentValue;
        currentValue = '';
        // console.log(previousValue, operator, currentValue)
    } else if(key.classList.contains('number-btn') && currentValue === '') {
        currentValue += key.textContent;
    } else if(previousValue && operator && currentValue && key.classList.contains('operator-btn')) {
        operate(previousValue, operator, currentValue);
        display.textContent = result;
        // console.log(previousValue, operator, currentValue, result);
        operator = key.textContent;
        currentValue = '';
        previousValue = result;
    } else if(key.classList.contains('operator-btn') && previousValue !== '') {
        // currentValue = display.textContent;
        operator = key.textContent;
        display.textContent = result;
        previousValue = result;
        operate(previousValue, operator, currentValue);
        currentValue = '';
    } else if(key.classList.contains('operator-btn') && previousValue && currentValue && operator) {
        display.textContent = '';
        operate(previousValue, operator, currentValue);
        display.textContent = result;
        currentValue = '';
        previousValue = result;
        result = '';
    }
});

equalBtn.addEventListener('click', e => {
    if(previousValue && currentValue && operator) {
        operate(previousValue, operator, currentValue);
        // console.log(previousValue, operator, currentValue, result)
        currentValue = '';
        operator = '';
        previousValue = result;
        display.textContent = result;
    }
});