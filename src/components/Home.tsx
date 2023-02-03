import { useEffect, useState } from "react";
import citizen from "../abis/citizen";
interface HomeProps {
    // to do, type of contract
    contract: any;
}

interface Citizen {
    id: string;
    name: string;
    age: string;
    city: string;
}

const Home: React.FC<HomeProps> = ({ contract }) => {

    const [note, setNote] = useState<string>('');
    const [citizenList, setCitizenList] = useState<Citizen[]>([]);

    useEffect(() => {
        let newCitizensArr: Citizen[] = [];

        contract.getPastEvents('Citizen', { fromBlock: 0, toBlock: 'latest' }).then((events: any) => {
            console.log(events);
            events.forEach((event: any) => {
                let citizen: Citizen = {
                    id: event.returnValues[0],
                    name: event.returnValues[3],
                    age: event.returnValues[1],
                    city: event.returnValues[2]
                }
                newCitizensArr.push(citizen);
            });
            console.log(newCitizensArr);
            setCitizenList([...citizenList, ...newCitizensArr]);
        });
    }, []);

    return (
        <main className="h-screen flex items-center justify-center flex-col gap-5">
            <div>
                Home
            </div>
            {citizenList.length > 0 &&
                <div className="flex flex-col gap-5">
                    <p>{citizenList[citizenList.length-1].id}</p>
                    <p>{citizenList[citizenList.length-1].name}</p>
                    <p>{citizenList[citizenList.length-1].age}</p>
                    <p>{citizenList[citizenList.length-1].city}</p>
                </div>
            }
        </main>
    );
}

export default Home;