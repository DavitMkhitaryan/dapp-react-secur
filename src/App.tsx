import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import AddCitizen from "./pages/AddCitizen";
import useConnector from "./hooks/useConnector";

function App() {

  const {active, contract, account, handleConnectClick} = useConnector();

  return (
    <BrowserRouter>
      <Navbar isMetamaskConnected={active} onConnectClick={handleConnectClick} account={account} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='add-citizen' element={<AddCitizen contract={contract} account={account}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
