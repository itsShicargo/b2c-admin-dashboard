import React from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import Select from 'react-select'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const monthly_order = [
    { value: '1 - 10 orders', label: '1 - 10 orders' },
    { value: '11 - 100 orders', label: '11 - 100 orders' },
    { value: '101 - 1000 orders', label: '101 - 1000 orders' },
    { value: '1001 - 500 orders', label: '1001 - 500 orders' },
    { value: 'More than 5000 orders', label: 'More than 5000 orders' },
]

// validation error message here ...
const validationSchema = Yup.object().shape({
    first_name: Yup.string().min(2).max(25).required('Please enter firstname'),
    last_name: Yup.string().min(2).max(25).required('Please enter  lastname'),
    company_name: Yup.string()
        .min(2)
        .max(25)
        .required('Please enter company name'),
    brand_name: Yup.string()
        .min(2)
        .max(25)
        .required('Please enter  brand name'),
    // monthlyOrder: Yup.string().required('Please enter monthly order'),
    email: Yup.string().email().required('Please enter  email'),
    password: Yup.string().min(6).required('Please enter  password'),
    mob_no: Yup.string().min(10).required('Please enter  phone number'),
})

const SignUpForm = (props) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    // const [monthlyorderdata, setMonthlyorderdata] = useState(options[0].value)

    const { signUp } = useAuth()

    const [message, setMessage] = useTimeOutMessage()

    const navigate = useNavigate()

    const onSignUp = async (values, setSubmitting ,navigate) => {
        try {
            //  const LOGIN_API_URL = 'https://example.com/api/sellers/sellerlogin/';

            const LOGIN_API_URL = 'http://3.6.40.157/api/sellers/sellercreate/'

            const payload = {
                first_name: values.first_name,
                last_name: values.last_name,
                company_name: values.company_name,
                brand_name: values.brand_name,
                monthly_order: values.monthly_order,
                email: values.email,
                password: values.password,
                mob_no: values.mob_no,
                // Add other fields as needed
            }

            const resp = await axios.post(LOGIN_API_URL, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            

            if (resp.data) {
              console.log('Login successful:', resp.data);
              setMessage('');
              navigate('/sign-in'); // Navigate to the sign-in page
          }
        } catch (error) {
            // Handle login failure
            setMessage(error.response.data.message || error.toString())
        }
        setSubmitting(false)
    }

    // const onSignUp = async (values, setSubmitting) => {
    //     const {
    //         firstName,
    //         lastName,
    //         company_name,
    //         brandName,
    //         monthlyOrder,
    //         password,
    //         email,
    //         phone,
    //     } = values

    //     console.log('vallll', values)
    //     setSubmitting(true)
    //     const result = await signUp({
    //         firstName,
    //         lastName,
    //         company_name,
    //         brandName,
    //         monthlyOrder,
    //         password,
    //         email,
    //         phone,
    //     })

    //     if (result.status === 'failed') {
    //         setMessage(result.message)
    //     }

    //     setSubmitting(false)
    // }

    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    company_name: '',
                    brand_name: '',
                    monthlyOrder: '',
                    email: '',
                    password: '',
                    mob_no: '', // Define 'phone' here
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ values, touched, errors, isSubmitting,navigate }) => (
                    <Form>
                        <FormContainer>
                            <div className="flex gap-5 flex-col md:flex-row">
                                <FormItem
                                    label="First Name"
                                    invalid={
                                        errors.first_name && touched.first_name
                                    }
                                    errorMessage={errors.first_name}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="first_name"
                                        placeholder="First Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Last Name"
                                    invalid={
                                        errors.last_name && touched.last_name
                                    }
                                    errorMessage={errors.last_name}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="last_name"
                                        placeholder="last Name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>

                            {/*Comapnay_Name  */}
                            <div className="flex gap-5 flex-col md:flex-row">
                                <FormItem
                                    label="Company Name"
                                    invalid={
                                        errors.company_name &&
                                        touched.company_name
                                    }
                                    errorMessage={errors.company_name}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="company_name"
                                        placeholder="Enter company name "
                                        component={Input}
                                    />
                                </FormItem>
                                {/* Brand_Name */}

                                <FormItem
                                    label="Brand Name"
                                    invalid={
                                        errors.brand_name && touched.brand_name
                                    }
                                    errorMessage={errors.brand_name}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="brand_name"
                                        placeholder="Enter brand name "
                                        component={Input}
                                    />
                                </FormItem>
                            </div>

                            {/* Monthly_Order */}

                            <FormItem
                                label="Monthly Order"
                                invalid={
                                    errors.monthly_order && touched.monthly_order
                                }
                                errorMessage={errors.monthly_order}
                            >
                                <Select
                                    name="monthlyOrder"
                                    placeholder="Please Select"
                                    options={monthly_order}
                                ></Select>
                            </FormItem>

                            {/* email */}

                            <FormItem
                                label="Email"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                />
                            </FormItem>
                            {/* Password */}
                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            {/* Phone number */}
                            <FormItem
                                label="Phone"
                                invalid={errors.mob_no && touched.mob_no}
                                errorMessage={errors.mob_no}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="mob_no"
                                    placeholder="123 - 456 - 789 "
                                    component={Input}
                                />
                            </FormItem>

                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? 'Creating Account...'
                                    : 'Sign Up'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Already have an account? </span>
                                <ActionLink to={signInUrl}>Sign in</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUpForm
