import { useEffect, useState } from "react";

interface HomeProps {
    // to do, type of contract
    contract: any;
}

const Home: React.FC<HomeProps> = ({ contract }) => {

    const [note, setNote] = useState<string>('');

    useEffect(() => {
        // contract.methods.addCitizen(23, 'Yerevan', 'Davit', 'My Note').call((err: any, result: any) => {console.log(result)});
        contract.methods.getNoteByCitizenId(1).call((err: any, result: any) => {setNote(result)});
    }, []);

    return (
        <main className="h-screen flex items-center justify-center flex-col gap-5">
            <div>
                Home
            </div>
            <div>
               {note}
            </div>
        </main>
    );
}

export default Home;