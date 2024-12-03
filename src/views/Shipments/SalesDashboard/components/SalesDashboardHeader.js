import React, { useState } from "react";
import { Link } from "react-router-dom";

const SalesDashboardHeader = () => {
  const [users, setUsers] = useState([
    {
      id:98,
      userName: "Tarunshipclues",
      email: "shipcluestesting@shipclues.in",
      companyName: "Tarunshipclues",
      mobileNumber: "9911523448",
      Monthly_order: "10000",
      
    },
    {
      id:97,
      userName: "TRIPURARIJHA",
      email: "tripurai.jha.12345@gmail.com",
      companyName: "TRIPURARIJHA",
      mobileNumber: "9016468559",
      Monthly_order: "100",
      
    },
    {
      id:96,
      userName: "Niksgoyal",
      email: "Neerajg600@gmail.com",
      companyName: "9654178722",
      mobileNumber: "100",
      Monthly_order: "100",      
    },
    {
      id:95,
      userName: "hardik09",
      email: "hardik.anthrofit@gmail.com",
      companyName: "hardik09",
      mobileNumber: "8222819999", 
      Monthly_order: "1000",
          },
    {
      id:94,
      userName: "Mobiletorch",
      email: "cloudbuzzmobileaccessories@gmail.com",
      companyName: "Mobiletorch",
      mobileNumber: "9979852222",
      Monthly_order: "300",
      
    },    {
      id:93,
      userName: "barli",
      email: "barlishipping@gmail.com",
      companyName: "barli",
      mobileNumber: "6289724824",
      Monthly_order: "3000",
      
    },
    {      
      id:92,
      userName: "RipulSharma",
      email: "babyorgano.orders@gmail.com",
      companyName: "RipulSharma",
      mobileNumber: "6355561870",
      Monthly_order: "200",
      
    },
    {      
      id:91,
      userName: "Chiragsaripadiya",
      email: "chiragsaripadiya@gmail.com",
      companyName: "Chiragsaripadiya",
      mobileNumber: "9022431614",
      Monthly_order: "100",
      
    },
    {      
      id:90,
      userName: "vibhu",
      email: "vibhugoel726@gmail.com",
      companyName: "vibhu",
      mobileNumber: "9022431614",
      Monthly_order: "200",
      
    },
 
    {
      id:91,     
      userName: "Tuntunkr",
      email: "tuntunkumar@shipclues.in",
      companyName: "Tuntunkr",
      mobileNumber: "8054922169",
      Monthly_order: "300",
      
    },
    // Add other entries here as needed
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
            ID
              </th>
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
                Monthly Order
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
        <td className="p-3 border border-gray-200">{user.id}</td>
        <td className="p-3 border border-gray-200">{user.userName}</td>
        <td className="p-3 border border-gray-200">{user.email}</td>
        <td className="p-3 border border-gray-200">{user.companyName}</td>
        <td className="p-3 border border-gray-200">{user.mobileNumber}</td>
        <td className="p-3 border border-gray-200">{user.Monthly_order}</td>
        <td className="p-3 border border-gray-200">
          <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mr-2">
            Add User
          </button>
          <Link to={"https://dashboard.shipcluescargo.com/sign-in"}>
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
        colSpan="7"
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
