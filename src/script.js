// app Calculator
const app = () => {
    // UI elememts

    const display = document.querySelector(".output");
    const mycalc = document.querySelector("#mycalculator");
    const allButtons = document.querySelectorAll('#mycalculator button');

    // for each buttons add to input
    allButtons.forEach(button => button.addEventListener('click', (e) => {
        const key = e.target;
        const currentNum = display.textContent;
        // call function to display result in screen
        const resultToDisplay = createResultToDisplay(key, currentNum, mycalc.dataset);

        // update state of calculator and visual
        display.textContent = resultToDisplay;
        updateCalcLogic(key, mycalc, resultToDisplay, currentNum);
        updateLook(key, mycalc, currentNum);
    }));

    // function to key type of button clicked
    const getKeyType = (key) => {
        const { action } = key.dataset
        if (!action) return 'number'
        if (
            action === 'add' ||
            action === 'substract' ||
            action === 'multiply' ||
            action === 'divide' ||
            action === 'power'
        ) return 'operator'

        // For everything else, return the action
        return action
    }

    // function to display on screen the good element in context to the button used (a number, a decimal, a result of calculate)
    const createResultToDisplay = (key, currentNum, state) => {
        const keyType = getKeyType(key);

        const keyContent = key.textContent;
        const modValue = state.modValue;
        const prevKeyType = state.prevKeyType;

        // if click on number
        if (keyType === 'number') {
            return (currentNum === '0' ||
                prevKeyType === 'operator' ||
                prevKeyType === 'calculate')
                ? keyContent
                : currentNum + keyContent;
        }

        // if decimal button
        if (keyType === 'decimal') {
            if (!currentNum.includes('.')) {
                return currentNum + '.';
            }
            if (prevKeyType === 'operator' || prevKeyType === 'calculate') {
                return '0.';
            }
            return currentNum
        }
        // Change sign
        if (keyType === 'change') {
            if (currentNum > 0) return -Math.abs(currentNum)
            if (currentNum < 0) return Math.abs(currentNum)
            return currentNum
        }
        // operator buttons
        if (keyType === 'operator') {
            const firstValue = mycalc.dataset.firstValue
            const operator = mycalc.dataset.operator

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            return firstValue &&
                operator &&
                prevKeyType !== 'operator' &&
                prevKeyType !== 'calculate'
                ? operate(operator, firstValue, currentNum)
                : currentNum;
        }

        // calculate button
        if (keyType === 'calculate') {
            let firstValue = mycalc.dataset.firstValue;
            const operator = mycalc.dataset.operator;
            let secondValue = currentNum;
            if (firstValue) {
                return (prevKeyType === 'calculate')
                    ? operate(operator, currentNum, modValue)
                    : operate(operator, firstValue, currentNum)
            } else {
                return currentNum;
            }
        }
    }
    // function to update the values in memory
    const updateCalcLogic = (key, calculator, calcValue, currentNum) => {

        const keyType = getKeyType(key);
        const {
            firstValue,
            operator,
            prevKeyType
        } = calculator.dataset
        // save the keytype in a dataset on #calculator.dataset.prevKeyType = keyType;
        calculator.dataset.prevKeyType = keyType;
        if (keyType === 'operator') {
            calculator.dataset.operator = key.dataset.action;

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            calculator.dataset.firstValue =
                (firstValue && operator && prevKeyType !== 'operator' && prevKeyType !== 'calculate')
                    //update calculated value as firstValue
                    ? calcValue
                    // if the are no calculations, set currentNum as the first value
                    : currentNum;
        }

        if (keyType === 'calculate') {

            let secondValue = currentNum;
            if (firstValue) {
                secondValue = calculator.dataset.modValue;
            }
            // set modValue attribute
            calculator.dataset.modValue = secondValue;
        }
    }

    // a function to update the visual aspect of the calculator
    const updateLook = (key, calculator, currentNum) => {
        const keyType = getKeyType(key);
        // remove active state on operator btn
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('active'));
        // add active class to operator button 
        if (keyType === 'operator') key.classList.add('active');

        if (keyType === 'clear') {
            display.innerText = "0";
            delete calculator.dataset.firstValue;
            delete calculator.dataset.prevKeyType;
            delete calculator.dataset.operator;
            delete calculator.dataset.modValue;
        }
        if (keyType === 'correct') {
            if (currentNum.length > 1) {
                // remove last digit of number displayed
                display.innerText = currentNum.substring(0, currentNum.length - 1);
            } else {
                // if we correct on the last number, we display then 0
                display.innerText = 0;
            }
        }
    }

    // a function to do the math between 2 numbers
    function operate(operator, number1, number2) {

        const num1 = Number(number1);
        const num2 = Number(number2);
        const decToRound = 9;
        let result = "";
        if (operator === "divide") {
            // impossible to divide by 0
            if (num2 === 0) {
                return null;
            }
            result = num1 / num2;
        }
        if (operator === "multiply") {
            result = num1 * num2;
        }
        if (operator === "add") {
            result = num1 + num2;
        }
        if (operator === "substract") {
            result = num1 - num2;
        }
        if (operator === "power") {
            result = Math.pow(num1, num2);
        }
        // we round the result to a certain limit so the number can be displayed on screen
        return Math.round(result * Math.pow(10, decToRound)) / Math.pow(10, decToRound);
    }

    // keyboard support
    // we listen to key typing and we simulate a click corresponding to the good button
    document.addEventListener('keydown', (e) => {

        const listOperators = {
            '/': 'divide',
            'x': 'multiply',
            '*': 'multiply',
            '+': 'add',
            '-': 'substract',
            '%': 'percentage'
        }
        // check for key number 
        if (!isNaN(e.key) && e.key !== ' ') {

            document.querySelector(`[data-value="${e.key}"]`).click();
        }
        // check if key pressed is an operator
        if (['/', 'x', '*', '-', '+', '%'].includes(e.key)) {
            document.querySelector(`[data-action="${listOperators[e.key]}"]`).click();
        }
        // check if key pressed is decimal
        if (e.key === '.') {
            document.querySelector('[data-action="decimal"]').click();
        }
        // check if key pressed is enter
        if (e.key === 'Enter' || e.key === '=') {
            document.querySelector('[data-action="calculate"]').click();
        }
        // check if key pressed is C for clear or Delete5
        if (e.key === 'Delete' || e.key === 'c') {
            document.querySelector('[data-action="clear"]').click();
        }
        // check if key pressed is Backspace for correction
        if (e.key === 'Backspace') {
            document.querySelector('[data-action="correct"]').click();
        }
    });
}

//play app
app();


