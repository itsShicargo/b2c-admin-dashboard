import { Formik, Field, Form } from 'formik'
import { DatePicker, FormContainer, FormItem, Select } from 'components/ui/'
import { BiDownArrowAlt } from 'react-icons/bi'
import { useState } from 'react'
import ZonePriceTable from './ZonePriceTable'
import VasRateChart from './VasRateChart'

const surface = [
    { value: 'VRL Logistics - Surface', label: 'VRL Logistics - Surface' },
    { value: 'Bluedart - Surface', label: 'Bluedart - Surface' },
    { value: 'Watsoo - Surface', label: 'Watsoo - Surface' },
    { value: 'Dependo - Surface', label: 'Dependo - Surface' },
    { value: 'OxyzenExpress - Surface', label: 'OxyzenExpress - Surface' },
    { value: 'VXpress - Surface', label: 'VXpress - Surface' },
]

const RateChart = () => {
    const [isArrowUp, setIsArrowUp] = useState(false)

    const toggleArrow = () => {
        setIsArrowUp(!isArrowUp)
    }
    return (
        <>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <Formik
                    initialValues={{
                        name: '',
                        date: '',
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500))
                        alert(JSON.stringify(values, null, 2))
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <FormContainer className="md:grid grid-cols-2 gap-4">
                                <FormItem label="Mode">
                                    <Select
                                        placeholder="Mode"
                                        options={surface}
                                        name="mode"
                                        onChange={(option) => {
                                            console.log(
                                                'Select Value',
                                                option.value
                                            )
                                            setFieldValue('mode', option.value)
                                        }}
                                    />
                                </FormItem>

                                <FormItem label="Date">
                                    <Field name="date">
                                        {({ field, form }) => (
                                            <DatePicker
                                                field={field}
                                                form={form}
                                                value={field.value}
                                                placeholder="Select Date"
                                                onChange={(date) => {
                                                    console.log(
                                                        'DatePicker Value',
                                                        date
                                                    )
                                                    form.setFieldValue(
                                                        field.name,
                                                        date
                                                    )
                                                }}
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
                <div className="pt-4 pb-4">
                    <h5>Standard Rates</h5>
                </div>

                {/* <h5 className="text-[#6B7280] font-medium text-xl p-3">
                    VAS Rate Chart
                </h5> */}

                {/* Zone table here */}
                <div className="mt-4 bg-white shadow-md rounded border-t border-gray-300 px-8 pt-4 pb-4 mb-4 text-[#6B7280]">
                    <div className="text-[#6B7280] font-medium text-base p-3 flex items-center gap-1">
                        Zones{' '}
                        <BiDownArrowAlt
                            className={`transform ${
                                isArrowUp ? 'rotate-180' : ''
                            }`}
                            onClick={toggleArrow}
                        />
                    </div>
                    {/* <p className="text-center"> No Records to display</p> */}
                    <ZonePriceTable />
                </div>
            </div>

            {/* VAS Rate Chart */}
            <div className="text-black w-full border-0 flex relative text-sm min-w-0 break-words bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-col">
                <div className="flex-1 px-5 py-15px relative">
                    <h5 className="text-[#6B7280] font-medium text-xl p-3">
                        VAS Rate Chart
                    </h5>
                    <p className="text-[#6B7280] font-medium text-base p-12">
                        Standard Rates
                    </p>

                    <div className="mt-4 bg-white border-t border-gray-300 shadow-md rounded px-8 pt-4 pb-4 mb-4 text-[#6B7280]">
                        <VasRateChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RateChart
