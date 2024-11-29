import { useState } from 'react'
import { Tabs } from 'components/ui'
import CompanyDetails from './CompanyDetails'
import BusinessDetails from './ BusinessDetails'
import BankAccountDetails from './BankAccountDetails'

const { TabNav, TabList, TabContent } = Tabs

const ServiceabilityCheck = () => {
    const [currentTab, setCurrentTab] = useState('tab1')

    return (
        <>
            <div className="flex">
                <div className="w-1/6 bg-transparent flex flex-col">
                    <div className="py-4 mt-4">
                        <Tabs
                            value={currentTab}
                            onChange={(val) => setCurrentTab(val)}
                        >
                            <TabList className="block">
                                <TabNav
                                    value="tab1"
                                    className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group transition duration-300 ease-in-out"
                                    activeClassName="bg-blue-500 text-white border-blue-500 dark:bg-blue-700 dark:border-blue-700"
                                >
                                    Company Details
                                </TabNav>
                                <TabNav
                                    value="tab2"
                                    className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group transition duration-300 ease-in-out"
                                    activeClassName="bg-blue-500 text-white border-blue-500 dark:bg-blue-700 dark:border-blue-700"
                                >
                                    Business Details
                                </TabNav>
                                <TabNav
                                    value="tab3"
                                    className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group transition duration-300 ease-in-out"
                                    activeClassName="bg-blue-500 text-white border-blue-500 dark:bg-blue-700 dark:border-blue-700"
                                >
                                    Bank Account Details
                                </TabNav>
                            </TabList>
                        </Tabs>
                    </div>
                </div>
                <div className="w-[84%] bg-transparent ">
                    <div className="p-4">
                        <Tabs
                            value={currentTab}
                            onChange={(val) => setCurrentTab(val)}
                        >
                            <TabContent value="tab1">
                                <CompanyDetails />
                            </TabContent>
                            <TabContent value="tab2">
                                <BusinessDetails />
                            </TabContent>
                            <TabContent value="tab3">
                                <BankAccountDetails />
                            </TabContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceabilityCheck
