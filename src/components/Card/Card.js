import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../Modal/Modal";
import "./Card.css";

let currModal = null;

function Card({ item, setModal }) {
  return (
    <ul
      className="card-container"
      onClick={() => {
        setModal(<Modal item={item} setModal={setModal} />);
      }}
    >
      <li className="card-name"> {item.name}</li>
      <img className="card-img" src={item.url} />
    </ul>
  );
}

function openModal(item) {
  currModal = <Modal item={item} />;
}

function CardList() {
  const [modal, setModal] = useState(null);

  const items = useSelector((state) => state.items);

  const cards = items.map((i) => {
    return <Card item={i} setModal={setModal} />;
  });

  return (
    <div className="home">
      <h1>Items</h1>
      <div className={"card-group"}>{cards}</div>
      {modal}
    </div>
  );
}

export { Card, CardList };
