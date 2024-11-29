import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAccountFormData } from 'services/AccountServices'

export const getForm = createAsyncThunk(
    'accountDetailForm/data/getForm',
    async (data) => {
        const response = await apiGetAccountFormData(data)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'accountDetailForm/data',
    initialState: {
        formData: {
            SourceWarehouse: {
                from_warehouse: '',
                sender_contact_person_name: '',
                sender_contact_person_contact_no: '',
                sender_contact_person_email: '',
            },
            DestinationWarehouse: {
                to_warehouse: '',
                receiver_contact_person_name: '',
                receiver_contact_person_contact_no: '',
                receiver_contact_person_email: '',
            },

            addressInformation: {
                no_of_units: '',
                weight: '',
                unit: '',
                length: '',
                width: '',
                height: '',
                invoice_date: '',
                invoice_value: '',
                invoice_number: '',
                mode: '',
                order_ready_date: '',
                photo1: null,
            },
            financialInformation: {
                taxResident: '',
                tin: '',
                noTin: false,
                noTinReason: '',
                occupation: '',
                annualIncome: '',
                sourceOfWealth: '',
                companyInformation: {
                    companyName: '',
                    contactNumber: '',
                    country: '',
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    state: '',
                },
            },
        },
        stepStatus: {
            0: { status: 'pending' },
            1: { status: 'pending' },
            2: { status: 'pending' },
            3: { status: 'pending' },
            4: { status: 'pending' },
        },
    },
    reducers: {
        setFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload }
        },
        setStepStatus: (state, action) => {
            state.stepStatus = { ...state.stepStatus, ...action.payload }
        },
    },
    extraReducers: {
        [getForm.fulfilled]: (state, action) => {
            state.formData = action.payload.formData
            state.stepStatus = action.payload.formStatus
        },
    },
})

export const { setFormData, setStepStatus } = dataSlice.actions

export default dataSlice.reducer
