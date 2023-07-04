import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useUsers } from '../context/UserContext'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'

const ChangePasswordPage = () => {
    const params = useParams()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit, setValue } = useForm()

    const navigate = useNavigate()

    const { getUser, users, updateUser } = useUsers()

    const { changePassword } = useAuth()

    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                const userFound = await getUser(params.id)
                setUser(userFound)
                setLoading(false)
                setValue('password', userFound.password)
                setLoading(false)
            }
        }
        loadUser()

    }, []);

    const onSubmit =
        handleSubmit(async (values) => {
            console.log("estoy intentando enviar el formulario")
            changePassword(params.id, values)
            console.log(values)
        })

    return (
        <>
            {
                loading ? <p> Carregando</p> : (


                    <div className='flex h-[calc(100vh-100px)] items-center justify-center mt-5'>
                        <div className='bg-zinc-800 max-w-md p-10 rounded-md '>
                            <h1 className=' text-3xl font-bold'>Cambiar contraseña: {user.username}</h1>
                            <form onSubmit={onSubmit}>
                                <p>Contraseña</p>
                                <input type="password" {
                                    ...register('password')
                                } placeholder="Contraseña" className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md" />

                                <button type='submit' className=' bg-sky-500 text-white px-4 py-2 rounded-md my-2 '>
                                    Editar
                                </button>
                            </form>
                        </div>
                    </div>)}
        </>
    )
}

export default ChangePasswordPage
