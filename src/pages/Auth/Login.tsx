import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useLogin } from '@/hooks/useLogin'

/**
 * Login administrador > email, password, restablecer.
 * Login coordinador > dni, code
 * Login movilizador > dni, code
 * Invitado > N/A
 */

const Login = () => {
    const [dni, setDNI] = useState('')
    const [code, setCode] = useState('')
	const [remember, setRemember] = useState(false)

    const { authenticate, loading } = useLogin()

	useEffect(() => {
        const isRemembered = !!localStorage.getItem("isRemembered")
        const dni = localStorage.getItem("dni") ?? ""

        if (isRemembered) {
            setDNI(dni)
            setRemember(true)
        }
    }, [])

	const handlePressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleLogin()
        }
    }

    const handleLogin = () => {
		if (remember) {
			localStorage.setItem("isRemembered", "true")
			localStorage.setItem("dni", dni)
		} else {
			localStorage.setItem("isRemembered", "false")
			localStorage.removeItem("dni")
		}

        authenticate({ dni: dni, code: code })
    }

    return (
        <form className="space-y-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="dni">
                    DNI
                </Label>

                <Input
                    type="text"
                    id="dni"
                    value={dni}
                    autoComplete="off"
                    placeholder="DNI"
                    required
                    onChange={(e) => setDNI(e.target.value)}
                    onKeyDown={handlePressEnter}
                />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="code">
                    Código de acceso
                </Label>

                <Input
                    type="password"
                    id="code"
                    value={code}
                    autoComplete="off"
                    placeholder="Código de acceso"
                    required
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handlePressEnter}
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="remember-me"
                        name="remember-me"
                        checked={remember}
                        onChange={({ target }) => setRemember(target.checked)}
                        className="h-4 w-4 rounded cursor-pointer border-gray-300 text-gray-400 hover:text-gray-500 focus:ring-0"
                    />

                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Recordar usuario
                    </label>
                </div>

                {/*<div className="text-sm leading-6">
                    <Link to="/forgot-password" className="font-semibold text-orange-600 hover:text-orange-500">
                        ¿Olvidó su contraseña?
                    </Link>
                </div>*/}
            </div>

            <div>
                <Button 
                    type="button"
                    variant={"default"}
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full cursor-pointer"
                >
                    {loading && <Loader2 aria-hidden="true" className="animate-spin -ml-0.5 mr-1.5 h-5 w-5" />}
                    {loading ? "Iniciando sesión" : "Iniciar sesión"}
                </Button>
            </div>
        </form>
    )
}

export default Login