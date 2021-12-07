let health = 100;
let pos = {x: 0, y: 0};
let oreLocations = [];
let pickaxe = items.stickPickaxe;
let axe = items.stickAxe;
let flight = false;
let lastSave = localStorage.getItem("lastSave");

function addItemsToOres() {
    for (let i = 0; i < ores.length; i++) {
        if (items[ores[i].id] === undefined || items[ores[i].id] === null) {
            console.log(`Adding item to ore with id: ${i}`);
            items[ores[i].id] = {
                name: capitalize(camelCaseToRegular(ores[i].id)),
                size: (ores[i].size === undefined || ores[i].size === null) ? 1 : ores[i].size,
                type: (ores[i].commonness === undefined || ores[i].commonness === null) ? undefined : "block"
            };
            if (ores[i].excludeSize) {
                items[ores[i].id].size = undefined;
            }
        }
        if (ores[i].foundBelow === undefined || ores[i].foundBelow === null) {
            ores[i].foundBelow = Infinity;
        }
        if (ores[i].foundAbove === undefined || ores[i].foundAbove === null) {
            ores[i].foundAbove = Infinity;
        }
    }
}

function sizeOfItemsUpdate() {
    for (let j = 0; j < recipes.length; j++) {
        console.log(`Updating item size with recipe id: ${j}`);
        if (items[recipes[j].output.id].size === undefined || items[recipes[j].output.id].size === null) {
            let size = 0;
            for (let i = 0; i < recipes[j].ingredients.length; i++) {
                size += items[recipes[j].ingredients[i].id].size * recipes[j].ingredients[i].count / ((recipes[j].output.count !== 0) ? recipes[j].output.count : 1);
            }
            items[recipes[j].output.id].size = size;
        }
    }
    for (let i = 0; i < recipes.length; i++) {
        if (items[recipes[i].output.id].size === undefined || items[recipes[i].output.id].size === null) {
            sizeOfItemsUpdate();
            break;
        }
    }
}

addItemsToOres();
sizeOfItemsUpdate();
const healthText = document.getElementById("health");
const healthBar = document.getElementById("healthBar");
const inventoryGui = document.getElementById("inventory");
const openInventoryBtn = document.getElementById("openInventory");
let isInventoryOpen = false;
oreLocations[1e9] = [];
oreLocations[1e9][1e9] = "air";
generateOre(pos.x - 1, pos.y);
generateOre(pos.x + 1, pos.y);
generateOre(pos.x, pos.y - 1);
generateOre(pos.x, pos.y + 1);
if (localStorage.getItem("inventoryHTML") !== null) {
    document.getElementById("inventory").innerHTML = localStorage.getItem("inventoryHTML");
}
if (localStorage.getItem("recipesHTML") !== null) {
    document.getElementById("recipes").innerHTML = localStorage.getItem("recipesHTML");
}

function start() {
    document.getElementById('controls').style.display = 'none';
    document.getElementById('main').style.display = '';
    document.getElementById('music').play();
    document.getElementById('music').volume = 0.5;
    addItem("airBlock", 100);
}

function openInventory() {
    isInventoryOpen = true;
    inventoryGui.style.display = "";
    document.getElementById("recipes").style.display = "";
    openInventoryBtn.style.display = "none";
    document.getElementById("closeInventory").style.display = "";
}

function closeInventory() {
    isInventoryOpen = false;
    inventoryGui.style.display = "none";
    document.getElementById("recipes").style.display = "none";
    openInventoryBtn.style.display = "";
    document.getElementById("closeInventory").style.display = "none";
}

function craft(recipe) {
    const canCraft = checkForIngredients(recipe);
    if (canCraft[0]) {
        for (let i = 1; i < canCraft.length; i++) {
            addItem(canCraft[i].id, -canCraft[i].count);
        }
        addItem(recipe.output.id, recipe.output.count);
        if (recipe.output.function !== undefined && recipe.output.function !== null) {
            recipe.output.function();
            addItem("dirt", 0);
        }
        if (items[recipe.output.id].type === "pickaxe" && items[recipe.output.id].strength >= pickaxe.strength) {
            pickaxe = items[recipe.output.id];
        }
        if (items[recipe.output.id].type === "axe" && items[recipe.output.id].durability >= axe.durability) {
            axe = items[recipe.output.id];
        }
    }
}

