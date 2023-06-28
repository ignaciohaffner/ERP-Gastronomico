import { useEffect } from 'react'
import { useUsers } from '../context/UserContext'
import UserTable from '../components/UserTable'
import { Table } from '@rewind-ui/core';


const RosterPage = () => {

    const { getUsers, users } = useUsers()

    useEffect(() => {
        getUsers()
    }, []);

    return (

        <>
            <Table radius="lg" striped={true} hoverable={true} headerColor="white" borderStyle="dashed">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th align="left">Username</Table.Th>
                        <Table.Th align="left">Rango</Table.Th>
                        <Table.Th align="left">Equipo</Table.Th>
                        <Table.Th align="left">Variable</Table.Th>
                        <Table.Th align="left">Fecha de ingreso</Table.Th>
                        <Table.Th align="left">Estado</Table.Th>
                        <Table.Th align="center">Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>

                    {
                        users.map(users => (
                            <UserTable user={users} key={users._id} />
                        ))
                    }
                </Table.Tbody>
            </Table>
            {/* <Modal size="md" open={open} onClose={() => setOpen(false)}>
                <Card className='text-black p-5 '>
                    <h1 className=' text-2xl textbold my-5
                    '>Seleccionar rango para <span className='text-red-500'>{user.username}</span></h1>
                    <Selector value="staff">
                        <Selector.Tab onClick={() => updateUser(user._id, { role: "staff" })} anchor="staff" label="Staff" />
                        <Selector.Tab onClick={() => updateUser(user._id, { role: "staffmanagement" })} anchor="staffmanagement" label="Staff Management" />
                        <Selector.Tab onClick={() => updateUser(user._id, { role: "manager" })} anchor="manager" label="Manager" />
                    </Selector>
                </Card>
            </Modal> */}
        </>
    )
}

export default RosterPage