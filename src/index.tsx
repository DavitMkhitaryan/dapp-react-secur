import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Web3ReactProvider } from '@web3-react/core'
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { ConnectorProvider } from './context/connector';
import { Provider } from 'react-redux';
import { store } from './store';

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  return new Web3Provider(provider);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ConnectorProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ConnectorProvider>
  </Web3ReactProvider>
);
