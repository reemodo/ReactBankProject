import React from 'react'
import { useState, useEffect } from 'react';
import { Spinner } from 'flowbite-react';
import { Transaction } from './Transaction';
import './Initial.css'
export function Initial({}) {
    const [transactions,setTransaction] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8000/transactions');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setTransaction(jsonData);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
        fetchData();

        // Cleanup function if needed
        // return () => {
        //   cleanup
        // };
      }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount
    

    return (
        <>
            {loading?<Spinner aria-label="Default status example" />:

            transactions.map((transaction)=> 
              <Transaction type={transaction.type} id={transaction._id} amount={transaction.amount} category={transaction.category} vendor={transaction.vendor} key={transaction._id}/>
            )}
        </>
    )
}
