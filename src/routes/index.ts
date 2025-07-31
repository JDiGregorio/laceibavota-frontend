import { lazy } from 'react'
import {
    HomeIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'

import { PermissionHelpers } from "@/hooks/usePermissions"

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const VotersIndex = lazy(() => import('@/pages/Voter'))
const VoterCreate = lazy(() => import('@/pages/Voter/create'))
// const ProgramasEdit = lazy(() => import('@/pages/Programa/edit'))

const routes = (permissions: PermissionHelpers) => [
    {
        view: true,
        path: '/inicio',
        component: Dashboard,
        label: 'Inicio',
        sidebar: {
            icon: HomeIcon,
            name: 'Inicio'
        }
    },
    {
        view: true, // permissions.canView("votante"),
        path: '/votantes',
        component: VotersIndex,
        label: 'Votantes',
        sidebar: {
            icon: UserGroupIcon,
            name: 'Votantes'
        }
    },
    {
        view: true, // permissions.canCreate("programa"),
        path: '/votantes/crear',
        component: VoterCreate,
        label: 'Crear'
    },
    {
        view: permissions.canEdit("programa"),
        path: '/programas/:id/editar',
        component: Dashboard,
        label: 'Editar'
    },
    {
        view: permissions.canView("centers"),
        path: '/centros',
        component: Dashboard,
        label: 'Centros',
        sidebar: {
            icon: ClipboardDocumentListIcon,
            name: 'Centros'
        }
    },
    {
        view: permissions.canView("users"),
        path: '/usuarios',
        component: Dashboard,
        label: 'Usuarios',
        sidebar: {
            icon: UserGroupIcon,
            name: 'Usuarios'
        }
    }
]

export default routes