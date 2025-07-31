import React from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { PaginationLinks } from "./PaginationLinks"
import { PaginatorInfo } from "@/generated-types"
import { MagnifyingGlassIcon  } from '@heroicons/react/20/solid'
import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const LIST_ITEMS_LENGTH = 10

export interface ModelDefinition {
    singular: string,
    plural: string
}

export interface ListViewProps {
    title: string
    canCreate: boolean
    canEdit: boolean
    handlePageChanged: (page: number) => void
    data: string[][]
    headers: string[]
    paginatorInfo: Pick<PaginatorInfo, 'currentPage' | 'lastPage' | 'total'>
    searchQuery: string
    setSearchQuery: (query: string) => void
    model: ModelDefinition
}

const ListView = ({ headers, data, model, paginatorInfo, title, searchQuery, canCreate, canEdit, setSearchQuery, handlePageChanged }: ListViewProps): React.ReactElement => {
    const navigate = useNavigate()

    const tableHeaders = headers.map((header, index) => {
        const classNames = index === 0 ? 'sm:pl-6 pl-4 pr-3' : 'px-3'
        return (
            <TableHead key={`th-${index}`} scope="col" className={`py-3.5 text-left text-sm font-semibold text-gray-900 ${classNames}`}>
                {header}
            </TableHead>
        )
    })

    const tableRows = data.map((row, index) => {
        return (
            <TableRow key={`${model}-${index}`} className="even:bg-gray-50">
                {
                    row.map((cells, index) => {
                        if (index !== 0) {
                            const style = index === 1 ? "whitespace-wrap pl-4 pr-3 font-medium text-gray-900 sm:pl-6" : "max-w-xs py-4 text-sm whitespace-wrap px-3 text-gray-500"
                            
                            return (
                                <TableCell key={`cell-${index}`} className={`py-4 text-sm ${style}`}>
                                    {cells}
                                </TableCell>
                            )
                        }
                    })
                }

                {canEdit && (
                    <TableCell className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <NavLink to={`/${model.plural}/${row[0]}/editar`} className="text-orange-600 hover:text-orange-900">
                            Editar&nbsp;&nbsp;
                        </NavLink>
                    </TableCell>
                )}
            </TableRow>
        )
    })

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-6">
                
                <div className="sm:flex-auto">
                    <h1 className="text-lg font-semibold leading-5 text-gray-900">{ title }</h1>
                </div>
                
                <div className="pt-6 sm:flex sm:items-center">
                    <div className="flex flex-1">
                        <div className="w-full max-w-lg lg:max-w-xs">
                            <label htmlFor="search" className="sr-only">
                                Buscar
                            </label>

                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>

                                <input
                                    id="search"
                                    name="search"
                                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Buscar"
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) => {setSearchQuery(e.target.value)}}
                                />
                            </div>
                        </div>
                    </div>

                    {canCreate && (
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <Button type="button" variant={'default'} size="sm" onClick={() => navigate(`/${model.plural}/crear`)}>
                                Añadir
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 flow-root">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <Table className="min-w-full ">
                                <TableHeader className="bg-gray-50">
                                    <TableRow>
                                        { tableHeaders }

                                        <TableHead scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Acciones</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="bg-white">
                                    { tableRows }
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            <PaginationLinks 
                itemsPerPage = {LIST_ITEMS_LENGTH}
                currentPage = { paginatorInfo.currentPage }
                lastPage = { paginatorInfo.lastPage } 
                onPageChanged = { handlePageChanged } 
                itemsTotal = { paginatorInfo.total }/>
        </div>
    )
}

export default ListView
