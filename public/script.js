// app Calculator
const app = () => {
    // init variables/


    // UI elememts

    
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

      
        
        // save the keytype in a dataset on #calculator
        calculator.dataset.previousKeyType = button.dataset.type;

        if (!action) {
           
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                //console.log("displayedNum is 0");
                display.textContent = keyContent;
            } else {

                display.textContent = displayedNum + keyContent;

            }

        }
        if (action) {
            console.log("click action: " + action);
        }

        if (action === 'decimal') {
            // console.log("decimal");
            // console.log("displayedNum" + displayedNum);
            // console.log("previousKeyType" + previousKeyType);
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
                
            }
            if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                
                display.textContent = '0.';
            }

        }
        if (action === 'add' || action === 'substract' || action === 'multiply' || action === 'divide') {
            // add active state on operator btn

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = operate(operator, firstValue, secondValue);

                display.textContent = calcValue;

                //update calculated value as firstValue
                calculator.dataset.firstValue = calcValue;
            } else {
                // if the are no calculations, set displayedNum as the first value
                calculator.dataset.firstValue = displayedNum;

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
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }
                display.textContent = operate(operator, firstValue, secondValue);
            }
            // set modValue attribute
            calculator.dataset.modValue = secondValue;

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

    // do the math between 2 numbers
    function operate(operator, number1, number2) {

        const num1 = Number(number1);
        const num2 = Number(number2);
        const decToRound = 12;
        let result="";
        if (operator === "divide") {
           
           
            // impossible to divide by 0
            if (num2 === 0) {
                return null;
            }
            result= num1 / num2;
        }
        if (operator === "multiply") {
            result= num1 * num2;
        }
        if (operator === "add") {
            result= num1 + num2;
        }
        if (operator === "substract") {
            result= num1 - num2;
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
    function correct() {
        if (display.innerText.length > 0) {
            display.innerText = display.innerText.slice(0, -1);
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


