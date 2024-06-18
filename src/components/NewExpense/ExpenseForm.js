// Noam Abut 208416313 & Taliya Atia 318860905 
import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [enteredDesc, setEnteredDesc] = useState("");
	const [enteredAmount, setEnteredAmount] = useState("");
	const [enteredDate, setEnteredDate] = useState("");
	const [enteredCategory, setEnteredCategory] = useState("");
	const [error, setError] = useState({
		title: '',
		amount: '',
		date: '',
		description: ''
	});

	const titleChangeHandler = (event) => {
		setEnteredTitle(event.target.value);
	};
	const amountChangeHandler = (event) => {
		setEnteredAmount(event.target.value);
	};
	const dateChangeHandler = (event) => {
		setEnteredDate(event.target.value);
	};
	const descChangeHandler = (event) => {
		setEnteredDesc(event.target.value);
	};
	const categoryChangeHandler = (event) => {
		setEnteredCategory(event.target.value);
		
	};

	const validate = () => {
		let titleError = '';
		let amountError = '';
		let dateError = '';
		let descError = '';

		if (!enteredTitle) {
			titleError = 'Title is required';
		}
		if (!enteredAmount) {
			amountError = 'Amount is required';
		}
		if (!enteredDate) {
			dateError = 'Date is required';
		}
		if (!enteredDesc) {
			descError = 'Description is required';
		}

		if (titleError || amountError || dateError || descError) {
			setError({ title: titleError, amount: amountError, date: dateError, description: descError });
			return false;
		}

		return true;
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const isValid = validate();
		if(isValid){
			const expenseData = {
				title: enteredTitle,
				amount: +enteredAmount,
				date: new Date(enteredDate),
				description: enteredDesc,
				category: enteredCategory ? enteredCategory : 'Other'
			};
			console.log(expenseData);
			props.onSaveExpenseData(expenseData);
			setEnteredTitle("");
			setEnteredAmount("");
			setEnteredDate("");
			setEnteredDesc("");
			setEnteredCategory("");
			setError({ title: '', amount: '', date: '', description: ''});
		}
		
	};

	return (
		<div>
			<form onSubmit={submitHandler}>
				<div className="new-expense__controls">
					<div className="new-expense__control">
						<label>Title</label>
						<input
							type="text"
							value={enteredTitle}
							onChange={titleChangeHandler}
						/>
						{error.title !== '' ? <p>Title is required</p>: ''}
					</div>
					<div className="new-expense__control">
						<label>Description</label>
						<input
							type="text"
							value={enteredDesc}
							onChange={descChangeHandler}
						/>
						{error.description !== '' ? <p>Description is required</p>: ''}
					</div>
					<div className="new-expense__control">
						<label>Amount</label>
						<input
							type="number"
							min="0.01"
							step="0.01"
							onChange={amountChangeHandler}
							value={enteredAmount}
						/>
						{error.amount !== '' ? <p>Amount is required</p>: ''}
					</div>
					<div className="new-expense__control">
						<label>Date</label>
						<input
							type="date"
							min="2021-01-01"
							max="2026-12-31"
							onChange={dateChangeHandler}
							value={enteredDate}
						/>
						{error.date !== '' ? <p>Date is required</p>: ''}
					</div>
					<div className='new-expense__control'>
        			<label>Category</label>
					<select defaultValue='Other' onChange = {categoryChangeHandler}>
						<option value='Food'>Food</option>
						<option value='Health'>Health</option>
						<option value='Education'>Education</option>
						<option value='Travel'>Travel</option>
						<option value='Housing'>Housing</option>
						<option value='Other'>Other</option>
					</select>
				</div>
					<div className="new-expense__actions">
						<button type="button" onClick={props.stopEditing}>
							Cancel
						</button>
						<button type="submit">Add Expense</button>
					</div>
					
				</div>
			</form>
		</div>
	);
};

export default ExpenseForm;
