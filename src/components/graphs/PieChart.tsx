import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
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

const PieChart: React.FC<ChartProps> = ({ label1, value1, label2, value2 }) => {
  const data = [
    { name: label1, value: value1 },
    { name: label2, value: value2 },
  ];

  const COLORS = ["#0d6efd", "#dc3545"]; // Bootstrap blue & red

  return (
    <div className="col-12 col-sm-6 col-lg-5 mb-4">
      <div className="card p-3 shadow-sm">
        <h5 className="card-title text-center">Pie Chart</h5>
        <ResponsiveContainer width="100%" height={250}>
          <RePieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
