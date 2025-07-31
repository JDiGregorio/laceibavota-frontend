import React, { useState, useEffect } from 'react'
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { UserIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'

import { Breadcrumbs } from './Breadcrumbs'
import { ProfileDrawer } from '@/pages/User/components/ProfileDrawer'
import { ConfirmDialog } from '@/components/widgets/Dialog/ConfirmDialog'
import { toast } from '@/utils/toast'

import { getInitials } from '@/lib/utils'
import { useAuthContext } from '@/hooks/useAuthContext'
import { PermissionHelpers } from '@/hooks/usePermissions'

const BASE_URL = import.meta.env.APP_BASE_URL

interface NavbarProps {
	permissions: PermissionHelpers
}

export const Navbar = ({ permissions }: NavbarProps): React.ReactElement => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [expired, setExpired] = useState(false)

    const { user, dispatch } = useAuthContext()

    useEffect(() => {
        if (user) {
            setExpired(user.password_required)
        }
    }, [user])

    const handleConfirmModal = () => {
        handleCancelModal()
        setDrawerOpen(true)
    }

    const handleCancelModal = () => {
        if (user) {
            const updateUser = { ...user, password_required: false }

            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(updateUser))

            dispatch({ type: 'UPDATE', payload: updateUser })

            setExpired(false)
        }
    }

    const handleProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        setDrawerOpen(true)
    }

    const handleLogout = async () => {
        await axios.post(`${BASE_URL}/logout`)
            .then(async () => {
                dispatch({ type: 'LOGOUT', payload: null })
            })
            .catch(() => {
                toast.error('Ocurrió un error al cerrar sesión. Por favor, intenta nuevamente.')
            })
    }

    return (
        <Disclosure as="nav" className="bg-white shadow">
            {() => (
                <>
                    <div className="mx-auto max-w-full px-2 sm:px-4 lg:px-8" style={{ backgroundColor: '#ff6b00' }}>
                        <div className="flex h-16 justify-between">
                            <div className="flex px-2 lg:px-0">
                                <Breadcrumbs
									permissions={permissions}
								/>
                            </div>

                            <ConfirmDialog
                                title="Su contraseña ha expirado"
                                message="Por razones de seguridad, es necesario que establezca una nueva contraseña para continuar accediendo a su cuenta."
                                open={expired}
                                setOpen={() => {}}
                                onConfirm={handleConfirmModal}
                                onDeny={handleCancelModal}
                                cta="Actualizar contraseña"
                            />

                            <ProfileDrawer open={drawerOpen} onClose={setDrawerOpen} />

                            <div className="flex items-center space-x-2">
                                <Menu as="div" className="relative">
                                    <MenuButton className=" flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>

                                        <span className="flex items-center space-x-1">
                                            <span aria-hidden="true" className="hidden lg:block text-md text-white font-semibold">
                                                {user && user.name}
                                            </span>

                                            <span className="lg:hidden py-1 px-2 items-center rounded-full shadow-2xl text-md text-white font-semibold">
                                                {user && getInitials(user.name)}
                                            </span>

                                            <ChevronDownIcon aria-hidden="true" className="size-4 text-white/50" />
                                        </span>
                                    </MenuButton>

                                    <MenuItems transition className="absolute right-0 z-10 mt-4 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                                        <MenuItem>
                                            {({ close }) => (
                                                <button
                                                    onClick={(event) => {
                                                        handleProfile(event)
                                                        close()
                                                    }}
                                                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900 space-x-2"
                                                >
                                                    <UserIcon aria-hidden="true" className="size-4 text-gray-400" />
                                                    <span>
														Perfil
													</span>
                                                </button>
                                            )}
                                        </MenuItem>

                                        <MenuItem>
                                            {({ close }) => (
                                                <button
                                                    onClick={() => {
                                                        handleLogout()
                                                        close()
                                                    }}
                                                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 font-medium data-[focus]:bg-gray-100 data-[focus]:text-gray-900 space-x-2"
                                                >
                                                    <ArrowLeftEndOnRectangleIcon aria-hidden="true" className="size-4 text-gray-400" />
                                                    <span>
														Cerrar sesión
													</span>
                                                </button>
                                            )}
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    )
}