import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Tabs } from 'components/ui';
import Register from './Register';
import Unregister from './Unregister';

const { TabNav, TabList, TabContent } = Tabs;

const BusinessDetails = () => {
  const formik = useFormik({
    initialValues: {
      companyType: 'Proprietorship/Individual',
      panCardNumber: '',
      aadharNumber: '',
      panCardFile: null,
      aadharCardFile: null,
      gstCertificateFile: null,
    },
    validationSchema: Yup.object({
      companyType: Yup.string().required('Company type is required'),
      panCardNumber: Yup.string()
        .trim()
        .uppercase()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN Card number')
        .required('PAN Card number is required'),
      aadharNumber: Yup.string()
        .trim()
        .matches(/^\d{12}$/, 'Invalid Aadhar number')
        .required('Aadhar number is required'),
      panCardFile: Yup.mixed().required('PAN Card file is required'),
      aadharCardFile: Yup.mixed().required('Aadhar Card file is required'),
      gstCertificateFile: Yup.mixed()
        .test('fileType', 'Invalid file type, only PDF is allowed', (value) => {
          return value && value.type === 'application/pdf';
        })
        .required('GST Certificate file is required'),
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);
      // Example: send form data to API
      // fetch('https://api.example.com/submit', {
      //   method: 'POST',
      //   body: JSON.stringify(values),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('Success:', data);
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
    },
  });

  const handleCompanyTypeChange = (e) => {
    formik.setFieldValue('companyType', e.target.value);
    // Reset fields when company type changes
    formik.setFieldValue('panCardNumber', '');
    formik.setFieldValue('aadharNumber', '');
    formik.setFieldValue('panCardFile', null);
    formik.setFieldValue('aadharCardFile', null);
    formik.setFieldValue('gstCertificateFile', null);
    formik.setFieldError('panCardNumber', '');
    formik.setFieldError('aadharNumber', '');
    formik.setFieldError('panCardFile', '');
    formik.setFieldError('aadharCardFile', '');
    formik.setFieldError('gstCertificateFile', '');
  };

  const handlePanCardChange = (e) => {
    formik.setFieldValue('panCardFile', e.currentTarget.files[0]);
  };

  const handleAadharCardChange = (e) => {
    formik.setFieldValue('aadharCardFile', e.currentTarget.files[0]);
  };

  const handleGstCertificateChange = (e) => {
    formik.setFieldValue('gstCertificateFile', e.currentTarget.files[0]);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="p-4  bg-white rounded-lg shadow-md">
          <h6 className="text-black text-center pb-10">Business Details</h6>

          <div>
            <label htmlFor="companyType" className="block text-sm font-medium text-gray-700">
              Company Type:
            </label>
            <select
              id="companyType"
              name="companyType"
              onChange={handleCompanyTypeChange}
              onBlur={formik.handleBlur}
              value={formik.values.companyType}
              className={`mt-1 block w-full px-3 py-2 border ${
                formik.errors.companyType && formik.touched.companyType
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-gray-300 focus:border-indigo-500'
              } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm`}
            >
              <option value="Proprietorship/Individual">Proprietorship/Individual</option>
              <option value="Private">Private</option>
              <option value="Partnership Form">Partnership Form</option>
            </select>
            {formik.errors.companyType && formik.touched.companyType && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.companyType}</p>
            )}
          </div>

          {formik.values.companyType === 'Proprietorship/Individual' && (
            <div className="mt-2">
              <Tabs defaultValue="tab1">
                <TabList>
                  <TabNav value="tab1">Register</TabNav>
                  <TabNav value="tab2">Unregister</TabNav>
                </TabList>
                <div className="p-4">
                  <TabContent value="tab1">
                    <Register />
                  </TabContent>
                  <TabContent value="tab2">
                    <Unregister />
                  </TabContent>
                </div>
              </Tabs>
            </div>
          )}

          {formik.values.companyType === 'Private' && (
            <div className="mt-4">
              
              <div className="space-y-2">
                <div>
                  <label htmlFor="panCard" className="block text-sm font-medium text-gray-700">
                    PAN Card:
                  </label>
                  <Input
                    type="text"
                    id="panCardNumber"
                    name="panCardNumber"
                    value={formik.values.panCardNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter PAN Card Number"
                    className={`mt-3 mb-6 block w-full px-3 py-2 border ${
                      formik.errors.panCardNumber && formik.touched.panCardNumber
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-indigo-500'
                    } rounded-md shadow-sm focus:outline-none sm:text-sm`}
                    style={{
                      borderColor: formik.errors.panCardNumber && formik.touched.panCardNumber
                        ? '#e53e3e'
                        : '#d2d6dc',
                    }}
                  />
                  {formik.errors.panCardNumber && formik.touched.panCardNumber && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.panCardNumber}</p>
                  )}
                  <input
                    type="file"
                    id="panCard"
                    name="panCardFile"
                    onChange={handlePanCardChange}
                    onBlur={formik.handleBlur}
                    className={`mt-3 mb-6 block w-full px-3 py-2 border ${
                      formik.errors.panCardFile && formik.touched.panCardFile
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-indigo-500'
                    } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  />
                  {formik.errors.panCardFile && formik.touched.panCardFile && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.panCardFile}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="gstCertificate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    GST Certificate (PDF only):
                  </label>
                  <input
                    type="file"
                    id="gstCertificate"
                    name="gstCertificateFile"
                    onChange={handleGstCertificateChange}
                    onBlur={formik.handleBlur}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      formik.errors.gstCertificateFile && formik.touched.gstCertificateFile
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-indigo-500'
                    } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  />
                  {formik.errors.gstCertificateFile && formik.touched.gstCertificateFile && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.gstCertificateFile}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {formik.values.companyType === 'Partnership Form' && (
            <div className="mt-4">
              <div className="space-y-2">
                <div>
                  <label htmlFor="panCard" className="block text-sm font-medium text-gray-700">
                    PAN Card:
                  </label>
                  <Input
                    type="text"
                    id="panCardNumber"
                    name="panCardNumber"
                    value={formik.values.panCardNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter PAN Card Number"
                    className={`mt-3 mb-6 block w-full px-3 py-2 border ${
                      formik.errors.panCardNumber && formik.touched.panCardNumber
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-indigo-500'
                    } rounded-md shadow-sm focus:outline-none sm:text-sm`}
                    style={{
                      borderColor: formik.errors.panCardNumber && formik.touched.panCardNumber
                        ? '#e53e3e'
                        : '#d2d6dc',
                    }}
                  />
                  {formik.errors.panCardNumber && formik.touched.panCardNumber && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.panCardNumber}</p>
                  )}
                  <input
                    type="file"
                    id="panCard"
                    name="panCardFile"
                    onChange={handlePanCardChange}
                    onBlur={formik.handleBlur}
                    className={`mt-3 mb-6 block w-full px-3 py-2 border ${
                      formik.errors.panCardFile && formik.touched.panCardFile
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-indigo-500'
                    } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  />
                  {formik.errors.panCardFile && formik.touched.panCardFile && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.panCardFile}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="aadharCard"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Aadhar Card:
                  </label>
                  <Input
                    type="text"
                    id="aadharNumber"
                    name="aadharNumber"
                    value={formik.values.aadharNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Aadhar Number"
                    className={`mt-3 mb-6 block w-full px-3 py-2 border ${
                      formik.errors.aadharNumber && formik.touched.aadharNumber
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-indigo-500'
                    } rounded-md shadow-sm focus:outline-none sm:text-sm`}
                    style={{
                      borderColor: formik.errors.aadharNumber && formik.touched.aadharNumber
                        ? '#e53e3e'
                        : '#d2d6dc',
                    }}
                  />
                  {formik.errors.aadharNumber && formik.touched.aadharNumber && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.aadharNumber}</p>
                  )}
                  <input
                    type="file"
                    id="aadharCard"
                    name="aadharCardFile"
                    onChange={handleAadharCardChange}
                    onBlur={formik.handleBlur}
                    className={`mt-3 mb-6 block w-full px-3 py-2 border ${
                      formik.errors.aadharCardFile && formik.touched.aadharCardFile
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-indigo-500'
                    } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  />
                  {formik.errors.aadharCardFile && formik.touched.aadharCardFile && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.aadharCardFile}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="gstCertificate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    GST Certificate (PDF only):
                  </label>
                  <input
                    type="file"
                    id="gstCertificate"
                    name="gstCertificateFile"
                    onChange={handleGstCertificateChange}
                    onBlur={formik.handleBlur}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      formik.errors.gstCertificateFile && formik.touched.gstCertificateFile
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300 focus:border-indigo-500'
                    } bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                  />
                  {formik.errors.gstCertificateFile && formik.touched.gstCertificateFile && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.gstCertificateFile}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default BusinessDetails;
