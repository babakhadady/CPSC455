
let initial_items = '[{"name": "Bike", "description": "a nice bike", "price": "100", "url": "https://cdn.shopify.com/s/files/1/0541/0154/1047/products/0711964_b_1200x1200.jpg?v=1614971567"},	{"name": "Candy", "description": "a delicious treat", "price": "3", "url": "https://assets.shop.loblaws.ca/products/21210265/b1/en/front/21210265_front_a01_@2.png" }]';
let items = [];


items = items.concat(JSON.parse(initial_items));
initializeCards();

function initializeCards(){
	let card_group = document.getElementsByClassName("card-container").item(0);
	for (let i = 0; i < items.length; i++) {
		let new_item = document.createElement("li");
		new_item.appendChild(document.createTextNode(items[i].name));
		card_group.appendChild(new_item);
	}
}


function submitCard() {
	let card_group = document.getElementsByClassName("card-container").item(0);
	card_group.innerHTML = "";
	setupItem();
	initializeCards();
}


function deleteCards() {
	document.getElementsByClassName("card-container").item(0).innerHTML = "";
	items = [];
}

function setupItem() {

	let form = document.getElementById("card-form");
	let name = form.name.value;
	let price = form.price.value;
	let description = form.desc.value;
	let url = form.url.value;
	items.push({
		"name": name,
			"price": price,
			"description": description,
			"url": url,
	});
}
function setupCard(item) {
	let card = document.createElement("li");
	return card;
}
