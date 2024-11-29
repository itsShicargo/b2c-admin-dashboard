import React from 'react'
import { APP_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const appsRoute = [
    {
        key: 'allusers',
        path: `${APP_PREFIX_PATH}/project/dashboard`,
        component: React.lazy(() => import('views/project/ProjectDashboard')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsProject.projectList',
        path: `${APP_PREFIX_PATH}/project/project-list`,
        component: React.lazy(() => import('views/project/ProjectList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsProject.scrumBoard',
        path: `${APP_PREFIX_PATH}/project/scrum-board`,
        component: React.lazy(() => import('views/project/ScrumBoard')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
        },
    },

        {
            key: 'appsProject.issue',
            path: `${APP_PREFIX_PATH}/project/issue`,
            component: React.lazy(() => import('views/project/Issue')),
            authority: [ADMIN, USER],
        },
        {
            key: 'appsCrm.dashboard',
            path: `${APP_PREFIX_PATH}/crm/dashboard`,
            component: React.lazy(() => import('views/crm/CrmDashboard')),
            authority: [ADMIN, USER],
        },
        {
            key: 'appsCrm.calendar',
            path: `${APP_PREFIX_PATH}/crm/calendar`,
            component: React.lazy(() => import('views/crm/Calendar')),
            authority: [ADMIN, USER],
        },

        {
            key: 'appsCrm.customers',
            path: `${APP_PREFIX_PATH}/crm/customers`,
            component: React.lazy(() => import('views/crm/Customers')),
            authority: [ADMIN, USER],
            meta: {
                header: 'Customers',
            },
        },
        {
            key: 'appsCrm.customerDetails',
            path: `${APP_PREFIX_PATH}/crm/customer-details`,
            component: React.lazy(() => import('views/crm/CustomerDetail')),
            authority: [ADMIN, USER],
            meta: {
                header: 'Customer Details',
                headerContainer: true,
            },
        },
        {
            key: 'appsCrm.mail',
            path: `${APP_PREFIX_PATH}/crm/mail`,
            component: React.lazy(() => import('views/crm/Mail')),
            authority: [ADMIN, USER],
            meta: {
                pageContainerType: 'gutterless',
                footer: false,
            },
        },

        {
            key: 'appsCrm.mail',
            path: `${APP_PREFIX_PATH}/crm/mail/:category`,
            component: React.lazy(() => import('views/crm/Mail')),
            authority: [ADMIN, USER],
            meta: {
                pageContainerType: 'gutterless',
                footer: false,
            },
        },
        {
            key: 'appsSales.dashboard',
            path: `${APP_PREFIX_PATH}/sales/dashboard`,
            component: React.lazy(() => import('views/Shipments/SalesDashboard')),
            authority: [ADMIN, USER],
        },

        {
            key: 'appsknowledgeBase.helpCenter',
            path: `${APP_PREFIX_PATH}/knowledge-base/help-center`,
            component: React.lazy(() => import('views/knowledge-base/HelpCenter')),
            authority: [ADMIN, USER],
            meta: {
                pageContainerType: 'gutterless',
            },
        },
        {
            key: 'appsknowledgeBase.article',
            path: `${APP_PREFIX_PATH}/knowledge-base/article`,
            component: React.lazy(() => import('views/knowledge-base/Article')),
            authority: [ADMIN, USER],
        },

      

    //  Warehouse
    {
        key: 'search records',
        path: `${APP_PREFIX_PATH}/werehouse/werehouse`,
        component: React.lazy(() => import('views/Warehouse/warehouse')),
        authority: [ADMIN, USER],
    },

]

export default appsRoute
