//Basic functions
function add(a,b) {
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function power(a,b){
    return a**b;
}

//Operation
let firstNumber = "0";
let operator = "+";
let secondNumber = "0";
let writeToFirst = true;

function operate(firstNum,op,secondNum){
    console.log("Inside operate()1", firstNum,op,secondNum)
    const a = Number(firstNum);
    const b = Number(secondNum);
    console.log("Inside operate()2",a,b)

    if(op === "/" && b === 0){
        return "Math error";
    }

    switch(op){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        case "^":
            return power(a,b);
        default:
            return "Err";
    };
}

//UI stuff
const display = document.querySelector("#display")
const numButtons = document.querySelector("#buttons")

function limitTo10Digits(num) {
    if(num.at(num.length-1)===".") return num;
    const [intPart, decPart = ""] = num.split(".");
    
    if (intPart.length >= 10) {
        return intPart.slice(0, 10);
    }

    const allowedDecimals = 10 - intPart.length;
    const rounded = Number(num).toFixed(allowedDecimals);
    
    return parseFloat(rounded).toString();
}

function updateDisplay(){
    display.textContent = writeToFirst? firstNumber:secondNumber;
}

function clear() {
    firstNumber ="0";
    operator = "+";
    secondNumber = "0";
    document.querySelectorAll(".selected").forEach((elem) => {
        elem.classList.remove("selected");
    });
    writeToFirst=true;
}

function del() {
    if(writeToFirst){
        if(firstNumber.length !== 1){
            firstNumber = firstNumber.slice(0,-1);
        }
        else if(firstNumber !== "0"){
            firstNumber = "0";
        }
    }
    else{
        if(secondNumber.length !== 1){
            secondNumber = secondNumber.slice(0,-1);
        }
        else if(secondNumber !== "0"){
            secondNumber = "0";
        } 
    }

}

function operateStep(elem) {
    document.querySelectorAll(".selected").forEach((el) => {
        el.classList.remove("selected");
    });
    elem.classList.add("selected");

    operator = String(elem.value);
    writeToFirst = false;
}

function type(val) {
    if(writeToFirst){
        firstNumber = (firstNumber === "0") ? val : firstNumber + val;
    }
    else{
        secondNumber = (secondNumber === "0") ? val : secondNumber + val;
    }
}

function typePoint(){
    if(writeToFirst){
        if(!firstNumber.includes(".")){
            firstNumber+=".";
        }
    }
    else{
        if(!secondNumber.includes(".")){
            secondNumber+=".";
        }
    }
}


numButtons.addEventListener("click",(e)=>{
    if(e.target.matches(".operand")){
        const current = writeToFirst? firstNumber:secondNumber;
        if(current.length<=9)
            type(e.target.value);
        else if(current.includes(".") && current.length===10)
            type(e.target.value);
    }
    else if(e.target.matches("#AC")){
        clear();
    }
    else if (e.target.matches("#DEL")){
        del();
    }
    else if (e.target.matches(".operator")){
        operateStep(e.target);
    }
    else if(e.target.matches("#calc")){
        const result = operate(firstNumber,operator,secondNumber);
        console.log("result: ",result);
        clear();
        firstNumber=String(result);
        firstNumber = limitTo10Digits(firstNumber);
    }
    else if(e.target.matches("#point")){
        typePoint();
    }
    updateDisplay();
}); 

const numbers ="0123456789";
const operators = "+-*/^";

document.addEventListener("keydown",(e)=>{
    e.preventDefault();
    if(numbers.includes(e.key)){
        const current = writeToFirst? firstNumber:secondNumber;
        if(current.length<=9)
            type(e.key);
        else if(current.includes(".") && current.length===10)
            type(e.key);
    }
    else if (e.key === "Backspace"){
        del();
    }
    else if (operators.includes(e.key)){
        let elem = null;
        if(e.key === "+"){
            elem = document.querySelector("#plus");
            
        }
        else if(e.key === "-"){
            elem = document.querySelector("#minus");
        }
        else if(e.key === "*"){
            elem = document.querySelector("#times");
        }
        else if(e.key === "/"){
            elem = document.querySelector("#divide");
        }
        else if(e.key === "^"){
            elem = document.querySelector("#power");
        }
        
        operateStep(elem);
    }
    else if(e.key === "="){
        const result = operate(firstNumber,operator,secondNumber);
        clear();
        firstNumber=String(result);
        firstNumber = limitTo10Digits(firstNumber);
    }
    else if(e.key === "."){
        typePoint();
    }
    updateDisplay();
});



