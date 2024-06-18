// Noam Abut 208416313 & Taliya Atia 318860905 
import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilterMonth = (props) => {
 
  const filterChangeHandler = event =>{
    props.onChangeFilterByMonth(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by month</label>
        <select value={props.selected} onChange = {filterChangeHandler}>
          <option value='all'>All Months</option>
          <option value='0'>January</option>
          <option value='1'>February</option>
          <option value='2'>March</option>
          <option value='3'>April</option>
          <option value='4'>May</option>
          <option value='5'>June</option>
          <option value='6'>July</option>
          <option value='7'>August</option>
          <option value='8'>September</option>
          <option value='9'>October</option>
          <option value='10'>November</option>
          <option value='11'>December</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilterMonth;