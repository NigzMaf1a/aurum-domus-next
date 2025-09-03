import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

//components
import DynamicDiv from "../containers/DynamicDiv";
import DynamicHead from "../h/DynamicHead";

interface ChartProps {
  label1: string;
  value1: number;
  label2: string;
  value2: number;
  title:string;
}

const PieChart: React.FC<ChartProps> = ({ label1, value1, label2, value2, title }) => {
  const data = [
    { name: label1, value: value1 },
    { name: label2, value: value2 },
  ];

  const COLORS = ["#347C2C", "#FDD017"];

  return (
    <DynamicDiv style={{width:'300px', height:'300px', overflowX:'auto'}}
                className="d-flex flex-column justify-content-center align-items-center border bg-white"
    >
      <DynamicHead text={title} style={{marginTop:'5px'}}/>
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
</DynamicDiv>
  );
};

export default PieChart;
