import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Import Axios
import {
    Input,
    Button,
    Select,
    FormItem,
    FormContainer,
    toast,
    Alert,
} from 'components/ui';

import "./form.css";

const stateOptions = [
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Dadra and Nagar Haveli', label: 'Dadra and Nagar Haveli' },
    { value: 'Daman and Diu', label: 'Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Puducherry', label: 'Puducherry' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
];


const validationSchema = Yup.object().shape({
    warehousename: Yup.string()
        .required('Warehouse Name is required')
        .max(30, 'Maximum 30 characters only'),
    addressline1: Yup.string()
        .required('Address Line 1 is required')
        .max(99, 'Maximum 99 characters only'),
    addressline2: Yup.string().max(99, 'Maximum 99 characters only'),
    pincode: Yup.string()
        .required('Pincode is required')
        .matches(/^\d{6}$/, 'Pincode should be exactly 6 digits'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
    personName: Yup.string().required('Contact Person Name is required'),
    PersonNumber: Yup.string()
        .required('Contact Person Number is required')
        .matches(
            /^\d{10}$/,
            'Contact Person Number should be exactly 10 digits'
        ),
    email: Yup.string().email('Invalid email format'),
});

const CompanyDetails = () => {
    const initialValues = {
        // Initial values as before
    };

    const onSubmitForm = async (values, { setSubmitting, resetForm }) => {
        try {
            const payload = createPayload(values);
            console.log('Submitting payload:', payload); // Ensure this logs the payload correctly

            // Make API call using Axios
            const response = await axios.post('https://api.shipcluescargo.com/shipcargo/sellers/sellerkyc/', payload);
            console.log('API Response:', response.data); // Log the API response if needed

            toast.success('Warehouse created successfully.');

            resetForm();
        } catch (error) {
            console.error('API Error:', error); // Log API error
            toast.error('Failed to create warehouse. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const createPayload = (values) => {
        const payload = {
            address: `${values.addressline1} ${values.addressline2}`,
            pincode: values.pincode,
            state: values.state,
            city: values.city,
            country: values.country,
            // seller: '1', // Assuming '1' is your seller ID or identifier
        };
        return payload;
    };

    return (
        <>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h6 className='text-black text-center' >Add your Company Address</h6>
                <p className="pb-4 pt-2 text-center">
                    This is the registered address of your Company/Business
                </p>

                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={onSubmitForm}
                >
                    {({
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        setFieldValue,
                    }) => (
                        <Form>
                            <FormContainer>
                                {/* Address Name */}
                                <FormItem
                                    className="text-sm font-medium text-gray-700 mt-2"
                                    label="Address line 1"
                                    invalid={errors.addressline1 && touched.addressline1}
                                    errorMessage={errors.addressline1}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        value={values.addressline1}
                                        name="addressline1"
                                        placeholder="Enter company address line 1"
                                        component={Input}
                                    />
                                </FormItem>
                                {/* Address line 2 */}

                                <FormItem
                                    className="text-sm font-medium text-gray-700"
                                    label="Address line 2 (optional)"
                                    invalid={errors.addressline2 && touched.addressline2}
                                    errorMessage={errors.addressline2}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        value={values.addressline2}
                                        name="addressline2"
                                        placeholder="Enter company address line 2"
                                        component={Input}
                                    />
                                </FormItem>
                                {/* Pincode / City */}
                                <div className="md:grid grid-cols-2 gap-4">

                                    <FormItem
                                        className="text-sm font-medium text-gray-700"
                                        label="Pincode"
                                        invalid={errors.pincode && touched.pincode}
                                        errorMessage={errors.pincode}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            className="input-box"
                                            value={values.pincode}
                                            name="pincode"
                                            placeholder="Enter Pincode"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        className="text-sm font-medium text-gray-700"
                                        label="City"
                                        invalid={errors.city && touched.city}
                                        errorMessage={errors.city}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            className="input-box"
                                            value={values.city}
                                            name="city"
                                            placeholder="Enter City"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                {/* State / Country */}
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        className="text-sm font-medium text-gray-700"
                                        label="State"
                                        invalid={errors.state && touched.state}
                                        errorMessage={errors.state}
                                    >
                                        <Select
                                            placeholder="Select State"
                                            options={stateOptions}
                                            name="state"
                                            onChange={(option) =>
                                                setFieldValue('state', option.value)
                                            }
                                        />
                                    </FormItem>
                                    <FormItem
                                        className="text-sm font-medium text-gray-700"
                                        label="Country"
                                        invalid={errors.country && touched.country}
                                        errorMessage={errors.country}
                                    >
                                        <Input
                                            placeholder="India"
                                            value={values.country}
                                            name="country"
                                            className="input-box"
                                            disabled
                                        />
                                    </FormItem>
                                </div>
                                <Alert>
                                    Why we need this info?
                                    <p>
                                        This address will be used as your official company address on shipping labels, freight invoices, and so on.
                                    </p>
                                </Alert>
                                {/* Submit button */}
                                <div className="flex justify-center pt-4 items-center">
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Continue'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default CompanyDetails;
