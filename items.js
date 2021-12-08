let ores = [
    {id: "air", hardness: 0, commonness: 100, foundBelow: 39000, foundAbove: 1},
    {id: "dirt", hardness: 0.5, commonness: 90, foundBelow: 2500, foundAbove: -20739440},
    {id: "log", hardness: 1, commonness: 60, foundBelow: 2500, foundAbove: 1},
    {id: "stick", hardness: 1, commonness: 80, foundBelow: 2500, foundAbove: 1},
    {id: "stone", hardness: 2, commonness: 100, foundBelow: 0, foundAbove: -20739840},
    {id: "granite", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -43760},
    {id: "andesite", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -43760},
    {id: "diorite", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -43760},
    {id: "pumice", hardness: 2, commonness: 70, foundBelow: 0, foundAbove: -43760},
    {id: "talc", hardness: 2, commonness: 40, foundBelow: -3, foundAbove: -10293110},
    {id: "coal", hardness: 2, commonness: 60, foundBelow: 0, foundAbove: -Infinity},
    {id: "limonite", hardness: 3, commonness: 50, foundBelow: -5, foundAbove: -Infinity},
    {id: "copper", hardness: 3, commonness: 45, foundBelow: -38, foundAbove: -Infinity},
    {id: "cassiterite", hardness: 4, commonness: 45, foundBelow: -64, foundAbove: -Infinity},
    {id: "chromite", hardness: 3, commonness: 50, foundBelow: -253, foundAbove: -13299},
    {id: "silver", hardness: 4, commonness: 40, foundBelow: -212, foundAbove: -913},
    {id: "titanite", hardness: 4, commonness: 42, foundBelow: -1614, foundAbove: -3723182},
    {id: "gold", hardness: 4, commonness: 30, foundBelow: -4061, foundAbove: -5317},
    {id: "hematite", hardness: 5, commonness: 40, foundBelow: -15611, foundAbove: -18222},
    {id: "apatite", hardness: 5, commonness: 40, foundBelow: -23812, foundAbove: -24000},
    {id: "mercury", hardness: 5, commonness: 25, foundBelow: -10, foundAbove: -30, deadliness: 50},
    {id: "barite", hardness: 6, commonness: 20, foundBelow: -24036, foundAbove: -93285},
    {id: "floacite", hardness: 6, commonness: 5, foundBelow: 3051, foundAbove: 252},
    {id: "trimium", hardness: 6, commonness: 12, foundBelow: -10315119, foundAbove: -10315200},
    {id: "arsenopyrite", hardness: 7, commonness: 15, foundBelow: -11912, foundAbove: -12036, deadliness: 25},
    {id: "garnet", hardness: 7, commonness: 4, foundBelow: -12929, foundAbove: -19291},
    {id: "topaz", hardness: 8, commonness: 4, foundBelow: -20333, foundAbove: -813213},
    {id: "sapphire", hardness: 8, commonness: 3, foundBelow: -24115, foundAbove: -3001000},
    {id: "ruby", hardness: 9, commonness: 1, foundBelow: -37621, foundAbove: -6123123},
    {id: "diamond", hardness: 10, commonness: 0.21, foundBelow: -91291, foundAbove: -Infinity},
    {id: "unobtainium", hardness: 10, commonness: 0.001, foundBelow: -666, foundAbove: -666},

    {id: "wood", hardness: 1},
    {id: "stoneBlock", hardness: 2},
    {id: "graniteBlock", hardness: 2},
    {id: "andesiteBlock", hardness: 2},
    {id: "dioriteBlock", hardness: 2},
    {id: "pumiceBlock", hardness: 2},
    {id: "airBlock", hardness: 0},
];

