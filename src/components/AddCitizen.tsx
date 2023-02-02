import { useForm } from "react-hook-form";
interface AddCitizenProps {
    // to do, type of contract
    contract: any;
    account: string | null | undefined;
}

const AddCitizen: React.FC<AddCitizenProps> = ({ contract, account }) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            age: '',
            city: '',
            note: ''
        }
    });

    return (
        <main className="h-screen flex items-center justify-center flex-col gap-5">
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
                contract.methods.addCitizen(data.age, data.city, data.name, data.note).send({
                    from: account
                }).then(console.log('Success'));
            })} className='grid grid-cols-3 grid-rows-3 gap-x-5 gap-y-1 border border-gray-200 p-20 shadow-md'>
                <div className="flex flex-col gap-2">
                    <label>Name</label>
                    <input {...register("name", { required: true, maxLength: 150 })} className='border border-gray-200 focus:outline-green-300 rounded-md px-1 py-0.5'/>
                    {errors.name && <p className="text-red-500">This field is required</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label>Age</label>
                    <input {...register("age", { required: true, maxLength: 10 })} className='border border-gray-200 focus:outline-green-300 rounded-md px-1 py-0.5' />
                    {errors.age && <p className="text-red-500">This field is required</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label>City</label>
                    <input {...register("city", { required: true, maxLength: 100 })}  className='border border-gray-200 focus:outline-green-300 rounded-md px-1 py-0.5'/>
                    {errors.city && <p className="text-red-500">This field is required</p>}
                </div>
                <div className="col-span-full flex flex-col gap-2">
                    <label>Note</label>
                    <textarea {...register("note", { required: true })} className='border border-gray-200 focus:outline-green-300 rounded-md px-1 py-0.5'></textarea>
                    {errors.note && <p className="text-red-500">This field is required</p>}
                </div>
                <button className="col-span-full text-md bg-gray-300 px-8 py-2 my-4 rounded hover:bg-green-400 active:bg-green-600 max-h-10 flex justify-center items-center" type="submit">
                    Add
                </button>
            </form>

        </main>
    );
}

export default AddCitizen;