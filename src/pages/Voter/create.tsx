import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from '@/utils/toast'

import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useCreateVoterMutation } from '@/generated-types'

const VoterCreate = (): React.ReactElement => {
    const [name, setName] = useState('')
    const [dni, setDNI] = useState('')
    const [open, setOpen] = React.useState(false)
    const [birthdate, setBirthdate] = useState<Date | undefined>(undefined)
	const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [center, setCenter] = useState('')

    const [createVoter, result] = useCreateVoterMutation({
		onCompleted: () => {
			toast.success('Votante creado exitosamente!')

            navigate(`/votantes`, {
                replace: true
            })
		}
	})

    const navigate = useNavigate()


    const handleCrearPrograma = () => {
        if (name.length === 0) {
            toast.warning('Necesita agregar un nombre.')
            return
        }

        if (dni.length === 0) {
            toast.warning('Necesita agregar la identificación.')
            return
        }

        if (!birthdate) {
            toast.warning('Necesita seleccionar la fecha de nacimiento.')
            return
        }

        const date = new Date('Fri Aug 01 2025 00:00:00 GMT-0600');
        const formatted = date.toISOString().split('T')[0];

        createVoter({
            variables: {
                input: {
                    name: name,
                    dni: dni,
                    birthdate: formatted,
                    address: address,
                    phone: phone,
                    center: center
                }
            }
        })
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-6">
                <div className="mx-auto max-w-3xl mt-6 px-4 py-5 rounded-lg bg-white shadow mb-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl">
                            <form>
                                <div className="space-y-12">
                                    <div className=" pb-4">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                                            Datos Generales
                                        </h2>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Ingrese los datos generales del votante.
                                        </p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-6 space-y-2">
                                                <Label htmlFor="name" data-required="*">
                                                    Nombre
                                                </Label>

                                                <Input
                                                    type="text"
                                                    id="name"
                                                    value={name}
													placeholder="Nombre"
                                                    onChange={(e) => setName(e.target.value)}
                                                    autoComplete="nombre"
                                                    required
                                                />
                                            </div>

                                            <div className="sm:col-span-6 space-y-2">
                                                <Label htmlFor="dni" data-required="*">
                                                    Identidad
                                                </Label>

                                                <Input
                                                    type="text"
                                                    id="dni"
                                                    value={dni}
													placeholder="Identidad"
                                                    onChange={(e) => setDNI(e.target.value)}
                                                    autoComplete="codigo"
                                                    required
                                                />
                                            </div>

                                            <div className="sm:col-span-6 space-y-2">
                                                <Label htmlFor="birthdate" data-required="*">
                                                    Fecha de nacimiento
                                                </Label>

                                                <Popover open={open} onOpenChange={setOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button variant="outline" id="birthdate" className="w-full justify-between font-normal">
                                                            {birthdate ? birthdate.toLocaleDateString() : "Seleccionar"}
                                                            <ChevronDownIcon />
                                                        </Button>
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={birthdate}
                                                            captionLayout="dropdown"
                                                            onSelect={(birthdate) => {
                                                                setBirthdate(birthdate)
                                                                setOpen(false)
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            <div className="sm:col-span-6 space-y-2">
                                                <Label htmlFor="phone">
                                                    Télefono
                                                </Label>

                                                <Input
                                                    type="text"
                                                    id="phone"
                                                    value={phone}
													placeholder="---- ----"
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    autoComplete="codigo"
                                                    required
                                                />
                                            </div>

											<div className="sm:col-span-6 space-y-2">
												<Label htmlFor="address">
													Dirección
												</Label>

												<div className="mt-2">
													<Textarea
														name="address"
														id="address"
														spellCheck={false}
														rows={3}
														value={address}
														placeholder="Dirección"
														onChange={({ target }) => setAddress(target.value)}
													/>
												</div>
											</div>

											<div className="sm:col-span-6 space-y-2">
												<Label htmlFor="center">
													Centro de Votación
												</Label>

												<div className="mt-2">
													<Input
														name="center"
														id="center"
														spellCheck={false}
														value={center}
														placeholder="Dirección"
														onChange={({ target }) => setCenter(target.value)}
													/>
												</div>
											</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <Button
                                        type="button"
                                        variant={'ghost'}
                                        size={'sm'}
                                        className={'w-auto px-4'}
                                        onClick={() => navigate('/votantes')}
                                    >
                                        Cancelar
                                    </Button>

                                    <Button type="button" variant={'default'} size={'sm'} className={'w-auto px-4'} onClick={handleCrearPrograma} disabled={result.loading}>
                                        Crear
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoterCreate

