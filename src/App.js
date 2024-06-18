// Noam Abut 208416313 & Taliya Atia 318860905 
import Expenses from "./components/Expenses/Expenses.js";
import React, { useEffect, useMemo, useState } from "react";
import NewExpense from "./components/NewExpense/NewExpense.js";
import Expense from "./expense.js";
import IDB from "./idb.js";
import logo from './logoapp.png';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const idb = useMemo(() => new IDB('ExpenseDB', 'expenses'), []);

  useEffect(() => {
    const onMount = async () => {
      await idb.open();
      let exp = await idb.getItem('expenses');
      if (!exp) {
        return;
      }
      setExpenses(JSON.parse(exp.data));
    };
    onMount();
  }, [idb]);

  const addExpenseHandler = async (expense) => {
    const newExp = new Expense(expense.date, expense.id, expense.title, expense.amount, expense.description, expense.category);
    setExpenses(prevExpenses => {
      return [newExp, ...prevExpenses];
    });
    await idb.setItem(newExp);
  };

  useEffect(() => {
    const saveExpenses = async () => {
      if (idb.db) {
        await idb.setItem({ id: 'expenses', data: JSON.stringify(expenses) });
      }
    };
    saveExpenses();
  }, [expenses, idb]);

  return (
    <div>
      <img src={logo} alt='logo-app' />
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
