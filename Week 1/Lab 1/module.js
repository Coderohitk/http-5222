var items = [];

function addItem(item) {
    if (item == "" || typeof item != "string") {
        console.log("invalid item to add");
    }
    else {
        items.push(item);
    }
}

function itemCount() {
    return items.length;
}
function getItems() {
    return [...items]; // Returns a copy to prevent direct modification
}

export { addItem, itemCount ,getItems};
