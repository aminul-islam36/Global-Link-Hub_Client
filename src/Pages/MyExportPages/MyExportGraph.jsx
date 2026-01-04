import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const MyExportGraph = () => {
  const [chartData, setChartData] = useState([]);
  const { user } = useAuth();
  const axiosURL = useAxios();

  useEffect(() => {
    if (!user?.email) return;

    axiosURL.get(`/products?email=${user.email}`).then((res) => {
      const grouped = {};

      res.data?.result.forEach((item) => {
        const date = new Date(item.createdAt).toLocaleDateString();

        if (!grouped[date]) {
          grouped[date] = {
            date,
            products: 0,
            quantity: 0,
          };
        }

        grouped[date].products += 1;
        grouped[date].quantity += item.availableQuantity;
      });

      setChartData(Object.values(grouped));
    });
  }, [user, axiosURL]);

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Daily Product & Quantity Graph
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="products" name="Products Added" fill="#22c55e" />
          <Bar dataKey="quantity" name="Total Quantity" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyExportGraph;
