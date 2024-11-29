import { useState } from 'react'
import { Tabs } from 'components/ui'
import PincodeForm from './PincodeForm'
import DownloadList from './DownloadList'

const { TabNav, TabList, TabContent } = Tabs

const ServiceabilityCheck = () => {
    const [currentTab, setCurrentTab] = useState('tab1')

    return (
        <>
            <div className="flex">
                <div className="w-1/4 bg-gray-200 h-screen flex flex-col">
                    <div className="py-4">
                        <Tabs
                            value={currentTab}
                            onChange={(val) => setCurrentTab(val)}
                        >
                            <TabList className="block">
                                <TabNav
                                    value="tab1"
                                    className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                                >
                                    Check Serviceability
                                </TabNav>
                                <TabNav
                                    value="tab2"
                                    className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                                >
                                    Download List
                                </TabNav>
                            </TabList>
                        </Tabs>
                    </div>
                </div>
                <div className="w-3/4 bg-gray-100 h-screen">
                    <div className="p-4">
                        <Tabs
                            value={currentTab}
                            onChange={(val) => setCurrentTab(val)}
                        >
                            <TabContent value="tab1">
                               <PincodeForm />
                            </TabContent>
                            <TabContent value="tab2">
                               <DownloadList />
                            </TabContent>
                            <TabContent value="tab3">
                                <p>
                                    In C++ its harder to shoot yourself in the
                                    foot, but when you do, you blow off your
                                    whole leg. (Bjarne Stroustrup)
                                </p>
                            </TabContent>
                        </Tabs>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default ServiceabilityCheck
