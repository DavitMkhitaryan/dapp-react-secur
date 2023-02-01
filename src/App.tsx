import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import AddCitizen from "./components/AddCitizen";

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

function App() {

  const handleConnectClick = () => {
    activate(Injected);
  }

  const { activate, deactivate } = useWeb3React();
  const { active, chainId, account } = useWeb3React();

  return (
    <BrowserRouter>
      <Navbar isMetamaskConnected={active} onConnectClick={handleConnectClick} account={account} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='add-citizen' element={<AddCitizen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
