import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./Card.css";
import { useDispatch } from "react-redux";
import { getCardsAsync } from "../../redux/thunks";
import CountModal from "../Modal/CountModal";
function Card({ item, setModal }) {
	return (
		<ul
			className="card-container"
			onClick={() => {
				setModal(<Modal item={item} setModal={setModal} />);
			}}>
			<li className="card-name"> {item.name}</li>
			<img className="card-img" alt={item.name} src={item.url} />
		</ul>
	);
}

function CardList({count, setCount}) {
	const [modal, setModal] = useState(null);
	const items = useSelector((state) => state.items);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCardsAsync());
	}, [dispatch]);
	const cards = items.items.map((e, i) => {
		return <Card item={e} key={i} setModal={setModal} />;
	});

	return (
		<div className="home">
			<h1>Items</h1>
			<div className={"card-group"}>{cards}</div>
			{count && <CountModal hideModal={setCount} />}
			{modal}
		</div>
	);
}

export { Card, CardList };
