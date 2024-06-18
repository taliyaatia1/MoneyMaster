// Noam Abut 208416313 & Taliya Atia 318860905 
import "./ExpenseItem.css";
import React from "react";
import ExpenseDate from "./ExpenseDate.js";
import Card from "../UI/Card";
const ExpenseItem = (props) => {
	return (
		<li>
			<Card className="expense-item">
				<ExpenseDate date={props.date} />
				<div className="expense-item__description">
					<h2>{props.title}</h2>|
					<h4>{props.description}</h4>|
					<div>{props.category}</div>
					<div className="expense-item__price">${props.amount}</div>
				</div>
			</Card>
		</li>
	);
};

export default ExpenseItem;
