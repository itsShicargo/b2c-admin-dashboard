import React, { cloneElement } from 'react';

const Side = ({ children, content, ...rest }) => {
    return (
        <div className="relative flex flex-col h-screen">
            {/* Top Section */}
            <div className="bg-blue-900 flex-1"></div>

            {/* Bottom Section */}
            <div className="bg-gray-100 flex-1"></div>

            {/* Centered Form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div className="text-center text-blue-900 text-xl font-bold mb-6">
                    Customer Success Login
                </div>
                {children ? cloneElement(children, { ...rest }) : null}
            </div>
        </div>
    );
};

export default Side;
