import { Link } from 'react-router-dom'
import { useGetUsers } from '../hook/useUser'

export const Home = () => {

    const { data, isLoading, isError } = useGetUsers()

    return (
        <>
            <h1>Home</h1>

            {isLoading && <span>fetching a character...</span>}
            {isError && <span>Ups! it was an error 🚨</span>}

            <div className="grid">
                {
                    data?.map(user => (
                        <Link to={`/${user.id}`} key={user.id} className='user'>
                            <span>{user.name}</span>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}