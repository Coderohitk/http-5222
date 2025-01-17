import { addItem, itemCount,getItems } from "./module.js";

addItem("apples");
addItem("oranges");
addItem("cherries");
console.log(`Total items: ${itemCount()}`);
console.log(getItems());

