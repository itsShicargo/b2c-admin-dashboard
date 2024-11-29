
import React from 'react';
import {
    Input,
    Button,
    Select,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import warehouseData from './warehouseData.json';

const to_warehouse = [
    { value: '121001', label: '121001' },
    { value: '121002', label: '121002' },
    { value: '121003', label: '121003' },
    { value: '121004', label: '121004' },
    { value: '121005', label: '121005' }
];

const validationSchema = Yup.object().shape({
    receiver_contact_person_name: Yup.string().required('Contact Person Name is required'),
    receiver_contact_person_contact_no: Yup.string().length(10, 'Contact Person Number must be 10 digits').required('Contact Person Number is required'),
    receiver_contact_person_email: Yup.string().email('Invalid email format'),
    to_warehouse_pincode: Yup.string().required('Please select the pincode zone'),
});

const DestinationWarehouse
 = ({
    data = {
        to_warehouse: '',
        receiver_contact_person_name: '',
        receiver_contact_person_contact_no: '',
        receiver_contact_person_email: '',
    },
    onNextChange,
    onBackChange,
    currentStepStatus,
    showError,
}) => {
    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'DestinationWarehouse', setSubmitting);
    };

    const onBack = () => {
        onBackChange?.();
    };

    const onSubmit = (values, { setSubmitting }) => {
        const payload = createPayload(values);
        console.log('Payload:', payload);
        setSubmitting(true);
        setTimeout(() => {
            onNext(values, setSubmitting);
        }, 1000);
        
    };

    const createPayload = (values) => {
        const payload = {
            to_warehouse: values.to_warehouse,
            receiver_contact_person_name: values.receiver_contact_person_name,
            receiver_contact_person_contact_no: values.receiver_contact_person_contact_no,
            receiver_contact_person_email: values.receiver_contact_person_email,
        };
        return payload;
    };

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
                    Destination Warehouse
                </h3>
            </div>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Select Warehouse"
                                invalid={errors.to_warehouse && touched.to_warehouse}
                                errorMessage={errors.to_warehouse}
                            >
                                <Select
                                    placeholder="Search Warehouse by pincode"
                                    options={to_warehouse}
                                    name="to_warehouse"
                                    onChange={option => {
                                        setFieldValue('to_warehouse', option.value);
                                        // Set values based on selected to_warehouse from warehouseData
                                        const selectedWarehouseInfo = warehouseData[option.value];
                                        if (selectedWarehouseInfo) {
                                            setFieldValue('receiver_contact_person_name', selectedWarehouseInfo.receiver_contact_person_name);
                                            setFieldValue('receiver_contact_person_contact_no', selectedWarehouseInfo.receiver_contact_person_contact_no);
                                            setFieldValue('receiver_contact_person_email', selectedWarehouseInfo.receiver_contact_person_email);
                                        } else {
                                            setFieldValue('receiver_contact_person_name', '');
                                            setFieldValue('receiver_contact_person_contact_no', '');
                                            setFieldValue('receiver_contact_person_email', '');
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
                                        errors.receiver_contact_person_name &&
                                        touched.receiver_contact_person_name
                                    }
                                    errorMessage={errors.receiver_contact_person_name}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        value={values.receiver_contact_person_name}
                                        name="receiver_contact_person_name"
                                        placeholder="Contact Person Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    className="form-header"
                                    asterisk
                                    label="Contact Person Number"
                                    invalid={errors.receiver_contact_person_contact_no && touched.receiver_contact_person_contact_no}
                                    errorMessage={errors.receiver_contact_person_contact_no}
                                >
                                    <Field
                                        type="number"
                                        className="input-box"
                                        autoComplete="off"
                                        value={values.receiver_contact_person_contact_no}
                                        name="receiver_contact_person_contact_no"
                                        placeholder="Contact Person Number"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    className="form-header"
                                    label="Contact Person email"
                                >
                                    <Field
                                        type="text"
                                        className="input-box"
                                        autoComplete="off"
                                        value={values.receiver_contact_person_email}
                                        name="receiver_contact_person_email"
                                        placeholder="Contact Person email"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <div className="flex mt-44 justify-end gap-2">
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
                                    {currentStepStatus === 'complete' ? 'Save' : 'Next'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default DestinationWarehouse;

