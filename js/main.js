// noinspection DuplicatedCode

let settings = {aiTooltips: false, mapSize: 15, blockTextures: true};
let liquids = [];
let player = {
    falling: false,
    health: 100,
    foodPoints: 100,
    drinkPoints: 100,
    maxHealth: 100,
    maxFood: 100,
    maxDrink: 100,
    flight: false,
    pickaxe: items.stickPickaxe,
    axe: items.stickAxe,
    pos: {x: ~~(Math.random() - 0.5 * 10 ** (Math.random() * 6)), y: 1},
    size: {w: 2, h: 6},
    lastDirection: "l",
    tempMod: 0,
    bodyTemperature: 98.6
};
let game = {
    time: 7000
};
let debug = {
    frames: 0,
    lastSave: localStorage.getItem("lastSave"),
    liquidLoopIds: [],
    oreLocations: [],
    liquidLocations: [],
    textures: {
        item: [],
        block: []
    },
    loadTextures: () => {
        let output = "";
        for (const key in items)
            output += `<img alt='${key}' src='textures/item/${key}.png' onload="debug.textures.item.push('${key}'); document.getElementById('textureProgress').value = (debug.textures.item.length + debug.textures.block.length) / (Object.keys(items).length + ores.length);">`;
        for (const ore of ores)
            output += `<img alt='${ore.id}' src='textures/block/${ore.id}.png' onload="debug.textures.block.push('${ore.id}'); document.getElementById('textureProgress').value = (debug.textures.item.length + debug.textures.block.length) / (Object.keys(items).length + ores.length);">`;
        document.getElementById("debugTextureLoading").innerHTML = output;
    }
}

