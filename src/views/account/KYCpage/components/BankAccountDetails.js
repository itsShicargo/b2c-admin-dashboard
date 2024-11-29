import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormContainer, Input } from 'components/ui';

const BankAccountDetails = () => {
    const BankDetailsSchema = Yup.object().shape({
        sellerId: Yup.string().required('Seller ID is required'),
        bankName: Yup.string().required('Bank Name is required'),
        accountNumber: Yup.string()
            .required('Account Number is required')
            .matches(/^\d+$/, 'Account Number must be numeric')
            .min(6, 'Account Number must be at least 6 digits')
            .max(12, 'Account Number must not exceed 12 digits'),
        ifscCode: Yup.string()
            .trim()
            .matches(
                /^[A-Z]{4}[0-9]{1}[A-Z0-9]{6}$/,
                'Invalid IFSC Code. Please enter a valid IFSC Code.'
            )
            .required('IFSC Code is required'),
        cancelCheck: Yup.mixed()
            .required('Cancel Check upload is required')
            .test(
                'fileType',
                'Only PDF, JPG, JPEG, PNG files are allowed',
                (value) => {
                    if (!value) return true;
                    return (
                        value &&
                        [
                            'application/pdf',
                            'image/jpeg',
                            'image/jpg',
                            'image/png',
                        ].includes(value.type)
                    );
                }
            ),
    });

    const initialValues = {
        sellerId: '4', // Manually setting seller_id to 1
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        cancelCheck: null,
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Create JSON object from form values
            const formDataJSON = {
                sellerId: values.sellerId,
                bankName: values.bankName,
                accountNumber: values.accountNumber,
                ifscCode: values.ifscCode.toUpperCase(), // Ensure it's already in uppercase
                cancelCheck: values.cancelCheck.name, // Assuming you want to log the file name
            };
    
            console.log('Form Data:', formDataJSON); // Log form data as JSON
    
            // Fetch API
            const response = await fetch(
                'https://api.shipcluescargo.com/shipcargo/sellers/sellerkyc/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataJSON), // Send JSON data
                }
            );
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Response:', data); // Log API response
        } catch (error) {
            console.error('Error submitting form:', error);
            // Optionally handle error state here
        }
    
        // Set submitting to false after processing
        setSubmitting(false);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h6 className="text-black text-center pb-10"  >Bank Account Details</h6>
            <Formik
                initialValues={initialValues}
                validationSchema={BankDetailsSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <FormContainer>
                        <Form className="mt-2  md:grid md:grid-cols-2 md:gap-4 ">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="bankName"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Bank Name:
                                </label>
                                <Field
                                    type="text"
                                    id="bankName"
                                    name="bankName"
                                    placeholder="Enter Bank Name"
                                    className="mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="bankName"
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="accountNumber"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Bank Account Number:
                                </label>
                                <Field
                                    type="number"
                                    id="accountNumber"
                                    name="accountNumber"
                                    placeholder="Enter Account Number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="accountNumber"
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <div className="flex flex-col mt-4">
                                <label
                                    htmlFor="ifscCode"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Bank IFSC Code:
                                </label>
                                <Field
                                    type="text"
                                    id="ifscCode"
                                    name="ifscCode"
                                    placeholder="Enter IFSC Code"
                                    onChange={(event) => {
                                        const { value } = event.target;
                                        setFieldValue(
                                            'ifscCode',
                                            value.toUpperCase()
                                        );
                                    }}
                                    className="mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="ifscCode"
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <div className="flex flex-col mt-4">
                                <label
                                    htmlFor="cancelCheck"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Cancel Check upload:
                                </label>
                                <Input
                                    type="file"
                                    id="cancelCheck"
                                    name="cancelCheck"
                                    onChange={(event) => {
                                        setFieldValue(
                                            'cancelCheck',
                                            event.currentTarget.files[0]
                                        );
                                    }}
                                    className="mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="cancelCheck"
                                    component="p"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            <div className="col-span-2 mt-2 flex justify-center items-center">
                                <Button
                                    type="submit"
                                    variant="solid"
                                    className="text-white py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </Button>
                            </div>
                        </Form>
                    </FormContainer>
                )}
            </Formik>
        </div>
    );
};

export default BankAccountDetails;
