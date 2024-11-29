import DemoBoxContent from 'components/docs/DemoBoxContent'
import React from 'react'

const Dashboard = () => {


    return (
        <>
          

            <div className="grid grid-rows-3 grid-flow-col gap-4">
                <DemoBoxContent className="row-span-3 bg-transparent shadow-md  border-t-4 border-indigo-500 p-4 rounded-lg">
                    <div>
                        <p className="text-[#6b7280] pb-2">Shipments</p>
                    </div>

                    <div className="mt-2 md:grid md:grid-cols-3 md:gap-2">
                        <p className=" text-green-500  font-medium text-xl">
                            0
                        </p>
                        <p className="border-l-2 border-green-500 text-green-500  font-medium text-xl">
                            0
                        </p>
                        <p className="border-l-2 border-green-500 text-green-500  font-medium text-xl">
                            0
                        </p>
                        <p className="text-[#6b7280] font-normal ">Manifested</p>
                        <p className="text-[#6b7280] font-normal">In Transit</p>
                        <p className="text-[#6b7280] font-normal">Delivered</p>
                    </div>
                </DemoBoxContent>{' '}
                <DemoBoxContent className="row-span-3 bg-transparent shadow-md  border-t-4 border-indigo-500 p-4 rounded-lg ">
                    <div>
                        <p className="text-[#6b7280] pb-2">NDR Shipments</p>
                    </div>

                    <div className="mt-2 md:grid md:grid-cols-3 md:gap-2 ">
                        <p className="text-green-500  font-medium text-xl">0</p>
                        <p className="text-green-500 border-l-2 border-green-500 font-medium text-xl">0</p>
                        <p className="text-green-500 border-l-2 border-green-500 font-medium text-xl ">0</p>
                        <p className="text-[#6b7280] font-normal">Missing Appointment</p>
                        <p className="text-[#6b7280] font-normal">Missing Contact Details</p>
                        <p className="text-[#6b7280] font-normal">RTO/ Reattempt</p>
                    </div>
                </DemoBoxContent>
                <DemoBoxContent className="row-span-3 bg-transparent shadow-md  border-t-4 border-indigo-500 p-4 rounded-lg ">
                    <div>
                        <p className="text-[#6b7280] pb-2">Wallet Summary</p>
                    </div>

                    <div className="mt-2 ">
                        <p className="text-[#6b7280] font-normal pb-4">
                            Wallet Balance
                        </p>
                        <p className="text-green-500 text-xl">₹0</p>
                    </div>
                </DemoBoxContent>
            </div>
        </>
    )
}

export default Dashboard
