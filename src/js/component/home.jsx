import React, { useEffect } from "react";
import { useState } from "react";

//create your first component
const toDoList = () => {

	const [input, setInput] = useState("");
	const [itemsList, setItemsList] = useState([])

	let apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/oscardobles"

	const addItem = (e) => {
		e.preventDefault()
		if (!input){
			alert("Input cannot be empty")
			return;
		}		
		const item ={
			label: input,
			done: false
		};
		setItemsList([...itemsList, item])
		console.log(itemsList)
		setInput("");
	}

	const deleteItem = (id) => {
		const sortedList = itemsList.filter((element,index) => index !== id)
		setItemsList(sortedList)
		console.log(sortedList)
	}

	const emptyList = () =>{

		setItemsList([])
		if(itemsList.length=== 0)return
		fetch(apiUrl,{
			method:"DELETE",
			// body:JSON.stringify(itemsList),
			headers:{
				"Content-type":"application/json"
			}
		})

		fetch(apiUrl,{
			method:"POST",
			body:JSON.stringify([]),
			headers:{
				"Content-type":"application/json"
			}
		})

	}


	useEffect(()=>{
		// componentDidMount
		fetch(apiUrl)
		.then(res => {
			return res.json();
		})
		.then(body =>{
			 setItemsList(body)	
		})		
	},[])

	useEffect(()=>{
		// componentDidUpdate
		
		if(itemsList.length===0)return
		fetch(apiUrl,{
			method:"PUT",
			body:JSON.stringify(itemsList),
			headers:{
				"Content-type":"application/json"
			}
		})
		.then(res => {
			console.log(res.status)
		}).catch(error=>{
			console.error(error)
		})
	},[itemsList])

	return (
		<form onSubmit={addItem}>
			<h1>My To-Do List </h1>
			<div className="container">
				<input 
					type="text" 
					placeholder="What are you doing today?"
					onChange={e => setInput(e.target.value)} 
					value={input}>	
				</input>
				<button className="Submit-button" type="submit" onClick={addItem}><strong>Add</strong></button>
				<div className="list-container">
					<ul id="ul">
						{itemsList.map((item, index) => {
							return(
								<div key={index} className="list-fields d-block">
									<li >{item.label}<button className="Remove-button btn btn-outline-basic list-style-none" type="button" onClick={() => deleteItem(index)}> Remove Item </button></li>
									<hr />
								</div>
							)
						})}
					</ul>
				</div>
				<h6>{itemsList.length} item(s)</h6>
				<button className="Submit-button m-3" type="button" onClick={emptyList}><strong>Clear List</strong></button>
			</div>
		</form>
	)
};

export default toDoList;
