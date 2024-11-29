import { FieldValues, useForm } from 'react-hook-form'

const useFormProps = {}

function Form() {
    const { register, handleSubmit } = useForm(useFormProps)

    const onSubmit = (data: FieldValues) => {
        console.log('onSubmit', data)
    }

    const onError = (errors: FieldValues) => {
        console.log('onError', errors)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <input
                {...register('input', { required: true })}
                placeholder="username or organization"
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form