function addItemsToOres() {
    for (let i = 0; i < ores.length; i++) {
        if (items[ores[i].id] === undefined || items[ores[i].id] === null) {
            items[ores[i].id] = {
                name: capitalize(camelCaseToRegular(ores[i].id)),
                size: ores[i].size === undefined || ores[i].size === null ? 1 : ores[i].size,
                types: ores[i].commonness === undefined || ores[i].commonness === null ? ["block"] : []
            };
            for (const k of Object.keys(ores[i])) {
                items[ores[i].id][k] = ores[i][k];
            }
            if (ores[i].excludeSize) items[ores[i].id].size = undefined;
            if (ores[i].types.includes("liquid")) {
                name += " Bucket";
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

function itemsUpdate() {
    for (const key in items) {
        if (items[key].types === undefined) {
            items[key].types = [];
        }
    }
    for (let o = 0; o < ores.length; o++) {
        const minHeight = ores[o].foundAbove !== -Infinity ? ores[o].foundAbove : -1000000;
        const maxHeight = ores[o].foundBelow !== Infinity ? ores[o].foundBelow : 1000000;
        const distanceFrom0 = Math.abs(ores[o].foundBelow) > Math.abs(ores[o].foundAbove) ? Math.abs(ores[o].foundAbove) : Math.abs(ores[o].foundBelow);
        const overallCommonness = ores[o].commonness * (maxHeight - minHeight + 1) - distanceFrom0;
        let setRarity;
        if (overallCommonness >= 2000000) {
            setRarity = "Common";
        } else if (overallCommonness >= 60000) {
            setRarity = "Uncommon";
        } else if (overallCommonness >= 15000) {
            setRarity = "Rare";
        } else if (overallCommonness >= 5000) {
            setRarity = "Epic";
        } else if (overallCommonness >= -50000) {
            setRarity = "Legendary";
        } else {
            setRarity = "Mythical";
        }
        if (!items[ores[o].id].types.includes("block") && items[ores[o].id].rarity === undefined) {
            items[ores[o].id].rarity = setRarity;
        }
    }
    for (let j = 0; j < recipes.length; j++) {
        if (items[recipes[j].output.id].size === undefined || items[recipes[j].output.id].size === null) {
            let size = 0;
            for (let i = 0; i < recipes[j].ingredients.length; i++) {
                size += items[recipes[j].ingredients[i].id].size * recipes[j].ingredients[i].count / (recipes[j].output.count !== 0 ? recipes[j].output.count : 1);
            }
            items[recipes[j].output.id].size = size;
        }
        if (items[recipes[j].output.id].rarity === undefined || items[recipes[j].output.id].rarity === null) {
            const rarities = {undefined: -1, Common: 0, Uncommon: 1, Rare: 2, Epic: 3, Legendary: 4, Mythical: 5};
            let highestRarity = -1;
            for (let i = 0; i < recipes[j].ingredients.length; i++) {
                if (rarities[String(items[recipes[j].ingredients[i].id].rarity)] > highestRarity) {
                    /* if (rarities[String(items[recipes[j].ingredients[i].id].rarity)] === -1) {
                        itemsUpdate();
                    } */
                    highestRarity = rarities[items[recipes[j].ingredients[i].id].rarity];
                }
            }
            items[recipes[j].output.id].rarity = highestRarity === 5 ? "Mythical" : highestRarity === 4 ? "Legendary" : highestRarity === 3 ? "Epic" : highestRarity === 2 ? "Rare" : highestRarity === 1 ? "Uncommon" : highestRarity === 0 ? "Common" : undefined;
        }
    }
    for (let i = 0; i < recipes.length; i++) {
        if (items[recipes[i].output.id].size === undefined || items[recipes[i].output.id].size === null || items[recipes[i].output.id].rarity === undefined || items[recipes[i].output.id].rarity === null) {
            itemsUpdate();
            break;
        }
    }
}

const healthText = document.getElementById("health");
const healthBar = document.getElementById("healthBar");
const inventoryGui = document.getElementById("inventory");
const openInventoryBtn = document.getElementById("openInventory");
let isInventoryOpen = false;
debug.oreLocations[0] = [];
generateOre(player.pos.x - 1, player.pos.y);
generateOre(player.pos.x + 1, player.pos.y);
generateOre(player.pos.x, player.pos.y - 1);
generateOre(player.pos.x, player.pos.y + 1);
debug.oreLocations[0][0] = {id: "air"};

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
    reload();
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
        if (items[recipe.output.id].types.includes("pickaxe") && items[recipe.output.id].strength >= player.pickaxe.strength) {
            player.pickaxe = items[recipe.output.id];
        }
        if (items[recipe.output.id].types.includes("axe") && items[recipe.output.id].durability >= player.axe.durability) {
            player.axe = items[recipe.output.id];
        }
    }
}

function recycle(id) {
    if (items[id].recycle !== undefined) {
        addItem(id, -1);
        for (let i = 0; i < items[id].recycle.length; i++) {
            addItem(items[id].recycle[i].id, items[id].recycle[i].count);
        }
    }
}

function rarityColor(rarity) {
    if (rarity === "Mythical") {
        return "#08f";
    } else if (rarity === "Legendary") {
        return "#f80";
    } else if (rarity === "Epic") {
        return "#f0f";
    } else if (rarity === "Rare") {
        return "#0ff";
    } else if (rarity === "Uncommon") {
        return "#ff4";
    } else {
        return "#fff";
    }
}

function updateRecipeBook() {
    let output = "";
    for (let r = 0; r < recipes.length; r++) {
        if (checkForIngredients(recipes[r])[0]) {
            const recipe = recipes[r];
            const rarityColor1 = rarityColor(items[recipe.output.id].rarity);
            output += `<button class='recipe' onclick='craft(recipes[${r}]); updateRecipeBook();' oncontextmenu='while (checkForIngredients(recipes[${r}])[0]) {craft(recipes[${r}]); updateRecipeBook();}'><p style="color: ${rarityColor1};">${items[String(recipe.output.id)].name} (${recipe.output.count})</p>`;
            for (let c = 0; c < recipe.ingredients.length; c++) {
                const {count, id, name} = recipe.ingredients[c];
                const rarity = items[id].rarity;
                let color = rarityColor(rarity);
                output += `<p class='recipeIngredient' style="color: ${color};">${items[Array.isArray(name) ? id[0] : id].name} (${count > 0 ? count : "1"})</p>`;
            }
            output += "</button>";
        }
    }

    document.getElementById("recipes").innerHTML = "<legend>Recipe Book</legend>" + String(output).replace("undefined", "");
}

function checkForIngredients(recipe, inv) {
    inv = inventory || inv;
    let availableIngredients = [];
    for (let i = 0; i < recipe.ingredients.length; i++) {
        for (let j = 0; j < inv.length; j++) {
            const {count, id} = recipe.ingredients[i];
            if ((inv[j].id === id || Array.isArray(id) && id.includes(inv[j].id)) && inv[j].count.gten(count)) {
                availableIngredients.push({id: id, count: count});
            }
        }
    }
    availableIngredients.unshift(availableIngredients.length >= recipe.ingredients.length);
    return availableIngredients;
}

function isLiquid(x, y) {
    for (let i = 0; i < ores.length; i++) {
        if (debug.oreLocations[x] === undefined)
            return false;
        if (debug.oreLocations[x][y] && ores[i].id === debug.oreLocations[x][y].id) {
            if (ores[i].types !== undefined) {
                return ores[i].types.includes("liquid");
            } else {
                return false;
            }
        }
    }
}

function generateAroundPlayer() {
    if (debug.oreLocations[player.pos.x] === undefined || debug.oreLocations[player.pos.x][player.pos.y] === undefined || debug.oreLocations[player.pos.x] === null || debug.oreLocations[player.pos.x][player.pos.y] === null) {
        generateOre(player.pos.x, player.pos.y);
    }
    if (debug.oreLocations[player.pos.x - 1] === undefined || debug.oreLocations[player.pos.x - 1][player.pos.y] === undefined || debug.oreLocations[player.pos.x - 1] === null || debug.oreLocations[player.pos.x - 1][player.pos.y] === null) {
        generateOre(player.pos.x - 1, player.pos.y);
    }
    if (debug.oreLocations[player.pos.x + 1] === undefined || debug.oreLocations[player.pos.x + 1][player.pos.y] === undefined || debug.oreLocations[player.pos.x + 1] === null || debug.oreLocations[player.pos.x + 1][player.pos.y] === null) {
        generateOre(player.pos.x + 1, player.pos.y);
    }
    if (debug.oreLocations[player.pos.x] === undefined || debug.oreLocations[player.pos.x][player.pos.y - 1] === undefined || debug.oreLocations[player.pos.x] === null || debug.oreLocations[player.pos.x][player.pos.y - 1] === null) {
        generateOre(player.pos.x, player.pos.y - 1);
    }
    if (debug.oreLocations[player.pos.x] === undefined || debug.oreLocations[player.pos.x][player.pos.y + 1] === undefined || debug.oreLocations[player.pos.x] === null || debug.oreLocations[player.pos.x][player.pos.y + 1] === null) {
        generateOre(player.pos.x, player.pos.y + 1);
    }
}

function checkInventoryFor(id) {
    if (id[0] === "#") {
        for (let i = 0; i < inventory.length; i++) {
            if (items[inventory[i].id].types.includes(id.slice(1)) && inventory[i].count.number() > 0) return inventory[i].id;
        }
    } else {
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].id === id && inventory[i].count.number() > 0) return id;
        }
    }
    return false;
}

function teleport(x, y) {
    player.pos.x = x;
    player.pos.y = y;
    generateAroundPlayer();
}

