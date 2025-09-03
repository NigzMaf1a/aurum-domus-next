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
  title:string;
}

//components
import DynamicDiv from "../containers/DynamicDiv";
import DynamicHead from "../h/DynamicHead";

const BarChart: React.FC<ChartProps> = ({ label1, value1, label2, value2, title }) => {
  const data = [
    { name: label1, value: value1 },
    { name: label2, value: value2 },
  ];

  return (
    <DynamicDiv style={{width:'300px', height:'300px', overflowX:'auto'}}
                className="d-flex flex-column justify-content-center align-items-center border my-auto bg-white"
    >
      <DynamicHead text={title} style={{marginTop:'5px'}}/>
      <ResponsiveContainer height={250} className='w-100 mx-auto my-auto'>
          <ReBarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#348781" name={label1} />
          </ReBarChart>
      </ResponsiveContainer>
      </DynamicDiv>
  );
};

export default BarChart;
