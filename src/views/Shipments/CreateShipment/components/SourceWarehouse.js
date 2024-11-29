import React from 'react'
import {
    Input,
    Button,
    Select,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import warehouseData from './warehouseData.json'

// Ensure from_warehouse values are integers
const from_warehouse = [
    { value: 121001, label: '121001' },
    { value: 121002, label: '121002' },
    { value: 121003, label: '121003' },
    { value: 121004, label: '121004' },
    { value: 121005, label: '121005' },
    { value: 1, label: '1' }, // Custom value with label "1"
]

const validationSchema = Yup.object().shape({
    sender_contact_person_name: Yup.string().required(
        'Contact Person Name is required'
    ),
    sender_contact_person_contact_no: Yup.string()
        .matches(/^\d{10}$/, 'Contact Person Number must be 10 digits')
        .required('Contact Person Number is required'),
    sender_contact_person_email: Yup.string().email('Invalid email format'),
    from_warehouse: Yup.number()
        .required('Please select the pincode zone')
        .oneOf(
            from_warehouse.map((option) => option.value),
            'Invalid warehouse selection'
        ),
})

const SourceWarehouse = ({
    data = {
        from_warehouse: 1,
        sender_contact_person_name: '',
        sender_contact_person_contact_no: '',
        sender_contact_person_email: '',
    },
    onNextChange,
    currentStepStatus,
    showError,
    setFinalFormData,
}) => {
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'SourceWarehouse', setSubmitting)
    }

    const handleSubmit = (values, { setSubmitting }) => {
        // Convert values to JSON format
        const payload = createPayload(values)
        console.log('Payload:', payload)

        // Continue with form submission logic (if needed)
        setTimeout(() => {
            onNext(values, setSubmitting)
        }, 1000)
    }

    const createPayload = (values) => {
        const {
            sender_contact_person_name,
            sender_contact_person_contact_no,
            sender_contact_person_email,
            from_warehouse,
        } = values
        setFinalFormData({
            sender_contact_person_name: values.sender_contact_person_name,
            sender_contact_person_contact_no:
                values.sender_contact_person_contact_no,
            sender_contact_person_email: values.sender_contact_person_email,
        })

        // Adjusting for custom value "1" if needed
        const selectedWarehouseInfo =
            from_warehouse === 1 ? {} : warehouseData[from_warehouse]

        const payload = {
            sender_contact_person_name,
            sender_contact_person_contact_no,
            sender_contact_person_email,
            from_warehouse,
            ...selectedWarehouseInfo,
        }

        return payload
    }

    return (
        <>
            {showError && (
                <Alert showIcon className="mb-4" type="danger">
                    Kindly ensure all mandatory fields are completed.
                </Alert>
            )}
            <div className="mb-8">
                <img
                    className="mb-2 m-auto w-[5%]"
                    src="/img/createshipment/source.png"
                    alt="icon"
                />
                <h3 className="mb-2 mt-2 text-center text-xs">
                    Source Warehouse
                </h3>
            </div>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Select Warehouse"
                                invalid={
                                    errors.from_warehouse &&
                                    touched.from_warehouse
                                }
                                errorMessage={errors.from_warehouse}
                            >
                                <Select
                                    placeholder="Search Warehouse by pincode"
                                    options={from_warehouse}
                                    name="from_warehouse"
                                    onChange={(option) => {
                                        setFieldValue(
                                            'from_warehouse',
                                            option.value
                                        )
                                        // Set values based on selected from_warehouse from warehouseData
                                        const selectedWarehouseInfo =
                                            warehouseData[option.value]
                                        if (selectedWarehouseInfo) {
                                            setFieldValue(
                                                'sender_contact_person_name',
                                                selectedWarehouseInfo.sender_contact_person_name
                                            )
                                            setFieldValue(
                                                'sender_contact_person_contact_no',
                                                selectedWarehouseInfo.sender_contact_person_contact_no
                                            )
                                            setFieldValue(
                                                'sender_contact_person_email',
                                                selectedWarehouseInfo.sender_contact_person_email
                                            )
                                        } else {
                                            setFieldValue(
                                                'sender_contact_person_name',
                                                ''
                                            )
                                            setFieldValue(
                                                'sender_contact_person_contact_no',
                                                ''
                                            )
                                            setFieldValue(
                                                'sender_contact_person_email',
                                                ''
                                            )
                                        }
                                    }}
                                />
                            </FormItem>
                            <div className="md:grid grid-cols-3 gap-4">
                                <FormItem
                                    className="form-header"
                                    asterisk
                                    label="Contact Person Name"
                                    invalid={
                                        errors.sender_contact_person_name &&
                                        touched.sender_contact_person_name
                                    }
                                    errorMessage={
                                        errors.sender_contact_person_name
                                    }
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        name="sender_contact_person_name"
                                        placeholder="Contact Person Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    className="form-header"
                                    asterisk
                                    label="Contact Person Number"
                                    invalid={
                                        errors.sender_contact_person_contact_no &&
                                        touched.sender_contact_person_contact_no
                                    }
                                    errorMessage={
                                        errors.sender_contact_person_contact_no
                                    }
                                >
                                    <Field
                                        type="number"
                                        className="input-box"
                                        autoComplete="off"
                                        name="sender_contact_person_contact_no"
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
                                        className="input-box"
                                        autoComplete="off"
                                        name="sender_contact_person_email"
                                        placeholder="Contact Person Email"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div className="flex mt-44 justify-end gap-2">
                                {/* <Button
                                    className="next-btn"
                                    type="button"
                                    onClick={onBack}
                                >
                                    Back
                                </Button> */}
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
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SourceWarehouse
