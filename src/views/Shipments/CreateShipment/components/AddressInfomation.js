import React, { useState } from 'react'
import {
    Input,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Switcher,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Addform from './Addform'
import axios from 'axios' // Import Axios for HTTP requests

const unit = [
    { value: 'cm', label: 'cm' },
    { value: 'Inch', label: 'Inch' },
]

const surfaceOptions = [
    { value: 'surface', label: 'surface' },
]
const cashModeOptions = [
    { value: 'cash', label: 'Cash' },
   
];

const validationSchema = Yup.object().shape({
    no_of_units: Yup.number().required('No of box is required'),
    weight: Yup.number().required('Weight per unit (in kg) is required'),
    length: Yup.number().required('Length is required'),
    width: Yup.number().required('Width is required'),
    height: Yup.number().required('Height is required'),
    invoice_value: Yup.number().required('Invoice value is required'),
    invoice_number: Yup.string().required('Invoice Number is required'),
    client_order_id: Yup.string().required('Client Order Number is required'),
    mode: Yup.string().required('Mode is required'),
    order_ready_date: Yup.date()
        .required('Order Ready Date is required')
        .nullable(),
})

const AddressInfomation = ({
    data = {
        no_of_units: '',
        weight: '',
        unit: '',
        length: '',
        width: '',
        height: '',
        invoice_date: '', // Assuming format is 'yyyy-mm-dd'
        invoice_value: '',
        invoice_number: '',
        client_order_id:'',
        mode: '',
        order_ready_date: '', // Assuming format is 'yyyy-mm-dd'
        photo1: null, // Updated to handle file
    },
    onNextChange,
    onBackChange,
    currentStepStatus,
    showError,
    finalFormData,
}) => {
    const [photo1File, setPhoto1File] = useState(null) // State to hold the file object
    const [addform, setAddform] = useState([{}]) // State to hold Addform data
    const [isCodEnabled, setIsCodEnabled] = useState(false);
    const [isCashModeEnabled, setIsCashModeEnabled] = useState(false); // State for cash mode visibility
    console.log("formdddddddd" , finalFormData)
    const onNext = (values, setSubmitting , finalFormData) => {
        const payload = createPayload(values , finalFormData) // Create payload
        // console.log('Payload:', payload) // Log payload
         
        console.log("form data",finalFormData)
        
        // Convert FormData to JSON object
        const payloadJSON = convertFormDataToJSON(payload)

        // Call API to create shipment
        createShipment(payloadJSON)
            .then((response) => {
                console.log('API Response:', response) // Log API response
                // Call onNextChange with both values and response
                onNextChange?.(
                    values,
                    'AddressInfomation',
                    response,
                    setSubmitting
                )
            })
            .catch((error) => {
                console.error('API Error:', error) // Log API error
                setSubmitting(false)
                // Handle error scenarios, e.g., show error message
            })
    }

    const createShipment = (payload) => {
        const url =
            'https://api.shipcluescargo.com/shipcargo/shipments/create-shipment/'

        // Retrieve the access token from wherever it's stored
        const accessToken =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI0MzA5ODgyLCJpYXQiOjE3MjE3MTc4ODIsImp0aSI6Ijk0ZDZhZmQ3YjFkZDQ4YTRiZGFlMTAwOWQzODFhMWQxIiwidXNlcl9pZCI6M30.2HluUsGZIrNe2rlSia8-uqDIuC6OLiHIsX3tUYo4_EA'

        // Create headers object with Content-Type for application/json and Authorization for JWT token

        const headers = {
            'Content-Type': 'application/json',
            Authorization: accessToken,
        }


        // Perform API request using Axios
        return axios.post(url, payload, { headers })
    }

    const convertFormDataToJSON = (formData) => {
        const jsonObject = {}
        for (const [key, value] of formData.entries()) {
            // Append addform as stringified JSON if it's an array or object
            if (
                key === 'addform' &&
                (Array.isArray(value) || typeof value === 'object') 
            ) {
                jsonObject[key] = JSON.stringify(value)
            } else {
                jsonObject[key] = value
            }
        }
        return jsonObject
    }

    const onBack = () => {
        onBackChange?.()
    }

    const onSwitcherToggle = () => {
        setIsCodEnabled(!isCodEnabled); // Toggle COD input box
    };

    const onCashModeToggle = () => {
        setIsCashModeEnabled(!isCashModeEnabled); // Toggle cash mode dropdown
    };

    // const dataFialValues = (values , finalFormData) => {


    //     finalFormData.invoice_date = values.invoice_date,
    //     finalFormData.invoice_value = values.invoice_value,
    //     finalFormData.invoice_number = values.invoice_number,
    //     finalFormData.client_order_id = values.client_order_id,
    //     finalFormData.mode = values.mode,
    //     finalFormData.order_ready_date = values.order_ready_date,
    //     finalFormData.photo1 = values.photo1,


    // }

    const createPayload = (values) => {
        // Calculate volumetric weight
        const volumetric_Weight = (values.length * values.width * values.height) / 5000 ;
        console.log("total volumetricWeight","=",volumetric_Weight)
        // Create payload object
        // const payload = {

        //     no_of_units: values.no_of_units,
        //     weight: values.weight,
        //     unit: values.unit,
        //     length: values.length,
        //     width: values.width,
        //     height: values.height,
        //     invoice_date: values.invoice_date,
        //     invoice_value: values.invoice_value,
        //     invoice_number: values.invoice_number,
        //     client_order_id: values.client_order_id,
        //     mode: values.mode,
        //     order_ready_date: values.order_ready_date,
        //     addform: addform,
        //     sender_contact_person_name: values.sender_contact_person_name,
        //     sender_contact_person_contact_no: values.sender_contact_person_contact_no,
        //     receiver_contact_person_name: values.receiver_contact_person_name,
        //     receiver_contact_person_contact_no: values.receiver_contact_person_contact_no,
        //     receiver_contact_person_email: values.receiver_contact_person_email,
        //     from_warehouse: values.from_warehouse,
        //     to_warehouse: values.to_warehouse,
        //     sourceWarehouseData: JSON.stringify(data.SourceWarehouse),
        //     destinationWarehouseData: JSON.stringify(data.DestinationWarehouse),
        //     seller: 1,
        //     to_warehouse: 2,
        //     from_warehouse: 1,
        //     awb_number: "AWB123456789",
        //     volumetric_weight: volumetric_Weight, // Include volumetric weight in payload
        //     receiver_contact_person_email: "hitesh@example.com",
        //     receiver_contact_person_contact_no: "0987654321",
        //     receiver_contact_person_name: "hitesh",
        //     sender_contact_person_name: "satish",
        //     sender_contact_person_contact_no: "1234567890",
        //     sender_contact_person_email: "satish@example.com",
        // };
      const payload = {}
        // Create FormData object and append photo1 file
        const formData = new FormData();
        Object.keys(payload).forEach((key) => {
            formData.append(key, payload[key]);
        });
        formData.append('photo1', photo1File);
        formData.append('user_id', '1');
    
        return formData;
    };

    return (
        <>
            <div className="mb-8">
                <img
                    className="mb-2 m-auto w-[5%]"
                    src="/img/createshipment/package.png"
                    alt="icon"
                />
                <h3 className="mb-2 mt-2 text-center text-xs">
                    Package Details
                </h3>
            </div>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    // Log form values
                    console.log('Form Values:', values)


                    finalFormData.invoice_date = values.invoice_date;
                    finalFormData.invoice_value = values.invoice_value;
                    finalFormData.invoice_number = values.invoice_number;
                    finalFormData.client_order_id = values.client_order_id;
                    finalFormData.mode = values.mode;
                    finalFormData.order_ready_date = values.order_ready_date;
                    finalFormData.photo1 = values.photo1;
                    // dataFialValues(values , finalFormData)
                    localStorage.setItem('invoice_date', values.invoice_date)
                    localStorage.setItem(
                        'order_ready_date',
                        values.order_ready_date
                    )
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting , finalFormData)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <FormContainer>
                            <div className="md:grid grid-cols-6 gap-2 border-t-4 border-indigo-500 p-4 rounded-lg">
                                <FormItem
                                    label="No of box "
                                    invalid={
                                        errors.no_of_units &&
                                        touched.no_of_units
                                    }
                                    errorMessage={errors.no_of_units}
                                >
                                    <Field
                                        type="number"
                                        autoComplete="off"
                                        className="input-box"
                                        name="no_of_units"
                                        placeholder="No of box"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Weight (per box)"
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
                                    label="unit In"
                                    asterisk
                                    invalid={errors.unit && touched.unit}
                                    errorMessage={errors.unit}
                                >
                                    <Select
                                        placeholder="CM"
                                        options={unit}
                                        name="unit"
                                        onChange={(option) =>
                                            setFieldValue('unit', option.value)
                                        }
                                    />
                                </FormItem>
                                <FormItem
                                    label="Length (per box)"
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
                                    label="Width (per box)"
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
                                    label="Height (per box)"
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
                            <Addform
                                setAddform={setAddform} // Pass setAddform function to update addform state
                                addform={addform} // Pass addform state
                            />
                            <h3 className="mb-2 mt-2">Invoice information</h3>
                            <div className="md:grid grid-cols-4 gap-4 border-t-4 border-indigo-500 p-8 rounded-lg">
                                <FormItem
                                    label="Invoice Date"
                                    asterisk
                                    invalid={
                                        errors.invoice_date &&
                                        touched.invoice_date
                                    }
                                    errorMessage={errors.invoice_date}
                                >
                                    <Field name="invoice_date">
                                        {({ field }) => (
                                            <DatePicker
                                                {...field}
                                                placeholder="yyyy-mm-dd"
                                                dateFormat="yyyy-MM-dd"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'invoice_date',
                                                        date
                                                            ? date
                                                                  .toISOString()
                                                                  .split('T')[0]
                                                            : ''
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                <FormItem
                                    label="Invoice value"
                                    asterisk
                                    invalid={
                                        errors.invoice_value &&
                                        touched.invoice_value
                                    }
                                    errorMessage={errors.invoice_value}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        name="invoice_value"
                                        placeholder="Invoice value"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Invoice Number"
                                    asterisk
                                    invalid={
                                        errors.invoice_number &&
                                        touched.invoice_number
                                    }
                                    errorMessage={errors.invoice_number}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        name="invoice_number"
                                        value={values.invoice_number}
                                        placeholder="Invoice Number"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Mode"
                                    asterisk
                                    invalid={errors.mode && touched.mode}
                                    errorMessage={errors.mode}
                                >
                                    <Select
                                        placeholder="Surface"
                                        options={surfaceOptions}
                                        name="mode"
                                        onChange={(option) =>
                                            setFieldValue('mode', option.value)
                                        }
                                    />
                                </FormItem>
                            </div>
                            <div className="md:grid grid-cols-3 gap-4 p-8">
                                <FormItem
                                    label="Order Ready Date"
                                    asterisk
                                    invalid={
                                        errors.order_ready_date &&
                                        touched.order_ready_date
                                    }
                                    errorMessage={errors.order_ready_date}
                                >
                                    <Field name="order_ready_date">
                                        {({ field }) => (
                                            <DatePicker
                                                {...field}
                                                placeholder="yyyy-mm-dd"
                                                dateFormat="yyyy-MM-dd"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'order_ready_date',
                                                        date
                                                            ? date
                                                                  .toISOString()
                                                                  .split('T')[0]
                                                            : ''
                                                    )
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                {/* <div> */}
                                <FormItem
                                    label="invoice file"
                                    asterisk
                                    invalid={
                                        errors.client_order_id &&
                                        touched.client_order_id
                                    }
                                    errorMessage={errors.client_order_id}
                                >
                                    <Input
                                        type="file"
                                        name="file"
                                        onChange={(event) => {
                                            setFieldValue(
                                                'photo1',
                                                event.currentTarget.files[0]
                                            )
                                            setPhoto1File(
                                                event.currentTarget.files[0]
                                            ) // Update photo1File state
                                        }}
                                    />
                                    </FormItem>
                                {/* </div> */}
                                <FormItem
                                    label="Client_Order_Id"
                                    asterisk
                                    invalid={
                                        errors.client_order_id &&
                                        touched.client_order_id
                                    }
                                    errorMessage={errors.client_order_id}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        name="client_order_id"
                                        placeholder="Client order ID"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            
                            <div className="md:grid grid-cols-4 gap-2 p-4 ">
                                <div className="flex items-center gap-5">
                                    <Switcher defaultChecked={isCodEnabled} onChange={onSwitcherToggle} />
                                    <p className="text-end">COD</p>
                                </div>
                                {isCodEnabled && (
                                    <FormItem
                                        label="COD Amount"
                                        asterisk
                                        invalid={errors.cod_amount && touched.cod_amount}
                                        errorMessage={errors.cod_amount}
                                    >
                                        <Field
                                            type="number"
                                            autoComplete="off"
                                            className="input-box"
                                            name="cod_amount"
                                            placeholder="COD Amount"
                                            component={Input}
                                        />
                                    </FormItem>
                                )}
                                {/*  */}
                                <div className="flex items-center gap-5">
                                    <Switcher defaultChecked={isCashModeEnabled} onChange={onCashModeToggle} />
                                    <p className="text-end">Is To-Pay</p>
                                </div>
                                {isCashModeEnabled && (
                                    <FormItem
                                        label="Cash Mode"
                                        asterisk
                                        invalid={errors.cash_mode && touched.cash_mode}
                                        errorMessage={errors.cash_mode}
                                    >
                                        <Select
                                            placeholder="Select Cash Mode"
                                            options={cashModeOptions} // Define options for cash mode
                                            name="cash_mode"
                                            onChange={(option) =>
                                                setFieldValue('cash_mode', option.value)
                                            }
                                        />
                                    </FormItem>
                                )}
                            </div>
                            {/* <div className=" grid-cols-3 gap-4 p-8">
                                <div className="flex items-center gap-5">
                                    <Switcher defaultChecked={isCashModeEnabled} onChange={onCashModeToggle} />
                                    <p className="text-end">Is Cash Mode</p>
                                </div>
                                {isCashModeEnabled && (
                                    <FormItem
                                        label="Cash Mode"
                                        asterisk
                                        invalid={errors.cash_mode && touched.cash_mode}
                                        errorMessage={errors.cash_mode}
                                    >
                                        <Select
                                            placeholder="Select Cash Mode"
                                            options={cashModeOptions} // Define options for cash mode
                                            name="cash_mode"
                                            onChange={(option) =>
                                                setFieldValue('cash_mode', option.value)
                                            }
                                        />
                                    </FormItem>
                                )}
                            </div> */}
                        </FormContainer>
                        <div className="flex justify-end gap-2 mt-8">
                            <Button
                                className="next-btn"
                                type="button"
                                onClick={onBack}
                            >
                                Back
                            </Button>
                            <Button
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                className="next-btn"
                            >
                                {currentStepStatus === 'complete'
                                    ? 'Save'
                                    : 'Next'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default AddressInfomation
