"use strict";

let operand1, operand2, operator, answer, userAnswer;
let numButtonSelector = document.querySelectorAll("input[name='numberType']");
let operand1Selector = document.querySelector("#operand1");
let operand2Selector = document.querySelector("#operand2");
let operatorSelector = document.querySelector("#operator");
let userInputSelector = document.querySelector("#userInput");
let newFlashCardButton = document.querySelector("#getFlashCard");
let checkAnswerButton = document.querySelector("#checkAnswer");

let getRandInt = (min, max) =>
{
    return Math.floor(Math.random() * max) + min;
}

let getRandFloat = (min, max, decimals) =>
{
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
}

let getNewCard = () =>
{
    let operation = getRandInt(1, 4);

    switch(operation)
    {
        case 1:
            operator = '+';
            getAddEquation();
            operand1Selector.innerText = operand1;
            operand2Selector.innerText = operand2;
            operatorSelector.innerText = operator;
            break;
        case 2:
            operator = '-';
            getSubEquation();
            operand1Selector.innerText = operand1;
            operand2Selector.innerText = operand2;
            operatorSelector.innerText = operator;
            break;
        case 3:
            operator = 'x';
            getMultEquation();
            operand1Selector.innerText = operand1;
            operand2Selector.innerText = operand2;
            operatorSelector.innerText = operator;
            break;
        case 4:
            operator = '÷';
            getDivEquation();
            operand1Selector.innerText = operand1;
            operand2Selector.innerText = operand2;
            operatorSelector.innerText = operator;
            break;
        default:
            break;
    }
}

let getAddEquation = () =>
{
    if(getNumType() > 0)
    {
        operand1 = getRandInt(1, 999);
        operand2 = getRandInt(1, 999);
        answer = operand1 + operand2;
    }
    else
    {
        operand1 = getRandFloat(1.0, 999.999, 3);
        operand2 = getRandFloat(1.0, 999.999, 3);
        answer = Number((operand1 + operand2).toFixed(3));
    }
}

let getSubEquation = () =>
{
    let a, b;

    if(getNumType() > 0)
    {
        a = getRandInt(1, 999);
        b = getRandInt(1, 999);

        operand1 = Math.max(a, b);
        operand2 = Math.min(a, b);
        answer = operand1 - operand2;
    }
    else
    {
        a = getRandFloat(1.0, 999.999, 3);
        b = getRandFloat(1.0, 999.999, 3);

        operand1 = Number(Math.max(a, b).toFixed(3));
        operand2 = Number(Math.min(a, b).toFixed(3));
        answer = Number((operand1 - operand2).toFixed(3));
    }
}

let getMultEquation = () =>
{
    if(getNumType() > 0)
    {
        operand1 = getRandInt(1, 50);
        operand2 = getRandInt(1, 50);
        answer = operand1 * operand2;
    }
    else
    {
        operand1 = getRandFloat(1.0, 50.0, 3);
        operand2 = getRandFloat(1.0, 50.0, 3);
        answer = Number((operand1 * operand2).toFixed(3));
    }
}

let getDivEquation = () =>
{
    if(getNumType() > 0)
    {
        operand2 = getRandInt(1, 50);
        operand1 = operand2 * getRandInt(1, 50);
        answer = operand1 / operand2;
    }
    else
    {
        operand2 = getRandFloat(1, 50, 3);
        operand1 = Number((operand2 * getRandFloat(1, 50, 3)).toFixed(3));
        answer = Number((operand1 / operand2).toFixed(3));
    }
}

let getNumType = () =>
{
    let result;

    numButtonSelector.forEach((button) =>
    {
        if(button.checked)
        {
            if(button.value === "int")
            {
                result = 1;
                operand1Selector.classList.contains("decimal") ? operand1Selector.classList.remove("decimal") : false;
                operand2Selector.classList.contains("decimal") ? operand2Selector.classList.remove("decimal") : false;
                operatorSelector.classList.contains("decimal") ? operatorSelector.classList.remove("decimal") : false;
                userInputSelector.classList.contains("decimal") ? userInputSelector.classList.remove("decimal") : false;
            }
            else
            {
                result = -1;
                !operand1Selector.classList.contains("decimal") ? operand1Selector.classList.add("decimal") : false;
                !operand2Selector.classList.contains("decimal") ? operand2Selector.classList.add("decimal") : false;
                !operatorSelector.classList.contains("decimal") ? operatorSelector.classList.add("decimal") : false;
                !userInputSelector.classList.contains("decimal") ? userInputSelector.classList.add("decimal") : false;
            }
        }
    });

    return result;
}

let isNumeric = (value) =>
{
    return !isNaN(parseInt(value)) && isFinite(value);
}

userInputSelector.addEventListener("change", (e) =>
{
   if(e.target && !isNumeric(e.target.value))
   {
       e.target.value = "";
   }
});

newFlashCardButton.addEventListener("click", (e) =>
{
    e.preventDefault();

    userInputSelector.value = "";
    userInputSelector.style.color = "black";
    getNewCard();
});

checkAnswerButton.addEventListener("click", (e) =>
{
    e.preventDefault();
    let isInt;

    if(getNumType() > 0)
    {
        isInt = true;
        if(userInputSelector.value === "")
        {
            userAnswer = 0;
        }
        else
        {
            userAnswer = parseInt(userInputSelector.value);
        }
    }
    else
    {
        isInt = false;
        if(userInputSelector.value === "")
        {
            userAnswer = 0.0;
        }
        else
        {
            userAnswer = parseFloat(userInputSelector.value).toFixed(3);
        }
    }

    if(isInt)
    {
        if(parseInt(userAnswer) === answer)
        {
            userInputSelector.style.color = "green";
        }
        else
        {
            userInputSelector.style.color = "red";
        }
    }
    else
    {
        if(Number(userAnswer) === answer)
        {
            userInputSelector.style.color = "green";
        }
        else
        {
            userInputSelector.style.color = "red";
        }
    }

});
