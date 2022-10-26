// app Calculator
const app = () => {
    // UI elememts

    const display = document.querySelector(".output");
    const allButtons = document.querySelectorAll('#calculator button');

    // for each buttons add to input
    allButtons.forEach(button => button.addEventListener('click', (e) => {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        // call function to display result in screen
        const resultString = createResultString(key, displayedNum, calculator.dataset);

        // update state of calculator and visual
        display.textContent = resultString;
        updateCalculatorState(key, calculator, resultString, displayedNum);
        updateVisualState(key, calculator,displayedNum);
    }));

    // function to key type of button clicked
    const getKeyType = (key) => {
        const { action } = key.dataset
        if (!action) return 'number'
        if (
            action === 'add' ||
            action === 'substract' ||
            action === 'multiply' ||
            action === 'divide'
        ) return 'operator'
        // For everything else, return the action
        return action
    }

    // function to display on screen the good element in context to the button used (a number, a decimal, a result of calculate)
    const createResultString = (key, displayedNum, state) => {
        const keyType = getKeyType(key);

        const keyContent = key.textContent;
        const modValue = state.modValue;
        const previousKeyType = state.previousKeyType;


        // if click on number
        if (keyType === 'number') {
            return (displayedNum === '0' ||
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate')
                ? keyContent
                : displayedNum + keyContent;
        }

        // if decimal button
        if (keyType === 'decimal') {
            if (!displayedNum.includes('.')) {
                return displayedNum + '.';
            }
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                return '0.';
            }
            return displayedNum
        }

        // operator buttons
        if (keyType === 'operator') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            return firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
                ? operate(operator, firstValue, displayedNum)
                : displayedNum;
        }

        // calculate button
        if (keyType === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            if (firstValue) {
                return (previousKeyType === 'calculate')
                    ? operate(operator, displayedNum, modValue)
                    : operate(operator, firstValue, displayedNum)
            } else {
                return displayedNum;
            }
        }
    }
    // function to update the values in memory
    const updateCalculatorState = (key, calculator, calcValue, displayedNum) => {

        const keyType = getKeyType(key);
        const {
            firstValue,
            operator,
            modValue,
            previousKeyType
        } = calculator.dataset
        // save the keytype in a dataset on #calculator
        calculator.dataset.previousKeyType = keyType;

        if (keyType === 'operator') {
            calculator.dataset.operator = key.dataset.action;

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            calculator.dataset.firstValue =
                (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate')
                    //update calculated value as firstValue
                    ? calcValue
                    // if the are no calculations, set displayedNum as the first value
                    : displayedNum;
        }

        if (keyType === 'calculate') {

            let secondValue = displayedNum;
            if (firstValue) {
                secondValue = calculator.dataset.modValue;
            }
            // set modValue attribute
            calculator.dataset.modValue = secondValue;
        }

    
    }
    // a function to update the visual aspect of the calculator
    const updateVisualState = (key, calculator,displayedNum) => {
        const keyType = getKeyType(key);
        // remove active state on operator btn
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('active'));
        // add active class to operator button 
        if (keyType === 'operator') key.classList.add('active');

        if (keyType === 'clear') {
            display.innerText = "0";
            delete calculator.dataset.firstValue;
            delete calculator.dataset.previousKeyType;
            delete calculator.dataset.operator;
            delete calculator.dataset.modValue;
            console.log("clear");
        }
        if (keyType === 'correct') {
            if (displayedNum.length > 1) {
                display.innerText = displayedNum.substring(0, displayedNum.length - 1);
            }else{
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
        // we round the result to a certain limit so the number can be displayed on screen
        return Math.round(result * Math.pow(10, decToRound)) / Math.pow(10, decToRound);
    }

}

//play app
app();


