import { ReactComponent as SecurLogo } from '../logo.svg';
import { Link } from 'react-router-dom';
interface NavbarProps {
    isMetamaskConnected: boolean;
    onConnectClick: () => void;
    account: string | null | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ isMetamaskConnected, onConnectClick, account }) => {

    return (
        <header className='flex justify-between items-center h-20 w-full border-b-2 border-gray-300 shadow-md px-12 bg-gradient-to-r from-blue-200 via-white-300 to-blue-300'>
            <div>
                <Link to='/'><SecurLogo className='w-28 h-14 md:w-40 md:h-20 hover:cursor-pointer' /></Link>
            </div>
            {isMetamaskConnected ?
                <div className='flex items-center'>
                    <Link to='/add-citizen'>
                        <button className='bg-gray-300 px-12 py-2 m-2 max-h-10 rounded hover:bg-green-400 active:bg-green-600 w-14 md:w-28 h-8 md:h-12 flex justify-center items-center' onClick={onConnectClick}>
                            <p className='text-sm md:text-base whitespace-nowrap'>Add Citizen</p>
                        </button>
                    </Link>
                    <div className='border border-gray-300 px-4 py-4 m-2 max-h-10 rounded w-14 md:w-28 h-8 md:h-12 flex justify-center items-center'>
                        <p className='account-txt text-sm md:text-base'>{account}</p>
                    </div>
                </div>
                : <button className='text-md bg-gray-300 px-8 py-2 m-2 max-h-10 rounded hover:bg-green-400 active:bg-green-600 w-14 md:w-28 flex justify-center items-center' onClick={onConnectClick}>
                    Connect
                </button>}
        </header>
    );
}

export default Navbar;