import React from 'react';
import NewWarehouse from './components/NewWarehouse';
import axios from 'axios'; 

function AddWarehouse() {
    // Function to create payload from form values
    const createPayload = (values) => {
        return {
            phone: values.PersonNumber,
            name: values.warehousename,
            email: values.email,
            address: `${values.addressline1} ${values.addressline2}`,
            city: values.city,
            pincode: values.pincode,
            state: values.state,
            country: values.country,
            return_status: 'some_value', 
            seller: '2', 

        };
    };

    // Function to make API request
    const onAddWarehouse = async (body) => {
        try {
            const response = await axios.post(
                'https://api.shipcluescargo.com/warehouse/create_warehouse/',
                body
            );
            return response.data; // Return API response data if needed
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Failed to add warehouse. Please try again.'); // Throw error for UI handling
        }
    };

    // Form submission handler
    const onSubmitForm = async (values, { setSubmitting }) => {
        try {
            setSubmitting(true); // Set submitting state to true

            // Create payload from form values
            const payload = createPayload(values);
            console.log('Submitting payload:', payload);

            // Call API function with payload
            const responseData = await onAddWarehouse(payload);
            console.log('Warehouse added successfully:', responseData);

            // Handle success (if needed)
            // Example: Redirect to success page or show success message

        } catch (error) {
            console.error('Submit Error:', error);
            // Handle error (e.g., show error message using toast or Notification component)
        } finally {
            setSubmitting(false); // Set submitting state to false regardless of success or failure
        }
    };

    return (
        <div>
            <NewWarehouse onSubmit={onSubmitForm} /> {/* Pass onSubmit function to NewWarehouse component */}
        </div>
    );
}

export default AddWarehouse;
