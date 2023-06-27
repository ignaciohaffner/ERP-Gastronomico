import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUsers } from '../context/UserContext'
import { Accordion, Dropdown, Button, Modal, Card, Input, Textarea } from '@rewind-ui/core'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useAdminHistory } from '../context/AdminHistoryContext'
dayjs.extend(utc)


const ProfilePage = () => {

    const params = useParams()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, setValue } = useForm()
    const { createAdminHistory } = useAdminHistory()

    const navigate = useNavigate()

    const { getUser, users } = useUsers()

    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                const userFound = await getUser(params.id)
                setUser(userFound)
                setLoading(false)
            }
        }
        loadUser()

    }, []);

    const onSubmit = handleSubmit((data) => {

        const dataValid = {
            ...data,
            date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(), userReceiver: user._id
        }
        console.log(dataValid)
        createAdminHistory(dataValid)
        console.log(dataValid)
    })

    return (
        <>
            {
                loading ? (<p>carregando...</p>) : (

                    <div className='bg-zinc-800  w-full flex flex-col' >
                        <h1 className='text-3xl text-center textbold'>LEGAJO ADMINISTRATIVO</h1>
                        <div className='flex justify-center my-10'>
                            <div className='text-xl mx-10 '>
                                <p>{user.username} <span><Dropdown>
                                    <Dropdown.Trigger>
                                        <Button>
                                            Menu
                                        </Button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Item>
                                            <button onClick={() => setOpen(true)}>Agregar Historial Admin</button>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            Messages
                                        </Dropdown.Item>
                                    </Dropdown.Content>
                                </Dropdown>
                                </span>
                                </p>
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
            <Modal size="md" open={open} onClose={() => setOpen(false)}>
                <Card className='p-5'>
                    <form onSubmit={onSubmit}>
                        <label className='text-black text-md text-center mb-2'>Historial Administrativo </label>
                        <Input className='my-2' shadow="base" tone="solid" type="text" placeholder='Ingresa el titulo' autoFocus
                            {...register('title')} />
                        <Textarea className='my-2' shadow="base" tone="solid" type="textarea" placeholder='Descripcion'
                            {...register('description')} />
                        <Button className='my-2'>Crear</Button>
                        <button className='m-2 border-2 text-black'>Crear2</button>
                    </form>
                </Card>
            </Modal>

        </>
    )
}

export default ProfilePage