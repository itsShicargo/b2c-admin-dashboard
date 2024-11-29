import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import SalesDashboardHeader from './components/SalesDashboardHeader'
// import SalesDashboardBody from './components/SalesDashboardBody'
import Dashboard from './components/Dashboard'

injectReducer('salesDashboard', reducer)

const SalesDashboard = () => {
    return (
        <div className="flex flex-col gap-4 h-full">
            <SalesDashboardHeader />
            {/* <SalesDashboardBody /> */}
            {/* <Dashboard/> */}

        </div>
    )
}

export default SalesDashboard
