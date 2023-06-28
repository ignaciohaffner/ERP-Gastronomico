import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Combobox } from '@rewind-ui/core'

const RegisterPage = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const { signup, errors: registerErrors } = useAuth()
    const navigate = useNavigate()

    const onSubmit =
        handleSubmit(async (values) => {
            signup(values)
        })

    const handleComboboxChange = (selectedValue) => {
        setValue('rank', selectedValue); // Establece el valor seleccionado en el registro 'rank'
    };



    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md '>
                <h1 className=' text-3xl font-bold'>Register</h1>
                {/* {
                    registerErrors.map((error, i) => (
                        <div key={i} className='bg-red-500 p-2 text-white '>
                            {error}
                        </div>
                    ))
                } */}
                <form onSubmit={onSubmit}>
                    <input type="text" {
                        ...register('username', { required: true })
                    } placeholder="Username" className="w-full bg-zinc-700 my-2 text-white px-4 py-2 rounded-md" />

                    {
                        errors.username && (
                            <p className='text-red-500'>Username is required</p>
                        )
                    }

                    <input type="email" {
                        ...register('email', { required: true })
                    } placeholder="Email" className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md" />
                    {
                        errors.email && (
                            <p className='text-red-500'>Email is required</p>
                        )
                    }
                    <Combobox {
                        ...register('rank', { required: true })
                    } className='bg-zinc-700 text-white my-2 px-4 py-2 rounded-md' placeholder="Selecciona el rango"
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
                    <input type="date" {
                        ...register('dateAdmission', { required: true })
                    } className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md" />
                    <input type="password" {
                        ...register('password', { required: true })
                    } placeholder="Password" className="w-full bg-zinc-700 text-white my-2 px-4 py-2 rounded-md" />
                    {
                        errors.password && (
                            <p className='text-red-500'>Password is required</p>
                        )
                    }

                    <button type='submit' className=' bg-sky-500 text-white px-4 py-2 rounded-md my-2 '>
                        Register
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between'>
                    Si ya tienes una cuenta <Link to="/login" className='text-sky-500'> Login</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage