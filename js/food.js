let counter = [];
let oven = [];
let fridge = [];

class food {
    constructor(name) {
        this.name = name;
        this.temp = 72;
        this.cooked = 0;
        setInterval(() => {
            this.temp = (this.temp - 72) * 0.9999 + 72;
            this.cooked += this.temp - 120 > 0 ? (this.temp - 120) / 3000 : 0;
        }, 20);
    }
}

setInterval(() => {
    let output = "<legend>Counter</legend>";
    for (let i = 0; i < counter.length; i++) {
        if (counter[i] !== undefined) {
            output += `<br><span>${counter[i].name} | ${Math.round(counter[i].temp)}°F | ${Math.round(counter[i].cooked)}% Cooked</span> <button onmousedown="oven.push(counter[${i}]); delete counter[${i}];" class="foodBtn">Put in Oven</button> <button class="foodBtn" onmousedown="fridge.push(counter[${i}]); delete counter[${i}];">Put in Fridge</button> <button class="foodBtn" onmousedown="player.foodPoints += items[counter[${i}].name].foodValue; delete counter[${i}];">Eat</button><br>`;
        }
    }
    document.getElementById("counter").innerHTML = output;

    let output2 = "<legend>Oven</legend>";
    for (let i = 0; i < oven.length; i++) {
        if (oven[i] !== undefined) {
            output2 += `<br><span>${oven[i].name} | ${Math.round(oven[i].temp)}°F | ${Math.round(oven[i].cooked)}% Cooked</span> <button onmousedown="counter.push(oven[${i}]); delete oven[${i}];" class="foodBtn">Take Out of Oven</button><br>`;
            oven[i].temp = (oven[i].temp - 650) * 0.9995 + 650;
        }
    }

    let output3 = "<legend>Fridge</legend>";

    for (let i = 0; i < fridge.length; i++) {
        if (fridge[i] !== undefined) {
            output3 += `<br><span>${fridge[i].name} | ${Math.round(fridge[i].temp)}°F | ${Math.round(fridge[i].cooked)}% Cooked</span> <button onmousedown="counter.push(fridge[${i}]); delete fridge[${i}];" class="foodBtn">Take Out of Fridge</button><br>`;
            fridge[i].temp = (fridge[i].temp - 35) * 0.995 + 35;
        }
    }
    const index = oven.indexOf(undefined);
    if (index > -1) oven.splice(index, 1);
    document.getElementById("oven").innerHTML = output2;
    document.getElementById("fridge").innerHTML = output3;
}, 50000000);