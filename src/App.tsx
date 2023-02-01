import React, { useState } from 'react';
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

function App() {

  const { activate, deactivate } = useWeb3React();
  const { active, chainId, account } = useWeb3React();
  const [connecting, setConnecting] = useState<boolean>(false);

  const handleConnectClick = () => {
    activate(Injected);
    setConnecting(true);
  }

  return (
    <div>
      <header className='flex justify-end h-16 px-12 bg-gradient-to-r from-blue-200 via-white-300 to-blue-300'>
        {active ? <div className='text-md bg-green-400 px-4 py-4 m-2 rounded w-25 flex justify-center items-center'><p>Connected</p></div> :
          <button className='text-md bg-gray-400 px-4 m-2 rounded hover:bg-green-600 w-20 flex justify-center items-center' onClick={handleConnectClick}>
           Connect
          </button>}
      </header>
      <main>
        <div>Connection Status: {active}</div>
        <div>Account: {account}</div>
        <div>Network ID: {chainId}</div>

      </main>
    </div>
  );
}

export default App;
