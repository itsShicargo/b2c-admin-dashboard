import React, { useState } from 'react'
import {
    Input,
    Button,
    Select,
    FormItem,
    FormContainer,
    toast,
    Notification,
    Switcher,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Addform from 'views/Shipments/CreateShipment/components/Addform'
import "./form.css"

const dimension = [
  { value: 'cm', label: 'cm' },
  { value: 'Inch', label: 'Inch' },
]

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
    warehousename: Yup.string().required('Maximum 30 characters only'),
    addressline1: Yup.string().required('Maximum 30 characters only'),
    addressline2: Yup.string().required('Maximum 30 characters only'),
    formpincode: Yup.number()
        .required('Pincode is required')
        .test('len', 'Pincode should be exactly 6 digits', (val) => {
            if (val) {
                return val.toString().length === 6
            }
            return false
        }),
    topincode: Yup.number()
        .required('Pincode is required')
        .test('len', 'Pincode should be exactly 6 digits', (val) => {
            if (val) {
                return val.toString().length === 6
            }
            return false
        }),

    city: Yup.string().required('city'),
    state: Yup.string().required('state'),

    personName: Yup.string().required('Contact Person Name'),
    
})

const ShipmentRateCalculator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);


    const data = {
      
        frompincode: '',
        fromcity:'',
        fromstate:'',

        topincode: '',
        tocity:'',
        tostate:'',

        invoicevalue:'',

        noofbox: '',
        weight: '',
        dimensions: '',
        length: '',
        width: '',
        height: '',

    }
    function closeAfter2000ms() {
        toast.push(
            <Notification closable type="success" duration={2000}>
                Success
            </Notification>
        )
    }

    const onSwitcherToggle = () => {}


  
    return (
        <>
            <section className=" py-15px px-20  flex relative  min-w-0 break-words rounded-md my-4 flex-col">
                <Formik
                    initialValues={data}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // onSubmit(values)
                        console.log(values)
                        isSubmitting(true)
                        // Reset form after submission (optional)
                        // setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        setFieldValue,
                    }) => {
                        return (
                            <Form>
                                <FormContainer>
                                    <div className="md:grid grid-cols-3 gap-4">
                                        {/* Pincode */}
                                        <FormItem
                                            className="form-header"
                                            asterisk
                                            label="From Pincode "
                                            invalid={
                                                errors.pincode &&
                                                touched.pincode
                                            }
                                            errorMessage={errors.pincode}
                                        >
                                            <Field
                                                type="number"
                                                autoComplete="off"
                                                className="input-box"
                                                value={values.pincode}
                                                name="pincode"
                                                placeholder="From Pincode"
                                                component={Input}
                                            />
                                        </FormItem>
                                        {/* Pincode */}
                                        <FormItem
                                            className="form-header"
                                            asterisk
                                            label="From City "
                                            invalid={
                                                errors.city && touched.city
                                            }
                                            errorMessage={errors.city}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                className="input-box"
                                                value={values.city}
                                                name="city"
                                                placeholder="Form City"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="From State"
                                            
                                            asterisk
                                            invalid={
                                                errors.state && touched.state
                                            }
                                            errorMessage={errors.state}
                                        >
                                            <Select
                                                placeholder="Form State"
                                                options={state}
                                                name="state"
                                                onChange={(option) =>
                                                    setFieldValue(
                                                        'state',
                                                        option.value
                                                    )
                                                }
                                            ></Select>
                                        </FormItem>
                                    </div>
                                    {/* Pincode / City */}
                                    <div className="md:grid grid-cols-3 gap-4">
                                        <FormItem
                                            className="form-header"
                                            asterisk
                                            label="To Pincode "
                                            invalid={
                                                errors.pincode &&
                                                touched.pincode
                                            }
                                            errorMessage={errors.pincode}
                                        >
                                            <Field
                                                type="number"
                                                autoComplete="off"
                                                className="input-box"
                                                value={values.pincode}
                                                name="pincode"
                                                placeholder="To Pincode"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            className="form-header"
                                            asterisk
                                            label="To City "
                                            invalid={
                                                errors.city && touched.city
                                            }
                                            errorMessage={errors.city}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                className="input-box"
                                                value={values.city}
                                                name="city"
                                                placeholder="To City"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="To State"
                                            asterisk
                                           
                                            invalid={
                                                errors.state && touched.state
                                            }
                                            errorMessage={errors.state}
                                        >
                                            <Select
                                                placeholder="To State"
                                                options={state}
                                                name="state"
                                                onChange={(option) =>
                                                    setFieldValue(
                                                        'state',
                                                        option.value
                                                    )
                                                }
                                            ></Select>
                                        </FormItem>
                                    </div>
                                    {/* State / Country */}

                                    {/* invoice and switcher */}
                                    <div className="md:grid grid-cols-4 gap-4">
                                        <FormItem
                                            label="Invoice value"
                                            asterisk
                                            invalid={
                                                errors.invoicevalue &&
                                                touched.invoicevalue
                                            }
                                            errorMessage={errors.invoicevalue}
                                        >
                                            <Field
                                                type="number"
                                                autoComplete="off"
                                                className="input-box"
                                                name="invoicevalue"
                                                placeholder="Invoice value"
                                                component={Input}
                                            />
                                        </FormItem>

                                        {/* switcher 1 */}
                                        <div className="flex items-center justify-end gap-2">
                                            <Switcher
                                                defaultChecked
                                                onChange={onSwitcherToggle}
                                            />
                                            <p className="text-end">
                                                Secure Shipment
                                            </p>
                                        </div>

                                        {/* switcher2 */}

                                        <div className="flex items-center justify-end gap-2">
                                            <Switcher
                                                defaultChecked
                                                onChange={onSwitcherToggle}
                                            />
                                            <p>Appointment Based Delivery</p>
                                        </div>

                                        {/* switcher 3 */}

                                        <div className="flex items-center justify-end gap-2">
                                            <Switcher
                                                defaultChecked
                                                onChange={onSwitcherToggle}
                                            />
                                            <p className="text-end">
                                                Is To-Pay
                                            </p>
                                        </div>
                                    </div>
                                     
                                    {/* Submit button */}

                                          {/* Box details*/}

                                          <div className="md:grid grid-cols-1 gap-4">
                                          <div className="flex items-center justify-start mt-4 gap-2">
                                            <Switcher
                                                defaultChecked
                                                onChange={onSwitcherToggle}
                                            />
                                            <p className="text-end">
                                                Is COD
                                            </p>
                                        </div>
                                        <p>Box details</p>
                                        </div>

                                            {/* create shipment form here... */}


                                            <div className="md:grid grid-cols-6 gap-3  p-4 mt-4">
                                    <FormItem
                                        label="No of box"
                                        invalid={errors.noofbox && touched.noofbox}
                                        errorMessage={errors.noofbox}
                                    >
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            className="input-box"
                                            name="noofbox"
                                            placeholder="No of box"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Weight"
                                        asterisk
                                        invalid={errors.weight && touched.weight}
                                        errorMessage={errors.weight}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            className="input-box"
                                            name="weight"
                                            placeholder="Weight"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Dimensions In"
                                        asterisk
                                        invalid={errors.dimensions && touched.dimensions}
                                        errorMessage={errors.dimensions}
                                    >
                                        <Select
                                            placeholder="CM"
                                            options={dimension}
                                            name="dimensions"
                                            onChange={option => setFieldValue('dimensions', option.value)}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Length"
                                        asterisk
                                        invalid={errors.length && touched.length}
                                        errorMessage={errors.length}
                                    >
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            className="input-box"
                                            name="length"
                                            placeholder="length"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Width"
                                        asterisk
                                        invalid={errors.width && touched.width}
                                        errorMessage={errors.width}
                                    >
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            className="input-box"
                                            name="width"
                                            placeholder="width"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Height"
                                        asterisk
                                        invalid={errors.height && touched.height}
                                        errorMessage={errors.height}
                                    >
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            className="input-box"
                                            name="height"
                                            placeholder="height"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <Addform />

                                 

                                </FormContainer>

                               <div className="flex justify-end mt-4 gap-2">
                               
                                <Button
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    className="next-btn"
                                >
                                    {/* {currentStepStatus === 'complete' ? 'Save' : 'Next'} */}
                                    Calculate
                                </Button>
                                <Button
                                    className="next-btn"
                                    type="button"
                                    // onClick={onBack}
                                >
                                  Reset
                                </Button>
                            </div>
                            </Form>
                        )
                    }}
                </Formik>
            </section>
        </>
    )
}

export default ShipmentRateCalculator