let items = {

    // Resources

    dirt: {name: "Dirt", size: 1},
    log: {name: "Log", size: 1},
    stick: {name: "Stick", size: 0.25},
    stone: {name: "Stone", size: 2},
    granite: {name: "Granite", size: 2},
    andesite: {name: "Andesite", size: 2},
    diorite: {name: "Diorite", size: 2},
    pumice: {name: "Pumice", size: 0.75},
    talc: {name: "Talc", size: 2},
    coal: {name: "Coal", size: 1.5},
    limonite: {name: "Limonite (Iron Ore)", size: 3},
    copper: {name: "Copper Ore", size: 3},
    cassiterite: {name: "Cassiterite (Tin Ore)", size: 2.5},
    chromite: {name: "Chromite (Chromium Ore)", size: 3},
    silver: {name: "Silver Ore", size: 3},
    titanite: {name: "Titanite (Titanium Ore)", size: 2},
    gold: {name: "Gold Ore", size: 4, rarity: "Uncommon"},
    hematite: {name: "Hematite (Heavy Iron Ore)", size: 4, rarity: "Uncommon"},
    apatite: {name: "Apatite", size: 1, rarity: "Uncommon"},
    mercury: {name: "Mercury", size: 1.2, rarity: "Uncommon"},
    barite: {name: "Barite (Barium Ore)", size: 1.1, rarity: "Uncommon"},
    floacite: {name: "Floacite (Flotu Ore)", size: 0.3, rarity: "Uncommon"},
    trimium: {name: "Trimium", size: 1.75, rarity: "Epic"},
    arsenopyrite: {name: "Arsenopyrite", size: 2, rarity: "Uncommon"},
    garnet: {name: "Garnet", size: 1, rarity: "Uncommon"},
    topaz: {name: "Topaz", size: 1.2, rarity: "Rare"},
    sapphire: {name: "Sapphire", size: 1, rarity: "Rare"},
    ruby: {name: "Ruby", size: 1.1, rarity: "Rare"},
    diamond: {name: "Diamond", size: 1, rarity: "Rare"},
    unobtainium: {name: "Unobtainium", size: 10, rarity: "Legendary"},

    // Blocks

    wood: {name: "Wood", size: 1, type: "block"},
    stoneBlock: {name: "Stone Block", type: "block"},
    graniteBlock: {name: "Granite Block", type: "block"},
    andesiteBlock: {name: "Andesite Block", type: "block"},
    dioriteBlock: {name: "Diorite Block", type: "block"},
    pumiceBlock: {name: "Pumice Block", type: "block"},
    airBlock: {name: "Air Block", size: 0, type: "block"},

    // Other Crafted Items

    ironBar: {name: "Iron Bar", size: 6},
    copperBar: {name: "Copper Bar", size: 6},
    bronzeBar: {name: "Bronze Bar", size: 7},
    tinBar: {name: "Tin Bar", size: 5},
    chromeBar: {name: "Chrome Bar", size: 6},
    silverBar: {name: "Silver Bar", size: 6},
    titaniumBar: {name: "Titanium Bar", size: 4},
    goldBar: {name: "Gold Bar", size: 8},
    heavyIronBar: {name: "Heavy Iron Bar", size: 8},
    bariumBar: {name: "Barium Bar", size: 2.2},
    flotuBar: {name: "Flotu Bar", size: 0.6},
    unobtainableBar: {name: "Unobtainable Bar"},

    // Tools

    stickAxe: {name: "Long Stick", type: "axe", durability: 8},
    woodAxe: {name: "Wood Axe", type: "axe", durability: 15},
    stoneAxe: {name: "Stone Axe", type: "axe", durability: 40},
    talcAxe: {name: "Talc Axe", type: "axe", durability: 40},
    ironAxe: {name: "Iron Axe", type: "axe", durability: 100},
    copperAxe: {name: "Copper Axe", type: "axe", durability: 80},
    bronzeAxe: {name: "Bronze Axe", type: "axe", durability: 240},
    tinAxe: {name: "Tin Axe", type: "axe", durability: 90},
    silverAxe: {name: "Silver Axe", type: "axe", durability: 200},
    titaniumAxe: {name: "Titanium Axe", type: "axe", durability: 300},
    goldAxe: {name: "Gold Axe", type: "axe", durability: 60},
    apatiteAxe: {name: "Apatite Axe", type: "axe", durability: 500},
    bariumAxe: {name: "Barium Axe", type: "axe", durability: 1000},
    garnetAxe: {name: "Garnet Axe", type: "axe", durability: 4250},
    topazAxe: {name: "Topaz Axe", type: "axe", durability: 6010},
    corundumAxe: {
        name: "Corundum Axe",
        type: "axe",
        durability: 7880
    },
    diamondAxe: {
        name: "Diamond Axe",
        type: "axe",
        durability: 10000
    },

    stickPickaxe: {
        name: "Long Sharp Stick",
        strength: 1,
        type: "pickaxe",
        durability: 8
    },
    woodPickaxe: {
        name: "Wood Pickaxe",
        durability: 15,
        type: "pickaxe",
        strength: 2
    },
    stonePickaxe: {
        name: "Stone Pickaxe",
        durability: 40,
        type: "pickaxe",
        strength: 3
    },
    talcPickaxe: {
        name: "Talc Pickaxe",
        durability: 40,
        type: "pickaxe",
        strength: 4
    },
    ironPickaxe: {
        name: "Iron Pickaxe",
        durability: 100,
        type: "pickaxe",
        strength: 5
    },
    copperPickaxe: {
        name: "Copper Pickaxe",
        durability: 80,
        type: "pickaxe",
        strength: 6
    },
    bronzePickaxe: {
        name: "Bronze Pickaxe",
        durability: 240,
        type: "pickaxe",
        strength: 7
    },
    tinPickaxe: {
        name: "Tin Pickaxe",
        durability: 90,
        type: "pickaxe",
        strength: 5
    },
    silverPickaxe: {
        name: "Silver Pickaxe",
        durability: 200,
        type: "pickaxe",
        strength: 6
    },
    titaniumPickaxe: {
        name: "Titanium Pickaxe",
        durability: 300,
        type: "pickaxe",
        strength: 7
    },
    goldPickaxe: {
        name: "Gold Pickaxe",
        durability: 60,
        type: "pickaxe",
        strength: 4
    },
    apatitePickaxe: {
        name: "Apatite Pickaxe",
        durability: 500,
        type: "pickaxe",
        strength: 7
    },
    bariumPickaxe: {
        name: "Barium Pickaxe",
        durability: 1000,
        type: "pickaxe",
        strength: 8
    },
    garnetPickaxe: {
        name: "Garnet Pickaxe",
        durability: 4250,
        type: "pickaxe",
        strength: 9
    },
    topazPickaxe: {
        name: "Topaz Pickaxe",
        durability: 6010,
        type: "pickaxe",
        strength: 9
    },
    corundumPickaxe: {
        name: "Corundum Pickaxe",
        durability: 7880,
        strength: 10,
        type: "pickaxe"
    },
    diamondPickaxe: {
        name: "Diamond Pickaxe",
        durability: 10000,
        strength: 10,
        type: "pickaxe"
    },
    shoppingBag: {name: "Shopping Bag"},
    box: {
        name: "Box"
    },
    backpack: {
        name: "Backpack"
    },
    bucket: {
        name: "Bucket"
    },
    vault: {name: "Vault"},
    chest: {name: "Chest"},
    veryExpensiveEnormousBox: {
        name: "Very Expensive Enormous Box"
    },
    infinityBox: {
        name: "Infinity Box"
    },
    rocketBoots: {name: "Rocket Boots"}
};