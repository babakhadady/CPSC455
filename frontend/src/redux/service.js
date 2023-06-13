const addCard = async (card) => {
  const response = await fetch("http://localhost:3001/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });

  const data = await response.json();

  return data;
};

const getCards = async () => {
  const response = await fetch("http://localhost:3001/cards/", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const getCard = async (name) => {
  const response = await fetch("http://localhost:3001/cards/" + name, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};



const deleteCard = async (name) => {
  const response = await fetch("http://localhost:3001/cards/" + name, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};


