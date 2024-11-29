import React, { useState } from 'react'
import {
    Input,
    Button,
    Select,
    FormItem,
    FormContainer,
    Switcher,
    Dialog,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Addform from 'views/Shipments/CreateShipment/components/Addform'
import './form.css'
import AllShipment from 'views/Shipments/AllShipment/components/AllShipment'

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
    frompincode: Yup.number()
        .required('Pincode is required')
        .test('len', 'Pincode should be exactly 6 digits', (val) => {
            if (val) {
                return val.toString().length === 6
            }
            return false
        }),
    fromcity: Yup.string().required('from city'),
    fromstate: Yup.string().required('from state'),

    topincode: Yup.number()
        .required('Pincode is required')
        .test('len', 'Pincode should be exactly 6 digits', (val) => {
            if (val) {
                return val.toString().length === 6
            }
            return false
        }),

    tocity: Yup.string().required(' To city'),
    tostate: Yup.string().required(' To state'),
    invoicevalue: Yup.number().required('invoice Value'),
    noofbox: Yup.string().required('No of box is required'),
    weight: Yup.string().required('Weight per unit (in kg) is required'),
    length: Yup.string().required('Length is required'),
    width: Yup.string().required('Width is required'),
    height: Yup.string().required('Height is required'),
    dimension: Yup.string().required('Dimensions In'),
})

const ShipmentRateCalculator = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const data = {
        frompincode: '',
        fromcity: '',
        fromstate: '',

        topincode: '',
        tocity: '',
        tostate: '',

        invoicevalue: '',

        noofbox: '',
        weight: '',
        dimensions: '',
        length: '',
        width: '',
        height: '',
    }
    // function closeAfter2000ms() {
    //     toast.push(
    //         <Notification closable type="success" duration={2000}>
    //             Success
    //         </Notification>
    //     )
    // }

    const onSwitcherToggle = () => {}

    const [dialogIsOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const onDialogClose = (e) => {
        console.log('onDialogClose', e);
        setIsOpen(false);
    };

    const onDialogOk = (e) => {
        console.log('onDialogOk', e);
        setIsOpen(false);
    };

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
                                                errors.frompincode &&
                                                touched.frompincode
                                            }
                                            errorMessage={errors.frompincode}
                                        >
                                            <Field
                                                type="number"
                                                autoComplete="off"
                                                className="input-box"
                                                value={values.frompincode}
                                                name="frompincode"
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
                                                errors.fromcity &&
                                                touched.fromcity
                                            }
                                            errorMessage={errors.fromcity}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                className="input-box"
                                                value={values.fromcity}
                                                name="fromcity"
                                                placeholder="Form City"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="From State"
                                            asterisk
                                            invalid={
                                                errors.fromstate &&
                                                touched.fromstate
                                            }
                                            errorMessage={errors.fromstate}
                                        >
                                            <Select
                                                placeholder="Form State"
                                                options={state}
                                                name="fromstate"
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
                                                errors.topincode &&
                                                touched.topincode
                                            }
                                            errorMessage={errors.topincode}
                                        >
                                            <Field
                                                type="number"
                                                autoComplete="off"
                                                className="input-box"
                                                value={values.topincode}
                                                name="topincode"
                                                placeholder="To Pincode"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            className="form-header"
                                            asterisk
                                            label="To City "
                                            invalid={
                                                errors.tocity && touched.tocity
                                            }
                                            errorMessage={errors.tocity}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                className="input-box"
                                                value={values.tocity}
                                                name="tocity"
                                                placeholder="To City"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="To State"
                                            asterisk
                                            invalid={
                                                errors.tostate &&
                                                touched.tostate
                                            }
                                            errorMessage={errors.tostate}
                                        >
                                            <Select
                                                placeholder="To State"
                                                options={state}
                                                name="tostate"
                                                onChange={(option) =>
                                                    setFieldValue(
                                                        'tostate',
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
                                            <p className="text-end">Is COD</p>
                                        </div>
                                        <p>Box details</p>
                                    </div>

                                    {/* create shipment form here... */}

                                    <div className="md:grid grid-cols-6 gap-3  p-4 mt-4">
                                        <FormItem
                                            label="No of box"
                                            invalid={
                                                errors.noofbox &&
                                                touched.noofbox
                                            }
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
                                            invalid={
                                                errors.weight && touched.weight
                                            }
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
                                            invalid={
                                                errors.dimensions &&
                                                touched.dimensions
                                            }
                                            errorMessage={errors.dimensions}
                                        >
                                            <Select
                                                placeholder="CM"
                                                options={dimension}
                                                name="dimensions"
                                                onChange={(option) =>
                                                    setFieldValue(
                                                        'dimensions',
                                                        option.value
                                                    )
                                                }
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Length"
                                            asterisk
                                            invalid={
                                                errors.length && touched.length
                                            }
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
                                            invalid={
                                                errors.width && touched.width
                                            }
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
                                            invalid={
                                                errors.height && touched.height
                                            }
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
                                        // className="next-btn"
                                        onClick={openDialog}
                                    >
                                        {/* {currentStepStatus === 'complete' ? 'Save' : 'Next'} */}
                                        Calculate
                                    </Button>
                                    <Button
                                        // className="next-btn"
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

                <div className="text-black w-full border-0 flex relative text-sm min-w-0 break-words bg-white shadow mt-8 rounded-md mb-8 flex-col">
                    <div className="flex-1 px-5 py-15px relative">
                        <h5 className="text-[#6B7280] font-medium text-xl p-3">
                            Important terms:
                        </h5>
                        <div className="mt-4 mb-4 text-[#6B7280]">
                            <ul className="list-disc pl-16">
                                <li className="mb-2">
                                    Above prices are inclusive of GST.
                                </li>
                                <li className="mb-2">
                                    Other Charges like address correction
                                    charges/shipment destroy charges, demurrage
                                    charges, mall delivery charges, time based
                                    delivery charges etc. shall be charged extra
                                    if service taken by the customer or if
                                    applicable.
                                </li>
                                <li className="mb-2">
                                    Handling charges are charged at actuals for
                                    Spoton, XpressBees and Delex
                                </li>
                                <li className="mb-2">
                                    Volumetric weight is calculated
                                    L*B*H*CFT/27000 where length, breath, height
                                    has to be taken in Centimeters and divided
                                    by denominator, this will give the value in
                                    Kilograms
                                </li>
                                <li className="mb-2">
                                    For more information, please read our{' '}
                                    <a
                                        href="/terms-and-conditions"
                                        className="text-blue-500 hover:underline"
                                    >
                                        terms and conditions
                                    </a>{' '}
                                    here.
                                </li>
                                <li>
                                    For any queries, send an email to{' '}
                                    <a
                                        href="mailto:cargosupport@shiprocket.com"
                                        className="text-blue-500 hover:underline"
                                    >
                                        info@shipclues.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <div>

            {dialogIsOpen && (
                <Dialog
                    isOpen={dialogIsOpen}
                    style={{
                        content: {
                            marginTop: 200,
                            marginLeft:300,
                        },
                    }}
                    contentClassName="pb-0 px-0"
                    onClose={onDialogClose}
                    onRequestClose={onDialogClose}
                    width={1100}
                    height={500}
                >
                    <div className="px-6 pb-6">
              <AllShipment/>
                    </div>
                    <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            onClick={onDialogClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={onDialogOk}>
                            Okay
                        </Button>
                    </div>
                </Dialog>
            )}
        </div>
        </>
    )
}

export default ShipmentRateCalculator
