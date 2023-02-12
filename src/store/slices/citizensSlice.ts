import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Contract, EventData } from "web3-eth-contract"
import Web3 from 'web3';
import citizen from '../../abis/citizen';
import { InjectedConnector } from "@web3-react/injected-connector";

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});

const Infura_API_Key: string | undefined = (process.env.REACT_APP_INFURA_KEY as string);

let web3 = new Web3(Web3.givenProvider || `https://goerli.infura.io/v3/${Infura_API_Key}`);
const address = '0x76c927389DbAc06d4657F08d8D93Bb641f25a826';
const contract = new web3.eth.Contract(citizen, address);

interface Citizen {
    id: string;
    name: string;
    age: string;
    city: string;
}

interface CitizensState {
    citizensList: Citizen[],
    loading: boolean
}

const initialState: CitizensState = {
    citizensList: [],
    loading: false
}

export const citizensSlice = createSlice({
    name: 'citizensList',
    initialState,
    reducers: {
        fetchCitizensList: (state) => {
            let newCitizensArr: Citizen[] = [];
            
            contract.getPastEvents('Citizen', { fromBlock: 0, toBlock: 'latest' }).then((events: any) => {
                events.forEach((event: EventData) => {
                    let citizen: Citizen = {
                        id: event.returnValues[0],
                        name: event.returnValues[3],
                        age: event.returnValues[1],
                        city: event.returnValues[2]
                    }
                    newCitizensArr.push(citizen);
                });
                state.citizensList = newCitizensArr;
            });
        }
    }
});

export const {fetchCitizensList} = citizensSlice.actions;
export const citizensListReducer = citizensSlice.reducer;