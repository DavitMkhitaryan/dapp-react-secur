import { useState } from "react";
import { useForm } from "react-hook-form";
import { TailSpin } from 'react-loader-spinner';
import useConnector from "../hooks/useConnector";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/Button';

interface FormInputs {
    name: string;
    age: string;
    city: string;
    note: string;
}

const AddCitizen: React.FC = () => {

    const { contract, account, chainId } = useConnector();

    const [loading, setLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
        defaultValues: {
            name: '',
            age: '',
            city: '',
            note: ''
        }
    });

    const onFormSubmit = (data: FormInputs) => {
        if (chainId === 5) {
            setLoading(true);
            contract.methods.addCitizen(data.age, data.city, data.name, data.note).send(
                {
                    from: account
                })
                .then(() => {
                    notifySuccess();
                    reset();
                })
                .catch((error: any) => {
                    notifyError(error.message);
                    console.log(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            notifyError('Connect to Goerli Network to Create Citizen');
        }
    }


    const notifySuccess = () => {
        toast.success('Citizen added successfully', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const notifyError = (error: string) => {
        toast.error(error, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return (
        <main className="h-screen flex items-center justify-center flex-col gap-5">
            <form onSubmit={handleSubmit(onFormSubmit)} className='grid grid-cols-3 grid-rows-3 gap-x-5 gap-y-1 border border-gray-200 p-20 shadow-md m-5'>
                <div className="flex flex-col gap-2">
                    <label>Name</label>
                    <input {...register("name", { required: true })} className='border border-gray-200 focus:outline-green-300 rounded-md px-1 py-0.5' />
                    {errors.name && <p className="text-red-500">This field is required</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label>Age</label>
                    <input {...register("age", { required: true })} className='border border-gray-200 focus:outline-green-300 rounded-md px-1 py-0.5' type="number" inputMode="numeric" min="18" max="104" />
                    {errors.age && <p className="text-red-500">This field is required</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label>City</label>
                    <input {...register("city", { required: true })} className='border border-gray-200 focus:outline-green-300 rounded-md px-1 py-0.5' />
                    {errors.city && <p className="text-red-500">This field is required</p>}
                </div>
                <div className="col-span-full flex flex-col gap-2">
                    <label>Note</label>
                    <textarea {...register("note", { required: true })} className='border border-gray-200 focus:outline-green-300 rounded-md px-1 py-0.5'></textarea>
                    {errors.note && <p className="text-red-500">This field is required</p>}
                </div>
                {loading ? <div className="col-span-full text-md bg-gray-200 px-8 py-2 my-4 rounded0 max-h-10 flex justify-center items-center">
                    <TailSpin
                        height="30"
                        width="30"
                        color="rgb(74 222 128)"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div> : <Button className="col-span-full text-md px-8 py-2 my-4 max-h-10" type="submit">
                    Add
                </Button>}
            </form>
            <ToastContainer />
        </main>
    );
}

export default AddCitizen;