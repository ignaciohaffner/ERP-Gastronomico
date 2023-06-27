import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUsers } from '../context/UserContext'
import { Accordion } from '@rewind-ui/core'

const ProfilePage = () => {

    const params = useParams()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const { getUser, users } = useUsers()
    console.log(users)

    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                console.log(params.id)
                const userFound = await getUser(params.id)
                console.log(userFound)
                setUser(userFound)
                setLoading(false)
            }
        }
        loadUser()

    }, []);

    console.log("user de setuser", user)

    return (
        <>
            {
                loading ? (<p>carregando...</p>) : (

                    <div className='bg-zinc-800  w-full flex flex-col' >
                        <h1 className='text-3xl text-center textbold'>LEGAJO ADMINISTRATIVO</h1>
                        <div className='flex justify-center my-10'>
                            <div className='text-xl mx-10 '>
                                <p>{user.username}</p>
                                <p>{user.role}</p>
                                <p>Faction Management, Staff Management</p>
                            </div>
                            <div className='text-xl mx-10'>
                                <p>Fecha de ingreso: {user.createdAt}</p>
                                <p>Tiempo en el rango: 45 Dias</p>
                            </div>
                        </div>
                        <div className='m-5'>
                            <Accordion defaultItem="item-1" activeColor="black" color="slate" shadow="sd" shadowColor="gray" size="lg">
                                <Accordion.Item anchor="item-1">
                                    <Accordion.Header className='text-xl text-black bg-zinc-500'>Historial Administrativo</Accordion.Header>
                                    <Accordion.Body className='text-black bg-zinc-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad neque accusantium recusandae delectus veritatis impedit maiores earum laboriosam et similique cum hic quo, eos quos id tempore harum officia sed.</Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item anchor="item-2">
                                    <Accordion.Header className='text-xl text-black bg-zinc-500'>Sanciones</Accordion.Header>
                                    <Accordion.Body className='text-black'>Body</Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item anchor="item-3">
                                    <Accordion.Header className='text-xl text-black bg-zinc-500'>Notas STAFF MANAGEMENT</Accordion.Header>
                                    <Accordion.Body className='text-black'>Body</Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div >)

            }
        </>
    )
}

export default ProfilePage