import React, { useState, lazy, Fragment, Suspense } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, Square2StackIcon } from '@heroicons/react/24/outline'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'

import Spinner from '@/components/layouts/Spinner'
import { Navbar } from './Navbar'

import { usePermissions } from '@/hooks/usePermissions'

import routes from '@/routes'

import { classNames } from '@/lib/utils'

const Page403 = lazy(() => import('@/pages/403'))
const Page404 = lazy(() => import('@/pages/404'))


const MainLayout = (): React.ReactElement => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const permissions = usePermissions()

    const sidebar = routes(permissions).filter((route) => route.sidebar)

    return (
        <>
            <div className="bg-gray-50 h-full">
                <Transition show={sidebarOpen} as={Fragment}>
                    <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>

                        <TransitionChild
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </TransitionChild>

                        <div className="fixed inset-0 flex">
                            <TransitionChild
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <TransitionChild
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </TransitionChild>

                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 pt-10 ring-1 ring-white/10">
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {sidebar.map(
                                                            (route, index) =>
                                                                route.view && (
                                                                    <li key={index}>
                                                                        <NavLink to={route.path}>
                                                                            {({ isActive }) => {
                                                                                const Icon = route.sidebar?.icon || Square2StackIcon

                                                                                return (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            isActive
                                                                                                ? 'bg-gray-800 text-white'
                                                                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                                                        )}
                                                                                    >
                                                                                        <Icon
                                                                                            className={classNames(
                                                                                                isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
                                                                                                'size-6 shrink-0',
                                                                                            )}
                                                                                            aria-hidden="true"
                                                                                        />
                                                                                        {route.sidebar?.name}
                                                                                    </span>
                                                                                )
                                                                            }}
                                                                        </NavLink>
                                                                    </li>
                                                                ),
                                                        )}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-700 bg-gray-900 px-6 pt-10">
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {sidebar.map(
                                            (route, index) =>
                                                route.view && (
                                                    <li key={index}>
                                                        <NavLink to={route.path}>
                                                            {({ isActive }) => {
                                                                const Icon = route.sidebar?.icon || Square2StackIcon

                                                                return (
                                                                    <span
                                                                        className={classNames(
                                                                            isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                                        )}
                                                                    >
                                                                        <Icon
                                                                            className={classNames(
                                                                                isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600',
                                                                                'h-6 w-6 shrink-0',
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        {route.sidebar?.name}
                                                                    </span>
                                                                )
                                                            }}
                                                        </NavLink>
                                                    </li>
                                                ),
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="absolute top-1 z-40 flex items-center gap-x-6 px-4 py-4 sm:px-6 lg:hidden">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <main className="h-full flex flex-col min-h-screen lg:pl-72">
                    <Navbar permissions={permissions} />

                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            {routes(permissions).map((route, index) => (
                                <Route key={index} path={route.path} element={route.view ? <route.component /> : <Navigate to="/inicio" />} />
                            ))}

                            <Route path="/403" element={<Page403 />} />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </>
    )
}

export default MainLayout