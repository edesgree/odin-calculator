// app Calculator
const app = () => {
    // init variables/


    // UI elememts
    const displayElement = document.getElementById('display');
    // const btnNumber0 = document.getElementById('number-0');
    // const btnNumber1 = document.getElementById('number-1');
    // const btnNumber2 = document.getElementById('number-2');
    // const btnNumber3 = document.getElementById('number-3');
    // const btnNumber4 = document.getElementById('number-4');
    // const btnNumber5 = document.getElementById('number-5');
    // const btnNumber6 = document.getElementById('number-6');
    // const btnNumber7 = document.getElementById('number-7');
    // const btnNumber8 = document.getElementById('number-8');
    // const btnNumber9 = document.getElementById('number-9');
    // const btnPlus = document.getElementById('plus');
    // const btnMinus = document.getElementById('minus');
    // const btnMultiply = document.getElementById('multiply');
    // const btnDivide = document.getElementById('divide');
    // const btnPercentage = document.getElementById('percentage');
    // const btnPlusMinus = document.getElementById('plus-minus');
    const btnCorrect = document.getElementById('correct');
    const btnClear = document.getElementById('clear');
    // const btnDecimal = document.getElementById('decimal');
    // const btnPower = document.getElementById('power');
    const btnEqual = document.getElementById('equal');

    const display = document.querySelector(".output");
    const outputTop = document.querySelector(".history");

    const allButtons = document.querySelectorAll('#calculator button');
    const numberButtons = document.querySelectorAll('[data-type=number]');
    const operatorButtons = document.querySelectorAll('[data-type=operator]');
    console.log(numberButtons);

    // for each buttons add to input
    allButtons.forEach(button => button.addEventListener('click', (e) => {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        console.log(button);
        console.log(key);
        // save the keytype in a dataset on #calculator
        calculator.dataset.previousKeyType = button.dataset.type;
        if (key.dataset.type === "number") {
            console.log("click a nuumber");
            console.log("previousKeyType" + previousKeyType);

            if (displayedNum === '0' || previousKeyType === 'operator') {
                console.log("displayedNum is 0");
                display.textContent = keyContent;
            } else {

                display.textContent = displayedNum + keyContent;

            }

        }
        if (action) {
            console.log("click action: " + action);
        }

        if (action === 'decimal') {
            console.log("decimal");
            console.log("displayedNum" + displayedNum);
            console.log("previousKeyType" + previousKeyType);
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
                console.log("oula")
            }
            if (previousKeyType === 'operator') {
                console.log("hey");
                display.textContent = '0.';
            }

        }
        if (action === 'add' || action === 'substract' || action === 'multiply' || action === 'divide') {
            // add active state on operator btn

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            if (firstValue && operator && previousKeyType!== 'operator') {
                const calcValue = operate(operator, firstValue, secondValue);
                
                display.textContent = calcValue;
            }
            // add custom attribute to calculator
            key.classList.add('active');
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }
        // remove active state on operator btn
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('active'))

        //calculate
        if (action === 'calculate') {
            console.log('calculate!');
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            display.textContent = operate(operator, firstValue, secondValue);

        }
    }));
    //when operator button call operateButtons
    //operatorButtons.forEach(button => button.addEventListener('click', operatesButton));

    // btnEqual.addEventListener('click', calc);
    btnClear.addEventListener('click', clear);
    btnCorrect.addEventListener('click', correct);

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

    function operate(operator, number1, number2) {
        let result;
        const num1 = Number(number1);
        const num2 = Number(number2);
        if (operator === "divide") {
            // impossible to divide by 0
            if (num2 === 0) {
                return null;
            }
            result = num1 / num2;
        } else if (operator === "multiply") {
            result = num1 * num2;
        } else if (operator === "add") {
            result = num1 + num2;
        } else if (operator === "substract") {
            result = num1 - num2;
        }
        //result =Math.floor(result * 10000) / 10000
        return result;
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
        console.log("clear");
    }
    function correct() {
        if (outputTop.innerText.length > 0) {
            outputTop.innerText = outputTop.innerText.slice(0, -1);
        }


        console.log("correct");
    }

    console.log(operate('+', 2, 3));
    console.log(operate('/', 2, 3));
    console.log(operate('*', 2, 3));
    console.log(operate('-', 2, 3));


}

//play app
app();


