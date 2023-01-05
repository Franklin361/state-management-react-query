import { useRef } from 'react'
import { useCreateUser } from '../hook/useUser'

export const CreateUser = () => {

    const create_user = useCreateUser()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const data = Object.fromEntries(new FormData(form))
        await create_user.mutateAsync({ name: data.user as string })
        form.reset()
    }

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit} className='mt'>
                <input name='user' type="text" placeholder='Add new user' />
                {create_user.isLoading && <span>creating user...</span>}
                <button>Add User</button>
                {create_user.isSuccess && <span>User created successfully ✅</span>}
                {create_user.isError && <span>Ups! it was an error 🚨</span>}
            </form>
        </div>
    )
}