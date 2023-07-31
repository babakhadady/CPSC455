import Navbar from "../../components/Navbar/Navbar";
import Form from "../../components/Form/Form";
import { useState } from "react";
import { Card, CardList } from "../../components/Card/Card";
import "./Home.css";

function Home() {
	const [count, setCount] = useState(false);
	return (
		<>
			<Navbar />
			<h1> Assignment 5</h1>
			<Form setCount={setCount} />
			<CardList count={count} setCount={setCount} />
		</>
	);
}
export default Home;
