// app Calculator
const app = () => {
    // init variables/


    // UI elememts
    const displayElement = document.getElementById('display');
    let formula = displayElement.innerText;
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
    const buttons = document.querySelectorAll(".buttons");
    const output = document.querySelector(".result");
    const outputTop = document.querySelector(".last-output");
    const operatorsButtons = document.querySelectorAll(".operators");

    const allButtons = document.querySelectorAll('[data-type=number],[data-type=operator]');
    const numberButtons = document.querySelectorAll('[data-type=number]');
    const operatorButtons = document.querySelectorAll('[data-type=operator]');
    console.log(numberButtons);
    formula = "hello";
    // for each buttons add to input
    allButtons.forEach(button => button.addEventListener('click', (e) => {
        const input = e.target.dataset.value;
        outputTop.innerText += input;
    }));
    //when operator button call operateButtons
    operatorButtons.forEach(button => button.addEventListener('click', operatesButton));

    btnEqual.addEventListener('click', calc);
    btnClear.addEventListener('click', clear);
    btnCorrect.addEventListener('click', correct);

    function operatesButton(e) {
        const input = e.target.dataset.value;
        console.log("operatesButton dataset:"+input);
        console.log("input" + input);
        if (
            outputTop.innerText.includes('+') ||
            outputTop.innerText.includes('*') ||
            outputTop.innerText.includes('-') ||
            outputTop.innerText.includes('/')
        ) {
            console.log('go calc()');
            calc();
        }
        outputTop.innerText += input;

    }
    // get value , split en fonction du operator return operate(+,1,2)
    // operate (+,1,2)

    function calc() {
        //arrondi le result
        let store = getValue(outputTop.innerText);
        if (store == null) {
            return null;
        } else {
            outputTop.innerText = Math.floor(store * 10000) / 10000;
            output.innerText = Math.floor(store * 10000) / 10000;

        }

    }

    function operate(operator, number1, number2) {
        let result;
        const num1 = Number(number1);
        const num2 = Number(number2);
        if (operator == "/") {
            // impossible to divide by 0
            if (num2 === 0) {
                return null;
            }
            result = num1 / num2;
        }
        if (operator == "*") {
            result = num1 * num2;
        }
        if (operator == "+") {
            result = num1 + num2;
        }
        if (operator == "-") {
            result = num1 - num2;
        }
        return result;
    }
    function getValue(formula) {
        console.log("formula:"+formula);
        if (formula.includes('+')) {
            const splitvalues = formula.split('+');
            
            return operate('+', splitvalues[0], splitvalues[1]);

        }
        if (formula.includes('*')) {
            const splitvalues = formula.split('*');
            
            return operate('*', splitvalues[0], splitvalues[1]);
        }
        if (formula.includes('-')) {
            const splitvalues = formula.split('-');
            
            return operate('-', splitvalues[0], splitvalues[1]);
        }
        if (formula.includes('/')) {
            const splitvalues = formula.split('/');
            
            return operate('/', splitvalues[0], splitvalues[1]);
        }

    }

    function clear() {
        outputTop.innerText = "";
        output.innerText = "";
        console.log("clear");
    }    
    function correct() {
        if(outputTop.innerText.length>0){
            outputTop.innerText = outputTop.innerText.slice(0, -1);
        }
        
        
        console.log("correct");
    }

    console.log(operate('+', 2, 3));
    console.log(operate('/', 2, 3));
    console.log(operate('*', 2, 3));
    console.log(operate('-', 2, 3));

    /*
        let arrayCalc1 = [];
        let arrayCalc2 = [];
        function display() {
    
        }
    
        let buttons = Array.from(allButtons);
        buttons.forEach(button => button.addEventListener('click', (e) => {
            console.log("buttonid: " + e.target.id);
            console.log("buttontype: " + e.target.getAttribute("data-type"));
            // if button clicked is digit, we append it to the number to process
            if (e.target.getAttribute("data-type") == 'number') {
                console.log('number!');
                console.log(displayElement.innerText);
                displayElement.innerText += e.target.innerText;
                if(arrayCalc1.length>0){
                    arrayCalc2.push(e.target.innerText);
                }else{
                    
                arrayCalc1.push(e.target.innerText);
                }
    
    
            }
            if ((e.target.getAttribute("data-type") !== 'number')) {
                arrayCalc1 = arrayCalc1.join("");
                console.log("join");
            }
            if (e.target.getAttribute("data-type") == 'operator') {
                console.log('operator!');
                if(arrayCalc1.length>0){
                    console.log("array1 not empty")
                }else{
                    console.log("array1 empty")
                }
            }
    
            if (e.target.getAttribute("data-type") == 'equal') {
                console.log('equal!');
                //operate();
            }
            if (e.target.getAttribute("data-type") == 'clear') {
                console.log('clear!');
                displayElement.innerText="";
                
                //empty the array
                arrayCalc1 = [];
                arrayCalc2.length = 0;
            }
            console.log("arrayCalc1:" + arrayCalc1);
            console.log("arrayCalc2:" + arrayCalc2);
        }))
        */
}

//play app
app();


