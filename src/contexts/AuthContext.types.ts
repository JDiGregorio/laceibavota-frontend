import type { Dispatch } from "react"

export type User = {
    id: string
    name: string
    email: string
    password_required: boolean
    password_change_required: boolean
    roles: Role[]
    permissions: string[]
}

export type Role = {
    id: string
    name: string
}

export interface AuthReducerState {
    user: User | null
    isReady: boolean
}

export interface AuthReducerAction {
    type: 'LOGIN' | 'UPDATE' | 'LOGOUT' 
    payload: User | null
}

export type AuthContextValue = AuthReducerState & { dispatch: Dispatch<AuthReducerAction> }