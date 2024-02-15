import React from 'react'
import useUrlFetcher from '../../Hooks/fetchTransactions';
import './Breakdown.css';
import { Spinner } from 'flowbite-react';
const fetcher = async url => {
  const res = await fetch(url,{
    method: 'Delete',
  })
 
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
 
  return res.json()
}
export function Breakdown({ }) {
    const { fetchedData, isError, isLoading } = useUrlFetcher('http://localhost:8000/transactions/categories')

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {isError.message}</div>;

    return (
        <>
            {isLoading ? <Spinner aria-label="Default status example" /> :
            <form className='breakdownContainer'>
                <div className='title'>BreakDown</div>
                {fetchedData.map(breakdown => <div className='categoryContainer' key={breakdown._id}>{breakdown._id + ":  " + breakdown.totalAmount}</div>)}
            </form>
            }

        </>
    )
}
