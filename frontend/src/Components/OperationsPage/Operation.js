import React from 'react'
import { useState } from 'react';
import './Operation.css';
export function Operation({setBalance , balance }) {
  const [transactionData, setTransactionData] = useState({
    // Initialize your form fields here
    amount: 0,
    category: '',
    vendor: '',
    type:''
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setTransactionData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      if(transactionData.type === "withdraw" & balance+transactionData.amount * -1 < 0){
        alert('You could not do this Transaction ');
        return;

      }
      const response = await fetch('http://localhost:8000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
      // Handle successful response as needed
      alert('Transaction added successfully');
      setBalance( balance + (transactionData.type === "withdraw" ?transactionData.amount* -1:transactionData.amount*1 ))
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='breakdownForm' title='BreakDown'>
      <div className='title'>Insert Transactions</div>
        <input 
          placeholder="Transaction Amount" 
          type="text" 
          name="amount" 
          value={transactionData.amount==0?"":transactionData.amount} 
          onChange={handleChange} 
          className='textInput'
        />
        <input
          placeholder="Transaction Vendor"
          type="text"
          name="vendor"
          value={transactionData.vendor}
          onChange={handleChange}
          className='textInput'
        />
        <input
          placeholder="Transaction Category"
          type="text"
          name="category"
          value={transactionData.category}
          onChange={handleChange}
          className='textInput'
        />
     
      <div>
      <button name="type" value='withdraw' className='withdrawButton' type="submit" onClick={handleChange}>Withdraw</button>
      <button name="type" value='deposit' className='depositButton' type="submit" onClick={handleChange}>Deposit</button>
      </div>
    </form>
  );
}
