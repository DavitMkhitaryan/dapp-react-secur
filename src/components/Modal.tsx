import ReactDOM from "react-dom";
import { useEffect } from "react";
import Button from './Button';

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
            <div className="fixed inset-x-0 inset-y-[25vh] m-10 h-[25rem] md:inset-80 md:w-[50vw] md:h-[25vh] p-10 bg-white border-2 border-gray-200 drop-shadow-lg">
                <div className="flex flex-col justify-between h-full">
                    {children}
                    <div className="flex justify-end">
                        <Button onClick={onClose} className='px-8 py-2 m-2 max-h-10 w-18 md:w-28'>Close</Button>
                    </div>
                </div>
            </div>
        </div>,

        document.querySelector('.modal-container')!
    );
}

export default Modal;