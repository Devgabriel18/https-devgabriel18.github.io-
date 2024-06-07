const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");
const extraInfo = document.querySelector(".extra-info"); 

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(value) {
    result.innerText = value;
}

function addDigit(digit) {
    if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit;
    }

    updateResult(currentNumber);
}

function setOperator(newOperator) {
    if (currentNumber) {
        calculate();

        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }

    operator = newOperator;
}

function calculate() {
    if (operator === null || firstOperand === null || currentNumber === "") return;

    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break;
        case "×":
            resultValue = firstOperand * secondOperand;
            break;
        case "÷":
            if (secondOperand === 0) {
                alert("Erro: Divisão por zero!");
                clearCalculator();
                return;
            }
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operator = null;
    firstOperand = null;
    restart = true;
    updateResult(currentNumber);
}

function clearCalculator() {
    currentNumber = "";
    firstOperand = null;
    operator = null;
    updateResult("0");
}

function setPercentage() {
    let result = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operator)) {
        result = result * (firstOperand || 1);
    }

    if (result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5).toString();
    }

    currentNumber = result.toString();
    updateResult(currentNumber);
}

// Novas funções de cálculo

function modulo() {
    if (currentNumber && firstOperand !== null) {
        let modResult = (firstOperand % parseFloat(currentNumber)).toString();
        extraInfo.innerText = `Mod: ${modResult}`; 
    }
}

function fatoracao() {
    if (currentNumber) {
        let num = parseInt(currentNumber);
        let fatores = calcularFatores(num);
        extraInfo.innerText = `Fatores de ${num}: ${fatores.join(", ")}`;
    }
}

function calcularFatores(num) {
    let fatores = [];
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            fatores.push(i);
        }
    }
    return fatores;
}

function mdc() {
    if (currentNumber && firstOperand !== null) {
        let num1 = Math.abs(firstOperand);
        let num2 = Math.abs(parseFloat(currentNumber));
        while (num2) {
            let temp = num2;
            num2 = num1 % num2;
            num1 = temp;
        }
        let mdcResult = num1.toString();
        extraInfo.innerText = `MDC: ${mdcResult}`; 
    }
}

function mmc() {
    if (currentNumber && firstOperand !== null) {
        let num1 = Math.abs(firstOperand);
        let num2 = Math.abs(parseFloat(currentNumber));
        let lcm = (num1 * num2) / mdcCalc(num1, num2);
        let mmcResult = lcm.toString();
        extraInfo.innerText = `MMC: ${mmcResult}`; 
    }
}

function mdcCalc(a, b) {
    while (b) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function ehPrimo() {
    if (currentNumber !== "") {
        let num = parseInt(currentNumber);
        let primeResult = isPrime(num) ? "Primo" : "Composto";
        extraInfo.innerText = `Primo/Composto: ${primeResult}`; 
    }
}

function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 === 0 || n % 3 === 0) return false;

    let i = 5;
    while (i * i <= n) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
        i += 6;
    }

    return true;
}

function ehParOuImpar() {
    if (currentNumber !== "") {
        let num = parseInt(currentNumber);
        let parityResult = num % 2 === 0 ? "Par" : "Ímpar";
        extraInfo.innerText = `Par/Ímpar: ${parityResult}`; 
    }
}


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "×", "÷"].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText === "=") {
            calculate();
        } else if (buttonText === "C") {
            clearCalculator();
        } else if (buttonText === "±") {
            currentNumber = (parseFloat(currentNumber || firstOperand) * -1).toString();
            updateResult(currentNumber);
        } else if (buttonText === "%") {
            setPercentage();
        } else if (buttonText === "Mod") {
            modulo();
        } else if (buttonText === "Fatoração") {
            fatoracao();
        } else if (buttonText === "MDC") {
            mdc();
        } else if (buttonText === "MMC") {
            mmc();
        } else if (buttonText === "Primo/Composto") {
            ehPrimo();
        } else if (buttonText === "Par/Ímpar") {
            ehParOuImpar();
        }
    });
});
