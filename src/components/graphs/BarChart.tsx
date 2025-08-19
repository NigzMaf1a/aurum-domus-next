import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  label1: string;
  value1: number;
  label2: string;
  value2: number;
}

const BarChart: React.FC<ChartProps> = ({ label1, value1, label2, value2 }) => {
  const data = [
    { name: label1, value: value1 },
    { name: label2, value: value2 },
  ];

  return (
    <div className="col-12 col-sm-6 col-lg-5 mb-4">
      <div className="card p-3 shadow-sm">
        <h5 className="card-title text-center">Bar Chart</h5>
        <ResponsiveContainer width="100%" height={250}>
          <ReBarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#0d6efd" name={label1} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
