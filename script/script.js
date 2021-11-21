let bill_input = document.getElementById("bill");
let people_input = document.getElementById("people");

const btnTip_arr = document.getElementsByClassName("btn-tip");
let customPercent_input = document.getElementById("custom-percent");
const error_p = document.getElementsByClassName("error")[0];

let tip_p = document.getElementById("tip");
let total_p = document.getElementById("total");

function getBill() {
    return parseFloat(bill_input.value) || 0;
};

function getPeople() {
    return parseFloat(people_input.value) || 0;
};

function getPercent() {
    const percent = document.getElementsByClassName("selected")[0];
    const customPercent = customPercent_input.value;
    if (percent) {
        return parseFloat(percent.id);
    };
    if (customPercent) {
        return parseFloat(customPercent);
    };
    return 0;
};

function calculateTip(bill, people, percent) {
    if (people == 0) {
        if (bill != 0 && percent != 0) {
            error_p.classList.add("error-show");
        } else {
            error_p.classList.remove("error-show");
        };
        return 0;
    } else {
        error_p.classList.remove("error-show");
        return (bill / people) * (percent / 100);
    };
};

function calculateTotal(bill, people, percent) {
    if (people == 0) {
        return 0;
    } else {
        return (bill / people) + calculateTip(bill, people, percent);
    };
};

function radioChecked(element) {
    if (element == customPercent_input) {
        customPercent_input.classList.add("custom-selected");
        let percent = parseFloat(customPercent_input.value) || 0;
        if (percent == 0) {
            customPercent_input.addEventListener("input", function() {
                let tip = calculateTip(getBill(), getPeople(), getPercent());
                let total = calculateTotal(getBill(), getPeople(), getPercent());
                showResult(tip, total);
            });
        } else {
            let tip = calculateTip(getBill(), getPeople(), percent);
            let total = calculateTotal(getBill(), getPeople(), percent);
            showResult(tip, total);
        }
    } else {
        element.classList.toggle("selected");
        customPercent_input.classList.remove("custom-selected");
        let percent = parseFloat(element.id);
        let tip = calculateTip(getBill(), getPeople(), percent);
        let total = calculateTotal(getBill(), getPeople(), percent);
        showResult(tip, total);
        console.log(element.id);
    };

    for (let i = 0; i < btnTip_arr.length; i++) {
        if (btnTip_arr[i] != element) {
            btnTip_arr[i].classList.remove("selected");
        };
    };
};

function showResult(tip, total) {
    tip_p.innerHTML = "$" + Math.round(tip * 100) / 100;
    total_p.innerHTML = "$" + Math.round(total * 100) / 100;
};

function main() {
    inputArray = [bill_input, people_input];
    inputArray.forEach(function(element, index) {
        element.addEventListener("input", function() {
            let tip = calculateTip(getBill(), getPeople(), getPercent());
            let total = calculateTotal(getBill(), getPeople(), getPercent());
            showResult(tip, total);
        });
    });
};

main();