import React from 'react';
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui';
import { PasswordInput } from 'components/shared';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from 'utils/hooks/useAuth';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your username'),
    password: Yup.string().required('Please enter your password'),
});

const SignInForm = () => {
    const { signIn } = useAuth();
    const [message, setMessage] = React.useState('');

    const onSignIn = async (values, setSubmitting) => {
        const { username, password } = values;
        setSubmitting(true);

        try {
            const result = await signIn({ username, password });
            if (result?.status === 'failed') {
                setMessage('These credentials do not match our records.');
            } else if (result?.status === 'success') {
                setMessage('');
               
            }
        } catch (error) {
            console.error('Sign-in error:', error);
            setMessage('An unexpected error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => onSignIn(values, setSubmitting)}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Email ID"
                                invalid={errors.username && touched.username}
                                errorMessage={touched.username && errors.username}
                            >
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Enter your Email ID"
                                    component={Input}
                                    className="w-full"
                                />
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={touched.password && errors.password}
                            >
                                <Field
                                    name="password"
                                    placeholder="Enter your Password"
                                    component={PasswordInput}
                                    className="w-full"
                                />
                            </FormItem>
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                            >
                                {isSubmitting ? 'Signing in...' : 'Login'}
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignInForm;
