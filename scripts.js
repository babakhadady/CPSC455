
let initial_items = '[{"name": "Bike", "description": "a nice bike", "price": "100", "url": "https://cdn.shopify.com/s/files/1/0541/0154/1047/products/0711964_b_1200x1200.jpg?v=1614971567"},	{"name": "Candy", "description": "a delicious treat", "price": "3", "url": "https://assets.shop.loblaws.ca/products/21210265/b1/en/front/21210265_front_a01_@2.png" }]';
let items = [];


items = items.concat(JSON.parse(initial_items));
function submitCard() {
// let price =	document.getElementById("card-form").price.value;
	// console.log(price);

	let card_group = document.getElementsByClassName("card-container").item(0);
	card_group.innerHTML = "";
	for (let i = 0; i < items.length; i++) {
		let new_item = document.createElement("li");
		let new_content = document.createTextNode(items[i].name);
		new_item.appendChild(new_content);
		card_group.appendChild(new_item);
	}

	// console.log(JSON.parse(initial_items));

}


function deleteCards() {
	document.getElementsByClassName("card-container").item(0).innerHTML = "";

}
