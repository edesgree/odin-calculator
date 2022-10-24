// app Calculator
const app = () => {
    // init variables/


    // UI elememts


    const btnCorrect = document.getElementById('correct');
    const btnClear = document.getElementById('clear');


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
        updateVisualState(key, calculator);


    }));
    const getKeyType = (key) => {
        const { action } = key.dataset
        if (!action) return 'number'
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) return 'operator'
        // For everything else, return the action
        return action
    }
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

        if (keyType === 'clear') {
            display.innerText = "0";
            delete calculator.dataset.firstValue;
            delete calculator.dataset.previousKeyType;
            delete calculator.dataset.operator;
            delete calculator.dataset.modValue;
            console.log("clear");
        }
        if (keyType === 'correct') {
            console.log("displayedNum.length "+displayedNum.length );
            if (displayedNum.length > 1) {
                display.innerText = displayedNum.substring(0, displayedNum.length - 1);
            }else{
                display.innerText = 0;
            }
        }
    }
    const updateVisualState = (key, calculator) => {
        const keyType = getKeyType(key);
        // remove active state on operator btn
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('active'));
        // add custom attribute to calculator
        if (keyType === 'operator') key.classList.add('active');
    }

    //when operator button call operateButtons
    //operatorButtons.forEach(button => button.addEventListener('click', operatesButton));

    // btnEqual.addEventListener('click', calc);
    //btnClear.addEventListener('click', clear);
    //btnCorrect.addEventListener('click', correct);

    // function operatesButton(e) {
    //     const input = e.target.innerText;
    //     console.log("operatesButton dataset:" + input);
    //     console.log("input" + e.target.innerText);
    //     if (
    //         outputTop.innerText.includes('+') ||
    //         outputTop.innerText.includes('*') ||
    //         outputTop.innerText.includes('-') ||
    //         outputTop.innerText.includes('/')
    //     ) {
    //         console.log('go calc()');
    //         calc();
    //     }
    //     outputTop.innerText += input;
    //     console.log("outputTop.innerText" + outputTop.innerText);
    // }



    // function calc() {
    //     //arrondi le result
    //     let store = getValue(outputTop.innerText);
    //     if (store == null) {
    //         return null;
    //     } else {
    //         outputTop.innerText = Math.floor(store * 10000) / 10000;
    //         display.innerText = Math.floor(store * 10000) / 10000;

    //     }

    // }

    // do the math between 2 numbers
    function operate(operator, number1, number2) {

        const num1 = Number(number1);
        const num2 = Number(number2);
        const decToRound = 12;
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

    // function getValue(formula) {
    //     console.log("formula:" + formula);
    //     if (formula.includes('+')) {
    //         const splitvalues = formula.split('+');
    //         console.log("splitvalues[0], splitvalues[1]:" + splitvalues[0] + "," + splitvalues[1]);
    //         return operate('add', splitvalues[0], splitvalues[1]);

    //     }
    //     if (formula.includes('*')) {
    //         const splitvalues = formula.split('*');
    //         console.log("splitvalues[0], splitvalues[1]:" + splitvalues[0] + "," + splitvalues[1]);
    //         return operate('multiply', splitvalues[0], splitvalues[1]);
    //     }
    //     if (formula.includes('-')) {
    //         const splitvalues = formula.split('-');
    //         console.log("splitvalues[0], splitvalues[1]:" + splitvalues[0] + "," + splitvalues[1]);
    //         return operate('substract', splitvalues[0], splitvalues[1]);
    //     }
    //     if (formula.includes('/')) {
    //         const splitvalues = formula.split('/');
    //         console.log("splitvalues[0], splitvalues[1]:" + splitvalues[0] + "," + splitvalues[1]);
    //         return operate('divide', splitvalues[0], splitvalues[1]);
    //     }

    // }

    function clear() {
        outputTop.innerText = "";
        display.innerText = "0";
        delete calculator.dataset.firstValue;
        delete calculator.dataset.previousKeyType;
        delete calculator.dataset.operator;
        delete calculator.dataset.modValue;
        console.log("clear");
    }
    // function correct() {
    //     if (display.innerText.length > 0) {
    //         display.innerText = display.innerText.slice(0, -1);
    //     }


    //     console.log("correct");
    // }

    console.log(operate('+', 2, 3));
    console.log(operate('/', 2, 3));
    console.log(operate('*', 2, 3));
    console.log(operate('-', 2, 3));


}

//play app
app();


