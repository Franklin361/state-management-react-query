
import { QueryObserver, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createUser, deleteUser, editUser, getUsers } from '../api/user';
import { User } from '../interface';

const key = 'users'

export const useEditUser = () => {
    const queryClient = useQueryClient();

    return useMutation(editUser, {
        onSuccess: (user_updated: User) => {

            queryClient.setQueryData([key],
                (prevUsers: User[] | undefined) => {
                    if (prevUsers) {
                        prevUsers.map(user => {
                            if (user.id === user_updated.id) {
                                user.name = user_updated.name
                            }
                            return user
                        })
                    }
                    return prevUsers
                }
            )
        }
    })
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation(createUser, {
        onSuccess: (user: User) => {

            queryClient.setQueryData([key],
                (prevUsers: User[] | undefined) => prevUsers ? [user, ...prevUsers] : [user]
            )
        }
    })
}

export const useDeleteUser = () => {

    const queryClient = useQueryClient();

    return useMutation(deleteUser, {
        onSuccess: (id) => {
            queryClient.setQueryData([key],
                (prevUsers: User[] | undefined) => prevUsers ? prevUsers.filter(user => user.id !== id) : prevUsers
            )
        }
    });
}

export const useGetUsers = () => {
    return useQuery([key], getUsers);
}

export const useGetUsersObserver = () => {

    const get_users = useGetUsers()

    const queryClient = useQueryClient()

    const [users, setUsers] = useState<User[]>(() => {
        // get data from cache
        const data = queryClient.getQueryData<User[]>([key])
        return data ?? []
    })

    useEffect(() => {
        const observer = new QueryObserver<User[]>(queryClient, { queryKey: [key] })

        const unsubscribe = observer.subscribe(result => {
            if (result.data) setUsers(result.data)
        })

        return () => { unsubscribe() }
    }, [])

    return {
        ...get_users,
        data: users,
    }
}
