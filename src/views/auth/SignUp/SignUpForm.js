import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useAuth from 'utils/hooks/useAuth'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
// import { REDIRECT_URL_KEY } from 'constants/app.constant';

const monthly_order = [
    { value: '1 - 50Tonne', label: '1 - 50Tonne' },
    { value: '50 - 150Tonne', label: '50 - 150Tonne' },
    { value: '150 - 300Tonne', label: '150 - 300Tonne' },
    { value: '300Tonne - Above', label: '300Tonne - Above' },
]

const validationSchema = Yup.object().shape({
    first_name: Yup.string().min(2).max(25).required('Please enter firstname'),
    last_name: Yup.string().min(2).max(25).required('Please enter lastname'),
    username: Yup.string().min(2).max(25).required('Please enter company name'),
    // brand_name: Yup.string().min(2).max(25).required('Please enter brand name'),
    // monthlyOrder: Yup.string().required('Please select monthly order'),
    email: Yup.string().email().required('Please enter email'),
    password: Yup.string().min(6).required('Please enter password'),
    password2: Yup.string().min(6).required('Please enter confirm password'),
    // mob_no: Yup.string().min(10).required('Please enter phone number'),
})

const SignUpForm = (props) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const { signUp } = useAuth()
    const [message, setMessage] = useTimeOutMessage()
    const navigate = useNavigate()

    const onSignUp = async (values, setSubmitting, setFieldValue) => {
        try {
            setSubmitting(true)
            const body = {
                first_name: values.first_name,
                last_name: values.last_name,
                username: values.username,
                email: values.email,
                password: values.password,
                password2: values.password2,
            }

            const data = await signUp(body)
            console.log('Sign up response:', data)

            if (data.status === 'success') {
                openNotification('success')
                navigate(signInUrl)
            } else {
                setMessage(data.message)
            }
        } catch (error) {
            console.error('Sign up error:', error)
            setMessage('An error occurred during sign up.')
        } finally {
            setSubmitting(false)
        }
    }

    const openNotification = (type) => {}

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
                    username: '',
                    email: '',
                    password: '',
                    password2: '',
                    // mob_no : '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, setFieldValue }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting, setFieldValue)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => (
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
                                        placeholder="Last Name"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>

                            <div className="">
                                <FormItem
                                    label="User Name"
                                    invalid={
                                        errors.username && touched.username
                                    }
                                    errorMessage={errors.username}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="username"
                                        placeholder="Enter username"
                                        component={Input}
                                    />
                                </FormItem>
                                {/* <FormItem
                                    label="Brand Name"
                                    invalid={errors.brand_name && touched.brand_name}
                                    errorMessage={errors.brand_name}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="brand_name"
                                        placeholder="Enter brand name"
                                        component={Input}
                                    />
                                </FormItem> */}
                            </div>

                            {/* <FormItem
                                label="Monthly Order"
                                invalid={errors.monthlyOrder && touched.monthlyOrder}
                                errorMessage={errors.monthlyOrder}
                            >
                                <Select
                                    name="monthlyOrder"
                                    placeholder="Please Select"
                                    options={monthly_order}
                                    value={monthly_order.find(option => option.value === values.monthlyOrder)}
                                    onChange={option => setFieldValue('monthlyOrder', option.value)} // Use setFieldValue to update form field value
                                />
                            </FormItem> */}

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

                            {/* password2 */}

                            <FormItem
                                label="Confirm Password"
                                invalid={errors.password2 && touched.password2}
                                errorMessage={errors.password2}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password2"
                                    placeholder="confirm password"
                                    component={PasswordInput}
                                />
                            </FormItem>

                            {/* <FormItem
                                label="Phone"
                                invalid={errors.mob_no && touched.mob_no}
                                errorMessage={errors.mob_no}
                            >
                                <Field
                                    type="number"
                                    autoComplete="off"
                                    name="mob_no"
                                    placeholder="123 - 456 - 789"
                                    component={Input}
                                />
                            </FormItem> */}

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
