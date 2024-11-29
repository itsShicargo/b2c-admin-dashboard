import React, { useState } from 'react'
import {
    Input,
    Button,
    Select,
    FormItem,
    FormContainer,
    Notification,
    toast,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios' // Import Axios for API requests
import './form.css'

const state = [
    {
        value: 'Andaman and Nicobar Islands',
        label: 'Andaman and Nicobar Islands',
    },
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
]

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
})

const NewWarehouse = () => {
    const [showSuccess, setShowSuccess] = useState(false)

    const initialValues = {
        warehousename: '',
        addressline1: '',
        addressline2: '',
        pincode: '',
        city: '',
        state: '',
        country: 'India',
        personName: '',
        PersonNumber: '',
        email: '',
    }

    const onSubmitForm = async (values, { setSubmitting, resetForm }) => {
      try {
          const payload = createPayload(values); // Create payload object
          console.log('Submitting payload:', payload); // Log payload before API call
  
          const response = await axios.post(
              'https://api.shipcluescargo.com/warehouse/create_warehouse/'
          );
          

          setShowSuccess(true);
          resetForm();
          toast.success('Warehouse created successfully!');
      } catch (error) {
          console.error('API Error:', error); // Log API error
          toast.error('Failed to create warehouse. Please try again.');
      } finally {
          setSubmitting(false);
      }
  };
  

    const createPayload = (values) => {
      const payload = {
          phone: values.PersonNumber,  // Assuming PersonNumber maps to phone
          name: values.warehousename,
          email: values.email,
          address: `${values.addressline1} ${values.addressline2}`,
          city: values.city,
          pincode: values.pincode,
          state: values.state,
          country: values.country,
          return_status: 'some_value',  // Update with actual logic
          seller: '2'  // Assuming seller id number
          // Add other fields as needed
      };
      return payload;
  };

    return (
        <>
            <section className="py-15px px-20 flex relative min-w-0 break-words rounded-md my-4 flex-col">
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
                                {/* Warehouse Name */}
                                <FormItem
                                    className="form-header"
                                    asterisk
                                    label="Warehouse Name (Maximum 30 characters only)"
                                    invalid={
                                        errors.warehousename &&
                                        touched.warehousename
                                    }
                                    errorMessage={errors.warehousename}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        value={values.warehousename}
                                        name="warehousename"
                                        placeholder="Warehouse Name"
                                        component={Input}
                                    />
                                </FormItem>
                                {/* Address line 1 */}
                                <FormItem
                                    className="form-header"
                                    asterisk
                                    label="Address line 1 (Maximum 99 characters only)"
                                    invalid={
                                        errors.addressline1 &&
                                        touched.addressline1
                                    }
                                    errorMessage={errors.addressline1}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        value={values.addressline1}
                                        name="addressline1"
                                        placeholder="Address line 1"
                                        component={Input}
                                    />
                                </FormItem>
                                {/* Address line 2 */}
                                <FormItem
                                    className="form-header"
                                    label="Address line 2 (Maximum 99 characters only)"
                                    invalid={
                                        errors.addressline2 &&
                                        touched.addressline2
                                    }
                                    errorMessage={errors.addressline2}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        value={values.addressline2}
                                        name="addressline2"
                                        placeholder="Address line 2"
                                        component={Input}
                                    />
                                </FormItem>
                                {/* Pincode / City */}
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        className="form-header"
                                        asterisk
                                        label="Pincode"
                                        invalid={
                                            errors.pincode && touched.pincode
                                        }
                                        errorMessage={errors.pincode}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            className="input-box"
                                            value={values.pincode}
                                            name="pincode"
                                            placeholder="Pincode"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        className="form-header"
                                        asterisk
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
                                            placeholder="City"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                {/* State / Country */}
                                <div className="md:grid grid-cols-2 gap-4">
                                    <FormItem
                                        className="form-header"
                                        label="State"
                                        asterisk
                                        invalid={errors.state && touched.state}
                                        errorMessage={errors.state}
                                    >
                                        <Select
                                            placeholder="State"
                                            options={state}
                                            name="state"
                                            onChange={(option) =>
                                                setFieldValue(
                                                    'state',
                                                    option.value
                                                )
                                            }
                                        />
                                    </FormItem>
                                    <FormItem
                                        className="form-header"
                                        asterisk
                                        label="Country"
                                        invalid={
                                            errors.country && touched.country
                                        }
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
                                {/* Name / Contact / Email */}
                                <div className="md:grid grid-cols-3 gap-4">
                                    <FormItem
                                        className="form-header"
                                        asterisk
                                        label="Contact Person Name"
                                        invalid={
                                            errors.personName &&
                                            touched.personName
                                        }
                                        errorMessage={errors.personName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            className="input-box"
                                            value={values.personName}
                                            name="personName"
                                            placeholder="Contact Person Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        className="form-header"
                                        asterisk
                                        label="Contact Person Number"
                                        invalid={
                                            errors.PersonNumber &&
                                            touched.PersonNumber
                                        }
                                        errorMessage={errors.PersonNumber}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            className="input-box"
                                            value={values.PersonNumber}
                                            name="PersonNumber"
                                            placeholder="Contact Person Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        className="form-header"
                                        label="Contact Person Email"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            className="input-box"
                                            value={values.email}
                                            name="email"
                                            placeholder="Contact Person Email"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                {/* Submit button */}
                                <div className="flex justify-end items-center">
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? 'Submitting...'
                                            : 'Submit'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </section>
        </>
    )
}

export default NewWarehouse
