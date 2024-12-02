import { APP_PREFIX_PATH } from 'constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const appsNavigationConfig = [
    {
        key: 'apps',
        path: '',
        title: 'APPS',
        translateKey: 'nav.apps',
        icon: 'apps',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'All Users',
                path: `${APP_PREFIX_PATH}/sales/dashboard`,
                title: 'All Users',
                translateKey: 'All Users',
                icon: 'sales',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },



            // werehouse navigation start here ...
            {
                key: 'searchrecords',
                path: `${APP_PREFIX_PATH}/single-search-record`,
                title: 'Search Records',
                translateKey: '',
                icon: 'apps',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            }, 
        ],
    },
]

export default appsNavigationConfig
