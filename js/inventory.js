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
        let output = "";
        inventory.sort((a, b) => {
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
                const rarity = items[inventory[i].id].rarity;
                let color = rarityColor(rarity);
                const eat = i => {
                    foodPoints += items[inventory[i].id].foodValue;
                    drinkPoints += items[inventory[i].id].drinkValue;
                }
                output += `<fieldset class='inventoryItem' title='${items[inventory[i].id].name} | ${rarity !== undefined ? rarity : "Common"}'onclick='addItem("${inventory[i].id}", -1);' oncontextmenu='addItem("${inventory[i].id}", ${-inventory[i].count.number()}); updateRecipeBook();'><p style="color: ${color};">${items[inventory[i].id].name}</p>${message}<p class='inventoryItemCount'>${simplify(inventory[i].count)} (${itemSize} lbs | ${itemSize >= (maxSize * 0.5) ? "Very Heavy" : itemSize >= (maxSize * 0.25) ? "Heavy" : itemSize >= (maxSize * 0.1) ? "Medium" : itemSize >= (maxSize * 0.05) ? "Light" : itemSize >= (maxSize * 0.001) ? "Very Light" : "Weightless"})</p>${(items[inventory[i].id].foodValue !== undefined) ? `<button class='recipe' onclick='if (!items[inventory[${i}].id].needsToBeCooked) {foodPoints += items[inventory[${i}].id].foodValue; drinkPoints += items[inventory[${i}].id].drinkValue} else {if (items[inventory[${i}].id].cooked >= 80 && items[inventory[${i}].id].cooked <= 120) {foodPoints += items[inventory[${i}].id].foodValue; drinkPoints += items[inventory[${i}].id].drinkValue} else {health -= 10; if (health <= 0) die("You ate uncooked food and were poisoned!")}}'>Eat</button>` : ""}</fieldset>`;
            } else {
                inventory[i].count = new hugeNumber(0);
            }
        }
        document.getElementById("openInventory").style.backgroundColor = "";
        document.getElementById("closeInventory").style.backgroundColor = "";
        document.getElementById("inventory").innerHTML = `<legend>Inventory (${simplify(totalSize)} / ${maxSize.toLocaleString()} lbs full)</legend>${output}<div style='clear: both'></div>`;
        if (totalSize.number() >= maxSize) {
            document.getElementById("openInventory").style.backgroundColor = "darkred";
            document.getElementById("closeInventory").style.backgroundColor = "darkred";
        }
    }
}

function simplify(n) {
    if (typeof n === "object") {
        return toNumberName(n.toString(), true, 2);
    }
    if (n >= 1e9) {
        return toNumberName((10 ** (Math.log10(n) - Math.floor(Math.log10(n)))).toFixed(2) + "e" + Math.floor(Math.log10(n)), true, 2);
    } else {
        return n.toLocaleString();
    }
}

// I literally coded a full-on working huge number system just to let inventory items go beyond 1.8e308 :/
class hugeNumber {
    constructor(num) {
        if (typeof num === "object") {
            this.exponent = num.exponent;
            this.mul = num.mul;
        } else {
            num = String(num);
            if (num.split("e")[1] !== undefined && num.split("e")[1] !== null) {
                this.exponent = Number(num.split("e")[1]);
                this.mul = Number(num.split("e")[0]);
            } else {
                const bd = num.split(".")[0];
                let ad = num.split(".")[1];
                if (ad === undefined || ad === null) {
                    ad = "0";
                }
                this.exponent = bd.length - 1;
                if (this.exponent > 0) {
                    this.mul = Number(bd.slice(0, -this.exponent) + "." + bd.slice(1) + ad);
                } else {
                    this.mul = Number(num);
                }
            }
        }
    }

    add(num, ab) {
        if (ab === undefined || ab === null) {
            ab = false;
        }
        let difference;
        let difference2;
        num = new hugeNumber(num);
        if (ab) {
            num.exponent = new hugeNumber(num.exponent);
            this.exponent = new hugeNumber(this.exponent);
        }
        let opposite = function (a) {
            if (typeof a === "object") {
                return a.opposite();
            } else {
                return -a;
            }
        }
        if (ab) {
            difference = num.exponent.add(opposite(this.exponent), false);
            difference2 = this.exponent.add(opposite(num.exponent), false);
        } else {
            difference = num.exponent + opposite(this.exponent);
            difference2 = this.exponent + opposite(num.exponent);
        }
        if (num.exponent === this.exponent) {
            num.mul += this.mul;
        } else if (num.exponent > this.exponent) {
            num.mul += this.mul / 10 ** Number(new hugeNumber(difference).toString());
        } else {
            let b = num;
            num = this;
            num.mul += b.mul / 10 ** Number(new hugeNumber(difference2).toString());
        }
        if (num.mul >= 10) {
            while (num.mul >= 10) {
                num.mul = num.mul / 10;
                if (typeof num.exponent !== "object") {
                    num.exponent++;
                } else {
                    num.exponent = num.exponent.add(1, false);
                }
            }
        }
        return num;
    }

    gt(n) {
        n = new hugeNumber(n);
        if (n.exponent === this.exponent) {
            return n.mul <= this.mul;
        } else {
            if (n.exponent > this.exponent) {
                while (n.exponent !== this.exponent) {
                    n.exponent--;
                    n.mul *= 10;
                }
            } else {
                while (n.exponent !== this.exponent) {
                    n.exponent++;
                    n.mul /= 10;
                }
            }
            return n.mul <= this.mul;
        }
    }

    gte(n) {
        n = new hugeNumber(n);
        if (n.exponent === this.exponent) {
            return n.mul < this.mul;
        } else {
            if (n.exponent > this.exponent) {
                while (n.exponent !== this.exponent) {
                    n.exponent--;
                    n.mul *= 10;
                }
            } else {
                while (n.exponent !== this.exponent) {
                    n.exponent++;
                    n.mul /= 10;
                }
            }
            return Math.round(n.mul * 100000) < Math.round(this.mul * 100000);
        }
    }

    gten(n) {
        let o = this.number();
        n = new hugeNumber(n);
        n = n.number();
        return o >= n;
    }

    opposite() {
        let n = this;
        n.mul = -n.mul;
        return n;
    }

    toString() {
        let n;
        if (this.exponent >= 6) {
            return `${this.mul.toFixed(2)}e${this.exponent}`;
        } else {
            n = Math.round(this.mul * 10 ** this.exponent * 100) / 100;
            return n.toLocaleString();
        }
    }

    number() {
        return Math.round(this.mul * 10000) / 10000 * 10 ** this.exponent;
    }
}

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
    maxSize = 100;
} else {
    maxSize = Number(localStorage.getItem("maxSize"));
}