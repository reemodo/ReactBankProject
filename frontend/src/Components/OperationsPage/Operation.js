import React, { useState, useEffect } from 'react';
import './Operation.css';
import usePostUrlFetcher from '../../Hooks/postTransaction';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
export function Operation({ balance, handelSetBalance }) {
  const [transactionData, setTransactionData] = useState({
    amount: 0,
    category: '',
    vendor: '',
    type: ''
  });
  const [snackbar,setSnackbar] = useState({
    snackbarOpen: false,
    snackbarSeverity: 'success',
    snackbarMessage: ""
  })
 
  const [isClicked, setIsClicked] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setTransactionData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    const amount = transactionData.type === "withdraw" ? -transactionData.amount : transactionData.amount;
    if (balance + amount < 0) {
      setSnackbar({
        snackbarOpen: true,
        snackbarSeverity: 'error',
        snackbarMessage: "You could not do this Transaction"
      })
    
    } else {
      setIsClicked(true);
    }
  };

  const { error, isLoading } =  usePostUrlFetcher(isClicked, 'http://localhost:8000/transactions', transactionData);
  useEffect(() => {
    const fetchData = async () => {
      if (isClicked) {
        if (error) {
          setSnackbar({
            snackbarOpen: true,
            snackbarSeverity: 'error',
            snackbarMessage: "Failed to submit Transaction"
          })
          setIsClicked(false);
        }
        if (isLoading) {
          console.log('Loading...');
        }
        if (!error && !isLoading) {
          setIsClicked(false);
         const amount = parseInt(transactionData.type === "withdraw" ? -transactionData.amount : transactionData.amount);
          handelSetBalance(balance + amount);
          setSnackbar({
            snackbarOpen: true,
            snackbarSeverity: 'success',
            snackbarMessage: "Operation done successfully"
          })
 
        }
      }
    };
    fetchData();
  }, [isClicked, transactionData,isLoading]);

  return (
    <form onSubmit={handelSubmit} className='breakdownForm' title='BreakDown'>
      <div className='title'>Insert Transactions</div>
      <input
        placeholder="Transaction Amount"
        type="text"
        name="amount"
        value={transactionData.amount == 0 ? "" : transactionData.amount}
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
      <Snackbar open={snackbar.snackbarOpen} autoHideDuration={1000} onClose={() => setSnackbar({...snackbar,snackbarOpen:false}) }>
        <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbar({...snackbar,snackbarOpen:false}) }severity={snackbar.snackbarSeverity}>
          {snackbar.snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </form>
    
  );
}
