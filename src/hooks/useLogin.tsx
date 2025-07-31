import { useState } from 'react'
import axios from 'axios'

import { useAuthContext } from './useAuthContext'
import { toast } from '@/utils/toast'

const BASE_URL = import.meta.env.APP_BASE_URL

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

export interface Login {
    dni: string
    code: string
}

export const useLogin = (): {
    authenticate: (args: { dni: string; code: string }) => Promise<void>
    loading: boolean
} => {
    const [loading, setLoading] = useState(false)

    const { dispatch } = useAuthContext()

    const authenticate = async (credentials: Login) => {
        setLoading(true)

        await axios.get(`${BASE_URL}/sanctum/csrf-cookie`)
        await axios.post(`${BASE_URL}/login/mobilizer`, {
            dni: credentials.dni,
            code: credentials.code
        })
        .then(async () => {
            setLoading(false)

            return await axios.get(`${BASE_URL}/api/user`)
        })
        .then((response) => {
            const { password_change_required, permissions, roles, ...values } = response.data

            const user = {
                ...values,
                password_required: password_change_required,
                password_change_required: password_change_required,
                roles: roles,
                permissions: permissions || []
            }

            localStorage.setItem('user', JSON.stringify(user))
            dispatch({ type: 'LOGIN', payload: user })
        })
        .catch((error) => {
            setLoading(false)

            const errors = error.response?.data?.errors

            if (errors) {
                for (const field in errors) {
                    if (Object.prototype.hasOwnProperty.call(errors, field)) {
                        const message = errors[field].join(", ")
                        toast.warning(message)
                    }
                }
            } else {
                toast.error("Ocurrió un error. Por favor, intenta nuevamente.");
            }
        })
    }
    
    return { authenticate, loading }
}