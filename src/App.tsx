import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'
import Navbar from './components/Navbar';

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
    <div>
      <Navbar isMetamaskConnected={active} onConnectClick={handleConnectClick} account={account}/>
      <main className="bg-gray-200">
        
      </main>
    </div>
  );
}

export default App;
