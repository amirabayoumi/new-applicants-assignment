// Add your JavaScript here
//first give difintaion to elements in html (declare the variable )

const display = document.querySelector('#input');
const buttons = document.querySelectorAll(
    '.num-key, .operation-key, .percent-key'
);

let currentInput = '';
let previousInput = '';
let operator = null;

// give click option to all buttons and give the condition (how it will work) for operator keys

buttons.forEach(function (button) {
    button.addEventListener('click', function (e) {
        const buttonValue = button.value;

        //reset button
        if (buttonValue == 'Reset') {
            currentInput = '';
            previousInput = '';
            operator = null;

            //delete button
        } else if (buttonValue == 'DEL') {
            currentInput = currentInput.slice(0, -1);

            //calculate button
        } else if (buttonValue == '=') {
            if (currentInput && previousInput && operator) {
                currentInput = operate(previousInput, currentInput, operator);
                previousInput = '';
                operator = null;
            }
            // percentage button
        } else if (buttonValue == '%') {
            currentInput = calculatePercentage(currentInput);

            // all operators buttons
        } else if (isOperator(buttonValue)) {
            if (currentInput && previousInput) {
                previousInput = operate(previousInput, currentInput, operator);
                operator = buttonValue;
                currentInput = '';
            } else if (currentInput) {
                previousInput = currentInput;
                operator = buttonValue;
                currentInput = '';
            }

            // adding new value in right side of existing value
        } else {
            currentInput += buttonValue;
        }
        // what is on display either curnt/perv/or zero
        display.value = currentInput || previousInput || '0';
    });
});

//operations
function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return (a / b).toString();
        default:
            return '0';
    }
}
function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

// the % button directly send the result value to display without click calculate button
function calculatePercentage(value) {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
        return (numericValue / 100).toString();
    } else {
        return '0';
    }
}
