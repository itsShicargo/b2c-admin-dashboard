import React from 'react'
import { APP_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const appsRoute = [
    {
        key: 'All Users',
        path: `${APP_PREFIX_PATH}/project/dashboard`,
        component: React.lazy(() => import('views/project/ProjectDashboard')),
        authority: [ADMIN, USER],
    },

    {
        key: 'appsSales.dashboard',
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: React.lazy(() => import('views/Shipments/SalesDashboard')),
        authority: [ADMIN, USER],
    },
]

export default appsRoute
