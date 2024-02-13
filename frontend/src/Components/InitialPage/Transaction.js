import React from 'react'
import './Transaction.css'
import  useUrlFetcher  from '../../Hooks/fetchTransactions';

export function Transaction({type,id, amount ,category ,vendor}) {
    const transactionTypeClass = ()=>type === "withdraw"? "withdrawContainer": "depositContainer"
    const useDeleteTransaction= async event => {
        event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/transactions/'+id, {
        method: 'Delete',
      });
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
      // Handle successful response as needed
      alert('Transaction deleted  successfully');
      window.location.reload(true);
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
    }
    return (
        <>
        <div className='transactionCard' id={id}> 
            <div className='vendorContainer'>{vendor}</div>
            <div className={"amountContainer "+ transactionTypeClass()}>{type === "withdraw"?amount*-1 :amount }</div>
            <div className='category'>{category}</div>
            <div><button className="delete" onClick={useDeleteTransaction}>Delete</button></div>
        </div>
        </>
    )
}
