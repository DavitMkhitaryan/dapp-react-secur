import { useEffect } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';
import Navbar from './components/Navbar';
import Home from "./components/Home";
import AddCitizen from "./components/AddCitizen";
import citizen from './abis/citizen';

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

let web3 = new Web3(Web3.givenProvider);
const address = '0xce8428D93682C59027699a90676E1365E8bF8FcF';
const contract = new web3.eth.Contract(citizen, address)

function App() {

  // deactivate, chainId
  const { activate } = useWeb3React();
  const { active, account } = useWeb3React();

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          await activate(Injected)
        } catch (error) {
          console.log(error)
        }
      }
    }
    connectWalletOnPageLoad();
  }, [activate]);

  const handleConnectClick = async () => {
      try {
        await activate(Injected)
        localStorage.setItem('isWalletConnected', 'true');
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <BrowserRouter>
      <Navbar isMetamaskConnected={active} onConnectClick={handleConnectClick} account={account} />
      <Routes>
        <Route path='/' element={<Home contract={contract}/>} />
        <Route path='add-citizen' element={<AddCitizen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
