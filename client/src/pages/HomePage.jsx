import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Modal, Card, Input, Textarea } from '@rewind-ui/core'
import { useForm } from 'react-hook-form'
import { createAdminAnnouncementRequest } from '../api/adminannouncement'
import { useAdminAnnouncement } from '../context/AdminAnnouncementContext'
import { useCheckRole } from '../hooks/roleHook'
import days from 'dayjs'
import utc from 'dayjs/plugin/utc'
days.extend(utc)

const HomePage = () => {

    // const [loading, setLoading] = useState(true)
    // const [open, setOpen] = useState(false);
    // const { register, handleSubmit, setValue } = useForm()

    // const { adminAnnouncements,
    //     getAdminAnnouncements,
    //     createAdminAnnouncement } = useAdminAnnouncement()


    // const { user } = useAuth()

    // useEffect(() => {
    //     if (!user) {
    //         setLoading(true)
    //     }

    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 1000)


    // }, [])

    // const { colorRole } = useCheckRole(user)

    // const onSubmit = handleSubmit((data) => {
    //     const dataValid = {
    //         ...data,
    //         date: data.date ? days.utc(data.date).format() : days.utc().format()
    //     }

    //     console.log(dataValid)
    //     createAdminAnnouncement(dataValid)
    //     console.log(dataValid)
    // })


    return (
        <>
            {/* {loading ? <h1>Cargando...</h1> : (<h1>¡Bienvenido <span className={colorRole
            }>{user.username}</span>!</h1>)

            } */}
            {/* 
            <div className='flex  flex-col justify-center mt-10'>
                <div className='flex justify-between'>
                    <h2 className='text-3xl  textbold mt-4'>Anuncios</h2>
                    <button onClick={() => setOpen(true)} className=' px-3 text-center my-3 bg-green-400'>+</button>
                </div>
                <div className='w-full  mt-5 border-2 p-2'>
                    <div className='border-b-2 pb-2'>
                        <p className='underline'>Dejen de pajeriar</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis assumenda suscipit totam, quo nemo fugiat nihil ipsam obcaecati expedita, asperiores labore non dicta aliquid dolorem voluptate? Deserunt error perferendis sequi.</p>
                        <p> Por: <span className='text-yellow-400'>Boomer</span> — 10/10/2022 </p>
                    </div>
                    <div>
                        <p className='underline'>Dejen de pajeriar</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis assumenda suscipit totam, quo nemo fugiat nihil ipsam obcaecati expedita, asperiores labore non dicta aliquid dolorem voluptate? Deserunt error perferendis sequi.</p>
                        <p> Por: <span className='text-yellow-400'>Boomer</span> — 10/10/2022 </p>
                    </div>
                </div>
            </div> */}

            {/* <Modal size="md" open={open} onClose={() => setOpen(false)}>
                <Card className='p-5'>
                    <form onSubmit={onSubmit}>
                        <label className='text-black text-md text-center mb-2'>Historial Administrativo </label>
                        <Input className='my-2' shadow="base" tone="solid" type="text" placeholder='Ingresa el titulo' autoFocus
                            {...register('title')} />
                        <Textarea className='my-2' shadow="base" tone="solid" type="textarea" placeholder='Descripcion'
                            {...register('description')} /> */}

            {/* {update ? (
                            <Button>Actualizar</Button>
                        ) : <button className='m-2 border-2 text-black'>Crear</button>} */}
            {/* <button className='m-2 border-2 text-black'>Crear</button>
                    </form>
                </Card>
            </Modal> */}

        </>
    )
}

export default HomePage