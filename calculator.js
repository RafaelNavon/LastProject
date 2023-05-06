
const display = document.querySelector("#display"); //display screen
const numberButtons = document.querySelectorAll(".btn-number"); //number buttons: 0-9 and .
const operationButtons = document.querySelectorAll(".btn-operator"); //operation buttons: +,-,*,/ and %
const equalsButton = document.querySelector("#equal"); // equals button: =
const deleteButton = document.querySelector("#delete"); //delete button: del
const clearButton = document.querySelector("#clear"); //all clear button: C
const previousDisplayValue = document.querySelector(".previousValue"); //previous operand input
const currentDisplayValue = document.querySelector(".currentValue"); //current operand input
let currentValue = "";
let previousValue = "";
let operation = undefined;

const clear = () => {
	previousValue = ""; 
	currentValue = ""; 
	operation = undefined; 
};

const deleteInput = () => {
	currentValue = currentValue.toString().slice(0, -1); 
};

const appendNumber = (number) => {
	if (number === "." && currentValue.includes(".")) return; 
	if (number === "0" && currentValue === "0") return; 
	currentValue = currentValue.toString() + number.toString(); 
};


const chooseOperation = (operation_parameter) => {
	if (currentValue === "") return;
	if (previousValue !== "") {
		operate();
	}
	operation = operation_parameter; 
	previousValue = currentValue; 
	currentValue = ""; 
};


const operate = () => {
	let result; 
	const previous = parseFloat(previousValue); 
	const current = parseFloat(currentValue);
	
	if (isNaN(previous) || (isNaN(current) && operation != "%")) return; 

	switch (operation) {
		case "+":
			result = previous + current;
			break;
		case "-":
			result = previous - current;
			break;
		case "/":
			if (current == 0) {
				clear();
				currentValue = "Error!";
				return;
			} 
			result = previous / current;
			break;
		case "*":
			result = previous * current;
			break;
		case "%":
			result = previous / 100;
			break;
		default:
			return;
	}
	currentValue = Math.round(result * 100) / 100; 
	operation = undefined; 
	previousValue = ""; 
};


const updateDisplay = () => {
	currentDisplayValue.innerText = currentValue; 
	previousDisplayValue.innerText = previousValue; 
};


numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		appendNumber(button.textContent); 
		updateDisplay(); 
	});
});


operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		appendNumber(button.textContent); 
		chooseOperation(button.textContent); 
		updateDisplay(); 
	});
});

equalsButton.addEventListener("click", (button) => {
	operate();
	updateDisplay();
});

clearButton.addEventListener("click", (button) => {
	clear();
	updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
	deleteInput();
	updateDisplay();
});



document.addEventListener("keydown", (e) => {
	
	numbersArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	operationParametersArray = ["+", "-", "*", "/", "%"];
	equalsSymbol = "Enter";
	deleteOne = "Backspace";
	clearAll = "Escape";
	for (let i = 0; i < numbersArray.length; i++) {
		if (e.key === numbersArray[i]) {
			let number = e.key;
			appendNumber(number);
			updateDisplay();
		}
	}
	for (let i = 0; i < operationParametersArray.length; i++) {
		if (e.key === operationParametersArray[i]) {
			let number = e.key;
			let operation_parameter = e.key;
			appendNumber(number);
			chooseOperation(operation_parameter);
			updateDisplay();
		}
	}
	if (e.key === equalsSymbol) {
		operate();
		updateDisplay();
	}
	if (e.key === deleteOne) {
		deleteInput();
		updateDisplay();
	}
	if (e.key === deleteOne) {
		deleteInput();
		updateDisplay();
	}
	if (e.key === clearAll) {
		clear();
		updateDisplay();
	}
});