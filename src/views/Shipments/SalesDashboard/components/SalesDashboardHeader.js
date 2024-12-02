import React, { useState } from "react";
import { Link } from "react-router-dom";

const SalesDashboardHeader = () => {
  const [users, setUsers] = useState([
    {
      userName: "Neonoicenite",
      email: "parteeshtestingfs@gmail.com",
      companyName: "Neonoicenite",
      mobileNumber: "8610574405",
      codGap: 7,
      codCycle: 2,
      maxLiability: 2000,
      poc: {
        sales: "jaishree@pickrr.com",
        retention: "-",
        ops: "-",
      },
    },
    {
      userName: "testing9099000",
      email: "testing911090@gmail.com",
      companyName: "testing9099000",
      mobileNumber: "9425494793",
      codGap: 7,
      codCycle: 2,
      maxLiability: 2000,
      poc: {
        sales: "jaishree@pickrr.com",
        retention: "-",
        ops: "-",
      },
    },
    {
      userName: "John Doe",
      email: "johndoe@gmail.com",
      companyName: "TechCorp",
      mobileNumber: "9876543210",
      codGap: 5,
      codCycle: 1,
      maxLiability: 3000,
      poc: {
        sales: "sales@techcorp.com",
        retention: "retention@techcorp.com",
        ops: "ops@techcorp.com",
      },
    },
    {
      userName: "Neonoicenite",
      email: "parteeshtestingfs@gmail.com",
      companyName: "Neonoicenite",
      mobileNumber: "8610574405",
      codGap: 7,
      codCycle: 2,
      maxLiability: 2000,
      poc: {
        sales: "jaishree@pickrr.com",
        retention: "-",
        ops: "-",
      },
    },
    {
      userName: "testing9099000",
      email: "testing911090@gmail.com",
      companyName: "testing9099000",
      mobileNumber: "9425494793",
      codGap: 7,
      codCycle: 2,
      maxLiability: 2000,
      poc: {
        sales: "jaishree@pickrr.com",
        retention: "-",
        ops: "-",
      },
    },
    {
      userName: "John Doe",
      email: "johndoe@gmail.com",
      companyName: "TechCorp",
      mobileNumber: "9876543210",
      codGap: 5,
      codCycle: 1,
      maxLiability: 3000,
      poc: {
        sales: "sales@techcorp.com",
        retention: "retention@techcorp.com",
        ops: "ops@techcorp.com",
      },
    },
    {
      userName: "Neonoicenite",
      email: "parteeshtestingfs@gmail.com",
      companyName: "Neonoicenite",
      mobileNumber: "8610574405",
      codGap: 7,
      codCycle: 2,
      maxLiability: 2000,
      poc: {
        sales: "jaishree@pickrr.com",
        retention: "-",
        ops: "-",
      },
    },
    {
      userName: "testing9099000",
      email: "testing911090@gmail.com",
      companyName: "testing9099000",
      mobileNumber: "9425494793",
      codGap: 7,
      codCycle: 2,
      maxLiability: 2000,
      poc: {
        sales: "jaishree@pickrr.com",
        retention: "-",
        ops: "-",
      },
    },
    {
      userName: "John Doe",
      email: "johndoe@gmail.com",
      companyName: "TechCorp",
      mobileNumber: "9876543210",
      codGap: 5,
      codCycle: 1,
      maxLiability: 3000,
      poc: {
        sales: "sales@techcorp.com",
        retention: "retention@techcorp.com",
        ops: "ops@techcorp.com",
      },
    },
    {
      userName: "Neonoicenite",
      email: "parteeshtestingfs@gmail.com",
      companyName: "Neonoicenite",
      mobileNumber: "8610574405",
      codGap: 7,
      codCycle: 2,
      maxLiability: 2000,
      poc: {
        sales: "jaishree@pickrr.com",
        retention: "-",
        ops: "-",
      },
    },
    {
      userName: "testing9099000",
      email: "testing911090@gmail.com",
      companyName: "testing9099000",
      mobileNumber: "9425494793",
      codGap: 7,
      codCycle: 2,
      maxLiability: 2000,
      poc: {
        sales: "jaishree@pickrr.com",
        retention: "-",
        ops: "-",
      },
    },
    {
      userName: "John Doe",
      email: "johndoe@gmail.com",
      companyName: "TechCorp",
      mobileNumber: "9876543210",
      codGap: 5,
      codCycle: 1,
      maxLiability: 3000,
      poc: {
        sales: "sales@techcorp.com",
        retention: "retention@techcorp.com",
        ops: "ops@techcorp.com",
      },
    },
    // Add more users here as needed...
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header with Title, Search, and Add User Button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-4 md:mb-0">
        All Users
        </h1>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow md:flex-grow-0 w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Search User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left font-semibold uppercase text-sm">
                User Name
              </th>
              <th className="p-3 text-left font-semibold uppercase text-sm">
                User Email ID
              </th>
              <th className="p-3 text-left font-semibold uppercase text-sm">
                Company Name
              </th>
              <th className="p-3 text-left font-semibold uppercase text-sm">
                Mobile Number
              </th>
              <th className="p-3 text-left font-semibold uppercase text-sm">
                COD Gap
              </th>
              <th className="p-3 text-left font-semibold uppercase text-sm">
                COD Cycle
              </th>
              <th className="p-3 text-left font-semibold uppercase text-sm">
                Max Liability
              </th>
              <th className="p-3 text-left font-semibold uppercase text-sm">
                POC
              </th>
              <th className="p-3 text-left font-semibold uppercase text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition`}
                >
                  <td className="p-3 border border-gray-200">{user.userName}</td>
                  <td className="p-3 border border-gray-200">{user.email}</td>
                  <td className="p-3 border border-gray-200">
                    {user.companyName}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {user.mobileNumber}
                  </td>
                  <td className="p-3 border border-gray-200">{user.codGap}</td>
                  <td className="p-3 border border-gray-200">{user.codCycle}</td>
                  <td className="p-3 border border-gray-200">
                    {user.maxLiability}
                  </td>
                  <td className="p-3 border border-gray-200">
                    <div className="text-sm">
                      <div>Sales: {user.poc.sales}</div>
                      <div>Retention: {user.poc.retention}</div>
                      <div>Ops: {user.poc.ops}</div>
                    </div>
                  </td>
                  <td className="p-3 border border-gray-200">
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mr-2">
                      Add User
                    </button>
                    <Link to={'https://dashboard.shipcluescargo.com/sign-in'} >
                    <button className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                      Login
                    </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="p-3 text-center text-gray-500 border border-gray-200"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesDashboardHeader;
