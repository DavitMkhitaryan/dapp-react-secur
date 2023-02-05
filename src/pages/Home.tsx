import { useEffect, useState, useMemo } from "react";
import Pagination from "../components/Pagination";

interface HomeProps {
    // to do, type of contract
    contract: any;
}

export interface Citizen {
    id: string;
    name: string;
    age: string;
    city: string;
}

const Home: React.FC<HomeProps> = ({ contract }) => {

    // const [note, setNote] = useState<string>('');
    const [citizenList, setCitizenList] = useState<Citizen[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

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

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return citizenList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, citizenList]);

    let content = currentTableData.map((citizen) => {
        return (
            <tr key={citizen.id}>
                <td>{citizen.id}</td>
                <td>{citizen.name}</td>
                <td>{citizen.age}</td>
                <td>{citizen.city}</td>
            </tr>
        );
    });

    return (
        <main className="h-screen flex items-center justify-center flex-col gap-5">
            <div className="flex justify-between text-base w-[20rem] px-1 md:text-lg md:w-[50rem] md:px-1">
                <p>Citizens List</p>
                <p>Total Records: <span className="font-bold text-green-500">{citizenList.length}</span></p>
            </div>
            <table className="border border-gray table-fixed w-[20rem] md:w-[50rem] m-12 text-center text-sm md:text-base">
                <thead className="border-b-2 shadow-sm py-2">
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>AGE</th>
                        <th>CITY</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={citizenList.length}
                    pageSize={pageSize}
                    onPageChange={(page: any) => setCurrentPage(page)}
                    siblingCount={1} />
            </table>
        </main>
    );
}

export default Home;