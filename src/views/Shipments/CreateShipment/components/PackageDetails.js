import React from 'react';
import { Input, Select, FormItem, FormContainer } from 'components/ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const dimension = [
    { value: 'cm', label: 'cm' },
    { value: 'Inch', label: 'Inch' },
];

const validationSchema = Yup.object().shape({
    personName: Yup.string().required('Contact Person Name'),
    PersonNumber: Yup.string().required('Contact Person Number'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    nationality: Yup.string().required('Please select your werehouse'),
    noofbox: Yup.string().required('No of box'),
    weight: Yup.string().required('weight per unit (in kg.'),
    dimensions: Yup.string().required('Dimensions'),
    length: Yup.string().required('Length *'),
    width: Yup.string().required('width'),
    height: Yup.string().required('height'),
    invoicedate: Yup.string().required('Invoice Date '),
    invoicevalue: Yup.string().required('Invoice value '),
    invoiceNumber: Yup.string().required('Invoice Number'),
    mode: Yup.string().required('Mode'),
    orderreadydate: Yup.string().required('Order Ready Date'),
});

const PackageDetails = ({ data = { /* Initial form data */ }, onNextChange }) => {

    const onNext = (values, setSubmitting) => {
        const payload = createPayload(values);

        submitFormData(payload)
            .then((response) => {
                onNextChange?.(values, 'PackageDetails', response, setSubmitting);
            })
            .catch((error) => {
                console.error('Form submission error:', error);
                setSubmitting(false);
            });
    };

    const createPayload = (values) => {
        return {
            noofbox: values.noofbox,
            weight: values.weight,
            dimensions: values.dimensions,
            length: values.length,
            width: values.width,
            height: values.height,
            invoicedate: values.invoicedate,
            invoicevalue: values.invoicevalue,
            invoiceNumber: values.invoiceNumber,
            mode: values.mode,
            orderreadydate: values.orderreadydate,
        };
    };

    const submitFormData = (payload) => {
        const url = 'https://api.shipcluescargo.com/shipcargo/shipments/create/';
        const formData = new FormData();

        // Append each field in the payload to FormData
        Object.keys(payload).forEach((key) => {
            formData.append(key, payload[key]);
        });

        // Use axios to post form data
        return axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <>
            <div className="mb-8"></div>
            <Formik
                initialValues={data}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('Form Values:', values); // Log form values for debugging
                    setSubmitting(true);
                    onNext(values, setSubmitting);
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="md:grid grid-cols-6 gap-3  pl-4 ">
                                <FormItem
                                    label="No of box"
                                    invalid={errors.noofbox && touched.noofbox}
                                    errorMessage={errors.noofbox}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        className="input-box"
                                        name="noofbox"
                                        placeholder="No of box"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Weight*"
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
                                    label="Dimensions In *"
                                    invalid={errors.dimensions && touched.dimensions}
                                    errorMessage={errors.dimensions}
                                >
                                    <Select
                                        placeholder="CM"
                                        options={dimension}
                                        name="dimensions"
                                    ></Select>
                                </FormItem>
                                <FormItem
                                    label="Length *"
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
                                    label="Width *"
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
                                    label="Height *"
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
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default PackageDetails;
