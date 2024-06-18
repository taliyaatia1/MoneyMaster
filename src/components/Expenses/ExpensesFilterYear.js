// Noam Abut 208416313 & Taliya Atia 318860905 
import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilterYear = (props) => {
 
  const filterChangeHandler = event =>{
    props.onChangeFilterByYear(event.target.value);
  };
  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select value={props.selected} onChange = {filterChangeHandler}>
          <option value='all'>All Years</option>
          <option value='2024'>2024</option>
          <option value='2023'>2023</option>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilterYear;