import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// import { Link } from 'react-router-dom'
import { Button } from 'components/ui'

const DownloadList = () => {
    const [isDownloading, setIsDownloading] = useState(false)

    const handleDownload = () => {
        if (isDownloading) return
        setIsDownloading(true)

        window.location.href = 'example.com/file.pdf'
        setIsDownloading(false)
    }
    return (
        <div className=" mx-auto">
            <Formik
                initialValues={{ fromPincode: '', toPincode: '' }}
                validationSchema={Yup.object().shape({
                    fromPincode: Yup.string().required(
                        'Enter Source Pincode'
                    ),
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
                                Enter Source Pincode
                            </label>
                            <Field
                                className="flex-grow h-10 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="fromPincode"
                                placeholder="Enter Source Pincode"
                            />
                            <ErrorMessage
                                name="fromPincode"
                                component="div"
                                className="text-red-500 text-xs italic"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Button
                                variant="solid"
                                disabled={isDownloading}
                                onClick={handleDownload}
                            >
                                Download
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            {/* important content here  */}
        </div>
    )
}

export default DownloadList
