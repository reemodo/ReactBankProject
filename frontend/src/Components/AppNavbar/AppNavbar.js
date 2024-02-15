import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AppNavbar.css';

export function AppNavbar({balance}) {
   

    return (
        <>
        <nav className="navbar">
        <Link to="/"><div className="navbar-link active">Transactions</div></Link>
        <Link to="/operations"><div className="navbar-link">Operations</div></Link>
        <Link to="/breakdown"><div className="navbar-link">Breakdown</div></Link>
        <div className={`balance ${balance< 500 ?'red':''}`}>Balance: {balance}$</div>
        </nav>
        </>
    )
}

