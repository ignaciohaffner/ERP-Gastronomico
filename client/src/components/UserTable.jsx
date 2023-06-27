import { useState } from 'react'
import { Table, Card, Button, Dropdown, Badge, Modal, Selector } from '@rewind-ui/core'
import { useUsers } from '../context/userContext'
import { useAuth } from '../context/authContext'
import { Link } from 'react-router-dom'

const UserTable = ({ user }) => {

    const { deleteUser, updateUser } = useUsers()
    const { role } = useAuth()
    const [open, setOpen] = useState(false);


    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <Link to={`/profile/${user._id}`}>{user.username}</Link>
                </Table.Td>
                <Table.Td>
                    {user.email}
                </Table.Td>
                <Table.Td>
                    <Badge color="purple" tone="light">
                        {(user.role) === 'staff' ? 'Staff' : (user.role) === 'manager' ? 'Manager' : 'Staff Management'}
                    </Badge>
                </Table.Td>
                <Table.Td>
                    <Badge color="green" tone="outline" className='p-2'>
                        <div className="w-1.5 h-1.5 bg-green-500 animate-pulse rounded-full mr-1.5" />
                        Active
                    </Badge>
                </Table.Td>
                <Table.Td align="right">
                    <Dropdown
                        itemColor="gray"
                        tone="light"
                        placement="bottom-end"
                        shadow="sm"
                        withChevron={true}
                        className="mr-5"
                    >
                        <Dropdown.Trigger>
                            <Button color="white" tone="light" size="md" className='px-10' shadow="sm" icon>
                                Opciones
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content size="md" className="min-w-[7rem]">
                            <Dropdown.Item >View</Dropdown.Item>
                            <Dropdown.Item>Edit</Dropdown.Item>
                            <Dropdown.Divider />
                            {
                                (role === 'manager' ? <Dropdown.Item onClick={() => setOpen(true)}>Dar rango</Dropdown.Item> : null)
                            }
                            <Dropdown.Item color="red" className='bg-red-500 text-white' onClick={
                                () => deleteUser(user._id)
                            }>Delete</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown>
                </Table.Td>
            </Table.Tr>
            <Modal size="md" open={open} onClose={() => setOpen(false)}>
                <Card className='text-black p-5 '>
                    <h1 className=' text-2xl textbold my-5
                    '>Seleccionar rango para <span className='text-red-500'>{user.username}</span></h1>
                    <Selector>
                        <Selector.Tab onClick={() => updateUser(user._id, { role: "staff" })} anchor="staff" label="Staff" />
                        <Selector.Tab onClick={() => updateUser(user._id, { role: "staffmanagement" })} anchor="staffmanagement" label="Staff Management" />
                        <Selector.Tab onClick={() => updateUser(user._id, { role: "manager" })} anchor="manager" label="Manager" />
                    </Selector>
                </Card>
            </Modal>
        </>
    )
}

export default UserTable