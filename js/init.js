document.querySelector("#inventory").addEventListener("click", () => {
    document.querySelector("#itemMenu").style.display = "none";
});

function isSolid(x, y) {
    return !(getOreData(debug.oreLocations[x][y].id).types.includes("notSolid") || isLiquid(x, y));
}