function updateRecipeBook() {
    let output = "";
    for (let r = 0; r < recipes.length; r++) {
        if (checkForIngredients(recipes[r])[0]) {
            const recipe = recipes[r];
            output += `<button class='recipe' onclick='craft(recipes[${r}]); updateRecipeBook();' oncontextmenu='while (checkForIngredients(recipes[${r}])[0]) {craft(recipes[${r}]); updateRecipeBook();}'><p>${items[String(recipe.output.id)].name} (${recipe.output.count})</p>`;
            for (let c = 0; c < recipe.ingredients.length; c++) {
                output += `<p class='recipeIngredient'>${items[recipe.ingredients[c].id].name} (${(recipe.ingredients[c].count > 0) ? recipe.ingredients[c].count : "1"})</p>`;
            }
            output += "</button>";
        }
    }
    document.getElementById("recipes").innerHTML = "<legend>Recipe Book</legend>" + String(output).replace("undefined", "");
}

function checkForIngredients(recipe) {
    let availableIngredients = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
        for (let j = 0; j < inventory.length; j++) {
            if (inventory[j].id === recipe.ingredients[i].id && inventory[j].count.gten(recipe.ingredients[i].count)) {
                availableIngredients.push({id: recipe.ingredients[i].id, count: recipe.ingredients[i].count});
            }
        }
    }
    availableIngredients.unshift(availableIngredients.length >= recipe.ingredients.length);
    return availableIngredients;
}

function move(direction) {
    if (direction === "l") {
        pos.x--;
    } else if (direction === "r") {
        pos.x++;
    } else if (direction === "u") {
        pos.y++;
    } else if (direction === "d") {
        pos.y--;
    }
    if (oreLocations[pos.x + 1e9] === undefined || oreLocations[pos.x + 1e9][pos.y + 1e9] === undefined || oreLocations[pos.x + 1e9] === null || oreLocations[pos.x + 1e9][pos.y + 1e9] === null) {
        generateOre(pos.x, pos.y);
    }
    if (oreLocations[pos.x + 1e9 - 1] === undefined || oreLocations[pos.x + 1e9 - 1][pos.y + 1e9] === undefined || oreLocations[pos.x + 1e9 - 1] === null || oreLocations[pos.x + 1e9 - 1][pos.y + 1e9] === null) {
        generateOre(pos.x - 1, pos.y);
    }
    if (oreLocations[pos.x + 1e9 + 1] === undefined || oreLocations[pos.x + 1e9 + 1][pos.y + 1e9] === undefined || oreLocations[pos.x + 1e9 + 1] === null || oreLocations[pos.x + 1e9 + 1][pos.y + 1e9] === null) {
        generateOre(pos.x + 1, pos.y);
    }
    if (oreLocations[pos.x + 1e9] === undefined || oreLocations[pos.x + 1e9][pos.y + 1e9 - 1] === undefined || oreLocations[pos.x + 1e9] === null || oreLocations[pos.x + 1e9][pos.y + 1e9 - 1] === null) {
        generateOre(pos.x, pos.y - 1);
    }
    if (oreLocations[pos.x + 1e9] === undefined || oreLocations[pos.x + 1e9][pos.y + 1e9 + 1] === undefined || oreLocations[pos.x + 1e9] === null || oreLocations[pos.x + 1e9][pos.y + 1e9 + 1] === null) {
        generateOre(pos.x, pos.y + 1);
    }
    let canMine = false;
    for (let i = 0; i < ores.length; i++) {
        if ((oreLocations[pos.x + 1e9] !== undefined && oreLocations[pos.x + 1e9] !== null) && ores[i].id === oreLocations[pos.x + 1e9][pos.y + 1e9] && pickaxe.strength >= ores[i].hardness) {
            canMine = true;
            if (oreLocations[pos.x + 1e9][pos.y + 1e9] !== "air") {
                addItem(oreLocations[pos.x + 1e9][pos.y + 1e9], 1);
                for (let i = 0; i < ores.length; i++) {
                    if (ores[i].id === oreLocations[pos.x + 1e9][pos.y + 1e9]) {
                        if (ores[i].deadliness === undefined || ores[i].deadliness === null) {
                            break;
                        } else {
                            health -= ores[i].deadliness;
                            healthText.innerHTML = `${Math.round(health).toLocaleString()} HP`;
                            healthBar.style.width = `${health}%`;
                            if (health <= 0) {
                                die(`You were killed by ${capitalize(camelCaseToRegular(ores[i].id))}`);
                            }
                            break;
                        }
                    }
                }
                oreLocations[pos.x + 1e9][pos.y + 1e9] = "air";
                updateRecipeBook();
            }
        }
    }
    if (!canMine) {
        if (direction === "l") {
            pos.x++;
        } else if (direction === "r") {
            pos.x--;
        } else if (direction === "u") {
            pos.y--;
        } else if (direction === "d") {
            pos.y++;
        }
    } else {
        if (direction === "u") {
            buildBelow();
        }
    }
    updateVision();
    document.body.style.backgroundColor = `hsl(${193 + Math.abs(pos.y) / 1000}, ${100 + pos.y / 100}%, ${50 - Math.abs(pos.y) / 1000}%)`;
    document.getElementById("altitude").innerText = `Altitude: ${pos.y} ft | Position: ${(pos.x >= 0) ? pos.x + " ft" + " east" : -pos.x + " ft" + " west"}`;
}

