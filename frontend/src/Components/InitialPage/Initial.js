import React from 'react'
import { useState, useEffect } from 'react';
import { Spinner } from 'flowbite-react';
import { Transaction } from './Transaction';
import './Initial.css'
import useUrlFetcher from '../../Hooks/fetchTransactions';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
export function Initial() {
  const [transactions, setTransactions] = useState([])
  const [snackbar,setSnackbar] = useState({
    snackbarOpen: false,
    snackbarSeverity: 'success',
    snackbarMessage: ""
  })
  const handleIsItemDeleted = (id) => {
    setTransactions(transactions.filter(transaction => transaction._id !== id));
      setSnackbar({
        snackbarOpen: true,
        snackbarSeverity: 'success',
        snackbarMessage: "Transaction deleted successfully"
      })
  };
  const { fetchedData, error, isLoading } = useUrlFetcher('http://localhost:8000/transactions')
  useEffect(() => {
    if(error){
      setSnackbar({
        snackbarOpen: true,
        snackbarSeverity: 'error',
        snackbarMessage: 'Failed to delete transaction'
      })
    }
    
    if (fetchedData) {
      setTransactions(fetchedData);
    }
  }, [fetchedData, isLoading]);
  if (isLoading) return <Spinner aria-label="Default status example" />

  return (
    <>
      {transactions.map((transaction) =>
        <Transaction handleIsItemDeleted={handleIsItemDeleted} type={transaction.type} id={transaction._id} amount={transaction.amount} category={transaction.category} vendor={transaction.vendor} key={transaction._id} />
      )}
       <Snackbar open={snackbar.snackbarOpen} autoHideDuration={1000} onClose={() => setSnackbar({...snackbar,snackbarOpen:false}) }>
        <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbar({...snackbar,snackbarOpen:false}) }severity={snackbar.snackbarSeverity}>
          {snackbar.snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  )
}