function move(direction) {
    player.lastDirection = direction;
    if (direction === "l") {
        player.pos.x--;
    } else if (direction === "r") {
        player.pos.x++;
    } else if (direction === "u" && !player.falling && buildBelow(true)) {
        player.pos.y++;
    } else if (direction === "d") {
        player.pos.y--;
    }
    generateAroundPlayer();
    let canMine = false;
    for (let i = 0; i < ores.length; i++) {
        if (debug.oreLocations[player.pos.x] !== undefined && debug.oreLocations[player.pos.x] !== null && ores[i].id === debug.oreLocations[player.pos.x][player.pos.y].id && player.pickaxe.strength >= ores[i].hardness) {
            canMine = true;
            let liquidWithBucket = false;
            let bucketItem = "";
            if (isLiquid(player.pos.x, player.pos.y)) {
                bucketItem = checkInventoryFor("#bucket");
                if (bucketItem) {
                    liquidWithBucket = true;
                }
            } else {
                liquidWithBucket = true;
            }
            if (debug.oreLocations[player.pos.x][player.pos.y].id !== "air" && liquidWithBucket) {
                if (isLiquid(player.pos.x, player.pos.y)) {
                    if (bucketItem !== undefined) {
                        addItem(bucketItem, -1);
                        addItem(debug.oreLocations[player.pos.x][player.pos.y].id, 1);
                    }
                } else {
                    addItem(debug.oreLocations[player.pos.x][player.pos.y].id, 1);
                }
                for (let i = 0; i < ores.length; i++) {
                    if (ores[i].id === debug.oreLocations[player.pos.x][player.pos.y].id) {
                        if (!(ores[i].deadliness === undefined || ores[i].deadliness === null)) {
                            player.health -= ores[i].deadliness;
                            healthText.innerHTML = `${Math.round(player.health).toLocaleString()} HP`;
                            healthBar.style.width = `${player.health}%`;
                            if (player.health <= 0) {
                                die(`You were killed by ${capitalize(camelCaseToRegular(ores[i].id))}`);
                            }
                        }
                        break;
                    }
                }
                debug.oreLocations[player.pos.x][player.pos.y] = {id: "air"};
                updateRecipeBook();
            }
        }
    }
    if (!canMine) {
        if (direction === "l") {
            player.pos.x++;
        } else if (direction === "r") {
            player.pos.x--;
        } else if (direction === "u") {
            player.pos.y--;
        } else if (direction === "d") {
            player.pos.y++;
        }
    } else {
        if (direction === "u") {
            buildBelow();
        }
    }
    if (getOreData(debug.oreLocations[player.pos.x][player.pos.y - 1].id).types.includes("notSolid") || isLiquid(player.pos.x, player.pos.y - 1)) {
        let placed;
        if (player.flight) {
            placed = true;
        } else {
            placed = buildBelow();
        }
        if (!placed) {
            player.falling = true;
            move("d");
        }
    } else {
        player.falling = false;
    }
    updateVision();
    document.getElementById("altitude").innerHTML = `Altitude: ${simplify(player.pos.y)} ft<br>Position: ${player.pos.x >= 0 ? simplify(player.pos.x) + " ft" + " east" : simplify(-player.pos.x) + " ft" + " west"}`;
}

