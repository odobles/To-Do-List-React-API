import React from "react";
import { useState } from "react";

//create your first component
const toDoList = () => {

	const [input, setInput] = useState("");
	const [itemsList, setItemsList] = useState([])

	const addItem = () => {

		if (!input){
			alert("Input cannot be empty")
			return;
		}
		
		const item ={
			id: Math.floor(Math.random()*1000),
			value: input
		};

		setItemsList(oldList => [...oldList, item])
		setInput("");
	}

	const deleteItem = (id) => {
		const sortedList = itemsList.filter(element => element.id !== id)
		setItemsList(sortedList)

	}

	return (
		<form >
			<h1>My To-Do List </h1>
			<div className="container">
				<input 
					type="text" 
					placeholder="What are you doing today?"
					onChange={e => setInput(e.target.value)} 
					value={input}>	
				</input>
				<button className="Submit-button" type="button" onClick={addItem}><strong>Submit</strong></button>
				<div className="list-container">
					<ul>
						{itemsList.map(item => {
							return(
								<div className="list-fields">
									<li key={item.id}>{item.value}<button className="Remove-button btn btn-outline-basic list-style-none" type="button" onClick={() => deleteItem(item.id)}> Remove Item </button></li>
								<hr />
								</div>
							)
						})}
					</ul>
					
				</div>
				<h6>{itemsList.length} item(s)</h6>
			</div>
		</form>
	)
};

export default toDoList;
