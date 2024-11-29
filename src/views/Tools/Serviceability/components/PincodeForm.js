import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { Button } from 'components/ui'

const PincodeForm = () => {
    return (
        <div className=" mx-auto">
            <Formik
                initialValues={{ fromPincode: '', toPincode: '' }}
                validationSchema={Yup.object().shape({
                    fromPincode: Yup.string().required(
                        'From Pincode is required'
                    ),
                    toPincode: Yup.string().required('To Pincode is required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                    }, 400)
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4 flex flex-col">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="fromPincode"
                            >
                                From Pincode
                            </label>
                            <Field
                                className="flex-grow h-10 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="fromPincode"
                                placeholder="Enter From Pincode"
                            />
                            <ErrorMessage
                                name="fromPincode"
                                component="div"
                                className="text-red-500 text-xs italic"
                            />
                        </div>
                        <div className="mb-6 flex flex-col">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="toPincode"
                            >
                                To Pincode
                            </label>
                            <Field
                                className="flex-grow h-10 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="toPincode"
                                placeholder="Enter To Pincode"
                            />
                            <ErrorMessage
                                name="toPincode"
                                component="div"
                                className="text-red-500 text-xs italic"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Button
                                variant="solid"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Check
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            {/* important content here  */}

            <div className="text-black w-full border-0 flex relative text-sm min-w-0 break-words bg-white shadow mt-8 rounded-md mb-8 flex-col">
                <div className="flex-1 px-5 py-15px relative">
                    <h5 className="text-[#6B7280] font-medium text-xl p-3">
                        Important terms:
                    </h5>
                    <div className="mt-4 mb-4 text-[#6B7280]">
                        <ul className="list-disc pl-16">
                            <li className="mb-2">
                                Regular/ODA service is subject to courier
                                priority set for your account.For ODA
                                applicability please check{' '}
                                <Link
                                    className="text-blue-500 hover:underline"
                                    to={'/app/tools/shipment-rate-calculator'}
                                >
                                    {' '}
                                    shipment_rate_calculator
                                </Link>
                            </li>
                            <li>
                                For any queries, send an email to{' '}
                                <a
                                    href="mailto:info@shipclues.com"
                                    className="text-blue-500 hover:underline"
                                >
                                    info@shipclues.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PincodeForm
