import { lazy } from 'react'
import {
    HomeIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline'

import { PermissionHelpers } from "@/hooks/usePermissions" 

const Dashboard = lazy(() => import('@/pages/Dashboard'))

const routes = (permissions: PermissionHelpers) => [
    {
        view: true,
        path: '/inicio',
        component: Dashboard, // Dashboard
        label: 'Inicio',
        sidebar: {
            icon: HomeIcon,
            name: 'Inicio'
        }
    },
    {
        view: permissions.canView("votante"),
        path: '/votantes',
        component: Dashboard,
        label: 'Votantes',
        sidebar: {
            icon: UserGroupIcon,
            name: 'Votantes'
        }
    },
    {
        view: permissions.canView("centro"),
        path: '/centros',
        component: Dashboard,
        label: 'Centros',
        sidebar: {
            icon: ClipboardDocumentListIcon,
            name: 'Centros'
        }
    },
    {
        view: permissions.canView("dip"),
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