function buildBelow() {
    let placed = false;
    if (!flight) {
        for (let i = 0; i < inventory.length; i++) {
            if (items[inventory[i].id].type === "block" && inventory[i].count.gten(1)) {
                oreLocations[pos.x + 1e9][pos.y + 1e9 - 1] = inventory[i].id;
                addItem(inventory[i].id, -1);
                placed = true;
                break;
            }
        }
    } else {
        placed = true;
    }
    return placed;
}

function updateVision() {
    document.getElementById("left").innerText = `Left: ${items[oreLocations[pos.x + 1e9 - 1][pos.y + 1e9]].name}`;
    document.getElementById("right").innerText = `Right: ${items[oreLocations[pos.x + 1e9 + 1][pos.y + 1e9]].name}`;
    document.getElementById("up").innerText = `Up: ${items[oreLocations[pos.x + 1e9][pos.y + 1e9 + 1]].name}`;
    document.getElementById("down").innerText = `Down: ${items[oreLocations[pos.x + 1e9][pos.y + 1e9 - 1]].name}`;
}

function capitalize(word) {
    const allWords = word.split(" ");
    for (let i = 0; i < allWords.length; i++) {
        const firstLetter = allWords[i].slice(0, 1);
        allWords[i] = firstLetter.toUpperCase() + allWords[i].slice(1);
    }
    return allWords.join(" ");
}

function uncapitalize(word) {
    const allWords = word.split(" ");
    for (let i = 0; i < allWords.length; i++) {
        const firstLetter = allWords[i].slice(0, 1);
        allWords[i] = firstLetter.toLowerCase() + allWords[i].slice(1);
    }
    return allWords.join(" ");
}

function camelCase(string) {
    const allWords1 = string.split(" ");
    for (let i = 1; i < allWords1.length; i++) {
        allWords1[i] = capitalize(allWords1[i]);
    }
    return allWords1.join("");
}

function camelCaseToRegular(string) {
    while (/[A-Z]/.test(string)) {
        const index = string.match(/[A-Z]/).index;
        const part1 = string.slice(0, index);
        const part2 = string.slice(index);
        string = `${uncapitalize(part1)} ${uncapitalize(part2)}`;
    }
    return string;
}

function generateOre(x, y) {
    let ore;
    let possibleOres = [];
    let maxCommonness = 0;
    for (let o = 0; o < ores.length; o++) {
        if (y >= ores[o].foundAbove && y <= ores[o].foundBelow) {
            const possibleOreLength = possibleOres.length;
            possibleOres.push(ores[o]);
            maxCommonness += ores[o].commonness;
            possibleOres[possibleOreLength].common = maxCommonness;
        }
    }
    const randomNumber = Math.random() * maxCommonness;
    for (let i = 0; i < possibleOres.length; i++) {
        if (randomNumber < possibleOres[i].common) {
            ore = possibleOres[i];
            break;
        }
    }
    if (oreLocations[x + 1e9] === undefined || oreLocations[x + 1e9] === null) {
        oreLocations[x + 1e9] = [];
    }
    oreLocations[x + 1e9][y + 1e9] = ore.id;
}

