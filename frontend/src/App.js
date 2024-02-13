import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppNavbar } from "./Components/AppNavbar/AppNavbar";
import {Initial} from "./Components/InitialPage/Initial";
import {Operation} from "./Components/OperationsPage/Operation";
import {Breakdown} from "./Components/BreakdownPage/Breakdown";
import { useState } from 'react';
function App() {
  const [balance, setBalance] = useState(1380)
  return (
    <Router>
      <div className="App">
        <AppNavbar balance={balance}/>
      </div>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/operations" element={<Operation balance={balance} setBalance={setBalance}/>} />
        <Route path="/breakdown" element={<Breakdown />} />
      </Routes>
    </Router>
  );
}

export default App;
