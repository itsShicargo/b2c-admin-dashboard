import React from 'react';
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
    Notification,
    toast, // Assuming Notification is imported from components/ui
} from 'components/ui';
import { PasswordInput, ActionLink } from 'components/shared';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from 'utils/hooks/useAuth';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your username'),
    password: Yup.string().required('Please enter your password'),
    rememberMe: Yup.bool(),
});

const SignInForm = (props) => {
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props;

    const { signIn } = useAuth();
    const [message, setMessage] = React.useState('');

    const onSignIn = async (values, setSubmitting) => {
        const { username, password } = values;
        setSubmitting(true);

        try {
            const result = await signIn({ username, password });
            console.log('Sign in result:', result);

            if (result && result.status === 'failed') {
                if (result.error === 'invalid_username' || result.error === 'invalid_password') {
                    setMessage('These credentials do not match our records.');
                } else {
                    setMessage(result.message || 'Sign in failed.');
                }
            } else if (result && result.status === 'success') {
              
                if (typeof toast === 'function') {
                    toast.push(
                        <Notification closable type="success" duration={2000}>
                            Login Successful
                        </Notification>
                    );
                }
            } else {
                console.error('Unexpected result structure:', result);
                setMessage('An unexpected error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Sign in error:', error);
            setMessage('An error occurred during sign in. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={className}>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    rememberMe: true,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting);
                    } else {
                        setSubmitting(false);
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="User Name"
                                invalid={errors.username && touched.username}
                                errorMessage={touched.username && errors.username}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="username"
                                    placeholder="Enter your User Name"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="Password"
                                invalid={errors.password && touched.password}
                                errorMessage={touched.password && errors.password}
                            >
                                <Field
                                    autoComplete="off"
                                    name="password"
                                    placeholder="Enter Password"
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <div className="flex justify-between mb-6">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                    children="Remember Me"
                                />
                                <ActionLink to={forgotPasswordUrl}>
                                    Forgot Password?
                                </ActionLink>
                            </div>
                            
                            <Button
                                block
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting ? 'Signing in...' : 'Sign In'}
                            </Button>
                            <div className="mt-4 text-center">
                                <span>Don't have an account yet? </span>
                                <ActionLink to={signUpUrl}>Sign up</ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignInForm;
