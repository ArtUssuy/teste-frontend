import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import "./stylePaginate.css";
import { Container } from "./../styles";
import Card from "./../../cards/cards";

const Paginate = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async (set = 0, limit = 100) => {
		const url = `https://pokeapi.co/api/v2/pokemon?offset=${set}&limit=${limit}`;
		console.log("TCL: fetchData -> limit", limit);
		const response = await axios(url);

		setData(response.data.results);

		console.log("TCL: Paginate -> data", data);
	};

	const handlePageClick = e => {
		setData([]);
		let setValue = `${e.selected.toString().concat("00")}`;
		// let limitValue = `${(e.selected + 1).toString().concat("00")}`;
		fetchData(setValue);
	};

	return (
		<>
			<Container>
				{data !== undefined
					? data.map(pokemon => (
							<Card
								key={pokemon.name}
								pokemonName={pokemon.name}
								pokemonIndex={
									pokemon.url.split("/")[
										pokemon.url.split("/").length - 2
									]
								}
							/>
					  ))
					: ""}
			</Container>

			<ReactPaginate
				previousLabel={"previous"}
				nextLabel={"next"}
				breakLabel={"..."}
				onPageChange={handlePageClick}
				containerClassName={"pagination"}
				pageClassName={"items"}
				subContainerClassName={"pages pagination"}
				activeClassName={"active"}
			/>
		</>
	);
};

export default Paginate;