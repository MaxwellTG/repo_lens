import { FieldValues, useForm } from 'react-hook-form'
import { useRepo } from '../context/RepoContext';

const useFormProps = {}

function Form() {
    const { register, handleSubmit } = useForm(useFormProps);
    const { ownerSetter, getRepoData } = useRepo();

    const onSubmit = (data: FieldValues) => {
        console.log('onSubmit: ', data.owner);
        getRepoData();
    }

    const onError = (errors: FieldValues) => {
        console.log('onError', errors)
    }

    const handleOnOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        ownerSetter(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <input
                {...register('owner', { required: true, onChange: (e) => handleOnOwnerChange(e) })}
                placeholder="username or organization"
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form
