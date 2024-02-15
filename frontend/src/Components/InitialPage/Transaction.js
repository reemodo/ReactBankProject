import React, { useEffect, useState } from 'react'
import './Transaction.css'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import useDeleteUrlFetcher from '../../Hooks/deleteTransactin'
export function Transaction({ handleIsItemDeleted, type, id, amount, category, vendor }) {
    const [isClicked, setIsClicked] = useState(false)
    const [snackbar,setSnackbar] = useState({
        snackbarOpen: false,
        snackbarSeverity: 'success',
        snackbarMessage: ""
      })
    const transactionTypeClass = () => type === "withdraw" ? "withdrawContainer" : "depositContainer"
    const handelIsClicked = () => {
        setIsClicked(true);
    };
    const { error, isLoading } = useDeleteUrlFetcher(isClicked, 'http://localhost:8000/transactions/' + id);
    useEffect(() => {
        if (isClicked) {
            if (error) {
                setSnackbar({
                    snackbarOpen: true,
                    snackbarSeverity: 'error',
                    snackbarMessage: "Failed to delete transaction"
                  })
            }
            if (!error && !isLoading) {
                handleIsItemDeleted(id);
                setIsClicked(false);
            }
        }
    }, [isClicked, error, isLoading, handleIsItemDeleted]);


    return (
        <>
            <div className='transactionCard' id={id}>
                <div className='vendorContainer'>{vendor}</div>
                <div className={"amountContainer " + transactionTypeClass()}>{type === "withdraw" ? amount * -1 : amount}</div>
                <div className='category'>{category}</div>
                <div><button className="delete" onClick={handelIsClicked}>Delete</button></div>
            </div>

            <Snackbar open={snackbar.snackbarOpen} autoHideDuration={1000} onClose={() => setSnackbar({ ...snackbar, snackbarOpen: false })}>
                <MuiAlert elevation={6} variant="filled" onClose={() => setSnackbar({ ...snackbar, snackbarOpen: false })} severity={snackbar.snackbarSeverity}>
                    {snackbar.snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    )
}