function buildBelow(onlyCheck) {
    let placed = false;
    if (!player.flight) {
        for (let i = 0; i < inventory.length; i++) {
            if (items[inventory[i].id].types.includes("block") && inventory[i].count.gten(1)) {
                if (!onlyCheck) {
                    if (!debug.oreLocations[player.pos.x][player.pos.y - 1]) debug.oreLocations[player.pos.x][player.pos.y - 1] = {};
                    debug.oreLocations[player.pos.x][player.pos.y - 1].id = inventory[i].id;
                    addItem(inventory[i].id, -1);
                }
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
    debug.liquidLocations = [];
    const cvs = document.getElementById("map");
    const ctx = cvs.getContext("2d");
    const squareSize = 810 / settings.mapSize;
    // noinspection SillyAssignmentJS
    cvs.width = cvs.width;
    ctx.imageSmoothingEnabled = false;
    ctx.rect(0, 0, 810, 810);
    ctx.stroke();
    for (let x = player.pos.x - (settings.mapSize / 2 - 0.5) - 3; x < player.pos.x + (settings.mapSize / 2 - 0.5) + 3; x++) {
        for (let y = player.pos.y - (settings.mapSize / 2 - 0.5) - 3; y < player.pos.y + (settings.mapSize / 2 - 0.5) + 3; y++) {
            if (debug.oreLocations[x] !== undefined && debug.oreLocations[x][y] !== undefined) {
                let hasImage = false;
                for (let i = 0; i < ores.length; i++) {
                    if (ores[i].id === debug.oreLocations[x][y].id) {
                        ctx.fillStyle = ores[i].color;
                        break;
                    }
                }
                if (debug.textures.block.includes(debug.oreLocations[x][y].id)) hasImage = true;
                if (!hasImage) {
                    ctx.fillRect((x - player.pos.x) * squareSize + 400 - 5 * squareSize / 10, 810 - ((y - player.pos.y) * squareSize + 410 + 5 * squareSize / 10), squareSize, squareSize);
                } else {
                    const blockImg = new Image();
                    blockImg.src = `./textures/block/${debug.oreLocations[x][y].id}.png`;
                    ctx.drawImage(blockImg, (x - player.pos.x) * squareSize + 400 - 5 * squareSize / 10, 810 - ((y - player.pos.y) * squareSize + 410 + 5 * squareSize / 10), squareSize, squareSize);
                }
                ctx.fillStyle = "#ff0";
            }
            if (isLiquid(x, y) && !debug.liquidLocations.includes(`${x},${y} ♸${debug.oreLocations[x][y].id}♸`)) {
                debug.liquidLocations.push(`${x},${y} ♸${debug.oreLocations[x][y].id}♸`);
            }
        }
    }
    const playerImg = new Image();
    playerImg.src = "./textures/player.png";
    ctx.drawImage(playerImg, 400 - squareSize / 2, 400 - squareSize / 2, squareSize, squareSize);
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
    if (debug.oreLocations[x] === undefined || debug.oreLocations[x] === null) {
        debug.oreLocations[x] = [];
    }
    if (debug.oreLocations[x][y] === undefined) debug.oreLocations[x][y] = {};
    debug.oreLocations[x][y].id = ore.id;
    if (isLiquid(x, y) && !debug.liquidLocations.includes(`${x},${y} ♸${debug.oreLocations[x][y].id}♸`)) {
        debug.liquidLocations.push(`${x},${y} ♸${debug.oreLocations[x][y].id}♸`);
    }
    let number;
    if (ore.veinSize !== undefined) {
        number = Math.ceil(Math.random() * ore.veinSize);
    } else {
        number = Math.ceil(Math.random() * 2 ** (ore.commonness / 30));
    }
    let radius = 1;
    for (let i = 0; i < number; i++) {
        if (ore.replaceableOres === undefined || ore.replaceableOres === null) {
            ore.replaceableOres = ["stone", "air"];
        }
        const x2 = x + ~~(Math.random() * radius - radius / 2);
        const y2 = y + ~~(Math.random() * radius - radius / 2);
        if (debug.oreLocations[x2] === undefined || debug.oreLocations[x2] === null) {
            debug.oreLocations[x2] = [];
        }
        if (debug.oreLocations[x2][y2] === undefined || debug.oreLocations[x2][y2] === null || ore.replaceableOres.includes[debug.oreLocations[x2][y2].id]) {
            radius = 0;
            debug.oreLocations[x2][y2] = {};
            debug.oreLocations[x2][y2].id = ore.id;
        } else {
            radius++;
            i--;
        }
    }
}

function generateLoot(lootTable) {
    let maxWeight = 0;
    for (let i = 0; i < lootTable.length; i++) {
        maxWeight += lootTable[i].weight;
        lootTable[i].weight = maxWeight;
    }
    const randNum = Math.random() * maxWeight;
    for (let i = 0; i < lootTable.length; i++) {
        if (randNum < lootTable[i].weight) {
            return [lootTable[i].id, Math.round((Math.random() * lootTable[i].count.max - lootTable[i].count.min + lootTable[i].count.min) / lootTable[i].count.round) * lootTable[i].count.round];
        }
    }
}

document.onkeydown = e => {
    if (e.code === "KeyE") {
        if (isInventoryOpen) {
            closeInventory();
        } else {
            openInventory();
        }
    } else if (e.code === "KeyR") {
        document.getElementById('recipeCheatSheet').style.display = document.getElementById('recipeCheatSheet').style.display === '' ? 'none' : '';
        document.getElementById('openRecipeCheatSheet').innerText = document.getElementById('openRecipeCheatSheet').innerText === 'Open Recipe Cheat Sheet' ? 'Close Recipe Cheat Sheet' : 'Open Recipe Cheat Sheet';
    } else if (e.code === "KeyO") {
        document.getElementById('oreCheatSheet').style.display = document.getElementById('oreCheatSheet').style.display === '' ? 'none' : '';
        document.getElementById('openOreCheatSheet').innerText = document.getElementById('openOreCheatSheet').innerText === 'Open Ore Cheat Sheet' ? 'Close Ore Cheat Sheet' : 'Open Ore Cheat Sheet';
    } else if (e.code === "KeyW" || e.code === "ArrowUp") {
        move("u");
    } else if (e.code === "KeyS" || e.code === "ArrowDown") {
        move("d");
    } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
        move("l");
    } else if (e.code === "KeyD" || e.code === "ArrowRight") {
        move("r");
    } else if (e.code === "KeyF") {
        document.querySelector("#forge").style.top = document.querySelector("#forge").style.top !== "0px" ? "0" : "-100vh";
    }
}

function exportSave() {
    let output = {};
    output.inventory = inventory;
    output.player = player;
    output.maxSize = maxSize;
    output.mapSize = settings.mapSize;
    output.items = items;
    output.recipes = recipes;
    output.ores = ores;
    output.settings = settings;
    output.game = game;
    output.oreLocations = debug.oreLocations;

    navigator.clipboard.writeText(btoa(JSON.stringify(output))).then(() => {
        alert("Copied save to clipboard! (Auto-adds modded items, ores, and recipes, but it is still recommended to load mods again before importing save data.");
        debug.lastSave = Date.now();
    }, () => {
        alert("Save failed! Try again later, or report it at https://github.com/Dragon77mathbye/bad-mining-game/issues");
    });
    localStorage.setItem("lastSave", debug.lastSave);
}

function importSave() {
    const save = prompt("Save?");
    let input = JSON.parse(atob(save));
    inventory = input.inventory;
    for (let i = 0; i < inventory.length; i++) {
        inventory[i].count = new hugeNumber(inventory[i].count);
    }
    player = input.player;
    game = input.game;
    maxSize = input.maxSize;
    settings.mapSize = input.mapSize;
    items = input.items;
    ores = input.ores;
    recipes = input.recipes;
    settings = input.settings;
    debug.oreLocations = input.oreLocations;
    reload();
}

function updateInventory(log) {
    let totalSize = new hugeNumber(0);
    for (let i = 0; i < inventory.length; i++) {
        totalSize = totalSize.add(inventory[i].count.multiply(items[String(inventory[i].id)].size));
    }
    let output = "";
    inventory.sort(function (a, b) {
        let textA = a.id.toUpperCase();
        let textB = b.id.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
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
            output += `<fieldset class='inventoryItem' onclick='addItem("${inventory[i].id}", -1);' oncontextmenu='addItem("${inventory[i].id}", ${-inventory[i].count.number()}); updateRecipeBook();'><p>${items[inventory[i].id].name}</p>${message}<p class='inventoryItemCount'>${simplify(inventory[i].count)} (${itemSize} lbs | ${itemSize >= maxSize * 0.5 ? "Very Heavy" : itemSize >= maxSize * 0.25 ? "Heavy" : itemSize >= maxSize * 0.1 ? "Medium" : itemSize >= maxSize * 0.05 ? "Light" : itemSize >= maxSize * 0.001 ? "Very Light" : "Weightless"})</p></fieldset>`;
        } else {
            inventory[i].count = new hugeNumber(0);
        }
    }
    if (log) console.log(totalSize);
    document.getElementById("inventory").innerHTML = `<legend>Inventory (${simplify(totalSize, true, 0)} / ${simplify(maxSize)} lbs full)</legend>${output}<div style='clear: both'></div>`;
}

function die(deathMessage) {
    if (deathMessage === undefined || deathMessage === null) {
        deathMessage = "";
    }
    player.health = 100;
    player.foodPoints = 100;
    player.drinkPoints = 100;
    inventory = [];
    player.pos = {x: 0, y: 0};
    addItem("airBlock", 99);
    document.getElementById("main").style.display = "none";
    document.getElementById("deathMessage").style.display = "";
    document.getElementById("deathMessageText").innerHTML = deathMessage;
    document.body.style.backgroundColor = "darkred";
    updateRecipeBook();
}

function godMode() {
    player.flight = true;
    player.pickaxe.durability = Infinity;
    player.pickaxe.strength = Infinity;
    player.axe.durability = Infinity;
    maxSize = Infinity;
    player.health = Infinity;
    player.foodPoints = Infinity;
    for (let i = 0; i < Object.keys(items).length; i++) {
        addItem(Object.keys(items)[i], 1e308);
    }
    updateRecipeBook();
}

function addBlocks(json) {
    for (let i = 0; i < json.length; i++) if (json[i].types === undefined) json[i].types = [];
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
    itemsUpdate();
}

function addMaterial({id, power, size, hasOre, hasBar, hasBlock, low, high, oreColor, blockColor}) {
    const hardness = power / 10;
    const recipeCost = Math.round(power / 16);
    if (low === undefined) {
        low = -20000000;
    }
    if (high === undefined) {
        high = Math.round(-(1.25 ** power));
    }
    eval(`addItems({${id}: {name: capitalize(camelCaseToRegular(id)), size: size, types: []}});`);
    eval(`addItems({
        ${id}Pickaxe: {
            name: capitalize(camelCaseToRegular(id + "Pickaxe")),
            strength: hardness < 10 ? hardness + 1 : 10,
            types: ["pickaxe"]
        }
    });`);
    eval(`addItems({${id}Axe: {name: capitalize(camelCaseToRegular(id + "Axe")), types: ["axe"]}});`);
    if (hasOre) {
        addBlocks([
            {
                id: id,
                commonness: 100 - power,
                hardness: hardness,
                foundAbove: low,
                foundBelow: high,
                color: oreColor
            }
        ]);
    }
    if (hasBlock) {
        addBlocks([
            {
                id: `${id}Block`,
                hardness: hardness,
                color: blockColor
            }
        ]);
        eval(`addItems({
            ${id}Block: {
                name: capitalize(camelCaseToRegular(id)) + " Block",
                size: size * 4,
                types: ["block"]
            }
        });`);
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
        eval(`addItems({${id}Bar: {name: capitalize(camelCaseToRegular(id + "Bar")), size: size * 2}});`);
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

function rename(id, name) {
    items[id].name = name;
}

function changeId(oldId, newId) {
    items[newId] = items[oldId];
    delete items[oldId];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            if (recipes[i].ingredients[j].id === oldId) {
                recipes[i].ingredients[j].id = newId;
            }
        }
    }
}

function updateCheatSheets() {
    let output = "<legend>Recipe Cheat Sheet</legend>";
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        output += `<fieldset class="recipe"><p style="color: ${rarityColor(items[recipe.output.id].rarity)}"><u>${items[String(recipe.output.id)].name} (${recipe.output.count})</u></p>`;
        for (let c = 0; c < recipe.ingredients.length; c++) {
            const color = rarityColor(items[recipe.ingredients[c].id].rarity);
            output += `<p class='recipeIngredient' style="color: ${color};">${items[recipe.ingredients[c].id].name} (${recipe.ingredients[c].count > 0 ? recipe.ingredients[c].count : "1"})</p>`;
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
            output += `<fieldset class="recipe" style='background: ${ores[i].color}; color: ${oppositeColor({hex: ores[i].color})};'><p><b><u>${items[ores[i].id].name}</u></b></p><p>Hardness: ${ores[i].hardness}</p><p>Commonness: ${ores[i].commonness}</p><p>Obtainable Height Range: ${heightRange}</p></fieldset>`;
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
    itemsUpdate();
    updateCheatSheets();
    updateInventory();
    liquidUpdate();
    generateDesc();
    debug.loadTextures();
    resizeCanvas();
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

reload();

function getOreData(id) {
    for (let i = 0; i < ores.length; i++) {
        if (ores[i].id === id) {
            return ores[i];
        }
    }
    return false;
}

setInterval(() => {
    // Health System
    if (player.health < player.maxHealth && player.foodPoints >= 0.1 * player.maxFood) player.health++;
    if (player.health <= 0) die();
    if (player.health > player.maxHealth) player.health = player.maxHealth;

    if (player.foodPoints > player.maxFood) player.foodPoints = player.maxFood;
    if (player.foodPoints > 0) {
        player.foodPoints -= Math.random() * 0.2;
    } else {
        player.health--;
        if (player.health <= 0) die("You starved to death!");
    }

    if (player.drinkPoints > player.maxDrink) player.drinkPoints = player.maxDrink;
    if (player.drinkPoints > 0) {
        player.drinkPoints -= Math.random() * 0.3;
    } else {
        player.health -= 5;
        if (player.health <= 0) die("You died of dehydration!");
    }
    game.time += 20;

    const dayTime = game.time % 24000;
    const hour = dayTime / 1000;
    let baseTemperature = 50 - player.pos.y ** 3 / 1e10, tempColor;
    const n = hour > 5 && hour <= 20 ? (56.25 - (hour - 12.5) ** 2) / 200 - 0.11718729167 : -0.11718729167;
    player.tempMod += Math.random() * n * 1.5 - n / 2;
    player.tempMod += Math.random() * 0.04 - 0.02; // temperature modifier
    let temperatureModifier = player.tempMod;
    if (debug.oreLocations[player.pos.x][player.pos.y].id === "water") {
        temperatureModifier -= 10;
        temperatureModifier /= 4;
    }
    if (debug.oreLocations[player.pos.x][player.pos.y].id === "lava") temperatureModifier += 1200 + Math.random() * 100 - 50;
    player.temperature = baseTemperature + temperatureModifier;

    if (player.temperature > 140) {
        tempColor = "#e61a1a";
    } else if (player.temperature > 100) {
        tempColor = lerpColor("#e6d51a", "#e61a1a", (player.temperature - 100) / 40);
    } else if (player.temperature > 72) {
        tempColor = lerpColor("#ffffff", "#e6d51a", (player.temperature - 72) / 28);
    } else if (player.temperature > 40) {
        tempColor = lerpColor("#1a91e6", "#ffffff", (player.temperature - 40) / 32);
    } else if (player.temperature > 0) {
        tempColor = lerpColor("#7c2eda", "#1a91e6", player.temperature / 40);
    } else {
        tempColor = "#7c2eda";
    }

    if (player.temperature > 100) {
        player.bodyTemperature += (player.temperature - player.bodyTemperature) / 1000;
    } else if (player.temperature < 40) {
        player.bodyTemperature += ((player.temperature + 58.6) - player.bodyTemperature) / 1000;
    }

    document.querySelector("#temperature").innerHTML = `Environment ${player.temperature.toLocaleString(undefined, {maximumFractionDigits: 2})}°F<br>Body ${player.bodyTemperature.toLocaleString(undefined, {maximumFractionDigits: 2})}°F`;
    document.querySelector("#temperature").style.color = tempColor;

    function setBG(color) {
        document.querySelector("body").style.backgroundColor = color;
    }

    // 194 - 260
    // 5 - 8 sunrise | 17 - 20 sunset
    if (dayTime >= 5000 && dayTime < 8000) {
        setBG("hsl(" + (260 - (dayTime - 5000) / 3000 * 66) + ", 100%, " + (dayTime - 5000) / 3000 * 50 + "%");
    } else if (dayTime >= 8000 && dayTime < 17000) {
        setBG("hsl(194,100%,50%)");
    } else if (dayTime >= 17000 && dayTime < 20000) {
        setBG("hsl(" + ((dayTime - 17000) / 3000 * 66 + 194) + ", 100%, " + (250 - (dayTime - 5000) / 3000 * 50) + "%");
    } else {
        setBG("black");
    }

    healthText.innerHTML = `${Math.round(player.health).toLocaleString()}/${Math.round(player.maxHealth).toLocaleString()} HP`;
    healthBar.style.width = `${player.health / player.maxHealth * 100}%`;
    document.getElementById("food").innerHTML = `${Math.abs(Math.round(player.foodPoints)).toLocaleString()}/${Math.abs(Math.round(player.maxFood)).toLocaleString()} FP`;
    document.getElementById("foodBar").style.width = `${player.foodPoints / player.maxFood * 100}%`;
    document.getElementById("drink").innerHTML = `${Math.abs(Math.round(player.drinkPoints)).toLocaleString()}/${Math.abs(Math.round(player.maxDrink)).toLocaleString()} DP`;
    document.getElementById("drinkBar").style.width = `${player.drinkPoints / player.maxDrink * 100}%`;

    const lastSaveRelative = String(localStorage.getItem("lastSave")) !== "null" ? (Date.now() - debug.lastSave) / 1000 : "never";
    document.getElementById("exportSave").innerText = `Export Save (Last saved ${secondsToOtherUnits(lastSaveRelative)} ago)`;
}, 1000);

// Auto build blocks underneath player if there is air there

setInterval(() => {
    const ore = getOreData(debug.oreLocations[player.pos.x][player.pos.y].id);

    if (ore.deadliness !== undefined) {
        player.health -= ore.deadliness;
    }
    if (ore.onInteract !== undefined) {
        ore.onInteract();
    }
}, 250);

function liquidUpdate() {
    for (let i = 0; i < debug.liquidLoopIds.length; i++) {
        clearInterval(debug.liquidLoopIds[i]);
    }
    liquids = [];
    debug.liquidLoopIds = [];
    for (let i = 0; i < ores.length; i++) {
        if (ores[i].types.includes("liquid")) {
            liquids.push(ores[i]);
        }
    }
    for (let i = 0; i < liquids.length; i++) {
        debug.liquidLoopIds.push(setInterval(() => {
            for (let j = 0; j < debug.liquidLocations.length; j++) {
                if (debug.liquidLocations[j].match(RegExp(`♸${liquids[i].id}♸`)) !== null) {
                    let x = Number(debug.liquidLocations[j].split(",")[0].split(" ")[0]);
                    let y = Number(debug.liquidLocations[j].split(",")[1].split(" ")[0]);

                    // Adds arrays for the x pos if they don't exist to prevent errors

                    if (debug.oreLocations[x + 1] === undefined) {
                        debug.oreLocations[x + 1] = [];
                    }
                    if (debug.oreLocations[x - 1] === undefined) {
                        debug.oreLocations[x - 1] = [];
                    }
                    if (debug.oreLocations[x] === undefined) {
                        debug.oreLocations[x] = [];
                    }

                    function l() {
                        debug.oreLocations[x - 1][y] = {id: liquids[i].id};
                        debug.oreLocations[x][y].id = "air";
                        debug.liquidLocations[j] = `${Number(debug.liquidLocations[j].split(",")[0]) - 1},${Number(debug.liquidLocations[j].split(",")[1].split(" ")[0])} ${debug.liquidLocations[j].split(" ")[1]}`;
                    }

                    function r() {
                        debug.oreLocations[x + 1][y] = {id: liquids[i].id};
                        debug.oreLocations[x][y].id = "air";
                        debug.liquidLocations[j] = `${Number(debug.liquidLocations[j].split(",")[0]) + 1},${Number(debug.liquidLocations[j].split(",")[1].split(" ")[0])} ${debug.liquidLocations[j].split(" ")[1]}`;
                    }

                    if (debug.oreLocations[x][y - 1] && debug.oreLocations[x][y - 1].id === "air") {
                        // If block below is air, then move liquid down
                        debug.oreLocations[x][y - 1] = {id: liquids[i].id};
                        debug.oreLocations[x][y].id = "air";
                        debug.liquidLocations[j] = `${Number(debug.liquidLocations[j].split(",")[0])},${Number(debug.liquidLocations[j].split(",")[1].split(" ")[0]) - 1} ${debug.liquidLocations[j].split(" ")[1]}`;
                    } else if (debug.oreLocations[x + 1][y] && debug.oreLocations[x - 1][y] && debug.oreLocations[x + 1][y].id === "air" && debug.oreLocations[x - 1][y].id === "air") {
                        // If both left and right are air, then pick a direction
                        if (Math.random() > 0.5) r(); else l();
                    } else if (debug.oreLocations[x + 1][y] && debug.oreLocations[x + 1][y].id === "air") {
                        // If right is air, move liquid right
                        r();
                    } else if (debug.oreLocations[x - 1][y] && debug.oreLocations[x - 1][y].id === "air") {
                        // If left is air, move liquid left
                        l();
                    } else {
                        // If it can't move, remove it from the list of liquids to prevent it from updating and prevent some lag
                        debug.liquidLocations.splice(j, 1);
                    }
                    debug.liquidLocations.splice(j, 1);
                }
                updateVision();
            }
        }, liquids[i].viscosity));
    }
}

liquidUpdate();

// Liquid Physics


document.getElementById("map").onmousemove = e => {
    const a = Number(document.getElementById("map").style.zoom);
    const squareSize = 810 * a / settings.mapSize;
    const rect = e.target.getBoundingClientRect();
    const left = e.clientX - rect.left * a + 5;
    const top = e.clientY - rect.top * a + 5;
    let ore = "Unknown";
    if (debug.oreLocations[player.pos.x - settings.mapSize / 2 + 0.5 + Math.floor(left / squareSize)] !== undefined && debug.oreLocations[player.pos.x - settings.mapSize / 2 + 0.5 + Math.floor(left / squareSize)][-(-player.pos.y - settings.mapSize / 2 + 0.5 + Math.floor(top / squareSize))] !== undefined) {
        ore = debug.oreLocations[player.pos.x - settings.mapSize / 2 + 0.5 + Math.floor(left / squareSize)][-(-player.pos.y - settings.mapSize / 2 + 0.5 + Math.floor(top / squareSize))].id;
    }
    let oreData = {types: []};
    if (items[ore] !== undefined) {
        oreData = getOreData(ore);
    }
    mapTooltip(ore !== "Unknown" && items[ore] !== undefined && !oreData.types.includes("liquid") ? items[ore].name : oreData.types.includes("liquid") ? items[ore].name.slice(0, items[ore].name.length - 7) : ore, ore !== "Unknown" && items[ore] !== undefined ? (settings.aiTooltips ? items[ore].aiTooltip : items[ore].desc) : "You haven't uncovered this block yet!");
}

document.onmousemove = e => {
    document.getElementById("mapTooltip").style.left = e.pageX + "px";
    document.getElementById("mapTooltip").style.top = e.pageY + "px";
}

function mapTooltip(ore, desc) {
    if (desc === undefined) {
        desc = "No description yet";
    }
    let output = "";
    output += `<p><b>${ore}</b></p>`;
    output += `<p style="color: #ccc;"><i>${desc}</i></p>`;
    document.getElementById("mapTooltip").style.display = "";
    document.getElementById("mapTooltip").innerHTML = output;
}

// 1000 lines!! :)

setInterval(() => {
    debug.frames++;
}, 1);

setInterval(() => {
    document.getElementById("fps").innerText = `${debug.frames} FPS`;
    debug.frames = 0;
}, 1000);

updateCheatSheets();

function generateDesc() {
    for (const key in items) {
        const ore = getOreData(key);
        let oreDepthText = "";
        if (ore) {
            if (ore.foundBelow < -1000000) {
                oreDepthText = " that can be found extremely deep in the earth.";
            } else if (ore.foundBelow < -100000) {
                oreDepthText = " that can be found very deep in the earth.";
            } else if (ore.foundBelow < -10000) {
                oreDepthText = " that can be found deep in the earth.";
            } else if (ore.foundBelow < -1000) {
                oreDepthText = " that can be found somewhat deep in the earth.";
            } else if (ore.foundBelow < -100) {
                oreDepthText = " that can be found somewhat close to the surface.";
            } else if (ore.foundBelow < 1) {
                oreDepthText = " that can be found below the surface.";
            } else if (ore.foundAbove < 10) {
                oreDepthText = " that can be found near the surface.";
            } else if (ore.foundAbove < 100) {
                oreDepthText = " that can be found in the sky.";
            } else if (ore.foundAbove < 1000) {
                oreDepthText = " that can be found high up in the sky.";
            } else if (ore.foundAbove < 10000) {
                oreDepthText = " that can be found very high up in the sky.";
            } else if (ore.foundAbove !== Infinity && ore.foundBelow !== Infinity) {
                oreDepthText = " that can be found in space.";
            } else {
                oreDepthText = " that cannot be found anywhere in nature.";
            }
        }
        let output = [];
        if (items[key].rarity !== undefined) {
            output[0] = `${items[key].name} is a ${items[key].rarity.toLowerCase()} item${oreDepthText}`;
        } else {
            output[0] = `${items[key].name} is an item that does not have a specified rarity.`;
        }
        let recipeCount = 0;
        let craftableItems = [];
        for (let i = 0; i < recipes.length; i++) {
            for (let j = 0; j < recipes[i].ingredients.length; j++) {
                if (recipes[i].ingredients[j].id === key) {
                    recipeCount++;
                    craftableItems.push(items[recipes[i].output.id].name);
                    break;
                }
            }
        }
        if (recipeCount > 5) {
            output[1] = `It can be used to craft ${recipeCount} items, such as ${craftableItems[~~(Math.random() * craftableItems.length)]}.`;
        } else if (recipeCount > 2) {
            output[1] = `It can be used to craft ${recipeCount} items: ${craftableItems.join(", ")}.`;
        } else if (recipeCount === 2) {
            output[1] = `It can be used to craft ${craftableItems.join(" and ")}.`;
        } else if (recipeCount === 1) {
            output[1] = `It can be used to craft ${craftableItems[0]}.`;
        } else {
            output[1] = `It has no crafting purposes.`;
            // "You have no crafting purposes" -GooseterV 2022
        }

        recipeCount = 0;
        craftableItems = [];

        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].output.id === key) {
                recipeCount++;
                craftableItems.push(recipes[i].ingredients);
            }
        }

        let materials = [];

        if (craftableItems !== []) {
            for (let i = 0; i < craftableItems.length; i++) {
                materials[i] = [];
                for (let j = 0; j < craftableItems[i].length; j++) {
                    materials[i][j] = items[craftableItems[i][j].id].name;
                }
            }
        }

        if (recipeCount > 1) {
            output[2] = "It can also be crafted multiple ways.";
        } else if (recipeCount === 1) {
            output[2] = `It can also be crafted with ${materials[0].join(", ")}.`;
        } else {
            output[2] = "It cannot be crafted.";
        }

        if (items[key].types.length > 2) {
            output[3] = `It is a ${items[key].types.join(", a ")}.`;
        } else if (items[key].types.length > 0) {
            output[3] = `It is a ${camelCaseToRegular(items[key].types.join(" and a "))}.`;
        } else {
            output[3] = "It is not a special item.";
        }

        items[key].aiTooltip = output.join(" ");
    }
}

function runCommand(command) {
    let parts = command.split(" ");
    const commandsMessage = `js <code> (run raw JavaScript code)
give <item> [count] (Give items to player inventory)
set <x> <y> <block> (Set a block position to a certain block type)
die [deathMessage] (Kills the player)
food <points> (Set food points)
maxFood <points> (Set max food points)
drink <points> (Set drink points)
maxDrink <points> (Set max drink points)
clear (Clears inventory)
fill <x1> <y1> <x2> <y2> <block> (Fills an area with a specified block; x1 and y1 must be less than x2 and y2)
help (Shows this message)
    `;
    if (parts[0] === "js") {
        console.log(command.slice(3));
        eval(command.slice(3));
    } else if (parts[0] === "give") {
        addItem(parts[1], parts[2]);
    } else if (parts[0].match(/set|setBlock|blockSet/)) {
        parts[1] = ~~parts[1];
        parts[2] = ~~parts[2];
        if (debug.oreLocations[parts[1]] === undefined) {
            debug.oreLocations[parts[1]] = [];
        }
        debug.oreLocations[parts[1]][parts[2]] = {id: parts[3]};
    } else if (parts[0].match(/kill|die/)) {
        die(parts[1]);
    } else if (parts[0].match(/setFood|food|foodPoints|setFoodPoints/)) {
        player.foodPoints = Number(parts[1]);
    } else if (parts[0].match(/setMaxFood|maxFood|maxFoodPoints|setMaxFoodPoints/)) {
        player.maxFood = Number(parts[1]);
    } else if (parts[0].match(/setDrink|drink|drinkPoints|setDrinkPoints/)) {
        player.drinkPoints = Number(parts[1]);
    } else if (parts[0].match(/setMaxDrink|maxDrink|maxDrinkPoints|setMaxDrinkPoints/)) {
        player.maxDrink = Number(parts[1]);
    } else if (parts[0].match(/clear|clearInv|clearInventory/)) {
        inventory = [];
        updateInventory();
        updateRecipeBook();
    } else if (parts[0].match(/fill|fillBlocks/)) {
        for (let i = parts[1]; i <= parts[3]; i++) {
            for (let j = parts[2]; j <= parts[4]; j++) {
                runCommand(`set ${i} ${j} ${parts[5]}`);
            }
        }
    } else if (parts[0].match(/help|\?/)) {
        alert(commandsMessage);
    }
}

function resizeCanvas() {
    document.getElementById("map").style.zoom = `${(window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 900}`;
}

function oppositeColor({rgb, hex}) {
    if (rgb) {
        const cols = rgb.replaceAll(/[a-z(),]/g, "").split(" ");
        return `rgb(${255 - cols[0]}, ${255 - cols[1]}, ${255 - cols[2]})`;
    } else if (hex) {
        const cols = [];
        cols[0] = parseInt(hex.slice(1, 3), 16);
        cols[1] = parseInt(hex.slice(3, 5), 16);
        cols[2] = parseInt(hex.slice(5, 7), 16);

        function a(b) {
            const c = (255 - b).toString(16);
            if (c.length === 1) {
                return `0${c}`;
            } else {
                return c;
            }
        }

        return `#${a(cols[0])}${a(cols[1])}${a(cols[2])}`;
    }
}