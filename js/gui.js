let openGuiBlock = {x: 0, y: 0};

function showGui(type) {
    const g = document.querySelector("#gui");
    if (type === "furnace") {
        g.innerHTML = "";
        g.append(document.createElement("span"));
        g.children[0].innerText = "Furnace";
    }
}