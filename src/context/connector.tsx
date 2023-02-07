import { useEffect, createContext, ReactElement } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import citizen from '../abis/citizen';

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});

const Infura_API_Key: string | undefined = (process.env.REACT_APP_INFURA_KEY as string);

let web3 = new Web3(Web3.givenProvider || `https://goerli.infura.io/v3/${Infura_API_Key}`);
const address = '0x76c927389DbAc06d4657F08d8D93Bb641f25a826';
const contract = new web3.eth.Contract(citizen, address);

const ConnectorContext = createContext(null);

type ConnectorProviderType = {
    children: ReactElement;
};

const ConnectorProvider: React.FC<ConnectorProviderType> = ({ children }) => {

    const { activate, active, account } = useWeb3React();

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

    const values = {
        active,
        account,
        handleConnectClick,
        contract,
        address
    }

    return (
        // @ts-ignore
        <ConnectorContext.Provider value={values}>
            {children}
        </ConnectorContext.Provider>
    );
}

export { ConnectorProvider }
export default ConnectorContext;




