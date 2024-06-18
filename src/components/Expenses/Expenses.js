// Noam Abut 208416313 & Taliya Atia 318860905 
import "./Expenses.css";
import React, { useState } from "react";
import Card from "../UI/Card.js";
import ExpensesFilterYear from "./ExpensesFilterYear";
import ExpensesList from "./ExpensesList";
import ExpensesFilterMonth from './ExpensesFilterMonth';
const Expenses = (props) => {
	const [filteredYear, setFilteredYear] = useState("all");
	const [filteredMonth, setFilteredMonth] = useState("all");

	const changeFilterByYear = (year) => {
		setFilteredYear(year);
	};

	const changeFilterByMonth = (month) => {
		setFilteredMonth(month);
	};

	const filteredExpenses = props.expenses.filter((expense) => {
		const year = new Date(expense.date).getFullYear().toString();
		const month = new Date(expense.date).getMonth().toString();
		const yearBoolean = filteredYear === 'all' ? true : year === filteredYear;
		const monthBoolean = filteredMonth === 'all' ? true : month === filteredMonth;
		return yearBoolean && monthBoolean;
	});
	
	

	return (
		<div>
			<Card className="expenses">
				<ExpensesFilterYear
					selected={filteredYear}
					onChangeFilterByYear={changeFilterByYear}
				/>
				<ExpensesFilterMonth
					selected={filteredMonth}
					onChangeFilterByMonth={changeFilterByMonth}
				/>
				<ExpensesList items={filteredExpenses}/>  
			</Card>
		</div>
	);
};
export default Expenses;
