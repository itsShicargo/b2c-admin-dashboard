import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'tailwindcss/tailwind.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Create an Axios instance with default headers
const axiosInstance = axios.create({
    baseURL: 'https://shipclues.com/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const Dashboard = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Fetch data when the component first mounts
    useEffect(() => {
        if (!token) {
            console.warn('Token is not available. Please log in.');
            return;
        }

        // Fetch data automatically when component mounts
        fetchDashboardData();
    }, [token]);

    // Fetch dashboard data based on the selected date range
    const fetchDashboardData = async () => {
        if (!token) {
            alert('Please log in.');
            return;
        }

        setLoading(true);

        try {
            // Use default date range if no date is selected
            const startDate = fromDate || '2024-01-01'; // default start date (can be current date or any default range)
            const endDate = toDate || new Date().toISOString().split('T')[0]; // default to today's date

            const response = await axiosInstance.post('employee/dashboard', {
                start_date: startDate,
                end_date: endDate,
                token,
            });

            setDashboardData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error.response || error.message);
            alert('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        if (!fromDate || !toDate) {
            alert('Please select both start and end dates.');
            return;
        }

        fetchDashboardData();
    };

    // Bar chart data and options
    const chartData = {
        labels: dashboardData?.seller_wise_count
            ? dashboardData.seller_wise_count.map((item) => `Seller ${item.seller_id}`)
            : [], 
        datasets: [
            {
                label: 'Shipped Orders',
                data: dashboardData?.seller_wise_count
                    ? dashboardData.seller_wise_count.map((item) => item.todays_order)
                    : [],
                backgroundColor: 'rgba(54, 162, 235, 0.7)', 
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1000,
                },
            },
        },
    };

    return (
        <div className="p-6 min-h-screen animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="from-date" className="text-gray-700">
                            From:
                        </label>
                        <input
                            id="from-date"
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="to-date" className="text-gray-700">
                            To:
                        </label>
                        <input
                            id="to-date"
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200 hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer"
                        />
                    </div>
                    <button
                        onClick={handleRefresh}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            </div>

            {/* Counter Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                    {
                        title: 'Total Orders',
                        value: dashboardData?.total_order,
                    },
                    {
                        title: 'Shipped Orders',
                        value: dashboardData?.total_shipped_order,
                    },
                    {
                        title: 'Cancelled Orders',
                        value: dashboardData?.total_cancelled_order,
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white text-gray-800 p-4 rounded-md flex flex-col items-center justify-center shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                        <div className="mb-4 bg-blue-100 text-blue-600 p-4 rounded-full shadow-inner flex items-center justify-center text-4xl">
                            🛒
                        </div>
                        <div className="text-center">
                            <h2 className="text-lg font-bold">{item.title}</h2>
                            <p className="text-2xl">
                                {item.value !== undefined ? (
                                    item.value
                                ) : (
                                    <Skeleton width={100} />
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bar Chart Section */}
            <div className="bg-white p-6 rounded-md shadow-md animate-slide-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Orders Overview</h2>
                </div>
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Dashboard;