document.onkeydown = (e) => {
    if (e.keyCode === 69) {
        if (isInventoryOpen) {
            closeInventory();
        } else {
            openInventory();
        }
    } else if (e.keyCode === 38 || e.keyCode === 87) {
        move("u");
    } else if (e.keyCode === 40 || e.keyCode === 83) {
        move("d");
    } else if (e.keyCode === 37 || e.keyCode === 65) {
        move("l");
    } else if (e.keyCode === 39 || e.keyCode === 68) {
        move("r");
    }
}

function exportSave() {
    let output = {};
    output.inventory = inventory;
    output.pickaxe = pickaxe;
    output.axe = axe;
    output.maxSize = maxSize;
    output.health = health;
    output.flight = flight;
    output.items = items;
    output.recipes = recipes;
    output.ores = ores;

    navigator.clipboard.writeText(btoa(JSON.stringify(output))).then(() => {
        alert("Copied save to clipboard! (Auto-adds modded items, ores, and recipes, but it is still recommended to load mods again before importing save data.");
        lastSave = Date.now();
    }, () => {
        alert("Save failed! Try again later, or report it at https://github.com/Dragon77mathbye/bad-mining-game/issues");
    });
    localStorage.setItem("lastSave", lastSave);
}

function importSave() {
    const save = prompt("Save?");
    let input = JSON.parse(atob(save));
    for (let i = 0; i < input.inventory.length; i++) {
        input.inventory[i].count = new hugeNumber(input.inventory[i].count);
    }
    console.log(input);
    inventory = input.inventory;
    pickaxe = input.pickaxe;
    axe = input.axe;
    maxSize = input.maxSize;
    health = input.health;
    flight = input.flight;
    items = input.items;
    ores = input.ores;
    recipes = input.recipes;
    addItemsToOres();
    sizeOfItemsUpdate();
    updateRecipeBook();
    updateInventory();
}

function updateInventory() {
    let totalSize = new hugeNumber(0);
    for (let i = 0; i < inventory.length; i++) {
        totalSize = totalSize.add(inventory[i].count.number() * items[String(inventory[i].id)].size);
    }
    if (totalSize.gt(maxSize)) {
        inventory[placeInInv].count = inventory[placeInInv].count.add((maxSize - totalSize.number()) / items[String(inventory[placeInInv].id)].size);
        totalSize = new hugeNumber(maxSize);
    }
    let output = "";
    inventory.sort(function (a, b) {
        let textA = a.id.toUpperCase();
        let textB = b.id.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    for (let i = 0; i < inventory.length; i++) {
        if (Math.round(inventory[i].count.number() * 10000) / 10000 > 0) {
            const itemSize = simplify(inventory[i].count.number() * items[String(inventory[i].id)].size);
            let message;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                message = "<p class='clickToDrop'>Tap to drop one<br>Hold to drop all</p>";
            } else {
                message = "<p class='clickToDrop'>Click to drop one<br>Right click to drop all</p>";
            }
            output += `<fieldset class='inventoryItem' onclick='addItem("${inventory[i].id}", -1);' oncontextmenu='addItem("${inventory[i].id}", ${-inventory[i].count.number()}); updateRecipeBook();'><p>${items[inventory[i].id].name}</p>${message}<p class='inventoryItemCount'>${simplify(inventory[i].count)} (${itemSize} lbs | ${(itemSize >= (maxSize * 0.5)) ? "Very Heavy" : (itemSize >= (maxSize * 0.25)) ? "Heavy" : (itemSize >= (maxSize * 0.1)) ? "Medium" : (itemSize >= (maxSize * 0.05)) ? "Light" : (itemSize >= (maxSize * 0.001)) ? "Very Light" : "Weightless"})</p></fieldset>`;
        } else {
            inventory[i].count = new hugeNumber(0);
        }
    }
    document.getElementById("inventory").innerHTML = `<legend>Inventory (${totalSize.print()} / ${maxSize.toLocaleString()} lbs full)</legend>${output}<div style='clear: both'></div>`;
}

function die(deathMessage) {
    if (deathMessage === undefined || deathMessage === null) {
        deathMessage = "";
    }
    health = 100;
    inventory = [];
    pos = {x: 0, y: 0};
    addItem("dirt", 1);
    addItem("dirt", -1);
    document.getElementById("main").style.display = "none";
    document.getElementById("deathMessage").style.display = "";
    document.getElementById("deathMessageText").innerHTML = deathMessage;
    document.body.style.backgroundColor = "darkred";
    updateRecipeBook();
}

function ruinTheFun() {
    flight = true;
    pickaxe.durability = Infinity;
    pickaxe.strength = Infinity;
    axe.durability = Infinity;
    maxSize = Infinity;
    health = Infinity;
    for (let i = 0; i < Object.keys(items).length; i++) {
        addItem(Object.keys(items)[i], 1e300);
    }
    updateRecipeBook();
}

function addBlocks(json) {
    ores = ores.concat(json);
    addItemsToOres();
}

function addItems(json) {
    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i++) {
        items[keys[i]] = json[keys[i]];
    }
}

