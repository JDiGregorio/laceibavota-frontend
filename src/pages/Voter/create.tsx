import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cleave from 'cleave.js/react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from '@/utils/toast'

import { cn } from "@/lib/utils"

import { useCreateVoterMutation } from '@/generated-types'

const VoterCreate = (): React.ReactElement => {
    const [name, setName] = useState('')
    const [dni, setDNI] = useState('')
    const [birthdate, setBirthdate] = useState<string>()
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

        const [dd, mm, yyyy] = birthdate.split('-');
        const formatted = `${yyyy}-${mm}-${dd}`;

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

                                                <Cleave
                                                    className={cn(
                                                        "file:text-slate-950 placeholder:text-slate-500 selection:bg-slate-900 selection:text-slate-50 dark:bg-slate-200/30 border-slate-200 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:selection:bg-slate-50 dark:selection:text-slate-900 dark:dark:bg-slate-800/30 dark:border-slate-800",
                                                        "focus-visible:border-slate-950 focus-visible:ring-slate-950/50 focus-visible:ring-[3px] dark:focus-visible:border-slate-300 dark:focus-visible:ring-slate-300/50",
                                                        "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900"                                                            
                                                    )}
                                                    placeholder="---- ---- -----"
                                                    options={{
                                                        numericOnly: true,
                                                        delimiter: '-',
                                                        blocks: [4, 4, 5],
                                                    }}
                                                    value={phone}
                                                    onChange={(e) => setDNI(e.target.value)}
                                                />
                                            </div>

                                            <div className="sm:col-span-6 space-y-2">
                                                <Label htmlFor="birthdate" data-required="*">
                                                    Fecha de nacimiento
                                                </Label>

                                                <Cleave
                                                    className={cn(
                                                        "file:text-slate-950 placeholder:text-slate-500 selection:bg-slate-900 selection:text-slate-50 dark:bg-slate-200/30 border-slate-200 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:selection:bg-slate-50 dark:selection:text-slate-900 dark:dark:bg-slate-800/30 dark:border-slate-800",
                                                        "focus-visible:border-slate-950 focus-visible:ring-slate-950/50 focus-visible:ring-[3px] dark:focus-visible:border-slate-300 dark:focus-visible:ring-slate-300/50",
                                                        "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900"                                                            
                                                    )}
                                                    placeholder="DD-MM-YYYY"
                                                    options={{
                                                        date: true,
                                                        delimiter: '-',
                                                        datePattern: ['d', 'm', 'Y']
                                                    }}
                                                    onChange={(e) => setBirthdate(e.target.value)}
                                                />
                                            </div>

                                            <div className="sm:col-span-6 space-y-2">
                                                <Label htmlFor="phone">
                                                    Télefono
                                                </Label>

                                                <Cleave
                                                    className={cn(
                                                        "file:text-slate-950 placeholder:text-slate-500 selection:bg-slate-900 selection:text-slate-50 dark:bg-slate-200/30 border-slate-200 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:selection:bg-slate-50 dark:selection:text-slate-900 dark:dark:bg-slate-800/30 dark:border-slate-800",
                                                        "focus-visible:border-slate-950 focus-visible:ring-slate-950/50 focus-visible:ring-[3px] dark:focus-visible:border-slate-300 dark:focus-visible:ring-slate-300/50",
                                                        "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900"                                                            
                                                    )}
                                                    placeholder="---- ----"
                                                    options={{
                                                        numericOnly: true,
                                                        delimiter: '-',
                                                        blocks: [4, 4],
                                                    }}
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
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

