import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from 'components/ui'; // Assuming you have a Button component

const Unregister = () => {
  const [companyType, setCompanyType] = useState('Proprietorship/Individual');
  const [panCardNumber, setPanCardNumber] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [panCardFile, setPanCardFile] = useState(null);
  const [aadharCardFile, setAadharCardFile] = useState(null);
  const [panCardError, setPanCardError] = useState('');
  const [aadharError, setAadharError] = useState('');
  const [gstCertificateFile, setGstCertificateFile] = useState(null);
  const [gstCertificateError, setGstCertificateError] = useState('');
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

  const handleSubmit = async () => {
    try {
      // Prepare JSON object
      const formDataJson = {
        companyType,
        panCardNumber,
        aadharNumber,
        
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

  const downloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
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
                onChange={(e) => setPanCardNumber(e.target.value)}
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
                onChange={(e) => setAadharNumber(e.target.value)}
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
        <div className="mt-4 text-green-600 font-semibold">
          Successfully Unregistered!
        </div>
      )}
    </>
  );
};

export default Unregister;
