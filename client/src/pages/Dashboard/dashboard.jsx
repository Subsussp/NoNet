import { useContext, useEffect, useState } from 'react';
import { Shopcontext } from 'pages/Root/Shop/Shop';
import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Products from 'pages/control/Products';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
function DashboardChart({ title, data, labels, color }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: true,
        backgroundColor: `${color}20`,
        borderColor: color,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f3f4f6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">{title}</h2>
      <div className="h-[300px]">
        <Line data={chartData} options={options}/>
      </div>
    </div>
  );
}

const Dashboard = ({ refetch }) => {
    const [showForm, setShowForm] = useState([false, '','']);
    const [items, setItems] = useState([]); // Store raw data, not JSX
    const data = useContext(Shopcontext);
    // Update items when data changes
    useEffect(() => {
        setItems(data); // Store raw data
    }, [data]);
        // Toggle form visibility
        function toggleForm() {
            setShowForm(!showForm);
        }
        // Delete item and then refetch
        async function refresh() {
            await refetch(); // Ensure the latest data is fetched
        }
        return (
            <>
                {/* analyitics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 bg-one p-2">
                    <DashboardChart title={'Dashboard'} labels={['SSS','dDD','dsag']} data={[32423,234234,234]} />         
                    <DashboardChart title={'Dashboard'} labels={['SSS','dDD','dsag']} data={[32423,234234,234]} />         
                </div>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="sideshow ">
                    <div className="itm-con">
                    </div>
                </div>
        </main>
            </>
        );
    };
export default Dashboard