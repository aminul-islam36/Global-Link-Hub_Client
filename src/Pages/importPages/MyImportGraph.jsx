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
import Loader from "../../Components/Loader";

const MyImportGraph = () => {
  const { user } = useAuth();
  const axiosURL = useAxios();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosURL
      .get(`/importedProducts?email=${user.email}`)
      .then((res) => {
        const data = res.data || [];
        const grouped = {};

        data.forEach((item) => {
          const date = new Date(item.importAt).toLocaleDateString();

          if (!grouped[date]) {
            grouped[date] = {
              date,
              quantity: 0,
            };
          }

          grouped[date].quantity += item.importQty || 0;
        });

        setChartData(Object.values(grouped));
      })
      .finally(() => setLoading(false));
  }, [user, axiosURL]);

  if (loading) return <Loader />;

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Daily Exported Quantity</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="quantity"
            name="Exported Quantity"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyImportGraph;
