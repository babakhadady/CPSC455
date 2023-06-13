import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../Modal/Modal";
import "./Card.css";


function Card({ item, setModal }) {
  return (
    <ul
      className="card-container"
      onClick={() => {
        setModal(<Modal item={item} setModal={setModal} />);
      }}
    >
      <li className="card-name"> {item.name}</li>
      <img className="card-img" alt={item.name}src={item.url} />
    </ul>
  );
}


function CardList() {
  const [modal, setModal] = useState(null);

  const items = useSelector((state) => state.items);

  const cards = items.map((e, i) => {
    return <Card item={e} key={i} setModal={setModal} />;
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
