
const BACKEND_URI = "https://cpsc455-backend.onrender.com/"

const addCard = async (card) => {
	const response = await fetch(BACKEND_URI + "cards", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(card),
	}).then(() => {
		return getCards();
	});
	return response;
};

const getCards = async () => {
	const response = await fetch(BACKEND_URI + "cards", {
		method: "GET",
	});
	const data = await response.json();
	return data;
};

const getCard = async (name) => {
	const response = await fetch(BACKEND_URI + "cards/" + name, {
		method: "GET",
	});
	const data = await response.json();
	return data;
};

const deleteCard = async (name) => {
	const response = await fetch(BACKEND_URI + "cards/" +  name, {
		method: "DELETE",
	}).then(() => {
		return getCards();
	});
	return response;
};

const addCardCount = async (name) => {
	const response = await fetch(BACKEND_URI + "cards/add/" + name, {
		method: "PATCH",
	}).then(() => {
		return getCards();
	});
	return response;
};

const decrementCardCount = async (name) => {
	const response = await fetch(BACKEND_URI + "cards/remove/" + name, {
		method: "PATCH",
	}).then(() => {
		return getCards();
	});
	return response;
};

export default {
	addCard,
	getCards,
	getCard,
	deleteCard,
	addCardCount,
	decrementCardCount,
};
