import React from 'react'
import { useState, useEffect } from 'react';
import  useUrlFetcher  from '../../Hooks/fetchTransactions';
import { Spinner, Dropdown as Error } from 'flowbite-react';
import './Breakdown.css'
export function Breakdown(props) {
   
  
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch('http://localhost:8000/transactions/categories');
    //         if (!response.ok) {
    //           throw new Error('Failed to fetch data');
    //         }
    //         const jsonData = await response.json();
    //         setbreakdownCategories(jsonData);
    //         setLoading(false);
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //         setLoading(false);
    //       }
    //     };
    //     fetchData();

    //     // Cleanup function if needed
    //     // return () => {
    //     //   cleanup
    //     // };
    //   }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount
    const { fetchedData, isError, isLoading } = useUrlFetcher(true,'http://localhost:8000/transactions/categories')
            
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

    return (
        <>
            <form className='breakdownContainer'>
                <div className='title'>BreakDown</div>
            {fetchedData.map(breakdown => <><div className='categoryContainer' key={breakdown._id}>{breakdown._id+":  "+  breakdown.totalAmount}</div></>)}
            </form>
            
        </>
    )
}
