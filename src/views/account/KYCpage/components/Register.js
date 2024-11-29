import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from 'components/ui'; // Replace with your actual component import

const Register = () => {
  const [companyType, setCompanyType] = useState('Proprietorship/Individual');
  const [panCardNumber, setPanCardNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [panCardFile, setPanCardFile] = useState(null);
  const [aadharCardFile, setAadharCardFile] = useState(null);
  const [panCardError, setPanCardError] = useState('');
  const [aadharError, setAadharError] = useState('');
  const [gstCertificateFile, setGstCertificateFile] = useState(null);
  const [gstCertificateError, setGstCertificateError] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [gstNumberError, setGstNumberError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission

  const handleCompanyTypeChange = (e) => {
    setCompanyType(e.target.value);
    resetFields();
  };

  const resetFields = () => {
    setPanCardNumber('');
    setAadharNumber('');
    setPanCardFile(null);
    setAadharCardFile(null);
    setPanCardError('');
    setAadharError('');
    setGstCertificateFile(null);
    setGstCertificateError('');
    setGstNumber('');
    setGstNumberError('');
  };

  const handlePanCardChange = (e) => {
    const file = e.target.files[0];
    setPanCardFile(file);
  };

  const handleAadharCardChange = (e) => {
    const file = e.target.files[0];
    setAadharCardFile(file);
  };

  const handleGstCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setGstCertificateFile(file);
      setGstCertificateError('');
    } else {
      setGstCertificateFile(null);
      setGstCertificateError('Please upload a valid PDF file for GST certificate.');
    }
  };

  const validatePanCard = (panNumber) => {
    // Regex pattern for Indian PAN Card number
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(panNumber);
  };

  const validateAadharNumber = (aadharNumber) => {
    // Regex pattern for Indian Aadhar Card number
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadharNumber);
  };

  const validateGSTNumber = (gstNumber) => {
    // Regex pattern for GST number (GSTIN)
    const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/;
    return gstRegex.test(gstNumber);
  };

  const handlePanCardNumberChange = (e) => {
    const panNumber = e.target.value.trim().toUpperCase();
    setPanCardNumber(panNumber);
    if (!validatePanCard(panNumber)) {
      setPanCardError('Please enter a valid PAN Card number.');
    } else {
      setPanCardError('');
    }
  };

  const handleAadharNumberChange = (e) => {
    let aadharNumber = e.target.value.trim().replace(/ /g, ''); // Remove any existing spaces
    if (aadharNumber.length > 12) {
      aadharNumber = aadharNumber.slice(0, 12);
    }
    setAadharNumber(aadharNumber);
    if (!validateAadharNumber(aadharNumber)) {
      setAadharError('Please enter a valid Aadhar number.');
    } else {
      setAadharError('');
    }

    // Format Aadhar number with spaces after every 4 digits
    const formattedAadharNumber = aadharNumber.replace(/(.{4})/g, '$1 ').trim();
    setAadharNumber(formattedAadharNumber);
  };

  const handleGstNumberChange = (e) => {
    const gstNumber = e.target.value.trim().toUpperCase();
    setGstNumber(gstNumber);
    if (!validateGSTNumber(gstNumber)) {
      setGstNumberError('Please enter a valid GST number.');
    } else {
      setGstNumberError('');
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare JSON object
      const formDataJson = {
        companyType,
        panCardNumber,
        aadharNumber,
        gstNumber
      };

      // POST request using Axios
      const response = await axios.post('https://api.shipcluescargo.com/shipcargo/sellers/sellerkyc/', formDataJson);

      console.log('Response:', response.data);
      setIsSubmitted(true);
      resetFields();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally handle error state here
    }
  };

  return (
    <>
      <div className="mt-1">
        <div className="space-y-2">
          <div className="md:grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="panCard" className="block text-sm font-medium text-gray-700">
                PAN Card:
              </label>
              <Input
                type="text"
                id="panCardNumber"
                name="panCardNumber"
                value={panCardNumber}
                onChange={handlePanCardNumberChange}
                placeholder="Enter PAN Card Number"
                className={`mt-3 mb-2 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                  panCardError ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
                }`}
                style={{ borderColor: panCardError ? '#e53e3e' : '#d2d6dc' }}
              />
              {panCardNumber && !panCardError && (
                <p className="text-green-500 text-sm mt-1">PAN Card number verified ✔️</p>
              )}
            </div>
            <div>
              <label htmlFor="panCardFile" className="block text-sm font-medium text-gray-700">
                Upload PAN Card:
              </label>
              <Input
                type="file"
                id="panCardFile"
                name="panCardFile"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handlePanCardChange}
                className="mt-3 mb-2 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {panCardError && (
                <p className="text-red-500 text-sm mt-1">{panCardError}</p>
              )}
            </div>
          </div>

          <div className="md:grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="aadharCard" className="block text-sm font-medium text-gray-700">
                Aadhar Card:
              </label>
              <Input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={aadharNumber}
                onChange={handleAadharNumberChange}
                placeholder="Enter Aadhar Number"
                className={`mt-3 mb-2 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                  aadharError ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
                }`}
                style={{ borderColor: aadharError ? '#e53e3e' : '#d2d6dc' }}
              />
              {aadharNumber && !aadharError && (
                <p className="text-green-500 text-sm mt-1">Aadhar number verified ✔️</p>
              )}
            </div>
            <div>
              <label htmlFor="aadharCardFile" className="block text-sm font-medium text-gray-700">
                Upload Aadhar Card:
              </label>
              <Input
                type="file"
                id="aadharCardFile"
                name="aadharCardFile"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleAadharCardChange}
                className="mt-3 mb-2 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {aadharError && (
                <p className="text-red-500 text-sm mt-1">{aadharError}</p>
              )}
            </div>
          </div>

          <div className="md:grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700">
                GST Number:
              </label>
              <Input
                type="text"
                id="gstNumber"
                name="gstNumber"
                value={gstNumber}
                onChange={handleGstNumberChange}
                placeholder="Enter GST Number"
                className={`mt-3 mb-3 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm ${
                  gstNumberError ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
                }`}
                style={{ borderColor: gstNumberError ? '#e53e3e' : '#d2d6dc' }}
              />
              {gstNumber && !gstNumberError && (
                <p className="text-green-500 text-sm mt-1">GST number verified ✔️</p>
              )}
              {gstNumberError && (
                <p className="text-red-500 text-sm mt-1">{gstNumberError}</p>
              )}
            </div>
            <div>
              <label htmlFor="gstCertificate" className="block text-sm font-medium text-gray-700">
                GST Certificate (PDF only):
              </label>
              <Input
                type="file"
                id="gstCertificate"
                name="gstCertificate"
                accept=".pdf"
                onChange={handleGstCertificateChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {gstCertificateError && (
                <p className="text-red-500 text-sm mt-1">{gstCertificateError}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center items-center">
        <Button onClick={handleSubmit} variant="solid" className="py-2 px-4 rounded">
          Submit
        </Button>
      </div>

      {isSubmitted && (
        <div className="mt-4 text-green-600 text-center font-semibold">
          Successfully Registered!
        </div>
      )}
    </>
  );
};

export default Register;
