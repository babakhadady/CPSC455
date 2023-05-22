changePage(true);
let initial_items = '[{"name": "Bike", "description": "a nice bike", "count": "1", "price": "100", "url": "https://cdn.shopify.com/s/files/1/0541/0154/1047/products/0711964_b_1200x1200.jpg?v=1614971567"}, {"name": "Candy", "description": "a delicious treat", "count": "1", "price": "3", "url": "https://assets.shop.loblaws.ca/products/21210265/b1/en/front/21210265_front_a01_@2.png"}, {"name": "Dog", "description": "a good boy", "count": "1", "price": "10", "url": "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRPMKnq00NF_T7RusUNeLrSazRZM0S5O8_AOcw2iBTmYTxd3Q7uXf0sW41odpAKqSblKDMUMHGb8nZRo9g"}]';
let items = [];

let home = true;


items = items.concat(JSON.parse(initial_items));
initializeCards();

function changePage(home) {
	if (home) {
		document.getElementById("home").style.display ="inherit";
		document.getElementById("about").style.display ="none";	

	} else {
		document.getElementById("home").style.display = "none";
		document.getElementById("about").style.display ="inherit";	
	}
}

async function initializeCards(){
	let card_group = document.getElementsByClassName("card-group").item(0);
	card_group
	for (let i = 0; i < items.length; i++) {
		let new_item = setupCard(items[i], i);
		card_group.appendChild(new_item);
	}
}


async function submitCard() {
	deleteChildren();
	addItem().then(() => {
		initializeCards();
	});
}

function deleteChildren() {
	element = document.getElementsByClassName("card-group").item(0);

	while(element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function deleteCards() {
	deleteChildren();
	items = [];
}

async function addItem() {
	let form = document.getElementById("card-form");
	let name = form.name.value;
	let price = form.price.value;
	let description = form.desc.value;
	let url = form.url.value;
	if (!name || !price || !description || !url) return;

	for (let item of items) {
		if (areIdentical(item, name, price, description, url)) {
			item.count = (parseInt(item.count) + 1).toString();
			return;
		}
	}

	await checkURL(url).then((res) => {
		if(!res) return;
		items.push({
			"name": name,
			"description": description,
			"count": 1,
			"price": price,
			"url": url,

		});
	})
}

function setupCard(item, i) {
	let card = document.createElement("li");
	card.classList.add("card-container");

	for (const prop in item) {
		let element;
		if (prop === "url") {
			element = document.createElement("img");
			element.classList.add("card-img" );
			element.src = item[prop];
		} else {
			element = document.createElement("p");
			element.classList.add("card-" + prop);
			if (prop === "price") {
				element.appendChild(document.createTextNode("$" + item[prop]));
			} else if (prop === "count") {
				element.appendChild(document.createTextNode("count: " + item[prop]));
			}


			else  {
				element.appendChild(document.createTextNode(item[prop]));
			}
		}
		card.appendChild(element);
	}
	card.id = i;
	card.onclick = () => {
		deleteCard(item);
	}

	return card;
}


async function checkURL(url) {
	return fetch(url).then((res)=> {
		return res.ok;
	}).catch((e) => {
		return false;
	});
}

async function deleteCard(item) {

	console.log(item.count);
	if (parseInt(item.count) > 1) {
		item.count = (parseInt(item.count) - 1).toString();
	} else {
		items.splice(item.id, 1);
	}
	deleteChildren();
	initializeCards();	
}


function areIdentical(item, name, price, description, url) {
	console.log("ran");
	return ((item.name == name) && (item.price === price) && (item.description === description) && (item.url === url));

}

