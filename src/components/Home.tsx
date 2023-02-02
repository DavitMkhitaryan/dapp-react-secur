import { useEffect, useState } from "react";
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
        const fetchCitizens = async () => {
            await contract.getPastEvents(
                'Citizen',
                {
                    fromBlock: 0,
                    toBlock: 'latest'
                },
                (err: any, events: any) => {
                    events.forEach((event: any) => {
                        let citizen: Citizen = {
                            id: event.returnValues[0],
                            name: event.returnValues[3],
                            age: event.returnValues[1],
                            city: event.returnValues[2]
                        }
                        setCitizenList([...citizenList, citizen]);
                    });
                }
            )
        }
        fetchCitizens();
        console.log(citizenList);
    }, []);

    return (
        <main className="h-screen flex items-center justify-center flex-col gap-5">
            <div>
                Home
            </div>
            <div className="flex flex-col gap-5">
                {/* <p>{citizenList[0].id}</p> */}
                {/* <p>{citizenList[0].id}</p>
                <p>{citizenList[0].name}</p>
                <p>{citizenList[0].age}</p>
                <p>{citizenList[0].city}</p> */}
            </div>
        </main>
    );
}

export default Home;