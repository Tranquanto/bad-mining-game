function addItem(id, count) {
    if (count === undefined || count === null) {
        count = 1;
    }
    if (count !== 0) {
        let exists = false;
        let placeInInv;
        let totalSize = new hugeNumber(0);
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].id === id) {
                inventory[i].count = new hugeNumber(inventory[i].count).add(count);
                exists = true;
                placeInInv = i;
                break;
            }
        }
        if (!exists) {
            placeInInv = inventory.length;
            inventory.push({id: id, count: new hugeNumber(count)});
        }
        for (let i = 0; i < inventory.length; i++) {
            totalSize = totalSize.add(inventory[i].count.number() * items[String(inventory[i].id)].size);
        }
        if (totalSize.gt(maxSize)) {
            inventory[placeInInv].count = inventory[placeInInv].count.add((maxSize - totalSize.number()) / items[String(inventory[placeInInv].id)].size);
            totalSize = new hugeNumber(maxSize);
        }
        inventory.sort((a, b) => {
            const textA = a.id.toUpperCase();
            const textB = b.id.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        const div = document.createElement("div");

        for (let i = 0; i < inventory.length; i++) {
            if (Math.round(inventory[i].count.number() * 10000) / 10000 > 0) {
                const itemSize = simplify(inventory[i].count.number() * items[String(inventory[i].id)].size);
                let message;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    message = "<p class='clickToDrop'>Tap to drop one<br>Hold to drop all</p>";
                } else {
                    message = "<p class='clickToDrop'>Click to drop one<br>Right click to drop all</p>";
                }
                const rarity = items[inventory[i].id].rarity;
                const color = rarityColor(rarity);

                const elem = document.createElement("div");
                let c = 0;
                elem.className = "inventoryItem";
                elem.title = items[inventory[i].id].desc !== undefined && !settings.aiTooltips ? items[inventory[i].id].desc : items[inventory[i].id].aiTooltip;
                elem.append(document.createElement("p"));
                elem.children[0].style.color = color;
                elem.children[0].innerText = items[inventory[i].id].name;
                if (debug.textures.item.includes(inventory[i].id)) {
                    elem.append(document.createElement("img"));
                    elem.children[1].alt = items[inventory[i].id].name;
                    elem.children[1].className = "itemTexture";
                    elem.children[1].src = `textures/item/${inventory[i].id}.png`;
                    c++;
                }
                elem.append(document.createElement("p"));
                elem.append(document.createElement("p"));
                elem.children[1 + c].append(document.createElement("i"));
                elem.children[1 + c].children[0].style.color = "#ccc";
                elem.children[2 + c].className = "inventoryItemCount";
                elem.children[2 + c].innerText = `${simplify(inventory[i].count)} (${itemSize.toLocaleString()} lbs | ${itemSize >= maxSize * 0.5 ? "Very Heavy" : itemSize >= maxSize * 0.25 ? "Heavy" : itemSize >= maxSize * 0.1 ? "Medium" : itemSize >= maxSize * 0.05 ? "Light" : itemSize >= maxSize * 0.001 ? "Very Light" : "Weightless"})`;

                if (!items[inventory[i].id].types.includes("cantDrop")) {
                    elem.append(document.createElement("button"));
                    elem.children[3 + c].innerText = "Drop / Drop All";
                    elem.children[3 + c].addEventListener("click", () => {
                        addItem(inventory[i].id, -1);
                    });
                    elem.children[3 + c].addEventListener("contextmenu", () => {
                        addItem(inventory[i].id, -inventory[i].count.number());
                    });
                    c++;
                }

                if (items[inventory[i].id].foodValue !== undefined) {
                    elem.append(document.createElement("button"));
                    elem.children[3 + c].innerText = "Consume";
                    elem.children[3 + c].addEventListener("click", () => {
                        if (!items[inventory[i].id].needsToBeCooked) {
                            player.foodPoints += items[inventory[i].id].foodValue;
                            player.drinkPoints += items[inventory[i].id].drinkValue;
                            addItem(inventory[i].id, -1);
                        } else {
                            if (items[inventory[i].id].cooked >= 80 && items[inventory[i].id].cooked <= 120) {
                                player.foodPoints += items[inventory[i].id].foodValue;
                                player.drinkPoints += items[inventory[i].id].drinkValue;
                                addItem(inventory[i].id, -1);
                            } else {
                                player.health -= 10;
                                if (player.health <= 0) die("You died of food poisoning!");
                            }
                        }
                    });
                    c++;
                }

                if (items[inventory[i].id].recycle) {
                    elem.append(document.createElement("button"));
                    elem.children[3 + c].addEventListener("click", () => {
                        recycle(inventory[i].id);
                    });
                    c++;
                }

                if (items[inventory[i].id].extraFunctions !== undefined) {
                    for (let j = 0; j < items[inventory[i].id].extraFunctions.length; j++) {
                        const btn = document.createElement("button");
                        btn.addEventListener("click", () => {
                            items[inventory[i].id].extraFunctions[j].function();
                        });
                        btn.innerText = items[inventory[i].id].extraFunctions[j].name;
                        elem.append(btn);
                    }
                }

                div.append(elem);
            } else {
                inventory[i].count = new hugeNumber(0);
            }
        }
        document.getElementById("openInventory").style.backgroundColor = "";
        document.getElementById("closeInventory").style.backgroundColor = "";
        document.querySelector("#inventory").innerHTML = `<span>Inventory (${simplify(totalSize)} / ${simplify(maxSize)} lbs full)</span><br>`;
        document.querySelector("#invSize").innerHTML = `<span>${simplify(totalSize)} / ${simplify(maxSize)} lbs</span>`;
        document.querySelector("#inventory").append(div);
        const t = document.createElement("div"); t.style.clear = "both";
        document.querySelector("#inventory").append(t);
        if (totalSize.number() >= maxSize) {
            document.getElementById("openInventory").style.backgroundColor = "darkred";
            document.getElementById("closeInventory").style.backgroundColor = "darkred";
        }
    }
    updateRecipeBook();
}

function simplify(n) {
    if (n === null) return "null";
    if (typeof n === "object") {
        return toNumberName(n.toString(), true, 2);
    }
    if (n === Infinity) {
        return "Infinity";
    } else if (n >= 1e9) {
        return toNumberName(n, true, 2, true);
    } else {
        return n.toLocaleString();
    }
}

// I literally coded a full-on working huge number system just to let inventory items go beyond 1.8e308 :/

let inventory;
if (localStorage.getItem("inventory") === null) {
    inventory = [];
} else {
    inventory = JSON.parse(localStorage.getItem("inventory"));
    for (let i = 0; i < inventory.length; i++) {
        inventory[i].count = new hugeNumber(inventory[i].count);
    }
}

let maxSize;
if (localStorage.getItem("maxSize") === null) {
    maxSize = 200;
} else {
    maxSize = Number(localStorage.getItem("maxSize"));
}