function addRecipes(json) {
    recipes = recipes.concat(json);
    sizeOfItemsUpdate();
}

function addMaterial(id, hasOre, recipeCost, commonness, low, high, hardness, size, hasBar, hasBlock, deadliness) {
    if (hasOre) {
        addBlocks([
            {
                id: id,
                commonness: commonness,
                hardness: hardness,
                foundAbove: low,
                foundBelow: high,
                deadliness: deadliness
            }
        ]);
    }
    eval(`addItems({${id}: {name: capitalize(camelCaseToRegular(id)), size: size}});`);
    eval(`addItems({${id}Pickaxe: {name: capitalize(camelCaseToRegular(id + "Pickaxe")), strength: (hardness < 10) ? hardness + 1 : 10}});`);
    eval(`addItems({${id}Axe: {name: capitalize(camelCaseToRegular(id + "Axe"))}});`);
    if (hasBlock) {
        addBlocks([
            {
                id: `${id}Block`,
                hardness: hardness
            }
        ]);
        eval(`addItems({${id}Block: {name: capitalize(camelCaseToRegular(id)) + " Block", size: size * 4}});`);
        addRecipes([
            {
                ingredients: [
                    {
                        id: id,
                        count: 4
                    }
                ],
                output: {
                    id: `${id}Block`,
                    count: 1
                }
            },
            {
                ingredients: [
                    {
                        id: `${id}Block`,
                        count: 1
                    }
                ],
                output: {
                    id: id,
                    count: 4
                }
            }
        ]);
    }
    if (hasBar) {
        eval(`addItems({${id}Bar: {name: capitalize(camelCaseToRegular(id)), size: size * 2}});`);
        addRecipes([
            {
                ingredients: [
                    {
                        id: id,
                        count: 2
                    },
                    {
                        id: "coal",
                        count: Math.floor(recipeCost / 2)
                    }
                ],
                output: {
                    id: `${id}Bar`,
                    count: 1
                }
            },
            {
                ingredients: [
                    {
                        id: `${id}Bar`,
                        count: recipeCost
                    },
                    {
                        id: "stick",
                        count: Math.round(recipeCost * 0.75)
                    }
                ],
                output: {
                    id: `${id}Pickaxe`,
                    count: 1
                }
            },
            {
                ingredients: [
                    {
                        id: `${id}Bar`,
                        count: recipeCost
                    },
                    {
                        id: "stick",
                        count: Math.round(recipeCost * 0.75)
                    }
                ],
                output: {
                    id: `${id}Axe`,
                    count: 1
                }
            }
        ]);
    } else {
        addRecipes([
            {
                ingredients: [
                    {
                        id: id,
                        count: recipeCost
                    },
                    {
                        id: "stick",
                        count: Math.round(recipeCost * 0.75)
                    }
                ],
                output: {
                    id: `${id}Pickaxe`,
                    count: 1
                }
            },
            {
                ingredients: [
                    {
                        id: id,
                        count: recipeCost
                    },
                    {
                        id: "stick",
                        count: Math.round(recipeCost * 0.75)
                    }
                ],
                output: {
                    id: `${id}Axe`,
                    count: 1
                }
            }
        ]);
    }
    reload();
}

