import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Combobox } from '@rewind-ui/core'
import { useUsers } from '../context/UserContext'
import { useForm } from 'react-hook-form'
import days from 'dayjs'
import utc from 'dayjs/plugin/utc'
days.extend(utc)

const EditUser = () => {
    const params = useParams()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const { register, handleSubmit, setValue } = useForm()

    const navigate = useNavigate()

    const { getUser, users, updateUser } = useUsers()

    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                const userFound = await getUser(params.id)
                setUser(userFound)
                setLoading(false)
                setValue('username', userFound.username)
                setValue('email', userFound.email)
                setValue('password', userFound.password)
                setValue('dateAdmission', days(userFound.dateAdmission).utc().format('YYYY-MM-DD'))
                setValue('rank', userFound.rank)
                setLoading(false)
            }
        }
        loadUser()

    }, []);

    const onSubmit =
        handleSubmit(async (values) => {
            console.log("estoy intentando enviar el formulario")
            updateUser(params.id, values)
            console.log(values)
        })

    const handleComboboxChange = (selectedValue) => {
        setValue('rank', selectedValue); // Establece el valor seleccionado en el registro 'rank'
    };
    return (
        <>
            {
                loading ? <p> Carregando</p> : (


                    <div className='flex h-[calc(100vh-100px)] items-center justify-center mt-5'>
                        <div className='bg-zinc-800 max-w-md p-10 rounded-md '>
                            <h1 className=' text-3xl font-bold'>Editar usuario: {user.username}</h1>
                            <form onSubmit={onSubmit}>
                                <p className='mt-2'>Nombre de usuario</p>
                                <input type="text" {
                                    ...register('username')
                                } placeholder="Username" className="w-full bg-zinc-700 my-2 text-white px-4 py-2 rounded-md" />

                                <p>Email</p>
                                <input type="email" {
                                    ...register('email')
                                } placeholder="Email" className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md" />
                                <p>Rango</p>
                                <Combobox {
                                    ...register('rank')
                                } className='bg-zinc-700 text-black my-2 px-4 py-2 rounded-md' placeholder="Selecciona el rango"
                                    onChange={handleComboboxChange}>
                                    <Combobox.Option value="Support" label="Support" />
                                    <Combobox.Option value="Senior Support" label="Senior Support" />
                                    <Combobox.Option value="Trial Admin" label="Trial Admin" />
                                    <Combobox.Option value="Admin Lvl.1" label="Admin Lvl.1" />
                                    <Combobox.Option value="Admin Lvl.2" label="Admin Lvl.2" />
                                    <Combobox.Option value="Senior Admin" label="Senior Admin" />
                                    <Combobox.Option value="Lead Admin" label="Lead Admin" />
                                    <Combobox.Option value="Manager" label="Manager" />
                                </Combobox>
                                <p>Fecha de ingreso</p>
                                <input type="date" {
                                    ...register('dateAdmission')
                                } className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md" />
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

export default EditUser
