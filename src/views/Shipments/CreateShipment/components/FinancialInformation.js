import React from "react";
import {
  Input,
  Button,
  Checkbox,
  Select,
  FormItem,
  FormContainer,
} from "components/ui";
import { Field, Form, Formik, getIn } from "formik";
import NumberFormat from "react-number-format";
import {
  occupationOptions,
  annualIncomeOptions,
  sourceOfWealthOptions,
  noTinReasonOption,
} from "../constants";
import { countryList } from "constants/countries.constant";
import * as Yup from "yup";

const excludedOccupation = ["unemployed", "student", "retired"];

const validationSchema = Yup.object().shape({
  taxResident: Yup.string().required(
    "Please select your country of tax resident"
  ),
  tin: Yup.string().when("noTin", {
    is: false,
    then: Yup.string().required(
      "Please enter your Taxpayer Identification number (TIN)"
    ),
    otherwise: (schema) => schema,
  }),
  noTinReason: Yup.string().when("noTin", {
    is: true,
    then: Yup.string().required("Please indicate your reason"),
    otherwise: (schema) => schema,
  }),
  noTin: Yup.bool(),
  occupation: Yup.string().required("Please choose your occupation"),
  annualIncome: Yup.string().required(
    "Please tell us your annual income range"
  ),
  sourceOfWealth: Yup.string().required(
    "Please tell us the source of funds use in this account"
  ),
  companyInformation: Yup.object().when("occupation", {
    is: (value) => value && !excludedOccupation.includes(value),
    then: Yup.object().shape({
      companyName: Yup.string().required("Please enter your company name"),
      contactNumber: Yup.string().required(
        "Please enter your company contact number"
      ),
      country: Yup.string().required("Please select country"),
      addressLine1: Yup.string().required("Please enter your address"),
      addressLine2: Yup.string(),
      city: Yup.string().required("Please enter your city"),
      state: Yup.string().required("Please enter your state"),
      zipCode: Yup.string().required("Please enter zip code"),
    }),
    otherwise: (schema) => schema,
  }),
});

const NumberInput = (props) => {
  return <Input {...props} value={props.field.value} />;
};

const NumberFormatInput = ({ onValueChange, ...rest }) => {
  return (
    <NumberFormat
      customInput={Input}
      type="text"
      onValueChange={onValueChange}
      autoComplete="off"
      {...rest}
    />
  );
};

const FinancialInformation = ({
  data = {
    taxResident: "",
    tin: "",
    noTin: false,
    noTinReason: "",
    occupation: "",
    annualIncome: "",
    sourceOfWealth: "",
    companyInformation: {
      companyName: "",
      contactNumber: "",
      country: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  onNextChange,
  onBackChange,
  currentStepStatus,
}) => {
  const onNext = (values, setSubmitting) => {
    onNextChange?.(values, "financialInformation", setSubmitting);
  };

  const onBack = () => {
    onBackChange?.();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Log the final submitted form values
    console.log("Final Submit Values:", values);

    // Continue with form submission logic (if needed)
    setTimeout(() => {
      onNext(values, setSubmitting);
    }, 1000);
  };

  return (
    <Formik
      initialValues={data}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, touched, errors, isSubmitting }) => (
        <Form>
          <FormContainer>
            <h1>Rate chart</h1>
            <div className="flex justify-end gap-2">
              <Button type="button" onClick={onBack}>
                Back
              </Button>
              <Button loading={isSubmitting} variant="solid" type="submit">
                {currentStepStatus === "complete" ? "Save" : "Next"}
              </Button>
            </div>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default FinancialInformation;
