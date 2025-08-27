import React from 'react';

//components
import DynamicDiv from '../containers/DynamicDiv';
import PieChart from '../graphs/PieChart';
import BarChart from '../graphs/BarChart';

//interfaces
interface BarLabels{
    label1:string;
    label2:string;
}

interface PieLabels{
    label1:string;
    label2:string;
}

interface BarData{
    value1:number;
    value2:number;
}

interface PieData{
    value1:number;
    value2:number;
}

export interface Bar{
    labels:BarLabels;
    values:BarData;
}

export interface Pie{
    labels:PieLabels;
    values:PieData;
}

interface Props{
    bar:Bar;
    pie:Pie;
    barTitle:string;
    pieTitle:string;
}

export default function Stats({bar, pie, barTitle, pieTitle}:Props) {
  return (
    <DynamicDiv className='col-lg-12 col-sm-6 h-auto mb-3 px-2 pt-5 gap-5 rounded d-flex flex-column flex-lg-row
                    align-items-center justify-content-center'
         style={{height:"400px", backgroundColor: "#F5F5F5"}}
    >
        <PieChart label1={pie.labels.label1}
                  label2={pie.labels.label2}
                  value1={pie.values.value1}
                  value2={pie.values.value2}
                  title={pieTitle}
        />
        <BarChart label1={bar.labels.label1}
                  label2={bar.labels.label2}
                  value1={bar.values.value1}
                  value2={bar.values.value2}
                  title={barTitle}
        />
    </DynamicDiv>
  )
}