function updateCheatSheets() {
    let output = "<legend>Recipe Cheat Sheet</legend>";
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        output += `<fieldset class="recipe"><p>${items[String(recipe.output.id)].name} (${recipe.output.count})</p>`;
        for (let c = 0; c < recipe.ingredients.length; c++) {
            output += `<p class='recipeIngredient'>${items[recipe.ingredients[c].id].name} (${(recipe.ingredients[c].count > 0) ? recipe.ingredients[c].count : "1"})</p>`;
        }
        output += `</fieldset>`;
    }
    document.getElementById("recipeCheatSheet").innerHTML = output.replaceAll("undefined", "");

    output = "<legend>Ore Cheat Sheet</legend>";
    for (let i = 0; i < ores.length; i++) {
        if (ores[i].commonness !== undefined && ores[i].commonness !== null) {
            let heightRange;
            if (ores[i].foundAbove === -Infinity) {
                heightRange = `Below ${ores[i].foundBelow} ft`;
            } else if (ores[i].foundBelow === Infinity) {
                heightRange = `Above ${ores[i].foundAbove} ft`;
            } else {
                heightRange = `${ores[i].foundAbove} ft to ${ores[i].foundBelow} ft`;
            }
            output += `<fieldset class="recipe"><p><b>${items[ores[i].id].name}</b></p><p>Hardness: ${ores[i].hardness}</p><p>Commonness: ${ores[i].commonness}</p><p>Obtainable Height Range: ${heightRange}</p></fieldset>`;
        }
    }
    document.getElementById("oreCheatSheet").innerHTML = output.replaceAll(undefined, "");
}

async function loadMod(mod, variable) {
    let add = false;
    let text;
    if (variable !== "other") {
        add = confirm("Add to current variable? (OK for appending, Cancel to replace)");
        text = JSON.parse(await mod.text());
    }
    const scriptText = await mod.text();
    if (!add) {
        eval(`${variable} = text`);
    } else {
        if (variable === "items") {
            const keys = Object.keys(text);
            for (let i = 0; i < keys.length; i++) {
                items[keys[i]] = text[keys[i]];
            }
        } else if (variable === "recipes") {
            for (let i = 0; i < text.length; i++) {
                if (text[i].output.function !== undefined && text[i].output.function !== null) {
                    text[i].output.function = eval(text[i].output.function);
                }
            }
            recipes = recipes.concat(text);
        } else if (variable === "ores") {
            ores = ores.concat(text);
        } else if (variable === "other") {
            eval(scriptText);
        }
    }
    reload();
}

function reload() {
    addItemsToOres();
    sizeOfItemsUpdate();
    updateCheatSheets();
    updateInventory();
}

async function loadScript(script) {
    eval(await script.text());
    reload();
}

function navigateTo(location) {
    const locations = ["main", "options"];
    for (let i = 0; i < locations.length; i++) {
        if (locations[i] === location) {
            document.getElementById(locations[i]).style.display = "";
        } else {
            document.getElementById(locations[i]).style.display = "none";
        }
    }
}

setInterval(() => {
    // Healing
    if (health < 100) {
        health++;
    }
    if (health <= 0) {
        die();
    }
    if (health > 100) {
        health = 100;
    }
    healthText.innerHTML = `${Math.round(health).toLocaleString()} HP`;
    healthBar.style.width = `${health}%`;
    const lastSaveRelative = (String(localStorage.getItem("lastSave")) !== "null") ? `${(Date.now() - lastSave) / 1000} ago` : "never";
    document.getElementById("exportSave").innerText = `Export Save (Last saved ${secondsToOtherUnits(lastSaveRelative)})`;
}, 1000);

function secondsToOtherUnits(n) {
    if (typeof n === "number") {
        if (n < 60) {
            return `${Math.floor(n)} sec`;
        } else if (n < 3600) {
            return `${Math.floor(n / 60)} min`;
        } else if (n < 172800) {
            return `${Math.floor(n / 3600)} hr`;
        } else if (n < 315576000) {
            return `${Math.floor(n / 86400)} d`;
        } else {
            return `${Math.floor(n / 31557600)} yr`;
        }
    } else {
        return n;
    }
}

setInterval(() => {
    if (oreLocations[pos.x + 1e9][pos.y + 1e9 - 1] === "air") {
        let placed;
        if (flight) {
            placed = true;
        } else {
            placed = buildBelow();
        }
        if (!placed) {
            move("d");
        }
    }
    updateVision();
}, 1);