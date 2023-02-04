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
            setCitizenList([...newCitizensArr]);
        });
    }, []);

    let content = citizenList.map((citizen) => {
        return(
            <tr key={citizen.id}>
                <td>{citizen.id}</td>
                <td>{citizen.name}</td>
                <td>{citizen.age}</td>
                <td>{citizen.city}</td>
            </tr>
        );
    })

    return (
        <main className="h-screen flex items-center justify-center flex-col gap-5">
            <table className="border border-gray">
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>AGE</td>
                        <td>CITY</td>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </main>
    );
}

export default Home;