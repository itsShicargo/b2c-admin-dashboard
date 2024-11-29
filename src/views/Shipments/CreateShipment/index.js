import React, { useEffect, useMemo, lazy, Suspense, useState } from 'react';
import { Container, AdaptableCard } from 'components/shared';
import FormStep from './components/FormStep';
import { useDispatch, useSelector } from 'react-redux';
import { getForm, setStepStatus, setFormData } from './store/dataSlice';
import { setCurrentStep } from './store/stateSlice';
import reducer from './store';
import { injectReducer } from 'store/index';

injectReducer('accountDetailForm', reducer);

const SourceWarehouse = lazy(() => import('./components/SourceWarehouse'));
const DestinationWarehouse = lazy(() =>
    import('./components/DestinationWarehouse')
);
const AddressInfomation = lazy(() => import('./components/AddressInfomation'));
const AccountReview = lazy(() => import('./components/AccountReview'));

const CreateShipment = () => {
    const dispatch = useDispatch();
    const [finalFormData , setFinalFormData ] = useState({
      


        // step 1
        sender_contact_person_name : "",
        sender_contact_person_contact_no:"",
        sender_contact_person_email:"",
        from_warehouse:"",

        // step 2
        to_warehouse: "",
        receiver_contact_person_name: "",
        receiver_contact_person_contact_no: "",
        receiver_contact_person_email: "",

        // step 3
         datathird : [],
       
        invoice_date: "", 
        invoice_value: "",
        invoice_number: "",
        client_order_id:"",
        mode: "",
        order_ready_date: "", 
        photo1:  "",


    })
    const stepStatus = useSelector(
        (state) => state.accountDetailForm.data.stepStatus
    );
    const currentStep = useSelector(
        (state) => state.accountDetailForm.state.currentStep
    );
    const formData = useSelector(
        (state) => state.accountDetailForm.data.formData
    );

    const [showError, setShowError] = useState(false);

    useEffect(() => {
        console.log('error', showError);
    }, [showError]);

    useEffect(() => {
        dispatch(getForm());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNextChange = (values, name) => {
        const nextStep = currentStep + 1;
        console.log('nextStep', nextStep, values, name);

        // Update formData with values from SourceWarehouse or DestinationWarehouse
        let updatedFormData = {
            ...formData,
            [name]: values, // Assuming 'name' is SourceWarehouse or DestinationWarehouse
        };

        dispatch(setFormData(updatedFormData));
        dispatch(
            setStepStatus({
                [currentStep]: { status: 'complete' },
                [nextStep]: { status: 'current' },
            })
        );
        dispatch(setCurrentStep(nextStep));
    };

    const handleBackChange = () => {
        const previousStep = currentStep - 1;
        dispatch(setCurrentStep(previousStep));
    };

    const currentStepStatus = useMemo(() => {
        if (stepStatus) {
            return stepStatus[currentStep]?.status; // Added safe navigation operator to avoid errors
        }
    }, [stepStatus, currentStep]);


    useEffect(() => {
console.log("myform:::::" , formData)

    },[formData])

    return (
        <Container className="h-full">
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full">
                    <div
                        className={
                            currentStep !== 3
                                ? 'pl-4 2xl:col-span-4 lg:col-span-3 xl:col-span-2'
                                : 'lg:col-span-5'
                        }
                    >
                        <Suspense fallback={<></>}>
                            {currentStep === 0 && (
                                <SourceWarehouse
                                    data={formData.SourceWarehouse}
                                    onNextChange={handleNextChange}
                                    currentStepStatus={currentStepStatus}
                                    showError={showError}
                                    setFinalFormData = {setFinalFormData}
                                    finalFormData ={finalFormData}
                                />
                            )}
                            {currentStep === 1 && (
                                <DestinationWarehouse
                                    data={formData.DestinationWarehouse}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                    showError={showError}
                                    setFinalFormData = {setFinalFormData}
                                    finalFormData ={finalFormData}
                                />
                            )}
                            {currentStep === 2 && (
                                <AddressInfomation
                                    data={formData} // Pass complete formData
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                    currentStepStatus={currentStepStatus}
                                    showError={showError}
                                    finalFormData = {finalFormData}
                                />
                            )}
                            {currentStep === 3 && <AccountReview />}
                        </Suspense>
                    </div>
                    {currentStep !== 3 && (
                        <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-2">
                            <FormStep
                                currentStep={currentStep}
                                currentStepStatus={currentStepStatus}
                                stepStatus={stepStatus}
                                setShowError={setShowError}
                            />
                        </div>
                    )}
                </div>
            </AdaptableCard>
        </Container>
    );
};

export default CreateShipment;
