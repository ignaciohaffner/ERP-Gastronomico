import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUsers } from '../context/UserContext'
import { Accordion, Dropdown, Button, Modal, Card, Input, Textarea } from '@rewind-ui/core'
import { useForm } from 'react-hook-form'
import { useAdminHistory } from '../context/AdminHistoryContext'
import { BiChevronDown, BiEdit, BiTrash } from 'react-icons/bi'
import days from 'dayjs'
import utc from 'dayjs/plugin/utc'
days.extend(utc)


const ProfilePage = () => {

    const params = useParams()
    const [user, setUser] = useState(null)
    const [adminHistory, setAdminHistory] = useState(null)
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const [adminHistoryUpdate, setAdminHistoryUpdate] = useState({})
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, setValue } = useForm()
    const { createAdminHistory, getAdminHistories, adminHistories, deleteAdminHistory, updateAdminHistory } = useAdminHistory()

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

        const cargarHistoriales = async () => {
            const historiales = await getAdminHistories(params.id)
        }

        loadUser()
        cargarHistoriales()
        console.log(adminHistories)

    }, []);


    const onSubmit = handleSubmit((data) => {
        const dataValid = {
            ...data,
            date: data.date ? days.utc(data.date).format() : days.utc().format(), userReceiver: user._id
        }

        if (update) {
            updateAdminHistory(params.id, dataValid)
        }

        console.log(dataValid)
        createAdminHistory(dataValid)
        console.log(dataValid)
    })

    const updateAdminHistoryFront = (adminHistory) => {
        setUpdate(true)
        setOpen(true)
        setValue('title', adminHistory.title)
        setValue('description', adminHistory.description)
        setValue('date', adminHistory.date)
        setAdminHistoryUpdate(adminHistory)
    }

    return (
        <>
            {
                loading ? (<p>carregando...</p>) : (

                    <div className='bg-zinc-800  w-full flex flex-col' >
                        <h1 className='text-3xl text-center textbold mt-4'>LEGAJO ADMINISTRATIVO</h1>
                        <div className='flex justify-center my-10'>
                            <div className='text-xl mx-10 '>
                                <div className='flex justify-between'>
                                    <p>{user.username}</p>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className='bg-gray-200 text-black rounded-full'><BiChevronDown /></button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Item>
                                                <button onClick={() => {
                                                    setUpdate(false)
                                                    setOpen(true)
                                                }}>Agregar Historial Admin</button>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                Messages
                                            </Dropdown.Item>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>

                                <p>{user.role}</p>
                                <p>Faction Management, Staff Management</p>
                            </div>
                            <div className='text-xl mx-10'>
                                <p>Fecha de ingreso: {days(user.createAt).utc().format('DD/MM/YYYY')}</p>
                                <p>Tiempo en el rango: 45 Dias</p>
                                <p>Strikes: 0/3</p>
                            </div>
                        </div>
                        <div className='m-5'>

                            <Accordion defaultItem="item-1" activeColor="black" color="slate" shadow="sd" shadowColor="gray" size="lg">
                                <Accordion.Item anchor="item-1">
                                    <Accordion.Header className='text-xl text-black bg-zinc-500'>Historial Administrativo</Accordion.Header>
                                    <Accordion.Body className='text-black bg-zinc-300'>
                                        {
                                            adminHistories != null ? (
                                                adminHistories.map((adminHistory) => (
                                                    <div id={adminHistory._id} className=" border-b-2 pb-2 my-2">
                                                        <div className='flex justify-between'>
                                                            <h2 className='text-bold text-lg'>{days(adminHistory.date).utc().format('DD/MM/YYYY')} — <span>{adminHistory.title}</span></h2>
                                                            <div className='flex'>
                                                                <button onClick={() => {
                                                                    updateAdminHistoryFront(adminHistory)
                                                                }
                                                                }><BiEdit /></button>
                                                                <button onClick={() => {
                                                                    deleteAdminHistory(adminHistory._id)
                                                                }}><BiTrash /></button>
                                                            </div>
                                                        </div>
                                                        <p className='text-gray-700'>{adminHistory.description}</p>
                                                        <p className='text-bold'>por: <span className='text-yellow-400'>{adminHistory.user.username}</span></p>
                                                    </div>

                                                ))
                                            ) : <p>No hay historial</p>
                                        }
                                    </Accordion.Body>
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

                        {update ? (
                            <Button>Actualizar</Button>
                        ) : <button className='m-2 border-2 text-black'>Crear</button>}
                    </form>
                </Card>
            </Modal>

        </>
    )
}

export default ProfilePage