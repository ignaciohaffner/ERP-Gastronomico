import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Dropdown, Button } from '@rewind-ui/core'

const Navbar = () => {

    const { isAuthenticated, user, logout, role } = useAuth()
    console.log(user)
    return (
        <nav className=' bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg'>
            <Link to={
                isAuthenticated ? '/tasks' : '/'
            }>
                <h1 className=' text-2xl font-bold'>Sistema de Gestion de Staff</h1>
            </Link>
            <ul className=' flex gap-x-2 '>
                {isAuthenticated ? (
                    <>

                        {
                            user.role === 'manager' ? (
                                <li className=''>
                                    <Button color="white" tone="outline" shadow="base">
                                        <Link to='/roster'
                                            className=''
                                        >Roster</Link>
                                    </Button>

                                </li>
                            ) : null
                        }
                        {
                            user.role === 'manager' ? (
                                <li className=''>
                                    <Button color="white" tone="outline" shadow="base">
                                        <Link to='/manager'
                                            className=''
                                        >Manager</Link>
                                    </Button>

                                </li>
                            ) : null
                        }
                        <li>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button>
                                        Menu
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Label>{user.username}</Dropdown.Label>
                                    <Dropdown.Item> <Link to={`/profile/${user._id}`}>Profile</Link> </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        Settings
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        <Link to='/' onClick={() => logout()}>Logout</Link>
                                    </Dropdown.Item>
                                </Dropdown.Content>
                            </Dropdown>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Button color="white" tone="outline" shadow="base">
                                <Link to='/login'
                                    className=''
                                >Login</Link>
                            </Button>
                        </li>
                        <li>
                            <Button color="white" tone="outline" shadow="base">
                                <Link to='/register'>Register</Link>
                            </Button>

                        </li>
                    </>
                )
                }
            </ul >
        </nav >
    )
}

export default Navbar