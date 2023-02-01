import {ReactComponent as SecurLogo} from '../logo.svg';


interface NavbarProps {
    isMetamaskConnected: boolean;
    onConnectClick: () => void;
    account: string | null | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ isMetamaskConnected, onConnectClick, account }) => {

    return (
    <header className='flex justify-between items-center h-20 border-b-2 border-gray-300 shadow-md px-12 bg-gradient-to-r from-blue-200 via-white-300 to-blue-300'>
    <div>
        <SecurLogo className='w-40 h-20'/>
    </div>
    {isMetamaskConnected ? <div className='text-sm border border-gray-200 px-4 py-4 m-2 rounded w-25 flex justify-center items-center'><p>{account}</p></div> :
      <button className='text-md bg-gray-400 px-8 py-2 m-2 rounded hover:bg-green-400 active:bg-green-600 w-28 flex justify-center items-center' onClick={onConnectClick}>
       Connect
      </button>}
  </header>
    );
}

export default Navbar;