import ReactDOM from "react-dom";
import { useEffect } from "react";

interface ModalProps {
    onClose: () => void,
    children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
    }, []);

    return ReactDOM.createPortal(
        <div>
            <div className="fixed inset-0 bg-gray-300 opacity-80" onClick={onClose}></div>
            <div className="fixed inset-80 w-[50vw] h-[25vh] p-10 bg-white border-2 border-gray-200 drop-shadow-lg">
                <div className="flex flex-col justify-between h-full">
                    {children}
                    <div className="flex justify-end">
                        <button onClick={onClose} className='bg-gray-300 px-8 py-2 m-2 max-h-10 rounded hover:bg-green-400 active:bg-green-600 w-18 md:w-28 flex justify-center items-center'>Close</button>
                    </div>
                </div>
            </div>
        </div>,

        document.querySelector('.modal-container')!
    );
}

export default Modal;